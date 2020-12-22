"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
require("socket.io");
const socket_io_1 = require("socket.io");
class App {
    constructor() {
        this.application = express_1.default();
    }
}
const app = new App().application;
const PORT = 3000 || process.env.PORT;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
io.on('connection', socket => {
    console.log('New Ws Connection...');
    socket.emit('message', 'Welcome to ChatCord!');
});
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get("/", (req, res) => {
    res.send('start');
    ;
});
server.listen(PORT, () => console.log(`Server running on prt ${PORT}`));
