import React, { useState } from 'react';
import './index.scss';
import { Button } from 'antd';

interface CurrentUser {
    username: string;
    email: string;
    avatar: string;
}
interface WriteCommentProps {
    currentUser: CurrentUser;
    placeholder: string;
    onSubmitComment?: (comment: string) => void;
    onCancel?: () => void;
}

export const WriteComment: React.FC<WriteCommentProps> = ({
    currentUser,
    placeholder,
    onSubmitComment,
    onCancel,
}) => {
    const [comment, setComment] = useState<string>('');
    const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };
    const handleCancel = () => {
        setComment('');
        if (onCancel) {
            onCancel();
        }
    };
    const handleSub = () => {
        if (onSubmitComment && comment.trim() !== '') {
            onSubmitComment(comment);
            setComment('');
        }
    };

    return (
        <div className="writecmt-container">
            <img
                className="avatar"
                src={currentUser.avatar}
                alt={`avatar for ${currentUser.username}`}
            />
            <div className="writecmt-box">
                <div className="py-2 px-4 mb-4  rounded-lg rounded-t-lg border textarea">
                    <textarea
                        id="comment"
                        value={comment}
                        rows={6}
                        className="px-0 w-full  border-0 focus:ring-0 focus:outline-none bg-transparent scroll"
                        style={{
                            fontSize: '1rem',
                            height: '60px',
                        }}
                        required
                        spellCheck={false}
                        onChange={handleChangeComment}
                        placeholder={placeholder}
                    ></textarea>
                </div>
                <div className="btn-action">
                    <Button className="btn-cancel" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button className="btn-sub" onClick={handleSub}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};
