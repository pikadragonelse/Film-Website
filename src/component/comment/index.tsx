import React, { useState } from 'react';
import './index.scss';
import { WriteComment } from './write-cmt';
import { ListComment } from './list-cmt';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export interface CurrentUser {
    username: string;
    email: string;
    avatar: string;
}
interface CommentProps {
    title: string;
    isLogin: boolean;
    currentUser: CurrentUser;
    placeholder: string;
}
interface listCommentsProps {
    id: number;
    avatar: string;
    username: string;
    dateTime: string;
    comment: string;
    like: number;
}

const listComment = [
    {
        id: 1,
        avatar: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
        username: 'Michael Gough',
        dateTime: '2022-02-08',
        comment:
            'Very straight-to-point article. Really worth time reading.Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are asimportant as the creation of the design strategy.',
        like: 2,
        replies: [
            {
                id: 11,
                avatar: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
                username: 'User2',
                dateTime: '2023-03-05 07:22:13',
                comment: 'Reply 1 to Comment 1',
                like: 12,
            },
        ],
    },
    {
        id: 2,
        avatar: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
        username: 'Michael Gough1',
        dateTime: '2022-02-08 ',
        comment:
            'Very straight-to-point article. Really worth time reading.Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are asimportant as the creation of the design strategy.',
        like: 0,
    },
];

export const Comment: React.FC<CommentProps> = ({
    title,
    isLogin,
    currentUser,
    placeholder,
}) => {
    const timestamp = Date.now();
    const [listComments, setListComments] =
        useState<Array<listCommentsProps>>(listComment);
    const handleCommentSubmit = (comment: string) => {
        const newCommentList = [
            ...listComments,
            {
                id: timestamp,
                comment,
                avatar: currentUser.avatar,
                username: currentUser.username,
                dateTime: new Date().toLocaleString(),
                like: 0,
            },
        ];
        setListComments(newCommentList);
    };

    return (
        <div className="comment-content">
            <hr className="my-6 border-neutral-800" />
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl lg:text-2xl font-bold dark:text-white">
                    {title}
                </h2>
            </div>
            {isLogin ? (
                <WriteComment
                    currentUser={currentUser}
                    onSubmitComment={handleCommentSubmit}
                    placeholder={placeholder}
                />
            ) : (
                <div className="login-btn">
                    <Link to="/login">
                        <Button size="large">Login</Button>
                    </Link>
                </div>
            )}

            <ListComment
                listComment={listComments}
                setListComment={setListComments}
                currentUser={currentUser}
            />
        </div>
    );
};
