const express = require('express');
const os = require('os');
require('dotenv').config();

const app = express();

const users = new Set();

let heartbeatInterval = process.env.HEARTBEAT_INTERVAL || 1000;



app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get("/connect", (req, res) => {
    let uuid;

    do {
        uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    } while (users.has(uuid));
    

    users.add({uuid: uuid, lastHeartbeat: Date.now()});


    res.json({
        uuid: uuid,
        interval: heartbeatInterval
    });
});

app.get("/stats", async (req, res) => {
    res.json({
        users: users.size,
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
    const uuid = req.query.uuid;

   if(!users.has(uuid)) {
       return res.json({success: false});
    }
    
    users.delete(uuid);
});


setInterval(() => {
    const now = Date.now();

    users.forEach(user => {
        if(now - user.lastHeartbeat > heartbeatInterval * 2) {
            users.delete(user);
        }
    });
}, heartbeatInterval * 2);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});