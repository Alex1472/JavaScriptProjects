const EventEmitter = require("events");
const uuid = require("uuid");

class Logger extends EventEmitter {
    log(msg) {
        this.emit("messege", { id: uuid.v4(), msg });
    }
}

module.exports = Logger;