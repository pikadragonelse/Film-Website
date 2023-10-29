import { ShareAltOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { TabItem } from './director-tag-item';
import './index.scss';
import { TabContent } from './director-tag-content/index';
import { FilmItem } from '../film-item';
interface TabsProps {
    color: string;
}

const filmMap: Array<FilmItem> = [
    {
        name: 'Film 3',
        yearOfManufacture: 2022,
        category: ['Hành động'],
        poster: 'https://image.tmdb.org/t/p/original/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg',
    },
    {
        name: 'Film 4',
        yearOfManufacture: 2022,
        category: ['Hành động'],
        poster: 'https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg',
    },
    {
        name: 'Film 5',
        yearOfManufacture: 2022,
        category: ['Hành động'],
        poster: 'https://image.tmdb.org/t/p/original/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
    },
    {
        name: 'Film 6',
        yearOfManufacture: 2022,
        category: ['Hành động'],
        poster: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    },
    {
        name: 'Film 7',
        yearOfManufacture: 2022,
        category: ['Tình cảm'],
        poster: 'https://image.tmdb.org/t/p/original/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg',
    },
    {
        name: 'Film 8',
        yearOfManufacture: 2022,
        category: ['Tình cảm'],

        poster: 'https://image.tmdb.org/t/p/original/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg',
    },
    {
        name: 'Film 9',
        yearOfManufacture: 2022,
        category: ['Tình cảm'],

        poster: 'https://image.tmdb.org/t/p/original/iOJX54nVAsnPawagFiWXKv1Y6sB.jpg',
    },
    {
        name: 'Film 10',
        yearOfManufacture: 2022,
        category: ['Tình cảm'],
        poster: 'https://image.tmdb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    },
    {
        name: 'Film 11',
        yearOfManufacture: 2022,
        category: ['Tình cảm'],
        poster: 'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    },
    {
        name: 'Film 12',
        yearOfManufacture: 2022,
        category: ['Tình cảm'],
        poster: 'https://image.tmdb.org/t/p/original/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg',
    },
    {
        name: 'Film 13',
        yearOfManufacture: 2021,
        category: ['Kinh dị'],
        poster: 'https://image.tmdb.org/t/p/original/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg',
    },
    {
        name: 'Film 14',
        yearOfManufacture: 2022,
        category: ['Kinh dị'],
        poster: 'https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
    },
    {
        name: 'Film 15',
        yearOfManufacture: 2022,
        category: ['Kinh dị'],
        poster: 'https://image.tmdb.org/t/p/original/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg',
    },
    {
        name: 'Film 22',
        yearOfManufacture: 2022,
        category: ['Kinh dị'],
        poster: 'https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg',
    },
    {
        name: 'Film 32',
        yearOfManufacture: 2022,
        category: ['Kinh dị'],
        poster: 'https://image.tmdb.org/t/p/original/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
    },
    {
        name: 'Film 42',
        yearOfManufacture: 2022,
        category: ['Kinh dị'],
        poster: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    },
];

export const Director: React.FC<TabsProps> = ({ color }) => {
    const [openTab, setOpenTab] = useState(1);
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber: number) => {
        setOpenTab(tabNumber);
        setActiveTab(tabNumber);
    };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const tabContents = [
        { id: 'botacpham', isActive: openTab === 1 },
        { id: 'noidungdacsac', isActive: openTab === 2 },
        { id: 'nhanvatlienquan', isActive: openTab === 3 },
    ];

    const tabsData = [
        { id: 1, label: 'Bộ tác phẩm', href: '#botacpham' },
        { id: 2, label: 'Nội dung đặc sắc', href: '#noidungdacsac' },
        { id: 3, label: 'Nhân vật liên quan', href: '#nhanvatlienquan' },
    ];

    return (
        <>
            <div className="container-director__header"></div>
            <div className="flex rounded-lg p-10 ml-20">
                <div className="">
                    <img
                        className="h-52 w-52 bg-white p-2 rounded-full shadow mb-4"
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2000&amp;q=80"
                        alt=""
                    />
                </div>
                <div className="my-3 ml-12">
                    <p className="font-semibold" style={{ fontSize: '2.4rem' }}>
                        John Doe
                    </p>
                    <div className="text-lg  text-gray-400 flex mt-4">
                        Los Angeles, California
                    </div>

                    <div className="flex mt-4">
                        <div className="font-semibold ">
                            <span className="text-gray-400 mr-4">Nam</span>
                            {'|'}
                        </div>
                        <div className="font-semibold mx-4">
                            <span className="text-gray-400 mr-4">Đạo diễn</span>
                            {'|'}
                        </div>
                        <div className="font-semibold mx-4">
                            <span className="text-gray-400">Việt Nam</span>
                        </div>
                    </div>

                    <button className="btn-share" onClick={showModal}>
                        <ShareAltOutlined />
                        <p>Chia sẻ</p>
                    </button>
                    <Modal
                        title="Chia sẻ"
                        visible={isModalVisible}
                        footer={null}
                        onCancel={handleCancel}
                        width={450}
                    >
                        <a
                            className="modal-item"
                            href="https://www.facebook.com/"
                        >
                            <img
                                className="modal-img"
                                src="https://www.iqiyipic.com/common/fix/global/fb.png"
                                alt="facebook"
                            />
                            Facebook
                        </a>
                        <a className="modal-item">
                            <img
                                className="modal-img"
                                src="https://www.iqiyipic.com/common/fix/global/copylink.png"
                                alt="addresss"
                            />
                            Sao chép liên kết
                        </a>
                    </Modal>
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <ul
                        style={{
                            width: '40%',
                            marginLeft: '120px',
                        }}
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                        role="tablist"
                    >
                        {tabsData.map((tab) => (
                            <TabItem
                                key={tab.id}
                                isActive={openTab === tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                href={tab.href}
                                label={tab.label}
                            />
                        ))}
                    </ul>

                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6  rounded">
                        <div className="px-4 py-5 flex-auto">
                            {tabContents.map((tabcontent) => (
                                <div
                                    className="tab-content tab-space"
                                    key={tabcontent.id}
                                >
                                    <TabContent
                                        isActive={tabcontent.isActive}
                                        id={tabcontent.id}
                                        filmMap={filmMap}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
