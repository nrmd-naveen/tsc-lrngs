import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 })

//creating Rooms
  // {  room_id      sockets
  //   "adsakjb": [s1, s2, s3],
  //   "sdfvdaf": [s1, s2, s3],
  //   "vsdfadf": [s1, s2, s3]
  // }
  
  const Rooms = new Map<string, WebSocket[]>();

wss.on("connection", (socket: WebSocket) => {
    
    socket.send("Hey Client #  You are connected !")

    socket.on("message", (msg: string) => {
        const msgData: {
            type: string,
            payload?: {
                room_id: string,
                message: string
            }
        } = JSON.parse(msg)
        if (msgData.type == 'create') {
            let room_id = ""
            for (let i = 0; i < 5; i++) room_id += Math.floor(Math.random() * 10)
            Rooms.set(room_id, [socket])
            console.log(Rooms)
            socket.send(room_id)
        }
        if (msgData.type == 'join') {
            //@ts-ignore
            console.log("id -- ",msgData.payload?.room_id)
            //@ts-ignore
            Rooms.get(msgData.payload?.room_id)?.push(socket) 
            console.log("Pushhhhhhhhh",Rooms)
        }
        if (msgData.type == 'chat') {
            for (const[room, sockets] of Rooms ){
                if (sockets.includes(socket)) {
                    sockets.forEach(soc => {
                        console.log(msgData.payload?.message)
                        soc.send("msg : "+ msgData.payload?.message)
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
        console.log("Message From Client - ", msg.toString())
        socket.send("Received")
    })
})