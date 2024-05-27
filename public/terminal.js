const history = [];
let cwd = ["desktop"];
let tree = {};
let cursor = -1;

fetch('/tree.json')
    .then(response => response.json())
    .then(data => {
        tree = data;
        render();
    });

let currentInput = '';

function render() {
    const toNormal = bytes => {
        const gb = bytes / 1024 / 1024 / 1024;

        if(gb < 1) {
            return (bytes / 1024 / 1024).toFixed(0) + 'mb';
        } else {
            return gb.toFixed(2) + 'gb';
        }
    }

    const toNormalTime = seconds => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = (seconds % 60).toFixed(0);

        if(hours > 0) {
            return `${hours}h ${minutes}m ${remainingSeconds}s`;
        } else if(minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        } else {
            return `${remainingSeconds}s`;
        }
    }

    const spaces = " ".repeat(Math.max(Object.keys(stats).map(key => stats[key].toString().length).reduce((a, b) => Math.max(a, b), 0) - 1, 0) + 1);



    const statsBoard = `
                System Load: ${stats.systemLoad}% ${spaces}    Processes: ${stats.processes}
                Usage of cpu: ${stats.cpu.user} ${spaces} Users logged in: ${stats.users}
                Memory usage: ${toNormal(stats.memory.rss)} ${spaces} Uptime: ${toNormalTime(stats.uptime)}
    `


    document.body.innerHTML = `
        <div>
            <pre>
            Welcome to kijmoshi.xyz LTS (JS/React/Node.js)
                <br>
            * Documentation:  type help
            * Projects:       type cd projects
            * Contact:        type cd contact
            * Normal website: type normal.exe
            
            System information as of ${new Date().toLocaleString()}
            ${statsBoard}
            <br>
                
            0 better developers to be found
    
            </pre>
        </div>
        ${history.map(command => `
            <pre class="input">C:\\kijmoshi.xyz${command.cwd.length > 0 ? '\\' + command.cwd.join('\\') : ''}> ${command.input}</pre>
            <pre class="output">${command.output}</pre>
        `).join('')}
        <pre class="input">C:\\kijmoshi.xyz${cwd.length > 0 ? '\\' + cwd.join('\\') : ''}> ${currentInput}</pre>
    `;
}

function execute(input) {
    const [command, ...args] = input.split(' ');


    switch (command.trim().toLowerCase()) {
        case 'cls':
            history.length = 0;
            return '';
        case 'cd':
            if (args[0] === '..') {
                if (cwd.length > 1) {
                    cwd.pop();
                }
            } else {
                let current = cwd.reduce((acc, cur) => {
                    return acc.children.find(child => child.name === cur);
                }, tree);
                
                if (current && current.children && current.children.find(child => child.name === args[0])) {
                    if (current.children.find(child => child.name === args[0]).type === 'folder') {
                        cwd.push(args[0]);
                    } else {
                        return `cd: ${args[0]}: Not a directory`;
                    }
                } else {
                    return `cd: ${args[0]}: No such file or directory`;
                }
            }
            return '';
        case 'ls':
            let current = cwd.reduce((acc, cur) => {
                console.log(acc);
                return acc.children.find(child => child.name === cur);
            }, tree);
            
            if (current && current.children) {
                return current.children.map(child => child.name).join(' ');
            } else {
                return '';
            }
        case 'cat':
            const file = cwd.reduce((acc, cur) => {
                return acc.children.find(child => child.name === cur);
            }, tree).children.find(child => child.name === args[0]);

            if (file) {
                return file.content;
            }

            return `cat: ${args[0]}: No such file or directory`;
        case 'help':
            return `
                cd [dir] - change directory (.. to go back)
                ls - list files
                cat [file] - show file content
                cls - clear screen
                <filename>.exe - run a file
            `;
        case '':
            return '';
        default:
            const files = cwd.reduce((acc, cur) => {
                return acc.children.find(child => child.name === cur);
            }, tree).children;

            const fileToRun = files.find(file => file.name === command);
            if(fileToRun) {
                console.log(fileToRun);
                eval(fileToRun.onRun);
                return '';
            }

            return `kijmoshi.xyz: ${command}: command not found`;
    }
}

document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        const oldCwd = [...cwd];
        const commandOutput = execute(currentInput);
        history.push({ input: currentInput, output: commandOutput, cwd: oldCwd });
        currentInput = '';

        //scroll to bottom
        window.scrollTo(0, document.body.scrollHeight);
        render();
    } else if (event.key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        render();
    } else if (event.key == 'Tab') {
        event.preventDefault();
        const lastArg = currentInput.split(' ').pop();

        const files = cwd.reduce((acc, cur) => {
            return acc.children.find(child => child.name === cur);
        }, tree).children;

        const matchingFiles = files.filter(file => file.name.startsWith(lastArg));

        if (matchingFiles.length === 1) {
            if(currentInput.split(' ').length === 1) {
                currentInput = matchingFiles[0].name;
            } else {
                currentInput = currentInput.split(' ').slice(0, -1).join(' ') + ' ' + matchingFiles[0].name;
            }
        } else if (matchingFiles.length > 1) {
            const common = matchingFiles.reduce((acc, cur) => {
                for (let i = 0; i < Math.min(acc.length, cur.name.length); i++) {
                    if (acc[i] !== cur.name[i]) {
                        return acc.slice(0, i);
                    }
                }

                return acc.slice(0, Math.min(acc.length, cur.name.length));
            }, matchingFiles[0].name);

            if(currentInput.split(' ').length === 1) {
                currentInput = common;
            } else {
                currentInput = currentInput.split(' ').slice(0, -1).join(' ') + ' ' + common;
            }
        }
        
        render();
    } else if (event.key === 'ArrowUp') {
        if (cursor < history.length - 1) {
            cursor++;
            currentInput = history[history.length - cursor - 1].input;
            render();
        }
    } else if (event.key === 'ArrowDown') {
        if (cursor > 0) {
            cursor--;
            currentInput = history[history.length - cursor - 1].input;
            render();
        }
    } else {
        currentInput += event.key;
        render();
    }
});

updateStats().then(() => {
    render();
});



//check if winow is to small to display terminal if so redirect to mobile version
if(window.innerWidth < 500){
    window.location.href = "/mobile";
}

window.addEventListener('resize', () => {
    if(window.innerWidth < 500){
        window.location.href = "/mobile";
    }
})