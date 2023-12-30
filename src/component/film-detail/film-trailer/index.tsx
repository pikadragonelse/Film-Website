import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import React from 'react';

const { Panel } = Collapse;

const FilmDetailTrailer: React.FC<{ filmDetail: { trailerURL: string } }> = ({ filmDetail }) => {
    const { token } = theme.useToken();

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        marginTop: -10,
        background: token.colorFillAlter,
        marginLeft: -10,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    return (
        <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            style={{
                background: token.colorBgContainer,
                marginTop: '26px',
                backgroundColor: 'var(--main-color)',
            }}
        >
            <Panel header="Trailer" key="1" style={panelStyle}>
                <p className="overall-info">
                    <video controls width="65%" height="auto" style={{ maxWidth: '100%' }}>
                        <source src={filmDetail.trailerURL} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </p>
            </Panel>
        </Collapse>
    );
};

export default FilmDetailTrailer;
