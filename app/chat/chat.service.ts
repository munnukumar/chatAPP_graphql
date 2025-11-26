import { ChatMessage } from "./chat.model";  // Mongoose model for messages

export class ChatService {
  async getMessages(userId: string, receiverId: string) {
    return ChatMessage.find({
      $or: [
        { senderId: userId, receiverId },
        { senderId: receiverId, receiverId: userId }
      ]
    }).sort({ createdAt: 1 });
  }

  async sendMessage(userId: string, receiverId: string, text: string) {
    return ChatMessage.create({
      senderId: userId,
      receiverId,
      text
    });
  }
}
