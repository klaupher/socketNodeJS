const express = require("express");
const { Socket } = require("socket.io");
const app = express();
const http = require("http").createServer(app);
const io = require('socket.io')(http);

app.set("view engine","ejs");

app.get('/', (req, res) => {
    res.render('index');
});

io.on("connection", (cliente) => {

    console.log(cliente.id);
   
    cliente.on("disconnect", () => console.log("X desconectou: " + cliente.id));

    cliente.on("msg", (data) => {
        console.log(data);
        io.emit("showMsg", data); // sig. a partir do servidor, enviar a todos conectados nesse servidor
        //socket.broadcast.emit ==> envia a mensagem para todos que estão conectado, mas não envia para quem disparou o envio.
    });

})


http.listen(3000, () => console.log("Server rodando...")); 