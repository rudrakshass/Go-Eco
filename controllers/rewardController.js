const {claimPoints} = require("../models/userModel");

function getRewards(req,res){
    let charge = 0;
    switch(req.params.giftcard){
        case "amazon" :        
            // res.send(req.params.giftcard);
            if(req.session.user.points<2000){
                
                res.send("<html><script>alert('Sorry, you dont have enough points to claim this reward'); window.location.replace('/rewards')</script></html>");
                return;
            }
            
            charge = 2000;
            claimPoints(charge,req,res);
            break;

        case "flipkart" :            
            // res.send(req.params.giftcard);
            if(req.session.user.points<2000){
                
                res.send("<html><script>alert('Sorry, you dont have enough points to claim this reward'); window.location.replace('/rewards')</script></html>");
                return;
            }
            
            charge = 2000;
            claimPoints(charge,req,res);
            break;

        case "steam" :    
            // res.send(req.params.giftcard);
            if(req.session.user.points<1500){
                
                res.send("<html><script>alert('Sorry, you dont have enough points to claim this reward'); window.location.replace('/rewards')</script></html>");
                return;
            }
            
            charge = 1500;
            claimPoints(charge,req,res);
            break;

        case "spotify" :            
            // res.send(req.params.giftcard);
            if(req.session.user.points<1500){
                
                res.send("<html><script>alert('Sorry, you dont have enough points to claim this reward'); window.location.replace('/rewards')</script></html>");
                return;
            }
            
            charge = 1500;
            claimPoints(charge,req,res);
            break;            
    }
}

module.exports = {getRewards};