import fs from 'node:fs';

export function readLMT(path: string)
{
  const data = fs.readFileSync(path);

    const headerLength = data.readInt16LE();
    if (headerLength != 10)
    {
      throw new Error("Invalid header length");
    }
    let headerData = ""; 
    for (let headerIndex = 0; headerIndex < 10; headerIndex++)
    {
      headerData += String.fromCharCode(data.readInt16LE(headerIndex + 1));
    }
    if (headerData != "LcfMapTree")
    {
      throw new Error('Invalid header');
  }
  // TODO: make sure value is actually right 
    const treeDepth = data.readInt16LE(11); 
    return treeDepth.toString(); 
}