let express = require("express");
let router = express.Router();
let problemService = require("../services/problemService");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

let node_rest_client = require('node-rest-client').Client;

let rest_client = new node_rest_client();

EXECUTOR_SERVER_URL = 'http://executor/build_and_run';

rest_client.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');

router.get("/problems", function (req, res) {
    problemService.getProblems()
        .then(problems => res.json(problems));
});

router.get("/problems/:id", function (req, res) {
    var id = req.params.id;
    console.log(`problem ID: ${id}`);
    problemService.getProblem(+id)
        .then(problem => res.json(problem));
    //console.log("problem ID: "+ id);
});

router.post("/problems", jsonParser, function (req, res) {
    problemService.addProblem(req.body)
        .then(function (problem) {
            res.json(problem);
        }, function (err) {
            console.log(err);
            res.status(400).send(err);
        });
});

router.post("/build_and_run", jsonParser, function (req, res) {
    const userCode = req.body.user_code;
    const lang = req.body.lang;

    console.log(lang + ": " + userCode);
    rest_client.methods.build_and_run(
        {
            data: {
                code: userCode,
                lang: lang
            },
            headers: {
                "Content-Type": "application/json"
            }
        }, (data, response) => {
            console.log("Receive data from server" + response);
            const text = `Build output : ${data['build']}
                Execute output: ${data['run']}`;

            data['text'] = text;
            res.json(data);
        }
    )
})


module.exports = router;
