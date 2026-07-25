const terminal = document.getElementById("terminal-output");
const input = document.getElementById("terminal-input");

let history = [];
let historyIndex = -1;

/* -------------------------- */
/* Boot Animation */
/* -------------------------- */

const bootLines = [

    "[ OK ] Booting Kali Linux Portfolio...",

    "[ OK ] Loading Kernel...",

    "[ OK ] Checking File System...",

    "[ OK ] Loading Drivers...",

    "[ OK ] Starting Services...",

    "[ OK ] Connecting Modules...",

    "[ OK ] Loading Portfolio...",

    "",

    "Welcome Sadra Developer",

    "",

    "[ OK ] Done."

];

const bootText = document.getElementById("boot-text");

let bootIndex = 0;

function bootAnimation() {

    if (bootIndex >= bootLines.length) {

        setTimeout(() => {

            document.getElementById("boot-screen").style.display = "none";

            document.getElementById("terminal-container").style.display = "block";

            printBanner();

            input.focus();

        }, 800);

        return;

    }

    bootText.innerHTML +=
        bootLines[bootIndex]
            .replace(
                "[ OK ]",
                "<span style='color:#00ff88'>[ OK ]</span>"
            )
        + "<br>";

    bootIndex++;

    setTimeout(bootAnimation, 400);

}

bootAnimation();

/* -------------------------- */
/* Banner */
/* -------------------------- */

function printBanner() {

    print(`
// ███████╗ █████╗ ██████╗ ██████╗  █████╗
// ██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗
// ███████╗███████║██║  ██║██████╔╝███████║
// ╚════██║██╔══██║██║  ██║██╔══██╗██╔══██║
// ███████║██║  ██║██████╔╝██║  ██║██║  ██║
// ╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝

Welcome To Sadra Terminal

Type "help" to see available commands.

`);

}

/* -------------------------- */
/* Print */
/* -------------------------- */

function print(text) {

    terminal.innerHTML += `<div>${text}</div>`;

    terminal.scrollTop = terminal.scrollHeight;

}

/* -------------------------- */
/* Input */
/* -------------------------- */

input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        let command = input.value.trim();

        history.push(command);

        historyIndex = history.length;

        print(`<span style="color:#00ff88;">root@sadra:~#</span> ${command}`);

        execute(command);

        input.value = "";

    }

});

/* -------------------------- */
/* History */
/* -------------------------- */

input.addEventListener("keydown", (e) => {

    if (e.key === "ArrowUp") {

        if (historyIndex > 0) {

            historyIndex--;

            input.value = history[historyIndex];

        }

    }

    if (e.key === "ArrowDown") {

        if (historyIndex < history.length - 1) {

            historyIndex++;

            input.value = history[historyIndex];

        } else {

            input.value = "";

        }

    }

});

/* -------------------------- */
/* Execute */
/* -------------------------- */
function execute(command) {

    command = command.trim();

    // ------------------------
    // Commands With Arguments
    // ------------------------

    if (command.startsWith("cat ")) {

        cat(command.substring(4).trim());
        return;

    }

    if (command.startsWith("cd ")) {

        cd(command.substring(3).trim());
        return;

    }

    if (command.startsWith("echo ")) {

        echo(command.substring(5));
        return;

    }

    // ------------------------
    // Commands Without Arguments
    // ------------------------

    switch (command) {

        case "help":
            help();
            break;

        case "whoami":
            whoami();
            break;

        case "about":
            about();
            break;

        case "skills":
            skills();
            break;

        case "status":
            status();
            break;

        case "learning":
            learning();
            break;

        case "social":
            social();
            break;

        case "matrix":
            matrix();
            break;

        case "scan":
            scan();
            break;

        case "weather":
            weather();
            break;

        case "mission":
            mission();
            break;

        case "quote":
            quote();
            break;

        case "pwd":
            pwd();
            break;

        case "ls":
            ls();
            break;

        case "history":
            showHistory();
            break;

        case "date":
            showDate();
            break;

        case "time":
            showTime();
            break;

        case "neofetch":
            neofetch();
            break;

        case "home":
            home();
            break;

        case "exit":
            exitTerminal();
            break;

        case "joke":
            joke();
            break;

        case "coffee":
            coffee();
            break;

        case "fortune":
            fortune();
            break;

        case "sudo":
            sudo();
            break;

        case "hack":
            hack();
            break;

        case "banner":
            banner();
            break;

        case "clear":
            terminal.innerHTML = "";
            break;

        case "":
            break;

        default:

            print(`Command not found: ${command}`);
            print(`Type "help" to see available commands.`);

    }

}
function echo(text) {

    print(text);

}

function showHistory() {

    if (history.length === 0) {

        print("No history.");

        return;

    }

    history.forEach((cmd, index) => {

        print(`${index + 1}  ${cmd}`);

    });

}

function showDate() {

    const now = new Date();

    print(now.toDateString());

}

function showTime() {

    const now = new Date();

    print(now.toLocaleTimeString());

}

function resizeTerminal() {

    const output = document.getElementById("terminal-output");

    const topBar = document.querySelector(".top-bar");

    const inputLine = document.querySelector(".input-line");

    output.style.height =
        window.innerHeight -
        topBar.offsetHeight -
        inputLine.offsetHeight +
        "px";

}

window.addEventListener("resize", resizeTerminal);

window.addEventListener("load", resizeTerminal);

input.addEventListener("focus", () => {

    setTimeout(() => {

        terminal.scrollTop = terminal.scrollHeight;

    }, 300);

});

const terminalWindow =
    document.getElementById("terminal-container");

const topBar =
    document.getElementById("topBar");

let dragging = false;

let offsetX = 0;

let offsetY = 0;

topBar.addEventListener("mousedown", (e) => {

    if (window.innerWidth < 900) return;

    dragging = true;

    offsetX = e.clientX - terminalWindow.offsetLeft;

    offsetY = e.clientY - terminalWindow.offsetTop;

});

document.addEventListener("mousemove", (e) => {

    if (!dragging) return;

    terminalWindow.style.position = "absolute";

    terminalWindow.style.left =
        e.clientX - offsetX + "px";

    terminalWindow.style.top =
        e.clientY - offsetY + "px";

});

document.addEventListener("mouseup", () => {

    dragging = false;

});

document
.getElementById("maxBtn")
.onclick=()=>{

    if(!document.fullscreenElement){

        document.documentElement.requestFullscreen();

    }

    else{

        document.exitFullscreen();

    }

};

document
.getElementById("minBtn")
.onclick=()=>{

    terminal.style.opacity=".2";

    setTimeout(()=>{

        terminal.style.opacity="1";

    },700);

};

document
.getElementById("closeBtn")
.onclick=()=>{

    document.body.classList.add("fade-out");

    setTimeout(()=>{

        location.href="index.html";

    },800);

};