import fs from "node:fs";

const start = process.hrtime();

const data = fs.readFileSync('random.txt', 'utf8');

const transformedData = data.toUpperCase();

fs.writeFileSync('output.txt', transformedData);

const end = process.hrtime(start);
console.log(`Synchronous Execution Time: ${end[0]}s ${end[1] / 1000000}ms`);

const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`Synchronous Memory Usage: ${memoryUsage.toFixed(2)} MB`);
