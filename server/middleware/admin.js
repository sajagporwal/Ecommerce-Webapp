
let admin = (req,res,next) => {
if(req.user.role === 0){
    return res.send('GTFO')
}
 next();   
}

module.exports = {admin}