import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    text: { type: String, required: true }
  },
  { timestamps: true }
);

export const ChatMessage = mongoose.model("Message", chatSchema);
