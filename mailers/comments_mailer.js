const nodemailer = require('../config/nodemailer');


exports.newComment = (comment)=>{

    console.log('inside newComment mailer');
    nodemailer.transporter.sendMail({
        from:'anshulsharma.sharma997@gmail.com',
        to:comment.user.email,
        subject:'New Comment Published',
        html:'<h1> your comment is now published</h1>'
    },(err, info)=>{
        console.log('Error in sending mail',err);
        return;
    })
    console.log('Message sent',info);
    return;
}

