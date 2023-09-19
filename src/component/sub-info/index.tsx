import React from 'react';

export type SubInfo = { title: string; content: string };
export const SubInfo = () => {
    return (
        <div className="watching-sub-info-item">
            <span className="watching-sub-info-item-title">Diễn viên:</span>
            &nbsp;
            <span className="watching-sub-info-item-content">
                Monkey.D Luffy, Rononoa Zoro, Chopper, Usopp, Brook, Franky,
                Robin, Nami, Jinbei, Sanji
            </span>
        </div>
    );
};
