import PostModel from "../models/Post.js";
import * as utils from "../utils/common.js";

export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,

      user: req.userId,
    })

    const post = await doc.save();

    res.json(post)
  } catch (err) {
    console.log(err);
    res.status(500).json(utils.getErrorResponse("error_create_post_server", err))
  }
}