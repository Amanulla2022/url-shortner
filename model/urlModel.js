import fs from "fs";

const filePath = "./urlMap.json";

export const readUrlData = () => {
  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const writeUrlData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
};

export const addUrlMapping = (shortUrl, longUrl) => {
  const data = readUrlData();
  data[shortUrl] = longUrl;
  writeUrlData(data);
};

export const getLongUrl = (shortUrl) => {
  const data = readUrlData();
  return data[shortUrl];
};
