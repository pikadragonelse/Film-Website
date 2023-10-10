import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, List, Space } from 'antd';
import './index.scss';
const data = Array.from({ length: 23 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `User ${i}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    description: 'Nhận xét về phim.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const FilmDetailReview: React.FC = () => (
    <List
        itemLayout="vertical"
        size="large"
        pagination={{
            onChange: (page) => {
                console.log(page);
            },
            pageSize: 2,
        }}
        dataSource={data}
        renderItem={(item) => (
            <List.Item
                key={item.title}
                actions={[
                    <IconText
                        icon={StarOutlined}
                        text="156"
                        key="list-vertical-star-o"
                    />,
                    <IconText
                        icon={LikeOutlined}
                        text="156"
                        key="list-vertical-like-o"
                    />,
                    <IconText
                        icon={MessageOutlined}
                        text="2"
                        key="list-vertical-message"
                    />,
                ]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                />
                <div style={{ color: '#fff' }}>{item.content}</div>
            </List.Item>
        )}
    />
);

export default FilmDetailReview;
