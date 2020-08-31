const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.use(express.static('uploads'))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

const PORT = process.env.PORT || 4000;

app.post('/images/upload/', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "No File to Upload"
            });
        } else {
            let data = [];
            let komID = 10; //Get id of last Comment send to db
            let eID = 1020; //Get id of event from Comment ID

            _.forEach(
                _.keysIn(req.files.uploaded), key => {
                    let img = req.files.uploaded[key];

                    img.mv("./uploads/" + eID + "/comment" + komID + "/" + img.name);

                    data.push({
                        name: img.name,
                        mimetype: img.mimetype,
                        size: img.size
                    });
                }
            );
            res.redirect(301, "http://localhost:3000/events/" + eID);
        }
    } catch (err) {
        console.log(err);
    }
});

app.get("/images", async (req, res) => {

    filewalker(req.query.path, (err, success) => {
        if (err) {
            res.status(500).send(err);
        }

        res.send({
            status: true,
            message: "Success",
            data: success
        });
    });
});

app.listen(PORT, () => {
    console.log("App is Running on " + PORT);
});

const fs = require('fs');

function filewalker(dir, done) {
    let results = [];

    fs.readdir(dir, function (err, list) {
        if (err) return done(err);

        var pending = list.length;

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
                    results.push(file);

                    if (!--pending) done(null, results);
                }
            });
        });
    });
};