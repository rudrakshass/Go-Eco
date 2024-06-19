const mongoose = require("mongoose");
const {userModel} = require("../models/userModel");
const ticketSchema = mongoose.Schema({
    userid : {type : String, requried : true},
    ticket_id : {type : Number, requried : true, unique : true, default : 0},
})

const ticketModel = mongoose.model("ticket", ticketSchema);

async function uploadTicket(res, image_details){

    //checking if ticket already exists
    const ticket = await ticketModel.findOne({ticket_id : image_details.ticket_id});
    if(ticket!=null){
        res.send("<html><script>alert('Ticket already uploaded'); window.location.replace('/getpoints')</script></html>");
        
    }
    else{
        //ticket doesnt exists hence add ticket to database
        await ticketModel.create({userid : image_details.userid, ticket_id : image_details.ticket_id});
        //update user points
        await userModel.updateOne({_id : image_details.userid}, {$inc:{points:5}});
        res.send("<html><script>alert('congratulation, you earned 5 points'); window.location.replace('/getpoints')</script></html>");
        
    }
}

module.exports = {uploadTicket};
