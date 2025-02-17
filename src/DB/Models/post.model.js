import mongoose, { Schema, Types, model } from "mongoose";

const postSchema = new Schema(
  {
    content: {
      type: String,
      minLength: 2,
      maxLength: 5000,
      trim: true,
      required: function () {
        return this.images?.length ? false : true;
      },
    },
    images: [
      {
        public_id: String,
        secure_url: String,
      },
    ],
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: Types.ObjectId, ref: "User" }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: { type: Types.ObjectId, ref: "User" },
    customId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "postId", // FK
  localField: "_id", // PK
  // justOne: true,
});

export const PostModel = mongoose.model.Post || model("Post", postSchema);
