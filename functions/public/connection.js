let uuid;

let interval;

const reconnect = () => {
    fetch("/connect")
        .then(res => res.json())
        .then(data => {
            uuid = data.uuid;
            console.log(`UUID: ${uuid}`);
            console.log(`Interval: ${data.interval}`);
            interval = setInterval(() => {
                fetch("/heartbeat?uuid=" + uuid, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        if (!data.success) {
                            console.log(`Connection lost for UUID: ${uuid}`);
                            console.log(`Reconnecting...`);
                            clearInterval(interval);
                            reconnect();
                        }
                    });
            }, data.interval);
        });
}



let stats = {
    users: 0,
    cpu: {},
    memory: {},
    uptime: 0,
    systemLoad: 0
};

const updateStats = () => {
    return new Promise((resolve, reject) => {
        fetch("/stats")
            .then(res => res.json())
            .then(data => {
                stats = data;
                resolve();
            });
        });
}

reconnect();