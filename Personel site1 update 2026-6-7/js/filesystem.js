/*
=========================================
Virtual File System
=========================================
*/

const fileSystem = {

    "/":{

        type:"dir",

        children:{

            "home":{

                type:"dir",

                children:{

                    "sadra":{

                        type:"dir",

                        children:{

                            "about.txt":{

                                type:"file",

                                content:
`Sadra Developer

Backend Developer

AI Enthusiast

Cybersecurity Learner

Working on Backend Projects.`

                            },

                            "goals.txt":{

                                type:"file",

                                content:
`Goals

✔ Master Python

✔ Backend

✔ AI

✔ Cybersecurity

⬜ Open Source

⬜ UK

⬜ Big Tech`

                            },

                            "skills.txt":{

                                type:"file",

                                content:
PROFILE.skills.join("\n")

                            },

                            "contact.txt":{

                                type:"file",

                                content:
`GitHub
${PROFILE.socials.github}

Telegram
${PROFILE.socials.telegram}

Email
${PROFILE.socials.email}`

                            },

                            "projects":{

                                type:"dir",

                                children:{

                                    "portfolio.txt":{

                                        type:"file",

                                        content:
"Personal Portfolio Website"

                                    },

                                    "password-manager.txt":{

                                        type:"file",

                                        content:
"Python Password Manager"

                                    },

                                    "telegram-bot.txt":{

                                        type:"file",

                                        content:
"Telegram Bot"

                                    }

                                }

                            }

                        }

                    }

                }

            }

        }

    }

};

let currentPath=[
"/",
"home",
"sadra"
];