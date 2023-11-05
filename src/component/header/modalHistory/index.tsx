import React from 'react';
import { Avatar, List } from 'antd';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
];

export const ContentModalHistory: React.FC = () => (
    <div>
        <List
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item className="hover:bg-[#2c2e33] cursor-pointer py-2 ">
                    <List.Item.Meta
                        avatar={
                            <img
                                className="w-28 h-16"
                                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                                alt=""
                            />
                        }
                    />
                    <p className="text-[#989898] text-[13px] hover:text-[var(--primary-color)]">
                        Sếp Của Tôi Sao Lại Như Vậy
                    </p>
                </List.Item>
            )}
        />
        <Link
            to="/foryou"
            className="text-[#989898] text-[13px] flex justify-center mt-5 hover:text-[red]"
        >
            <div className="mr-2">Khác</div>
            <RightOutlined style={{ fontSize: '10px' }} />
        </Link>
    </div>
);
