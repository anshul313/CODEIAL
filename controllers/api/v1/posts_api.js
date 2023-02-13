const Post = require('../../../models/post')
const Comment = require('../../../models/comment')

module.exports.index = async function(req, res){
    console.log('index method called!!')
    try{
        // populate the user of each post
       let posts = await Post.find({})
       .sort('-createdAt')
       .populate('user')
       .populate({
           path: 'comments',
           populate: {
               path: 'user'
           }
       });
       return res.json('200',{
        message:'list of posts',
        posts:posts
       })

   }catch(err){
       console.log('Error', err);
       return;
   }
}

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();
           
           

            await Comment.deleteMany({post: req.params.id});
            return res.json(200,{
                message:'post and associated comment delete successfully'
            })


            // if (req.xhr){
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id
            //         },
            //         message: "Post deleted"
            //     });
            // }

            // req.flash('success', 'Post and associated comments deleted!');

            // return res.redirect('back');
        }else{
            return res.json(401,{
                message:'you cannot delete this post'
            })
        }

    }catch(err){
        // req.flash('error', err);
        // return res.redirect('back');
        console.log(err);
        return res.json('500',{
            message:'internal server error'
           })
    }
    
}