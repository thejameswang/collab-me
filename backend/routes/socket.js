const http = require("http");
const socketIo = require("socket.io");

export default function socket(app) {

    // Declare server, setup io, and intialize text
    const server = http.createServer(app);
    const io = socketIo(server);
    let text = {text: "sample text for the other user to see"};

    // Updates the text variable with the data we sent from the client
    // Emits back to the client the same data.
    let handleTextSent = (data) => {
        text.text = data.text;
        io.emit('text', data.text);
        return data;
    }

    // When a user connects to the web socket, we log and emit a newUser event
    // Whenever the client emits a protocol called ‘text’ we handle the text sent
    io.on("connection", socket => {
      console.log("A new user with the id" + socket.id + " connected");
      socket.emit('newUser', text);
      socket.on('text', (data) => handleTextSent(data));

      // Alerts us if user disconnects
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    // Sets up port to listen on 8000
    const port = 8000;
    server.listen(port);
    console.log('listening on port ', port);
}
