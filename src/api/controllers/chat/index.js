const { create } = require("./createChatController");
const { get } = require("./getChatController");
const { deleteMessage } = require("./deleteMessageController");
const { deleteChat } = require("./deleteChatController");

module.exports = {
  create,
  get,
  deleteMessage,
  deleteChat,
};
