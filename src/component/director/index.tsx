import { ShareAltOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { TabItem } from './director-tag-item';
import './index.scss';
import { TabContent } from './director-tag-content/index';
import { FilmItem } from '../film-item';
import { useParams } from 'react-router';
interface TabsProps {
    color: string;
}
interface DirectorInfo {
    name: string;
    gender: string;
    avatar: string;
    dateOfBirth: string;
    description: string;
}

export const Director: React.FC<TabsProps> = ({ color }) => {
    const [openTab, setOpenTab] = useState(1);
    const [activeTab, setActiveTab] = useState(1);
    const { directorId } = useParams();
    const [directorInfo, setDirectorInfo] = useState<DirectorInfo | null>(null);
    const [films, setFilms] = useState<Array<FilmItem>>([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/individuals/directors/${directorId}`)
            .then((response) => response.json())
            .then((data) => {
                setDirectorInfo(data.data);
                setFilms(data.data.movies);
            })
            .catch((error) => console.error('Error:', error));
    }, [directorId]);

    console.log('directorInfo', directorInfo);

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
            {directorInfo && (
                <div>
                    <div className="container-director__header"></div>
                    <div className="flex rounded-lg p-10 ml-14">
                        <div className="">
                            <img
                                className="h-52 w-52 bg-white p-2 rounded-full shadow mb-4"
                                src={directorInfo.avatar}
                                alt=""
                            />
                        </div>
                        <div className="my-3 ml-12">
                            <p className="font-semibold" style={{ fontSize: '2.4rem' }}>
                                {directorInfo.name}
                            </p>
                            <div className="text-base  text-[#989898] flex mt-4">
                                {directorInfo.description}
                            </div>

                            <div className="flex mt-6 text-base">
                                <div>
                                    <span className="text-[#989898] mr-4">
                                        {directorInfo.gender}
                                    </span>
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
                                        {formatDate(directorInfo.dateOfBirth)}
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
                                                filmMap={films}
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
