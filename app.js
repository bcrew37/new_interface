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
        {
            name: "Lorem ipsum dolor sit emmet 3",
            extName: ".jpg",
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
    res.send({
        page: 1,
        list: [
            {
                name: "kakashi",
                status: "inProgress",
                id: "12i01-2124124",
                manager: {
                    firstName: "Yura",
                    lastName: "Kizary",
                    imgPath: "./img/avatars/pexels-ralph-rabago-3214734.jpg"
                }
            },
            {
                name: "Lorem ipsum dolor sit emmet ruro kru kra kre",
                status: "overdue",
                id: "231251731241102312930912412414",
                manager: {
                    firstName: "Leha",
                    lastName: "Jeltiy",
                    imgPath: "./img/avatars/pexels-frank-k-1820656.jpg"
                }
            },
            {
                name: "Lorem ipsum dolor sit",
                status: "completed",
                id: "231251714o1-0241314",
                manager: {
                    firstName: "Uraburatrala",
                    lastName: "Hirasimakongoshitiro",
                    imgPath: "./img/avatars/pexels-frank-k-1820656.jpg"
                }
            }
        ]
    })
})
app.use("/pList", (req, res) => {
    res.send([
        {
            imgPath: "./img/avatars/Picture.png",
            name: "Сергей брин",
            id: "1"
        },
        {
            imgPath: "./img/avatars/pexels-christina-morillo-1181690.jpg",
            name: "Лари Пейдж",
            id: "2"
        },
        {
            imgPath: "./img/avatars/pexels-ralph-rabago-3214734.jpg",
            name: "Сергей Пейдж",
            id: "3;askd;l"
        },
        {
            imgPath: "./img/avatars/pexels-frank-k-1820656.jpg",
            name: "Карло Магистрале",
            id: "4"
        },
    ])
})

app.listen(3000, () => {
    console.log("Server has been started...");
});
