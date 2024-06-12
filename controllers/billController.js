const {uploadTicket} = require("../models/ticketModel");
const tesseract = require("tesseract.js");
const sharp = require("sharp");

async function ticketController(req,res){
    //imaeg details
    const image_details = {
        userid: req.session.user.userid,
        filename: req.file.filename,
        ticket_id : 0
    }
    //get image dimensions
    const dimensions = await sharp(`./uploads/${image_details.filename}`).metadata();
    //resizing image
    const left = 0;
    const top = Math.floor(3 * dimensions.height / 4) + 50;
    const quarterWidth = Math.floor(dimensions.width / 2)-50;
    const quarterHeight = dimensions.height - top;

    await sharp(`./uploads/${image_details.filename}`)
        .extract({ left: left, top: top, width: quarterWidth, height: quarterHeight })
        .toFile(`./cropped/${image_details.filename}`)
        .catch(err => {
            console.error('Error:', err);
        });

        
    readTicket(image_details, image_details.filename,res);


    // uploadTicket(image_details);
}

function readTicket(image_details, filename,res){
    tesseract.recognize(`./cropped/${filename}`,'eng').then((image)=>{
        const regex = /\b\d{10}\b/g;
        const match = image.data.text.match(regex);
        if(match){
            //updating image details
            image_details.ticket_id = Number(match[0]);

            //accessing database for further processing
            uploadTicket(res, image_details)
        }
        else{
            res.send("<html><script>alert('Unclear image');window.location.replace('/getpoints')</script></html>");
        }
    }).catch(()=>{
        res.send("<html><script>alert('error processing your image');window.location.replace('/getpoints')</script></html>")
    })
}

module.exports = {ticketController}