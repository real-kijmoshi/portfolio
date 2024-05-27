const express = require('express');
const os = require('os');
const path = require('path');
const ServerlessHttp = require('serverless-http');
const fs = require('fs');
require('dotenv').config();

const app = express();
let heartbeatInterval = process.env.HEARTBEAT_INTERVAL || 1000;


const filesDirectory = path.join(process.cwd())
const dir = `${filesDirectory}/service-data/`

const usersPath = path.join(dir, 'users.json');

if(!fs.existsSync(usersPath)) {
    fs.writeFileSync(usersPath, JSON.stringify({}));
}


app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get("/connect", (req, res) => {
    const users = require(usersPath);
    console.log(`New connection`);
    let uuid;

    do {
        uuid = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7);
    } while (users[uuid]);
    

    users[uuid] = {
        lastHeartbeat: Date.now()
    };

    fs.writeFileSync(usersPath, JSON.stringify(users));
    console.log(users);

    res.json({
        uuid: uuid,
        interval: heartbeatInterval
    });
});

app.get("/stats", (req, res) => {
    res.json({
        users: Object.keys(require(usersPath)).length,
        cpu: os.cpus()[0].times,
        memory: {
            rss: process.memoryUsage().rss
        },
        uptime: process.uptime(),
        systemLoad: os.loadavg()[0] * 100,
        processes: os.cpus().length
    });
});

app.get("/heartbeat", (req, res) => {
    const users = require(usersPath);
    const uuid = req.query.uuid;

    if(!users[uuid]) {
        res.json({success: false});
        return;
    }

    if(users[uuid]) {
        users[uuid].lastHeartbeat = Date.now();
        fs.writeFileSync(usersPath, JSON.stringify(users));
        res.json({success: true});
    } else {
        res.json({success: false});
    }
});


setInterval(() => {
    const users = require(usersPath);
    const now = Date.now();

    Object.keys(users).forEach(uuid => {
        if(now - users[uuid].lastHeartbeat > heartbeatInterval * 2) {
            console.log(`Connection lost for UUID: ${uuid}`);
            delete users[uuid];
        }
    });

    fs.writeFileSync(usersPath, JSON.stringify(users));
}, heartbeatInterval * 2);

module.exports.handler = ServerlessHttp(app);