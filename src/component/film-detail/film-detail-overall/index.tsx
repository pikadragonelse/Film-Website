import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, Tooltip, theme } from 'antd';
import type { CSSProperties } from 'react';
import React from 'react';
import ReactPlayer from 'react-player';
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
                <div className="overall-info" style={{ width: '88%' }}>
                    <Tooltip title="Bấm vào xem ngay để thưởng thức bộ phim" placement="topRight">
                        <ReactPlayer url={filmDetail.trailerURL} controls playing={true} />
                    </Tooltip>
                </div>
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
