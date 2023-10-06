import React, { useState } from 'react';
import './index.scss';
import { Button } from 'antd';

interface userInf {
    name: string;
    email: string;
    avatar: string;
}
interface WriteCommentProps {
    user: userInf;
    onSubmitComment: (comment: string) => void;
}

export const WriteComment: React.FC<WriteCommentProps> = ({
    user,
    onSubmitComment,
}) => {
    const [comment, setComment] = useState<string>('');
    const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };
    const handleCancel = () => {
        setComment('');
    };
    const handleSub = () => {
        onSubmitComment(comment);
        setComment('');
    };
    return (
        <div className="writecmt-container">
            <img
                className="avatar"
                src={user.avatar}
                alt={`avatar for ${user.name}`}
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
                            resize: 'none',
                        }}
                        placeholder="Write a comment..."
                        required
                        spellCheck={false}
                        onChange={handleChangeComment}
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
