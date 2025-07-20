import mongoose, { mongo, Schema } from "mongoose";

const CommentSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Posts"
        },
        author: {  // Add this field
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model("Comment", CommentSchema)

export default Comment;