import React, { useState, useEffect } from 'react';
import './index.scss';
import { Cmt } from '../cmt';
import { CurrentUser } from '..';

export interface listComment {
    id: number;
    avatar: string;
    username: string;
    dateTime: string;
    comment: string;
    replies?: Array<listComment>;
    like: number;
}
interface ListCommentProps {
    listComment: Array<listComment>;
    setListComment: (listComment: Array<listComment>) => void;
    currentUser: CurrentUser;
}

export const ListComment: React.FC<ListCommentProps> = ({
    listComment,
    currentUser,
    setListComment,
}) => {
    const timestamp = Date.now();
    const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
    const handleReplySubmit = (commentId: number, replyText: string) => {
        const newReply = {
            id: timestamp,
            avatar: currentUser.avatar,
            username: currentUser.username,
            dateTime: new Date().toString(),
            like: 0,
            comment: replyText,
        };

        const updatedComments = listComment.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies || []), newReply],
                };
            }
            return comment;
        });
        setListComment(updatedComments);
    };

    const [replyChildCmtId, setReplyChildCmtId] = useState<number | null>(null);
    //thêm reply cho reply
    const handleReplyChildSubmit = () => {};

    const deleteCommentById = (idToDelete: number) => {
        const updatedComments = listComment.filter((comment) => {
            return comment.id !== idToDelete;
        });
        setListComment(updatedComments);
    };

    const deleteChildCmtById = (
        commentIdToDelete: number,
        replyIdToDelete: number,
    ) => {
        const updatedComments = listComment.map((comment) => {
            if (comment.id === commentIdToDelete) {
                if (comment.replies && comment.replies.length > 0) {
                    const updatedReplies = comment.replies.filter((reply) => {
                        return reply.id !== replyIdToDelete;
                    });

                    return {
                        ...comment,
                        replies: updatedReplies,
                    };
                }
            }
            return comment;
        });

        setListComment(updatedComments);
    };

    const increaseLike = (commentId: number) => {
        const updatedComments = listComment.map((comment) => {
            if (comment.id === commentId) {
                const updatedLikes = comment.like + 1;
                return {
                    ...comment,
                    like: updatedLikes,
                };
            }
            return comment;
        });

        setListComment(updatedComments);
    };

    const increaseLikeChilde = (commentId: number, replyId: number) => {
        const updatedComments = listComment.map((comment) => {
            if (comment.id === commentId && comment.replies) {
                const updatedReplies = comment.replies.map((reply) => {
                    if (reply.id === replyId) {
                        return {
                            ...reply,
                            like: reply.like + 1,
                        };
                    }
                    return reply;
                });

                return {
                    ...comment,
                    replies: updatedReplies,
                };
            }
            return comment;
        });

        setListComment(updatedComments);
    };

    const decreaseLike = (commentId: number) => {
        const updatedComments = listComment.map((comment) => {
            if (comment.id === commentId) {
                const updatedLikes = comment.like - 1;
                return {
                    ...comment,
                    like: updatedLikes,
                };
            }
            return comment;
        });

        setListComment(updatedComments);
    };

    const decreaseLikeChilde = (commentId: number, replyId: number) => {
        const updatedComments = listComment.map((comment) => {
            if (comment.id === commentId && comment.replies) {
                const updatedReplies = comment.replies.map((reply) => {
                    if (reply.id === replyId) {
                        return {
                            ...reply,
                            like: reply.like - 1,
                        };
                    }
                    return reply;
                });

                return {
                    ...comment,
                    replies: updatedReplies,
                };
            }
            return comment;
        });

        setListComment(updatedComments);
    };

    console.log(listComment);
    return (
        <div>
            {listComment.map((comment) => (
                <div key={comment.id}>
                    <hr className="my-6 border-neutral-800" />
                    <Cmt
                        comment={comment}
                        onReplySubmit={handleReplySubmit}
                        replyCommentId={replyCommentId}
                        setReplyCommentId={setReplyCommentId}
                        deleteCommentById={deleteCommentById}
                        increaseLike={() => increaseLike(comment.id)}
                        decreaseLike={() => decreaseLike(comment.id)}
                    />
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-16 pl-2">
                            {comment.replies.map((reply) => {
                                return (
                                    <Cmt
                                        key={reply.id}
                                        comment={reply}
                                        onReplySubmit={handleReplyChildSubmit}
                                        replyCommentId={replyChildCmtId}
                                        setReplyCommentId={setReplyChildCmtId}
                                        deleteCommentById={() =>
                                            deleteChildCmtById(
                                                comment.id,
                                                reply.id,
                                            )
                                        }
                                        increaseLike={() =>
                                            increaseLikeChilde(
                                                comment.id,
                                                reply.id,
                                            )
                                        }
                                        decreaseLike={() =>
                                            decreaseLikeChilde(
                                                comment.id,
                                                reply.id,
                                            )
                                        }
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
