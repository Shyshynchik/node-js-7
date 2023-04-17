import {clearInterval} from "timers";

const fs = require('fs');

const DEFAULT_FILES_PATH = 'files/';

let readStream = fs.createReadStream(DEFAULT_FILES_PATH + 'test.txt', { highWaterMark: 2 });

const readTwoBytes = function () {
    const chunk = readStream.read();

    if (chunk !== null) {
        console.log(chunk.toString());
    }
};
readStream.on('readable', () => {
    setInterval(readTwoBytes, 1000);
});

readStream.on('end', () => {
    console.log("End of file");
});
process.stdin.setEncoding('utf-8')

let data: string;
let readData: string = '';
let fsStream = fs.createWriteStream(DEFAULT_FILES_PATH + 'input.txt', {flags: 'a'});
process.stdin.on('readable', (data) => {
    const intervalId = setInterval(() => {
        data = process.stdin.read(4);
        if (!data) {
            clearInterval(intervalId);
            return;
        }
        readData += data;

        if (Buffer.byteLength(readData, 'utf8') === 8) {
            fsStream.write(readData);
            readData = '';
        }
    }, 100);
});