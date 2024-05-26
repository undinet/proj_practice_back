const userController = require("../Controllers/user.controller");
const chatController = require("../Controllers/chat.controller");
const { db } = require("../Models/user");

module.exports = function (io) {
  //io관련 모든 작업
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("login", async (userName, cb) => {
      //유저정보를 저장하는 함수
      try {
        const user = await userController.saveUser(userName, socket.id);
        cb({ ok: true, data: user });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("sendMessage", async (message, cb) => {
      try {
        // 유저 찾기 socket id로
        const user = await userController.checkUser(socket.id);
        // 메세지 저장 함수(유저)
        const newMessage = await chatController.saveChat(message, user);
        io.emit("message", newMessage);
        cb({ ok: true });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });
  });
};
