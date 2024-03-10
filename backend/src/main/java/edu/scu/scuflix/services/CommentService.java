package edu.scu.scuflix.services;

import edu.scu.scuflix.entities.Comment;
import edu.scu.scuflix.exceptions.CommentDetailsNotFoundException;

public interface CommentService {
    Comment writeComment(Comment comment);

    Boolean deleteComment(String commentId);

    Comment getComment(String commentId) throws CommentDetailsNotFoundException;

    Comment editComment(String commentId, String content) throws CommentDetailsNotFoundException;
}
