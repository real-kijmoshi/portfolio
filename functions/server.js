const express = require('express');
const ServerlessHttp = require('serverless-http');
require('dotenv').config();

const app = express();

const users = []
let heartbeatInterval = 1000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile("/index.html")
});

app.get("/connect", (req, res) => {
    let uuid;

    do {
        uuid = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7);
    } while (users.includes(uuid));

    users.push({
        uuid: uuid,
        lastHeartbeat: Date.now()
    });

    res.json({
        uuid: uuid,
        interval: heartbeatInterval
    });
});

const os = require('os');
app.get("/stats", (req, res) => {
    res.json({
        users: users.length,
        cpu: os.cpus()[0].times,
        memory: {
            rss: process.memoryUsage().rss
        },
        uptime: process.uptime(),
        systemLoad: os.loadavg()[0] * 100,
        processes: os.cpus().length
    });
});

app.post("/heartbeat", (req, res) => {
    const user = users.find(user => user.uuid === req.body.uuid);

    if (user) {
        user.lastHeartbeat = Date.now();
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

setInterval(() => {
    users.forEach(user => {
        if (Date.now() - user.lastHeartbeat > heartbeatInterval) {
            users.splice(users.indexOf(user), 1);
        }
    });
}, heartbeatInterval * 2);

console.log(`Starting server`);
console.log(`Heartbeat interval: ${heartbeatInterval}ms`);
console.log(`Listening with serverless`);

module.exports.handler = ServerlessHttp(app);