let redis = require('redis');
let client = redis.createClient();

let set = (key, value, callback) => {
    client.set(key, value, (err, res) => {
        if (err) {
                console.log(err);
                return;
            }
            callback(res);
    });
};


let get = (key, callback) => {
    client.get(key, (err, res) => {
        if (err) {
                console.log(err);
                return;
            }
            callback(res);
    })
};

let expire = (key, timeInSeconds) => {
    client.expire(key, timeInSeconds);
};


let quit = () => client.quit();


module.exports = {
    get,
    set,
    expire,
    quit,
    redisPrint: redis.print
};