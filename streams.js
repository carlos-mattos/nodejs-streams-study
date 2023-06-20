import fs from "node:fs";
import { Transform } from "node:stream";

const start = process.hrtime();

const readStream = fs.createReadStream("random.txt");

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const transformedData = chunk.toString().toUpperCase();
    this.push(transformedData);
    callback();
  },
});

const writeStream = fs.createWriteStream("output.txt");

readStream.pipe(transformStream).pipe(writeStream);

writeStream.on("finish", () => {
  const end = process.hrtime(start);
  console.log(`Stream Execution Time: ${end[0]}s ${end[1] / 1000000}ms`);

  const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`Stream Memory Usage: ${memoryUsage.toFixed(2)} MB`);
});
