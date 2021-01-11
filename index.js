const express = require("express");
var app=express()
const http = require("http").createServer(app);
const io = require("socket.io")(http);
 app.use(express.static(__dirname));
 require('dotenv').config()

 let port=process.env.PORT || 3000

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

var users={}

io.on('connection',socket=>{
    console.log("socket connected");
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        //When new user is joined
        socket.broadcast.emit('user-joined',name)
    })

    //When someone send the message
    socket.on('send',message=>{
        console.log(users);
        // Other can receive the msg
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    });
    socket.on('disconnect',message=>{
       socket.broadcast.emit('left',users[socket.id])
       delete users[socket.id]
    });

    
})

http.listen(port, () => console.log("listening on http://localhost:3000"))