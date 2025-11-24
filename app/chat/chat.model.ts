import { model, Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Message", MessageSchema);
