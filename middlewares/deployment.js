const express = require("express");
const path = require("path");

//send the react html if url not for api or images

module.exports = (req, res, next) => {
  let url = req.originalUrl;
  if (url.startsWith("/uploads")) {
    let file = url.slice(16);
    res.sendFile(path.resolve(__dirname, "uploads", "images", file));
    return;
  } else if (!url.startsWith("/api/")) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    return;
  }
  next();
};
