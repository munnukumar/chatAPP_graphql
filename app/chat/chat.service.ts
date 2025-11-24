import Message from "./chat.model";

interface SendMessageInput {
  senderId: string;
  receiverId: string;
  text: string;
}

class ChatService {
  async getMessages(senderId: string, receiverId: string) {
    return Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });
  }

  async sendMessage({ senderId, receiverId, text }: SendMessageInput) {
    return Message.create({ senderId, receiverId, text });
  }
}

export default new ChatService();
