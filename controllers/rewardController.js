const {claimPoints, profilePoints} = require("../models/userModel");

function getRewards(req,res){
    let charge = 0;
    profilePoints(req,res,(points)=>{
        switch(req.params.giftcard){
            case "amazon" :                        
                if(points.points<2000){
                    res.send("<html><script>alert('Sorry, you dont have enough points to claim this reward'); window.location.replace('/rewards')</script></html>");
                    return;
                }
                
                charge = 2000;
                claimPoints(charge,req,res, ()=>{
                    res.render("voucher",{isLoggedIn : req.session.authorized, code : 8291037759});
                });
                break;
    
            case "flipkart" :            
                if(points.points<2000){
                    
                    res.send("<html><script>alert('Sorry, you dont have enough points to claim this reward'); window.location.replace('/rewards')</script></html>");
                    return;
                }
                
                charge = 2000;
                claimPoints(charge,req,res, ()=>{
                    res.render("voucher",{isLoggedIn : req.session.authorized, code : 8291037759});
                });
                break;
    
            case "steam" :    
                if(points.points<1500){
                    
                    res.send("<html><script>alert('Sorry, you dont have enough points to claim this reward'); window.location.replace('/rewards')</script></html>");
                    return;
                }
                
                charge = 1500;
                claimPoints(charge,req,res, ()=>{
                    res.render("voucher",{isLoggedIn : req.session.authorized, code : 8291037759});
                });
                break;
    
            case "spotify" :;
                if(points.points<1500){
                    
                    res.send("<html><script>alert('Sorry, you dont have enough points to claim this reward'); window.location.replace('/rewards')</script></html>");
                    return;
                }
                
                charge = 1500;
                claimPoints(charge,req,res, ()=>{
                    res.render("voucher",{isLoggedIn : req.session.authorized, code : 8291037759});
                });
                break;            
        }
    })
}

module.exports = {getRewards};