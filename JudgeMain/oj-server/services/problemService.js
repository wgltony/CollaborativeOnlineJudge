/*var problems = [
        {
            "id":1,
            "name":"Two Sum",
            "desc": 'Given an array of integers, find two numbers such that they add up to a specific target number.' +
            'The function twoSum should return indices of the two numbers such that they add up to the target,',
            "difficulty": 'easy'
        }, {
            "id":2,
            "name":"Three Sum",
            "desc": 'Given an array of integers, find two numbers such that they add up to a specific target number.' +
            'The function twoSum should return indices of the two numbers such that they add up to the target,',
            "difficulty": 'medium'
        }, {
            "id":3,
            "name":"Four Sum",
            "desc": 'Given an array of integers, find two numbers such that they add up to a specific target number.' +
            'The function twoSum should return indices of the two numbers such that they add up to the target,',
            "difficulty": 'hard'
        }, {
            "id":4,
            "name":"N Sum",
            "desc": 'Given an array of integers, find two numbers such that they add up to a specific target number.' +
            'The function twoSum should return indices of the two numbers such that they add up to the target,',
            "difficulty": 'super'
        }
    ];*/ //local data
    var bodyParser = require("body-parser");
    var jsonParser = bodyParser.json();
var ProblemModel = require("../models/problemModel");

var getProblems = function() {
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, function(err, problems) {
            if (err) {
                reject(err);
            } else {
                resolve(problems);
            }
        });
    });
}

var getProblem = function(id) {
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({
            "id": id
        }, function(err, problem) {
            if (err) {
                reject(err);
            } else {
                resolve(problem);
            }
        });
    });
}


var addProblem = function(newProblem) {
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({  //find -> problem[0]   findOne -> problem
            "name": newProblem.name
        }, function(err, problem) {
            if (problem) {
                reject(err);
                console.log("Problem already exist!");
            } else {
                ProblemModel.count({}, function(err, num) {
                    newProblem.id = num + 1;
                    var mongoProblem = new ProblemModel(newProblem);
                    mongoProblem.save();
                    resolve(newProblem);
                });
            }
        });
    })
}



module.exports = {
    getProblems,
    getProblem,
    addProblem
}
