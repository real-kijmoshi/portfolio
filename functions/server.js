const express = require('express');
const os = require('os');
const path = require('path');
const ServerlessHttp = require('serverless-http');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = 'https://qglogbhpenpyllroeoin.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const app = express();

const users = supabase.from('users')


let heartbeatInterval = process.env.HEARTBEAT_INTERVAL || 1000;



app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get("/connect", (req, res) => {
    let uuid;

    do {
        uuid = Math.floor(Math.random() * 1000000);
    } while (users.fetch(uuid).length > 0);
    

    users.insert({uuid: uuid, lastHeartbeat: Date.now()}).then(data => console.log(data));


    res.json({
        uuid: uuid,
        interval: heartbeatInterval
    });
});

app.get("/stats", async (req, res) => {
    res.json({
        users: await users.fetch().length,
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

    if(typeof uuid !== 'number') {
        res.json({success: false});
    } else if (uuid < 0) {
        res.json({success: false});
    }

    if(!users.fetch(uuid)) {
        res.json({success: false});
    }
    
    users.update({lastHeartbeat: Date.now()}).eq('uuid', uuid).then(data => console.log(data));
});


setInterval(() => {
    const now = Date.now();

    users.fetch().forEach(user => {
        if(now - user.lastHeartbeat > heartbeatInterval * 2) {
            users.delete(user.uuid).then(data => console.log(data));
        }
    });
}, heartbeatInterval * 2);



module.exports.handler = ServerlessHttp(app);