import PostModel from "../models/Post.js";
import * as utils from "../utils/common.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(utils.getErrorResponse("error_posts_get_all", err))
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
  
    let post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 }
      },
      {
        returnDocument: 'after'
      },
    );

    if (!post) {
      return res.status(404).json(utils.getResponse("error_posts_get_one"))
    }

    res.json(post);
  } catch (err) {
    // console.log(err);
    res.status(500).json(utils.getErrorResponse("error_posts_get_one"))
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.findOneAndDelete({
      _id: postId,
    })

    console.log('remove', postId)
    res.json({success: true});
  } catch (err) {
    console.log('remove', err)
    res.status(500).json(utils.getErrorResponse("error_posts_remove_one"))
  }
}

export const create = async (req, res) => {
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
    res.status(500).json(utils.getErrorResponse("error_posts_create_post", err))
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    let result = await PostModel.updateOne({
      _id: postId,
    }, {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,

      user: req.userId,
    })

    result.matchedCount ? res.json({success: true}) : res.status(404).json(utils.getErrorResponse("error_posts_update_one"));
  } catch (err) {
    console.log('remove', err)
    res.status(500).json(utils.getErrorResponse("error_posts_update_one"))
  }
}