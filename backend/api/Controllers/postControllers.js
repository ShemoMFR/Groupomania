const { createPost, getPosts, getLikes, isLiked, updateLike, addLike, deleteLike } = require('../Services/postService');

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

exports.addLike = (req, res) => {
    const body = req.body;

    isLiked(body, (error, results) => {

        if (error) {
            console.log(error);
            return;
        }
        if (!results) {
            
            body.likes = body.likes - 1;

            deleteLike(body, (error, results) => {

                if (error) {
                    console.log(error);
                    return;
                }
                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        message: "Delete like failed"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: 'Delete Like successfully',
                })
            })

            updateLike(body, (error, results) => {

                if (error) {
                    console.log(error);
                    return;
                }
                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        message: "Update like failed"
                    })
                }
            })

        } else {

            body.likes = body.likes + 1;

            addLike(body, (error, results) => {

                if (error) {
                    console.log(error);
                    return;
                }
                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        message: "Add like failed"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: 'User Liked successfully',
                })
            })
            updateLike(body, (error, results) => {

                if (error) {
                    console.log(error);
                    return;
                }
                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        message: "Update like failed"
                    })
                }
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
    const userId = req.body.userId;
    
    getLikes(userId, (error, results) => {

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