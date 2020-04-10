"use strict";
/*
Here websocket will enable communication between users and admin
User sends a message to book a car for a particular duration
Admin checks the availability and sends the price details
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Websocket = require("ws");
var mongoose = require("mongoose");
var UserBooking = require('./Models/UserBookingSchema').UserBooking;
var AdminResponse = require('./Models/AdminResponseSchema').AdminResponse;
var Message = require('./Models/MessageSchema').Message;
var port = 5000;
// Instantiating a websocket
var WebsocketServer = new Websocket.Server({ port: port });
var User = [];
var Admin = [];
// map to store all requests
var myMap = new Map();
// Connect to the databse
var db_connect = mongoose.connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true });
// Creating a route
WebsocketServer.on("connection", function (WebsocketClient, req) { return __awaiter(void 0, void 0, void 0, function () {
    var actor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                WebsocketClient.send("You are successfully connected to the server");
                actor = (req.url).replace('/', "");
                if (!(actor === "user")) return [3 /*break*/, 2];
                return [4 /*yield*/, Message.create({ Source: "Server", Destination: "User", Message: "You are successfully connected to the server" })];
            case 1:
                _a.sent();
                console.log("A new user is connected");
                User.push(WebsocketClient); // Add to list of users
                _a.label = 2;
            case 2:
                if (!(actor === "Admin")) return [3 /*break*/, 4];
                return [4 /*yield*/, Message.create({ Source: "Server", Destination: "Admin", Message: "You are successfully connected to the server" })];
            case 3:
                _a.sent();
                console.log("A new admin is connected");
                Admin.push(WebsocketClient); // Add to list of admins
                _a.label = 4;
            case 4:
                WebsocketClient.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
                    var obj, obj1, valid_response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('Received message from user: ', message);
                                obj = JSON.parse(message);
                                console.log(obj.by);
                                if (!(obj.by === "user")) return [3 /*break*/, 2];
                                console.log("The index of the array is: " + obj.Userid);
                                // Storing the request in the database
                                return [4 /*yield*/, UserBooking.create({
                                        CarName: obj.Carname,
                                        Duration: obj.Days,
                                        CarID: obj.Carid,
                                        UserID: obj.Userid,
                                        by: obj.by
                                    })
                                    // This is where I am storing the request
                                    // I am basing on the user id since it is the ultimate channel where a response from admin has to go
                                ];
                            case 1:
                                // Storing the request in the database
                                _a.sent();
                                // This is where I am storing the request
                                // I am basing on the user id since it is the ultimate channel where a response from admin has to go
                                myMap.set(obj.Userid, WebsocketClient);
                                // Logic to send message to admins
                                Admin.forEach(function (client) {
                                    if (client.readyState === Websocket.OPEN) {
                                        client.send(message);
                                    }
                                });
                                _a.label = 2;
                            case 2:
                                if (!(obj.by === "admin")) return [3 /*break*/, 5];
                                obj1 = JSON.parse(message);
                                return [4 /*yield*/, UserBooking.findOne({ CarID: { $eq: obj1.Carid }, UserID: { $eq: obj1.Userid } })];
                            case 3:
                                valid_response = _a.sent();
                                if (!valid_response) return [3 /*break*/, 5];
                                console.log("The new user id is: " + obj1.UserID);
                                // Storing the response in the database
                                return [4 /*yield*/, AdminResponse.create({
                                        Cost: obj1.Cost,
                                        Note: obj1.Note,
                                        CarID: obj1.CarID,
                                        UserID: obj1.UserID,
                                        AdminID: obj1.AdminID,
                                        by: obj.by
                                    })
                                    // If user is able to listen, then send it to him
                                ];
                            case 4:
                                // Storing the response in the database
                                _a.sent();
                                // If user is able to listen, then send it to him
                                if (obj.UserID.readyState === Websocket.OPEN) {
                                    myMap.get(obj1.UserID).send(message);
                                }
                                _a.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                console.log('Broadcasted message to all connected clients!');
                return [2 /*return*/];
        }
    });
}); });
console.log('Websocket server is up and ready for connections on port', { port: port });
