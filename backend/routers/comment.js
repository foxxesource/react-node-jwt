import { Router } from "express";
import Comment from "../models/comments-model.js";
import Post from "../models/posts-model.js";

const router = Router({ mergeParams: true });

// GET comments for a post (with pagination)
router.get("/", async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const postId = req.params.postId;

    const limit = parseInt(pageSize);
    const skip = (parseInt(page) - 1) * limit;

    const [comments, totalCount] = await Promise.all([
      Comment.find({ post: postId })
        .populate('author', 'username')
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip(skip)
        .limit(limit)
        .lean(), // Convert to plain JavaScript objects
      Comment.countDocuments({ post: postId }),
    ]);

    // Ensure all comments have proper timestamps
    const commentsWithTimestamps = comments.map((comment) => ({
      ...comment,
      createdAt: comment.createdAt || new Date(), // Fallback to current time if missing
      updatedAt: comment.updatedAt || new Date(),
    }));

    res.json({
      comments: commentsWithTimestamps,
      totalCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST add a new comment
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.postId;
    const userId = req.user?._id;

    if (!content || typeof content !== "string") {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const newComment = new Comment({ content, post: postId, author: userId });
    const savedComment = await newComment.save();

    // Populate the author field before sending the response
    const populatedComment = await Comment.findById(savedComment._id)
      .populate('author', 'username')
      .lean();

    // Update the post's comments array
    await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: savedComment._id } },
      { new: true }
    );

    res.status(201).json(populatedComment); // Send the populated comment
  } catch (err) {
    res.status(400).json({
      message: "Error creating comment",
      error: err.message,
    });
  }
});

export default router;
