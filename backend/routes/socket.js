// Importing needed npm packages
const http = require("http");
const socketIo = require("socket.io");
import crypto from 'crypto'

//helper hash function
function md5(data) {
  return crypto.createHash('md5').update(data).digest('hex')
}

//Exports function for all login and registration authenication
export default function socket(app) {
    // Declare server and setup io
    const server = http.createServer(app);
    const io = socketIo(server);

    // Emits back to the client the same data.
    // Creates Hash secret, established current state and the documents are sharing
    const SALT = process.env.SECRET
    const sharedDocuments = {}
    const currentState = {}

    // When a user connects to the web socket, we log and emit a newUser event
    // Whenever the client emits a protocol called ‘text’ we handle the text sent
    io.on("connection", socket => {
      //Socket endpoints

      //Allows users to join a document to collaborate
      socket.on('join-document', function (docAuth, cb) {
        const { docId, userToken } = docAuth;
        // AUTH THE USER & DOC RIGHTS HERE
        //Currently not added auth between docs

        //creates room authentication
        let secretToken = sharedDocuments[docId]
        if(!secretToken) {
          secretToken = sharedDocuments[docId] = docId
        }
        //sends back documents to the clientside
        cb({secretToken, docId, state: currentState[docId]})
        //joins certain socket: established by secret tokens
        socket.join(secretToken)
      })

      //saves changes per user in certain document
      socket.on('document-save', function (message) {
        const {secretToken, state, docId, userToken} = message
        currentState[docId] = state
        io.sockets.in(secretToken).emit('document-update', {state, docId, userToken})
      })

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
