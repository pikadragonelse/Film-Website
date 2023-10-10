import React, { useState, useEffect } from 'react';
import './index.scss';
import {
    DeleteIcon,
    LoveIcon,
    ReplyIcon,
} from '../../../asset/icon/comment-icon';
import { listComment } from '../list-cmt';
import { WriteComment } from '../write-cmt';
import { CurrentUser } from '..';
import { Modal } from 'antd';

import './index.scss';

interface CmtProps {
    comment: listComment;
    onReplySubmit?: (commentId: number, replyText: string) => void;
    replyCommentId?: number | null;
    setReplyCommentId?: (commentId: number | null) => void;
    deleteCommentById?: (commentId: number, replyId?: number) => void;
    increaseLike: (like: number) => void;
    decreaseLike: (like: number) => void;
}
const currentUser: CurrentUser = {
    username: 'user1',
    email: 'user1@gmail.com',
    avatar: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
};

export const Cmt: React.FC<CmtProps> = ({
    comment,
    onReplySubmit,
    replyCommentId,
    setReplyCommentId,
    deleteCommentById,
    increaseLike,
    decreaseLike,
}) => {
    const isCurrentUserComment = comment.username === currentUser.username;
    const [isCurrentUserLike, setisCurrentUserLike] = useState<Boolean>(false);

    const getTimeDifference = (commentDateTime: string) => {
        const commentDate = new Date(commentDateTime);
        const currentDate = new Date();

        const timeDifference = Math.abs(
            commentDate.getTime() - currentDate.getTime(),
        );

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30.5);
        const years = Math.floor(days / 365);

        if (years > 0) {
            return `${years} years ago`;
        } else if (months > 0) {
            return `${months} months ago`;
        } else if (days > 0) {
            return `${days} days ago`;
        } else if (hours > 0) {
            return `${hours} hours ago`;
        } else if (minutes > 0) {
            return `${minutes} minutes ago`;
        } else {
            return `${seconds} seconds ago`;
        }
    };
    const [isReplying, setIsReplying] = useState<boolean>(true);

    const handleCancelReply = () => {
        setIsReplying(false);
    };
    useEffect(() => {
        if (!isReplying && setReplyCommentId) {
            setReplyCommentId(null);
        }
    }, [isReplying]);

    const handleReply = () => {
        setIsReplying(true);
        if (setReplyCommentId) {
            setReplyCommentId(
                replyCommentId === comment.id ? null : comment.id,
            );
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleLike = () => {
        increaseLike(comment.like);
        setisCurrentUserLike(!isCurrentUserLike);
    };
    const handleUndoLike = () => {
        decreaseLike(comment.like);
        setisCurrentUserLike(!isCurrentUserLike);
    };
    return (
        <article
            key={comment.id}
            className="pt-4 pb-4 text-base rounded-lg flex  "
        >
            <img
                className=" w-12 h-12 rounded-full"
                src={comment.avatar}
                alt={comment.username}
            />
            <div className="comment-detail">
                <div className="inf-user">
                    <p className="inline-flex items-center mr-1 username ">
                        {comment.username}
                    </p>
                    {'·'}
                    <p className="text-sm ml-1">
                        <time>{getTimeDifference(comment.dateTime)}</time>
                    </p>
                </div>
                {comment.comment}
                <div className="flex items-center mt-6 mb-6">
                    {isCurrentUserLike ? (
                        <div
                            className="love-icon-like"
                            onClick={handleUndoLike}
                        >
                            {comment.like == 0 ? (
                                <>
                                    <LoveIcon /> <p className="ml-1">Like</p>
                                </>
                            ) : (
                                <>
                                    <LoveIcon />
                                    <p className="ml-1">{comment.like} </p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="love-icon" onClick={handleLike}>
                            {comment.like == 0 ? (
                                <>
                                    <LoveIcon /> <p className="ml-1">Like</p>
                                </>
                            ) : (
                                <>
                                    <LoveIcon />
                                    <p className="ml-1">{comment.like} </p>
                                </>
                            )}
                        </div>
                    )}

                    <div className="reply-icon" onClick={handleReply}>
                        <div className="icon">
                            <ReplyIcon />
                            <p className="ml-1"> Reply</p>
                        </div>
                    </div>
                    {isCurrentUserComment && (
                        <div className="delete-icon" onClick={showModal}>
                            <DeleteIcon />
                            <p className="ml-1"> Delete</p>
                        </div>
                    )}
                </div>
                {isReplying && replyCommentId === comment.id && (
                    <WriteComment
                        currentUser={currentUser}
                        onSubmitComment={(replyText) => {
                            if (onReplySubmit) {
                                onReplySubmit(comment.id, replyText);
                                setIsReplying(false);
                            }
                        }}
                        placeholder={`Reply to ${comment.username}`}
                        onCancel={handleCancelReply}
                    />
                )}
            </div>
            <Modal
                title="Bạn chắc chắn muốn xóa bình luận?"
                open={isModalOpen}
                onOk={() => {
                    setIsModalOpen(false);
                    if (deleteCommentById) {
                        deleteCommentById(comment.id);
                    }
                }}
                onCancel={handleCancel}
            />
        </article>
    );
};
