import React from 'react';
import './index.scss';
import { WriteComment } from './write-cmt';
import { ListComment } from './list-cmt';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

interface Comment {
    title: string;
    currentUser: boolean;
}

const user = {
    name: 'user1',
    email: 'user1@gmail.com',
    avatar: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
};

export const Comment = ({ title, currentUser }: Comment) => {
    const handleCommentSubmit = (comment: string) => {};
    return (
        <div className="comment-content">
            <hr className="my-6 border-neutral-800" />
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl lg:text-2xl font-bold dark:text-white">
                    {title}
                </h2>
            </div>
            {currentUser ? (
                <WriteComment
                    user={user}
                    onSubmitComment={handleCommentSubmit}
                />
            ) : (
                <div className="login-btn">
                    <Link to="/login">
                        <Button size="large">Login</Button>
                    </Link>
                </div>
            )}

            <ListComment />
        </div>
    );
};
