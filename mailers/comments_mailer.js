const nodemailer = require('../config/nodemailer');


exports.newComment = (comment)=>{
    let htmlString = nodemailer.renderTemplate({comment:comment},'comments/new_comments.ejs')
    nodemailer.transporter.sendMail({
        from:'anshulsharma.sharma997@gmail.com',
        to:comment.user.email,
        subject:'New Comment Published',
        html:htmlString
    },(err, info)=>{
        if(err){
        console.log('Error in sending mail',err);
        return;
        }
        console.log('Message sent',info);
        return;
    })
   
}

