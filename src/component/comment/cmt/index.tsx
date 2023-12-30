import React, { useState, useEffect } from 'react';
import './index.scss';
import { DeleteIcon, LoveIcon, ReplyIcon } from '../../../asset/icon/comment-icon';

import { WriteComment } from '../write-cmt';
import { Avatar, Modal } from 'antd';

import './index.scss';
import Cookies from 'js-cookie';
import { request } from '../../../utils/request';
import { CurrentUser, listComment } from '../type';
import { defaultCurrentUser } from '../../../model/user';

interface CmtProps {
    comment: listComment;
    onReplySubmit?: (commentId: number, replyText: string) => void;
    replyCommentId?: number | null;
    setReplyCommentId?: (commentId: number | null) => void;
    deleteCommentById?: (commentId: number, replyId?: number) => void;
    increaseLike: (numLike: number) => void;
    decreaseLike: (numLike: number) => void;
}

export const Cmt: React.FC<CmtProps> = ({
    comment,
    onReplySubmit,
    replyCommentId,
    setReplyCommentId,
    deleteCommentById,
    increaseLike,
    decreaseLike,
}) => {
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const [currentUser, setCurrentUser] = useState<CurrentUser>(defaultCurrentUser);
    const fetchDataCurrentUser = async () => {
        try {
            const response = await request.get('user/get-self-information', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data;
            setCurrentUser(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchDataCurrentUser();
    }, []);

    const getTimeDifference = (commentDateTime: string) => {
        const commentDate = new Date(commentDateTime);
        const currentDate = new Date();

        const timeDifference = Math.abs(commentDate.getTime() - currentDate.getTime());

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30.5);
        const years = Math.floor(days / 365);

        if (years > 0) {
            return `${years} năm trước`;
        } else if (months > 0) {
            return `${months} tháng trước`;
        } else if (days > 0) {
            return `${days} ngày trước`;
        } else if (hours > 0) {
            return `${hours} giờ trước`;
        } else if (minutes > 0) {
            return `${minutes} phút trước`;
        } else {
            return `${seconds} giây trước`;
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
            setReplyCommentId(replyCommentId === comment.id ? null : comment.id);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const token = Cookies.get('accessToken');
    let isCurrentUserComment = false;
    if (token) {
        isCurrentUserComment =
            comment.user?.user_id === JSON.parse(atob(token.split('.')[1])).userId;
    }
    const [isCurrentUserLike, setisCurrentUserLike] = useState<Boolean>(false);
    const handleLike = () => {
        increaseLike(comment.numLike);
        setisCurrentUserLike(!isCurrentUserLike);
    };
    const handleUndoLike = () => {
        decreaseLike(comment.numLike);
        setisCurrentUserLike(!isCurrentUserLike);
    };
    return (
        <article key={comment.id} className="pt-4 pb-4 text-base rounded-lg flex  ">
            <Avatar
                className="w-12 h-12 rounded-full object-cover"
                src={comment.user?.avatar_url}
                alt={comment.user?.email}
            />
            <div className="comment-detail">
                <div className="inf-user">
                    <p className="inline-flex items-center mr-1 username ">{comment.user?.email}</p>
                    {'·'}
                    <p className="text-sm ml-1">
                        <time>{getTimeDifference(comment.createdAt)}</time>
                    </p>
                </div>
                {comment.content}
                <div className="flex items-center mt-6 mb-6">
                    {isCurrentUserLike ? (
                        <div className="love-icon-like" onClick={handleUndoLike}>
                            {comment.numLike == 0 ? (
                                <>
                                    <LoveIcon /> <p className="ml-1">Like</p>
                                </>
                            ) : (
                                <>
                                    <LoveIcon />
                                    <p className="ml-1">{comment.numLike} </p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="love-icon" onClick={handleLike}>
                            {comment.numLike == 0 ? (
                                <>
                                    <LoveIcon /> <p className="ml-1">Like</p>
                                </>
                            ) : (
                                <>
                                    <LoveIcon />
                                    <p className="ml-1">{comment.numLike} </p>
                                </>
                            )}
                        </div>
                    )}

                    {comment.subcomments && (
                        <div className="reply-icon" onClick={handleReply}>
                            <div className="icon">
                                <ReplyIcon />
                                <p className="ml-1"> Phản hồi</p>
                            </div>
                        </div>
                    )}
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
                        placeholder={`Trả lời ${comment.user?.email}`}
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
