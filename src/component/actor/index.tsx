import { ShareAltOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { FilmItem } from '../film-item';
import { useParams } from 'react-router';
import { TabItem } from './actor-tag-item';
import { TabContent } from './actor-tag-content';
interface TabsProps {
    color: string;
}
interface ActorInfo {
    name: string;
    gender: string;
    avatar: string;
    dateOfBirth: string;
    description: string;
}
const filmMap: Array<FilmItem> = [
    {
        title: 'Film 3',
        releaseDate: '2022',
        genres: ['Hành động'],
        posterURL: 'https://image.tmdb.org/t/p/original/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg',
    },
    {
        title: 'Film 4',
        releaseDate: '2022',
        genres: ['Hành động'],
        posterURL: 'https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg',
    },
    {
        title: 'Film 5',
        releaseDate: '2022',
        genres: ['Hành động'],
        posterURL: 'https://image.tmdb.org/t/p/original/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
    },
    {
        title: 'Film 6',
        releaseDate: '2022',
        genres: ['Hành động'],
        posterURL: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    },
    {
        title: 'Film 7',
        releaseDate: '2022',
        genres: ['Tình cảm'],
        posterURL: 'https://image.tmdb.org/t/p/original/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg',
    },
    {
        title: 'Film 8',
        releaseDate: '2022',
        genres: ['Tình cảm'],

        posterURL: 'https://image.tmdb.org/t/p/original/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg',
    },
    {
        title: 'Film 9',
        releaseDate: '2022',
        genres: ['Tình cảm'],

        posterURL: 'https://image.tmdb.org/t/p/original/iOJX54nVAsnPawagFiWXKv1Y6sB.jpg',
    },
    {
        title: 'Film 10',
        releaseDate: '2022',
        genres: ['Tình cảm'],
        posterURL: 'https://image.tmdb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    },
    {
        title: 'Film 11',
        releaseDate: '2022',
        genres: ['Tình cảm'],
        posterURL: 'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    },
    {
        title: 'Film 12',
        releaseDate: '2022',
        genres: ['Tình cảm'],
        posterURL: 'https://image.tmdb.org/t/p/original/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg',
    },
    {
        title: 'Film 13',
        releaseDate: '2021',
        genres: ['Kinh dị'],
        posterURL: 'https://image.tmdb.org/t/p/original/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg',
    },
    {
        title: 'Film 14',
        releaseDate: '2022',
        genres: ['Kinh dị'],
        posterURL: 'https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
    },
    {
        title: 'Film 15',
        releaseDate: '2022',
        genres: ['Kinh dị'],
        posterURL: 'https://image.tmdb.org/t/p/original/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg',
    },
    {
        title: 'Film 22',
        releaseDate: '2022',
        genres: ['Kinh dị'],
        posterURL: 'https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg',
    },
    {
        title: 'Film 32',
        releaseDate: '2022',
        genres: ['Kinh dị'],
        posterURL: 'https://image.tmdb.org/t/p/original/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
    },
    {
        title: 'Film 42',
        releaseDate: '2022',
        genres: ['Kinh dị'],
        posterURL: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    },
];

export const Actor: React.FC<TabsProps> = ({ color }) => {
    const [openTab, setOpenTab] = useState(1);
    const [activeTab, setActiveTab] = useState(1);
    const { actorId } = useParams();
    const [actorInfo, setActorInfo] = useState<ActorInfo | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/individual/actor?actorId=${actorId}`)
            .then((response) => response.json())
            .then((data) => setActorInfo(data.data))
            .catch((error) => console.error('Error:', error));
    }, [actorId]);

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

    function formatDate(dateString: string) {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <>
            {actorInfo && (
                <div>
                    <div className="container-actor__header"></div>
                    <div className="flex rounded-lg p-10 ml-14">
                        <div className="">
                            <img
                                className="h-52 w-52 bg-white p-2 rounded-full shadow mb-4"
                                src={actorInfo.avatar}
                                alt=""
                            />
                        </div>
                        <div className="my-3 ml-12">
                            <p className="font-semibold" style={{ fontSize: '2.4rem' }}>
                                {actorInfo.name}
                            </p>
                            <div className="text-base text-[#989898] flex mt-4">
                                {actorInfo.description}
                            </div>

                            <div className="flex mt-6 text-base">
                                <div>
                                    <span className="text-[#989898] mr-4">{actorInfo.gender}</span>
                                    {'|'}
                                </div>
                                <div className="mx-4">
                                    <span className="text-[#989898] mr-4">Đạo diễn</span>
                                    {'|'}
                                </div>
                                <div>
                                    <span className="text-[#989898] mr-4">Việt Nam</span>
                                    {'|'}
                                </div>
                                <div className="mx-4">
                                    <span className="text-[#989898] ">
                                        {formatDate(actorInfo.dateOfBirth)}
                                    </span>
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
                                <a className="modal-item" href="https://www.facebook.com/">
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
                                    marginLeft: '90px',
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

                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded ">
                                <div className="px-4 py-5 flex-auto ">
                                    {tabContents.map((tabcontent) => (
                                        <div
                                            className="tab-content tab-space ml-[-30px]"
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
                </div>
            )}
        </>
    );
};
