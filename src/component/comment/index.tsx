import React, { useEffect, useState } from 'react';
import './index.scss';
import { WriteComment } from './write-cmt';
import { ListComment } from './list-cmt';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { request } from '../../utils/request';
import Cookies from 'js-cookie';

export interface Subscription {
    closeAt: string;
    subscriptionType: string;
    updatedAt: string;
}
export interface CurrentUser {
    dateOfBirth?: string;
    gender?: string;
    username: string;
    email: string;
    avatarURL: string;
    role: number;
    subscription?: Subscription;
    userId?: number;
}
interface CommentProps {
    title: string;
    isLogin: boolean;
    currentUser: CurrentUser;
    placeholder: string;
}
export interface UserProps {
    user_id: number;
    gender: string;
    avatar_url: string;
    email: string;
}
interface listCommentsProps {
    id: number;
    avatar: string;
    username: string;
    createdAt: string;
    updatedAt?: string;
    content: string;
    numLike: number;
    user?: UserProps;
}

const listComment = [
    {
        id: 0,
        avatar: '',
        username: '',
        createdAt: '',
        content: '',
        numLike: 0,
        subcomments: [],
    },
];

export const Comment: React.FC<CommentProps> = ({ title, isLogin, currentUser, placeholder }) => {
    const timestamp = Date.now();
    const [refreshData, setRefreshData] = useState(false);
    const [listComments, setListComments] = useState<Array<listCommentsProps>>(listComment);
    const { episodeId } = useParams();
    const fetchData = async () => {
        try {
            const response = await request.get(`episode/${episodeId}/comments`);
            const data = response.data.comments;
            setListComments(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
        setRefreshData(false);
    }, [episodeId, refreshData]);
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const postData = async (content: string) => {
        try {
            await request.post(
                'comments/create',
                {
                    episodeId: `${episodeId}`,
                    content: content,
                },
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            setRefreshData(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCommentSubmit = async (content: string) => {
        await postData(content);
    };

    return (
        <div className="comment-content">
            <hr className="my-6 border-neutral-800" />
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl lg:text-2xl font-bold dark:text-white">{title}</h2>
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
