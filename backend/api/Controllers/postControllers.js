const { createPost, getPosts, getLikes, isLiked } = require('../Services/postService');

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

/* exports.getLikesNbr = (req, res) => {

    const postId = req.body.postId;

    getLikeNbr(postId, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        if (results === undefined) {
            return res.status(404).json({
                success: 0,
                message: "No post found"
            })
        }
        else {
            return res.status(200).json({
                success: 1,
                message: 'Number likes got successfully',
                likes: results
            })
        }
    })
} */

exports.addLike = (req, res) => {
    const body = req.body;

    isLiked(body, (error, results) => {

        if (error) {
            console.log(error);
            return;
        }
        if (!results) {
            return res.status(404).json({
                success: 0,
                message: "User already Liked",
            })
        } else {
            return res.status(200).json({
                success: 1,
                message: 'User Liked successfully',
            })
        } 
    }) 

}

exports.getPosts = (req, res) => {
    getPosts((error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        if (!results) {
            return res.status(404).json({
                success: 0,
                message: "Failed to fetch posts"
            })
        }
        return res.status(200).json({
            success: 1,
            data: results
        })
    })
}

exports.getLikes = (req, res) => {
    const postId = req.body.postId;
    
    getLikes(postId, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        if (!results) {
            return res.status(404).json({
                success: 0,
                message: "Get Likes failed"
            })
        }
        return res.status(200).json({
            success: 1,
            message: 'Get Likes successfully',
            data: results
        })
    })
}