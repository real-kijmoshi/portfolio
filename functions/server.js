const express = require('express');
const os = require('os');
const ServerlessHttp = require('serverless-http');
const fs = require('fs');
require('dotenv').config();

const app = express();
let heartbeatInterval = process.env.HEARTBEAT_INTERVAL || 1000;

//ik this is weird but it's netlify's fault
if(!fs.existsSync(__dirname + '/users.json')) {
    fs.writeFileSync(__dirname + '/users.json', JSON.stringify({}));
}


app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get("/connect", (req, res) => {
    const users = require(__dirname + '/users.json');
    console.log(`New connection`);
    let uuid;

    do {
        uuid = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7);
    } while (users[uuid]);
    

    users[uuid] = {
        lastHeartbeat: Date.now()
    };

    fs.writeFileSync(__dirname + '/users.json', JSON.stringify(users));
    console.log(users);

    res.json({
        uuid: uuid,
        interval: heartbeatInterval
    });
});

app.get("/stats", (req, res) => {
    res.json({
        users: Object.keys(require(__dirname + '/users.json')).length,
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
    const users = require(__dirname + '/users.json');
    const uuid = req.query.uuid;

    if(!users[uuid]) {
        res.json({success: false});
        return;
    }

    if(users[uuid]) {
        users[uuid].lastHeartbeat = Date.now();
        fs.writeFileSync(__dirname + '/users.json', JSON.stringify(users));
        res.json({success: true});
    } else {
        res.json({success: false});
    }
});


setInterval(() => {
    const users = require(__dirname + '/users.json');
    const now = Date.now();

    Object.keys(users).forEach(uuid => {
        if(now - users[uuid].lastHeartbeat > heartbeatInterval * 2) {
            console.log(`Connection lost for UUID: ${uuid}`);
            delete users[uuid];
        }
    });

    fs.writeFileSync(__dirname + '/users.json', JSON.stringify(users));
}, heartbeatInterval * 2);

module.exports.handler = ServerlessHttp(app);