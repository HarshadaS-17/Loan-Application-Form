import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    userQuery: String,
    botResponse: String,
    timestamp: { type: Date, default: Date.now },
});



const Chat = model("chat", chatSchema)

export default Chat;