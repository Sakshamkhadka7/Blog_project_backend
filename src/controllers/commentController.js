import Comment from "../models/Comment.js";

export const commentPost = async (req, res) => {

    try {
        // console.log(req.body);
        const { post, content } = req.body;
        const user = req.userMid;   // from authentication

        if (!post || !content) {
            return res.status(400).json({
                success: false,
                message: "Post and content are required"
            });
        }
        const comment = await Comment.create({
            post,
            user: user._id,
            content
        });

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            data: comment
        });

    } catch (error) {

        console.error("Error occurred in commentPost:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
};


export const updateComment = async (req, res) => {

    const commentId = req.params.id;
    const user = req.userMid;
    const { content } = req.body;
    

    const comment = await Comment.findById(commentId);
    if (!comment) {
        return res.status(404).json({
            success: false,
            message: "Comment couldnot found"
        });
    }
    console.log(user);
    if (comment.user.toString() !== user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "Not authorized to comment"
        });
    };

    let commentUpdate = await Comment.findByIdAndUpdate(commentId, {
        content: content,
    }, {
        new: true
    });

    commentUpdate = await comment.save();

    return res.status(200).json({
        success: true,
        message: "Comment is updated",
        commentUpdate: commentUpdate
    });
}


export const deleteComment = async (req, res) => {

    const id = req.params.id;
    const user = req.userMid;

    const comment = await Comment.findById(id);

    if (!comment) {
        return res.status(404).json({
            success: false,
            message: "Comment couldnot found"
        });
    }

    if (comment.user.toString() !== user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "Not authorized to comment"
        });
    }

    let deletedComment = await Comment.findByIdAndDelete(comment);

    return res.status(200).json({
        success: true,
        message: "Comment is deleted",
        deleteComment: deletedComment
    });

}