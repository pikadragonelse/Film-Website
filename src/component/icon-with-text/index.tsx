import React, { ReactNode } from 'react';
import './index.scss';

export type IconWithText = {
    icon: ReactNode;
    text: string;
    className?: string;
};
export const IconWithText = ({ icon, text, className }: IconWithText) => {
    return (
        <div className={`wrapper-icon ${className}`}>
            {icon}
            <p className="icon-desc">{text}</p>
        </div>
    );
};
