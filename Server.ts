
import Websocket = require('ws');
import mongoose = require('mongoose');

const UserBooking = require('./Models/UserBookingSchema').UserBooking
const AdminResponse = require('./Models/AdminResponseSchema').AdminResponse
const Message = require('./Models/MessageSchema').Message

const port: number = 5500;
const WebsocketServer: Websocket.Server = new Websocket.Server({port})
const User = []
const Admin: Websocket[] = []
let myMap = new Map()
const db_connect =  mongoose.connect("mongodb://localhost:27017/testdb", {useNewUrlParser: true} );
WebsocketServer.on("connection", async (WebsocketClient: Websocket, req:Request)=>{

    WebsocketClient.send("Connected to Server");
    const actor: string = (req.url).replace('/', "")

    if(actor === "user"){
        await Message.create({Source: "Server", Destination: "User", Message: "Connected"})
        User.push(WebsocketClient);
    }

    if(actor === "admin"){
        await Message.create({Source: "Server", Destination: "Admin", Message: "Connected"})
        Admin.push(WebsocketClient);
    }

    WebsocketClient.on('message', async (message: any) => {
        let obj = JSON.parse(message);
        if (obj.by === "user") {
            console.log("New userid is: "+ obj.Userid)
            await UserBooking.create({
                CarName: obj.Carname,
                Duration: obj.Days,
                CarID: obj.Carid,
                UserID: obj. Userid,
                by: obj.by
            })
            myMap.set(obj.Userid, WebsocketClient)
            Admin.forEach((client) => {
                if (client.readyState === Websocket.OPEN) {
                    client.send(message)
                }
            })
        }

        if(obj.by === "admin"){
            let obj1 = JSON.parse(message);
            const valid_response = await UserBooking.findOne({CarID:{$eq: obj1.Carid}, UserID: {$eq: obj1.Userid}})
           if(valid_response){
                console.log("The new user id is: "+obj1.UserID)
                await AdminResponse.create({
                    Cost: obj1.Cost,
                    Note: obj1.Note,
                    CarID: obj1.CarID,
                    UserID: obj1.UserID,
                    AdminID: obj1.AdminID,
                    by: obj.by
                })
                if(myMap.get(obj1.UserID).readyState === Websocket.OPEN) {
                    myMap.get(obj1.UserID).send(message)
                }
            }
        }
    });
    console.log('Broadcasted message to all connected clients!');
});
console.log('Websocket server is up ', {port});