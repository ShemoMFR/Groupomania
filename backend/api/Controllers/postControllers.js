const { createPost } = require('../Services/postService');

exports.createPost = (req, res) => {
    const body = req.body;
    
    createPost(body, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }

        if (!results) {
            return res.status(404).json({
                success: 0,
                message: "Creation post failed"
            })
          
        }
        return res.status(200).json({
            success: 1,
            message: 'created successfully'
        })
    })
}