import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';
import type { CSSProperties } from 'react';
import React from 'react';
import './index.scss';

export const FilmDetailOverall: React.FC<{ filmDetail: any }> = ({ filmDetail }) => {
    const { token } = theme.useToken();
    const descriptions = filmDetail.description || '';

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
        {
            key: '1',
            label: 'Mô tả chi tiết',
            children: (
                <p className="overall-info" style={{ width: '88%' }}>
                    {descriptions}
                </p>
            ),
            style: panelStyle,
        },

        {
            key: '2',
            label: 'Trailer',
            children: (
                <p className="overall-info">
                    <video controls width="620" height="400">
                        <source src={filmDetail.trailerURL} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </p>
            ),
            style: panelStyle,
        },
    ];

    return (
        <Collapse
            bordered={false}
            defaultActiveKey={['1', '2', '3']}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            style={{
                background: token.colorBgContainer,
                marginTop: '26px',
                backgroundColor: 'var(--main-color)',
            }}
            items={getItems(panelStyle)}
        />
    );
};