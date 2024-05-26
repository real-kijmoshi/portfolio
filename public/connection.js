let uuid;

fetch("/connect")
    .then(res => res.json())
    .then(data => {
        uuid = data.uuid;
        setInterval(() => {
            fetch("/heartbeat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ uuid: uuid })
            });
            console.log(`Heartbeat sent for UUID: ${uuid}`);
        }, data.interval);

        console.log(`Connected with UUID: ${uuid}`);
    });

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