import { nanoid } from "nanoid";
import { addUrlMapping, getLongUrl } from "../model/urlModel.js";

const isUrlValid = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const createShortUrl = (req, res) => {
  const urlToShort = req.body.longUrl;

  if (isUrlValid(urlToShort)) {
    const short = nanoid(8);
    addUrlMapping(short, urlToShort);
    res.json({
      success: true,
      shortUrl: `https://url-shortner-backend-4esc.onrender.com/${short}`,
    });
  } else {
    res.json({
      success: false,
      message: "Bhai url galat hai, sachi url dal :)",
    });
  }
};

export const redirectToLongUrl = (req, res) => {
  const shortUrl = req.params.shortUrl;
  const longUrl = getLongUrl(shortUrl);

  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).json("URL not found");
  }
};
