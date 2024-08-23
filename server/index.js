const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const _ = require("lodash");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const https = require("https");

const baseURL = "http://okay-ybbs.at:3000";
const baseImage = "http://okay-ybbs.at:4000";

const app = express();

app.use(
    fileUpload({
        createParentPath: true,
    }),
);

app.use(express.static(__dirname + "/uploads"));

let whitelist = [
    "http://okay-ybbs.at",
    "http://www.okay-ybbs.at",
    "http://server.okay-ybbs.at",
];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    }),
);

app.use(
    cors({
        origin: "*",
    }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));

const PORT = 4000;

//Upload Event Images sorted by Comment
app.post("/images/upload/events/", async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "No File to Upload",
            });
        } else {
            let data = [];

            let req2 = await axios.get(baseURL + "/kommentare");
            let komId = req2.data.komId;

            req2 = await axios.get(baseURL + "/kommentare/getEvent/" + komId);
            let eID = req2.data.oaId;

            if (req.files != {}) {
                _.forEach(_.keysIn(req.files), (key) => {
                    let img = req.files[key];

                    let dir =
                        "./uploads/events/" + eID + "/comment" + komId;

                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                    }

                    img.mv(dir + "/" + img.name);

                    data.push({
                        name: img.name,
                        mimetype: img.mimetype,
                        size: img.size,
                    });
                });
            }

            await axios.put(baseURL + "/kommentar", {
                komId: komId,
                bilder_path:
                    baseImage + "/images?path=uploads/events/" + eID + "/comment" + komId,
            });

            res.send(data);
        }
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

app.post("/images/upload/projects/", async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "No File to Upload",
            });
        } else {
            let data = [];
            let pId = req.query.id; //Get id from GET Parameter id

            _.forEach(_.keysIn(req.files.uploaded), (key) => {
                let img = req.files.uploaded[key];

                img.mv("./uploads/projects/" + pId + img.name);

                data.push({
                    name: img.name,
                    mimetype: img.mimetype,
                    size: img.size,
                });
            });
        }
    } catch (err) {
        console.log(err);
    }
});

//Upload News Images
app.post("/images/upload/news/", async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "No File to Upload",
            });
        } else {
            let data = [];
            let ID = req.query.id; //Get id from News

            _.forEach(_.keysIn(req.files.uploaded), (key) => {
                let img = req.files.uploaded[key];

                img.mv("./uploads/news/" + ID + "/" + img.name);

                data.push({
                    name: img.name,
                    mimetype: img.mimetype,
                    size: img.size,
                });
            });
        }
    } catch (err) {
        console.log(err);
    }
});

//Upload Product Images
app.post("/images/upload/products/", async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "No File to Upload",
            });
        } else {
            let data = [];
            let ID = req.query.id; //Get id from GET Parameter

            _.forEach(_.keysIn(req.files.uploaded), (key) => {
                let img = req.files.uploaded[key];

                img.mv("./uploads/products/" + ID + "/" + img.name);

                data.push({
                    name: img.name,
                    mimetype: img.mimetype,
                    size: img.size,
                });
            });
        }
    } catch (err) {
        console.log(err);
    }
});

//Upload Product Images
app.post("/images/upload/mitglied/", async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "No File to Upload",
            });
        } else {
            let data = [];
            let ID = req.query.id; //Get id from GET Parameter

            _.forEach(_.keysIn(req.files.uploaded), (key) => {
                let img = req.files.uploaded[key];

                if (img.name.contains("portrait")) {
                    img.mv("./uploads/mitglied/" + ID + "/" + img.name);
                } else {
                    //TODO: Rename image to portrait.fileEnding ...
                }

                data.push({
                    name: img.name,
                    mimetype: img.mimetype,
                    size: img.size,
                });
            });
            res.redirect(301, "http://localhost:3000/products/" + ID);
        }
    } catch (err) {
        console.log(err);
    }
});

// Get Images in Folder and Subfolders
app.get("/images", async (req, res) => {
    filewalker(__dirname + "/" + req.query.path, (err, success) => {
        if (err) {
            res.status(404);
            console.log(err);
        }

        res.send({
            status: true,
            message: "Success",
            data: success,
        });
    });
});

app.listen(PORT, () => {
    console.log("App is Running on " + PORT);
});

function filewalker(dir, done) {
    let results = [];

    fs.readdir(dir, function (err, list) {
        if (err) return done(err);

        let pending = list.length;

        if (!pending) return done(null, results);

        list.forEach(function (file) {
            file = dir + "/" + file;

            fs.stat(file, function (err, stat) {
                // If directory, execute a recursive call
                if (stat && stat.isDirectory()) {
                    // Add directory to array [comment if you need to remove the directories from the array]
                    //results.push(file);

                    filewalker(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(path.relative(process.cwd(), file).replace("\\", "/"));

                    if (!--pending) done(null, results);
                }
            });
        });
    });
}
