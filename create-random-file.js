import fs from "node:fs";

const generateRandomCharacter = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
};

const chunkSize = 100000;
let chunkCount = 0;

const writeChunk = () => {
  let chunk = "";
  for (let i = 0; i < chunkSize; i++) {
    chunk += generateRandomCharacter();
  }
  chunkCount++;

  if (chunkCount % 100 === 0) {
    console.log(`Chunks written: ${chunkCount}`);
  }

  if (chunkCount < 5.3e8 / chunkSize) {
    fs.appendFile("random.txt", chunk, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        process.nextTick(writeChunk);
      }
    });
  } else {
    console.log("File write complete.");
  }
};

writeChunk();
