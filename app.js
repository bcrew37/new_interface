const express = require("express");
const hbs = require("hbs");
const app = express();

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/src/partials");
app.set("views", __dirname + "/src/partials");

app.use("", express.static(__dirname + "/src"));

// Urls + Render
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/boards", (req, res) => {
    res.render("index")
})
app.get("/files", (req, res) => {
    res.render("index")
})
app.get("/clPanel", (req, res) => {
    res.render("index")
})
app.get("/main", (req, res) => {
    res.render("main")
})
app.get("/signup", (req, res) => {
    res.render("signup")
})
app.get("/confirm", (req, res) => {
    res.render("confirm")
})
app.get("/econfig", (req, res) => {
    res.render("index")
})

// Get + Post
app.use("/test", (req, res) => {
    res.send([
        {
            name: "Lorem ipsum dolor sit emmet",
            extName: ".pdf",
            performer: "Lorem ipsum",
            taskCount: 2,
            date: "13.12.25",
            id: "12312d512512"
        },
        {
            name: "Lorem ipsum dolor sit emmet 2",
            extName: ".txt",
            performer: "Lorem ipsum",
            taskCount: 2,
            date: "13.12.25",
            id: "1231124124125162512512"
        },
        {
            name: "Lorem ipsum dolor sit emmet 3",
            extName: ".docx",
            performer: "Lorem ipsum",
            taskCount: 2,
            date: "13.12.25",
            id: "12312511241242512"
        },
        {
            name: "Lorem ipsum dolor sit emmet 3",
            extName: ".docx",
            performer: "Lorem ipsum",
            taskCount: 2,
            date: "13.12.25",
            id: "12312511241242512"
        },
        {
            name: "Lorem ipsum dolor sit emmet 3",
            extName: ".xlsx",
            performer: "Lorem ipsum",
            taskCount: 2,
            date: "13.12.25",
            id: "12312511241242512"
        },
        {
            name: "Lorem ipsum dolor sit emmet 3",
            extName: ".xml",
            performer: "Lorem ipsum",
            taskCount: 2,
            date: "13.12.25",
            id: "12312511241242512"
        },
        {
            name: "Lorem ipsum dolor sit emmet 3",
            extName: ".html",
            performer: "Lorem ipsum",
            taskCount: 2,
            date: "13.12.25",
            id: "12312511241242512"
        },
    ])
})
app.use("/notifications", (req, res) => {
    res.send({
        numOfNew: 4,
        list: [
            {
                performer: "Lorem ipsum dolor sit emmet",
                imgPath: "./img/avatars/Picture.png",
                title: "Lorem ipsum dolor sit amet Lorem, ipsum.",
                date: "13.12.2019",
            },
            {
                performer: "Lorem ipsum dolor sit emmet",
                imgPath: "./img/avatars/Picture.png",
                title: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum dolor.`,
                date: "13.12.2019",
                task: {
                    name: "Lorem ipsum",
                    id: "124125125"
                }
            },
            {
                performer: "Lorem ipsum dolor sit emmet",
                imgPath: "./img/avatars/Picture.png",
                title: "Lorem ipsum dolor sit amet Lorem, ipsum.",
                date: "13.12.2019",
                task: {
                    name: "Lorem ipsum",
                    id: "124125125"
                }
            },
            {
                performer: "Lorem ipsum dolor sit emmet",
                imgPath: "./img/avatars/Picture.png",
                title: "Lorem ipsum dolor sit amet Lorem, ipsum.",
                date: "13.12.2019",
                task: {
                    name: "Lorem ipsum",
                    id: "124125125"
                }
            },
        ]
    })
})
app.use("/todos", (req, res) => {
    res.send([
        {
            name: "Get started with madework.io",
            status: "inProgress",
            id: "12i01-1231232124124",
            manager: {
                name: "lorem ipsum dolor",
                imgPath: "./img/avatars/pexels-ralph-rabago-3214734.jpg"
            },
            controlDate: "12.05.2020",
            deadlineDate: "21.06.2020",
            performers: [
                {
                    name: "lorem ipsum dolor",
                    imgPath: "./img/avatars/pexels-frank-k-1820656.jpg"
                },
                {
                    name: "lorem ipsum dolor",
                    imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg"
                },
            ],
            files: [
                {
                    name: "Lorem ipsum dolor sit emmet 3",
                    extName: ".docx",
                    performer: "Lorem ipsum",
                    taskCount: 2,
                    date: "13.12.25",
                    id: "12312511241242512"
                }
            ],
            comments: [
                {
                    author: {
                        name: "lorem ipsum dolor",
                        imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg"
                    },
                    name: "lorem ipsum dolor sit emmet",
                    date: "13.02.2020"
                }
            ],
            reportFiles: [
                {
                    name: "Lorem ipsum dolor sit emmet 3",
                    extName: ".docx",
                    performer: "Lorem ipsum",
                    taskCount: 2,
                    date: "13.12.25",
                    id: "12312511241242512"
                }
            ]
        },
        {
            name: "Lorem ipsum dolor sit emmet ruro kru kra kre",
            status: "overdue",
            id: "adasdasd-1239123-asdm,asd",
            manager: {
                name: "lorem ipsum dolor",
                imgPath: "./img/avatars/pexels-frank-k-1820656.jpg"
            },
            controlDate: "12.05.2020",
            deadlineDate: "21.06.2020",
            performers: [
                {
                    name: "lorem ipsum dolor",
                    imgPath: "./img/avatars/pexels-frank-k-1820656.jpg"
                },
                {
                    name: "lorem ipsum dolor",
                    imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg"
                },
            ],
            files: [
                {
                    name: "Lorem ipsum dolor sit emmet 3",
                    extName: ".docx",
                    performer: "Lorem ipsum",
                    taskCount: 2,
                    date: "13.12.25",
                    id: "12312511241242512"
                }
            ],
            comments: [
                {
                    author: {
                        name: "lorem ipsum dolor",
                        imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg"
                    },
                    name: "lorem ipsum dolor sit emmet",
                    date: "13.02.2020"
                }
            ],
            reportFiles: [
                {
                    name: "Lorem ipsum dolor sit emmet 3",
                    extName: ".docx",
                    performer: "Lorem ipsum",
                    taskCount: 2,
                    date: "13.12.25",
                    id: "12312511241242512"
                }
            ]
        },
        {
            name: "Lorem ipsum dolor sit",
            status: "completed",
            id: "231251714o1-0241314",
            manager: {
                name: "lorem ipsum dolor",
                imgPath: "./img/avatars/pexels-frank-k-1820656.jpg"
            },
            controlDate: "12.05.2020",
            deadlineDate: "21.06.2020",
            performers: [
                {
                    name: "lorem ipsum dolor",
                    imgPath: "./img/avatars/pexels-frank-k-1820656.jpg"
                },
                {
                    name: "lorem ipsum dolor",
                    imgPath: "./img/avatars/Picture.png"
                },
                {
                    name: "lorem ipsum dolor",
                    imgPath: "./img/avatars/pexels-ralph-rabago-3214734.jpg"
                },
                {
                    name: "lorem ipsum dolor",
                    imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg"
                },
                {
                    name: "lorem ipsum dolor",
                    imgPath: "./img/services/pexels-guilherme-almeida-1858175.jpg"
                },
                {
                    name: "lorem ipsum dolor",
                    imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg"
                },
                {
                    name: "lorem ipsum dolor",
                    imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg"
                },
            ],
            files: [
                {
                    name: "Lorem ipsum dolor sit emmet 3",
                    extName: ".docx",
                    performer: "Lorem ipsum",
                    taskCount: 2,
                    date: "13.12.25",
                    id: "12312511241242512"
                }
            ],
            comments: [
                {
                    author: {
                        firstName: "Lorem",
                        lastName: "Ipsum",
                        imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg"
                    },
                    name: "lorem ipsum dolor sit emmet",
                    date: "13.02.2020"
                }
            ]
        }
    ])
})
app.use("/_todos", (req, res) => {
    res.send({
        name: "Get started with madework.io",
        status: "inProgress",
        id: "12i01-1231232124124",
        manager: {
            firstName: "Archer",
            lastName: "Monpasie",
            imgPath: "./img/avatars/pexels-ralph-rabago-3214734.jpg"
        },
        controlDate: "12.05.2020",
        deadlineDate: "21.06.2020",
        performers: [
            {
                imgPath: "./img/avatars/Picture.png",
                name: "Сергей брин",
                id: "1"
            },
            {
                imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg",
                name: "Лари Пейдж",
                id: "2"
            }
        ],
        files: [
            {
                name: "Lorem ipsum dolor sit emmet 3",
                extName: ".docx",
                performer: "Lorem ipsum",
                taskCount: 2,
                date: "13.12.25",
                id: "123125142512"
            },
            {
                name: "Lorem ipsum dolor sit emmet 3",
                extName: ".png",
                performer: "Lorem ipsum",
                taskCount: 2,
                date: "13.12.25",
                id: "2312310123941"
            },
        ],
        comments: [
            {
                author: {
                    name: "Arndry Gush",
                    imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg"
                },
                text: "lorem ipsum dolor sit emmet",
                date: "13.02.2020",
                id: "12930192"
            }
        ],
        reportFiles: [
            {
                name: "Lorem ipsum dolor sit emmet 3",
                extName: ".docx",
                performer: "Lorem ipsum",
                taskCount: 2,
                date: "13.12.25",
                id: "12312513111222241242512"
            }
        ],
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, aspernatur? Tempora quod deserunt nemo quas impedit et temporibus ullam, tempore illum doloremque fuga inventore ea asperiores ipsa, dolorum, sapiente reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, aspernatur? Tempora quod deserunt nemo quas impedit et temporibus ullam, tempore illum doloremque fuga inventore ea asperiores ipsa, dolorum, sapiente reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, aspernatur? Tempora quod deserunt nemo quas impedit et temporibus ullam, tempore illum doloremque fuga inventore ea asperiores ipsa, dolorum, sapiente reprehenderit.`
    })
})
app.use("/pList", (req, res) => {
    res.send([
        {
            imgPath: "./img/avatars/pexels-ralph-rabago-3214734.jpg",
            name: "Сергей Пейдж",
            id: "3;askd;l",
            department: {
                name: "main",
                id: 2
            },
            registrationDate: "13.02.2020",
            role: ["Manager"],
        },
        {
            imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg",
            name: "Лари Пейдж",
            id: "2",
            department: {
                name: "main",
                id: 2
            },
            email: "buninmisha1809@gmail.com",
            registrationDate: "13.02.2020",
            role: ["Manager"],
        },
        {
            imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg",
            name: "Лари Пейдж",
            id: "8",
            department: {
                name: "main",
                id: 2
            },
            email: "buninmisha1809@gmail.com",
            registrationDate: "13.02.2020",
            role: ["Manager"],
        },
        {
            imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg",
            name: "Лари Пейдж",
            id: "9",
            department: {
                name: "Alex",
                id: 4
            },
            email: "buninmisha1809@gmail.com",
            registrationDate: "13.02.2020",
            role: ["Manager"],
        },
        {
            imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg",
            name: "Лари Пейдж",
            id: "10",
            department: {
                name: "main",
                id: 2
            },
            registrationDate: "13.02.2020",
            role: ["Manager"],
        },
        {
            imgPath: "./img/avatars/Picture.png",
            name: "Сергей брин",
            id: "1",
            department: {
                name: "main",
                id: 2
            },
            email: "buninmisha1809@gmail.com",
            registrationDate: "13.02.2020",
            role: ["Manager"],
        },
        {
            imgPath: "./img/avatars/pexels-frank-k-1820656.jpg",
            name: "Карло Магистрале",
            id: "4",
            email: "buninmisha1809@gmail.com",
            registrationDate: "13.02.2020",
            role: ["Manager"],
        },
    ])
})
app.use("/try", (req, res) => {
    res.send({
        success: true,
        msg: "blab labl"
    })
})
app.use("/myinfo", (req, res) => {
    res.send({
        name: "John Liberty Jostery",
        email: "Joster1998@gmail.com",
        imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg",
        role: ["gmanager"],
        success: true
    })
})
app.use("/departments", (req, res) => {
    res.send([
        {
            name: "Joseph",
            id: 1
        },
        {
            name: "main",
            id: 2
        },
        {
            name: "SEO",
            id: 3
        },
        {
            name: "Alex",
            id: 4
        },
        {
            name: "Denny",
            id: 5
        },
    ])
})
app.use("/enterprises", (req, res) => {
    res.send([{
        name: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, laudantium? 1",
        id: 1,
        performers: 10,
        tariff: "free",
        space: {
            used: "1.2Gb",
            max: "10"
        },
        date: "12.10.2020"
    },
    {
        name: "Enterprise 2",
        id: 2,
        performers: 15,
        tariff: "standart",
        space: {
            used: "16.2Gb",
            max: "50"
        },
        date: "12.10.2020",
        active: true
    },
    {
        name: "Enterprise 3",
        id: 3,
        performers: 2,
        tariff: "unlimited",
        space: {
            used: "10Gb",
            max: "100"
        },
        date: "12.10.2020"
    }

    ])
})

app.listen(3000, () => {
    console.log("Server has been started...");
});
