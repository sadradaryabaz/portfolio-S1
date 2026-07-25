function help() {

    print(`

Available Commands

help

whoami

about

skills

status

learning

social

pwd

mission

ls

cd

cat

echo

history

date

time

quote

neofetch

fortune

coffee

exit

joke

home

Return to Portfolio

sudo

hack

matrix

scan

banner

weather

clear

`);

}

function whoami() {

    print(`

Name : ${PROFILE.name}

Role : ${PROFILE.role}

Status : ${PROFILE.status}

`);

}

function about() {

    print(`

I'm currently working on backend projects.

I'm interested in

• Backend Development

• Artificial Intelligence

• Cybersecurity

Goal:

Become one of the world's best software engineers and work in a leading UK tech company.

`);

}

function skills() {

    let txt = "";

    PROFILE.skills.forEach(skill => {

        txt += "• " + skill + "\n";

    });

    print(txt);

}

function status() {

    print(`

Current Status

Learning

Current Focus

Backend

AI

Cybersecurity

`);

}

function learning() {

    print(`

Currently Learning

Artificial Intelligence

Machine Learning

Backend Architecture

Linux

Docker

`);

}

function social() {

    print(`

GitHub

${PROFILE.socials.github}

Telegram

${PROFILE.socials.telegram}

Email

${PROFILE.socials.email}

`);

}

function pwd() {

    print(

        currentPath.join("/").replace("//", "/")

    );

}

function ls() {

    let dir = fileSystem["/"];

    for (let i = 1; i < currentPath.length; i++) {

        dir = dir.children[currentPath[i]];

    }

    let output = "";

    Object.keys(dir.children).forEach(item => {

        output += item + "\n";

    });

    print(output);

}

function cat(filename) {

    let dir = fileSystem["/"];

    for (let i = 1; i < currentPath.length; i++) {

        dir = dir.children[currentPath[i]];

    }

    if (!dir.children[filename]) {

        print("File not found.");

        return;

    }

    let file = dir.children[filename];

    if (file.type != "file") {

        print("Not a file.");

        return;

    }

    print(file.content);

}

function cd(folder) {

    if (folder == "..") {

        if (currentPath.length > 2) {

            currentPath.pop();

        }

        return;

    }

    let dir = fileSystem["/"];

    for (let i = 1; i < currentPath.length; i++) {

        dir = dir.children[currentPath[i]];

    }

    if (!dir.children[folder]) {

        print("Directory not found.");

        return;

    }

    if (dir.children[folder].type != "dir") {

        print("Not a directory.");

        return;

    }

    currentPath.push(folder);

}

function neofetch() {

    print(`

        .....
     .';:cccc:;,.
   .;cccccccccccc;.
  :cccccccccccccccc:
  cccccccccccccccccc
  cccccccccccccccccc
  :cccccccccccccccc:
   .;cccccccccccc;.
      ';:cccc:;'

────────────────────────────────

User      : Sadra Developer

OS        : Kali Linux Portfolio

Kernel    : JavaScript 1.0

Shell     : portfolio-terminal

Host      : Personal Portfolio

Language  : JavaScript

Backend   : Python

AI        : Learning

Security  : Learning

Editor    : VS Code

Theme     : Kali Dark

Status    : Learning

Mission   : Become a Software Engineer

────────────────────────────────

`);

}

const jokes = [

    "There are only 10 types of people. Those who understand binary and those who don't.",

    "Programmer: A machine that turns coffee into code.",

    "99 little bugs in the code... fix one... 127 bugs in the code.",

    "Hello World is where every journey begins."

];

function joke() {

    const random = Math.floor(Math.random() * jokes.length);

    print(jokes[random]);

}

function coffee() {

    print(`

Brewing coffee...

██████░░░░░░

██████████░░

████████████

☕

Coffee Ready!

`);

}

const fortunes = [

    "Never stop learning.",

    "Every bug teaches something new.",

    "Great developers build every day.",

    "Stay curious.",

    "Code. Learn. Repeat.",

    "Dream Big.",

    "AI is the future."

];

