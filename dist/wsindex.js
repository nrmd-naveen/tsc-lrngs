"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
//creating Rooms
// {  room_id      sockets
//   "adsakjb": [s1, s2, s3],
//   "sdfvdaf": [s1, s2, s3],
//   "vsdfadf": [s1, s2, s3]
// }
const Rooms = new Map();
wss.on("connection", (socket) => {
    socket.send("Hey Client #  You are connected !");
    socket.on("message", (msg) => {
        var _a, _b, _c;
        const msgData = JSON.parse(msg);
        if (msgData.type == 'create') {
            let room_id = "";
            for (let i = 0; i < 5; i++)
                room_id += Math.floor(Math.random() * 10);
            Rooms.set(room_id, [socket]);
            console.log(Rooms);
            socket.send(room_id);
        }
        if (msgData.type == 'join') {
            //@ts-ignore
            console.log("id -- ", (_a = msgData.payload) === null || _a === void 0 ? void 0 : _a.room_id);
            //@ts-ignore
            (_c = Rooms.get((_b = msgData.payload) === null || _b === void 0 ? void 0 : _b.room_id)) === null || _c === void 0 ? void 0 : _c.push(socket);
            console.log("Pushhhhhhhhh", Rooms);
        }
        if (msgData.type == 'chat') {
            for (const [room, sockets] of Rooms) {
                if (sockets.includes(socket)) {
                    sockets.forEach(soc => {
                        var _a, _b;
                        console.log((_a = msgData.payload) === null || _a === void 0 ? void 0 : _a.message);
                        soc.send("msg : " + ((_b = msgData.payload) === null || _b === void 0 ? void 0 : _b.message));
                    });
                    break;
                }
            }
            // Rooms.forEach(room => {
            //     room.includes(socket) && room.forEach(soc => {
            //         soc.send(msgData.payload.message)
            //     })
            // })
        }
        //@ts-ignore
        // clients?.forEach(soc => {
        //     soc.send(msg.toString())
        // })
        console.log("Message From Client - ", msg.toString());
        socket.send("Received");
    });
});
