import express from "express";
import emojiService from "./service.js";

const route = express.Router();
export default route;

route.get("/", (req, res) => {
  res.send(emojiService.getAllEmojis());
});

route.get("/:category/:name", (req, res) => {
  res.send(emojiService.getEmojiByName(req.params.name, req.params.category));
});

route.get("/:category", (req, res) => {
  res.send(emojiService.getEmojisByCategory(req.params.category));
});