function fortune() {

    const random = Math.floor(Math.random() * fortunes.length);

    print(fortunes[random]);

}

function sudo() {

    print(`

Permission denied.

Nice try 😎

`);

}

function hack() {

    const lines = [

        "[+] Initializing...",
        "",
        "[+] Connecting to target...",
        "[+] Connection Established",
        "",
        "[+] Collecting Information...",
        "[+] Host: 192.168.1.15",
        "[+] Operating System: Linux",
        "[+] Open Ports:",
        "    22",
        "    80",
        "    443",
        "    3306",
        "",
        "[+] Reading SSH Keys...",
        "[+] Searching Passwords...",
        "",
        "████░░░░░░░░░░░ 10%",
        "████████░░░░░░ 40%",
        "████████████░░ 75%",
        "██████████████ 100%",
        "",
        "[+] Uploading Payload...",
        "[+] Executing...",
        "",
        "[!] FIREWALL DETECTED",
        "",
        "[!] ACCESS DENIED",
        "",
        "Mission Failed."
    ];

    let i = 0;

    function next() {

        if (i >= lines.length) {

            return;

        }

        print(lines[i]);

        i++;

        setTimeout(next, 350);

    }

    next();

}

function scan() {

    const ports = [

        20,
        21,
        22,
        23,
        25,
        53,
        80,
        110,
        143,
        443,
        8080

    ];

    print("Scanning...");

    let i = 0;

    let timer = setInterval(() => {

        if (i >= ports.length) {

            clearInterval(timer);

            print("");
            print("Scan Finished.");

            return;

        }

        print("Port " + ports[i] + " OPEN");

        i++;

    }, 250);

}

function banner() {

    print(`

███████╗ █████╗ ██████╗ ██████╗  █████╗
██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗
███████╗███████║██║  ██║██████╔╝███████║
╚════██║██╔══██║██║  ██║██╔══██╗██╔══██║
███████║██║  ██║██████╔╝██║  ██║██║  ██║
╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝

Sadra Terminal

`);

}

function weather() {

    print(`

Weather

Location : Unknown

Temperature : 22°C

Humidity : 48%

Wind : 6 km/h

Status : Sunny

`);

}

function mission() {

    print(`

========================

MISSION

========================

Become one of the best

Software Engineers

Specialize in

✔ Backend

✔ AI

✔ Cybersecurity

Destination

United Kingdom 🇬🇧

Status

IN PROGRESS

========================

`);

}

function quote() {

    const quotes = [

        "Code Never Lies.",

        "Stay Hungry. Stay Foolish.",

        "Never Stop Learning.",

        "Talk Is Cheap. Show Me The Code.",

        "Dream Big.",

        "Build Something Amazing.",

        "The Best Error Message Is The One That Never Shows Up."

    ];

    print(

        quotes[Math.floor(Math.random() * quotes.length)]

    );

}


function home() {

    print("");

    print("Leaving terminal...");

    print("Returning to Portfolio...");

    setTimeout(() => {

        window.location.href = "index.html";

    }, 1500);

}

function exitTerminal() {

    print("");

    print("Saving session...");

    print("Closing terminal...");

    print("");

    setTimeout(() => {

        window.location.href = "index.html";

    }, 1800);

}

function exitTerminal(){

    print("");

    print("[ OK ] Saving session...");

    print("[ OK ] Closing terminal...");

    document.body.classList.add("fade-out");

    setTimeout(()=>{

        window.location.href="index.html";

    },800);

}


function homeTerminal() {

    print("");

    print("Saving session...");

    print("Closing terminal...");

    print("");

    setTimeout(() => {

        window.location.href = "index.html";

    }, 1800);

}

function homeTerminal(){

    print("");

    print("[ OK ] Saving session...");

    print("[ OK ] Closing terminal...");

    document.body.classList.add("fade-out");

    setTimeout(()=>{

        window.location.href="index.html";

    },800);
}