const EventEmitter = require("events");

class MyEventEmitter extends EventEmitter { }

let eventEmitter = new MyEventEmitter();

eventEmitter.on("event", () => console.log("Event fired!"));
eventEmitter.emit("event");
eventEmitter.emit("event");
eventEmitter.emit("event");
eventEmitter.emit("event");