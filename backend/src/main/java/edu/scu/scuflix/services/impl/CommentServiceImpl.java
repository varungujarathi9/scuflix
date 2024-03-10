package edu.scu.scuflix.services.impl;

import edu.scu.scuflix.daos.CommentDao;
import edu.scu.scuflix.entities.Comment;
import edu.scu.scuflix.exceptions.CommentDetailsNotFoundException;
import edu.scu.scuflix.services.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {

    private CommentDao commentDao;

    @Override
    public Comment writeComment(Comment comment) {
        Comment myComment = commentDao.save(comment);
        return myComment;
    }

    @Override
    public Boolean deleteComment(String commentId) {
        commentDao.deleteById(commentId);
        return true;
    }

    @Override
    public Comment getComment(String commentId) throws CommentDetailsNotFoundException {
        Comment myComment = commentDao.findById(commentId)
                .orElseThrow(() -> new CommentDetailsNotFoundException("Comment Details not found"));
        return myComment;
    }

    @Override
    public Comment editComment(String commentId, String content) throws CommentDetailsNotFoundException {
        Comment comment = getComment(commentId);
        comment.setContent(content);
        Comment updated = commentDao.save(comment);
        return updated;
    }

    public List<Comment> getAllCommentsOfUser(String user_id) throws CommentDetailsNotFoundException {
        List<Comment> comments = commentDao.findAllByUserId(user_id)
                .orElseThrow(() -> new CommentDetailsNotFoundException("Passed User Id is invalid"));
        return comments;
    }
}
