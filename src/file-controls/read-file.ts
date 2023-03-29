import fs, { ReadStream } from "fs";
import readline, { Interface } from "readline";

function createSafeReadStream(filename: string): Promise<ReadStream> {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filename);
    fileStream.on("error", reject).on("open", () => {
      resolve(fileStream);
    });
  });
}
async function openReadFileInterface(filename: string): Promise<Interface> {
  const fileStream = await createSafeReadStream(filename);
  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
}
export default openReadFileInterface;
