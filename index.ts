let handler = function () {
    console.log(123);
};

let anotherHandler = function (payload: {key: string}) {
    console.log(payload.key);
}

import EventEmitter from "./EventEmitter";

let myEventEmitter = new EventEmitter();

myEventEmitter.on('start', handler);
myEventEmitter.on('start', anotherHandler);

myEventEmitter.emit('start', {key : 'test'});

myEventEmitter.removeListener('start', anotherHandler)

myEventEmitter.emit('start');
