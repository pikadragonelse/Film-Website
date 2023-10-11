import React, { useState, useEffect } from 'react';
import './index.scss';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';
import { CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { MainInfoFilm } from '../../component/main-info-film';
import { IconWithText } from '../../component/icon-with-text';
import { SubInfo } from '../../component/sub-info';
import { MenuProps } from 'antd';
import { FilmItem } from '../../component/film-item';
import { ListFilm } from '../../component/list-film';
import { PluginComment } from '../../component/plugin-comment';
import { Comment } from '../../component/comment';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CurrentUser } from '../../component/comment';
import { Film } from '../../model/film';
import { request } from '../../utils/request';

const subInfo: Array<SubInfo> = [
    {
        title: 'Diễn viên',
        content:
            'Monkey.D Luffy, Rononoa Zoro, Chopper, Usopp, Brook, Franky, Robin, Nami, Jinbei, Sanji',
    },
    {
        title: 'Thể loại',
        content: 'Anime',
    },
];

const items: MenuProps['items'] = [
    {
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.antgroup.com"
            >
                1st menu item
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.aliyun.com"
            >
                2nd menu item
            </a>
        ),
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item（disabled）',
        key: '3',
        disabled: true,
    },
];

const currentUser: CurrentUser = {
    username: 'user1',
    email: 'user1@gmail.com',
    avatar: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
};
export const WatchingPage = () => {
    const [homePageData, setHomePageData] = useState<Film[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request.get('movies?', {
                    params: {
                        isSeries: 'true',
                        page: 1,
                        pageSize: 6,
                    },
                });
                const data = response.data;
                setHomePageData(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const isLogin = useSelector((state: RootState) => state.user.isLogin);
    console.log(isLogin);
    const [playTime, setPlayTime] = useState(0);

    const handleProgress = (state: OnProgressProps) => {
        setPlayTime(state.playedSeconds);
    };

    return (
        <div className="watching-container">
            <div className="watching-player-container">
                <ReactPlayer
                    url="http://127.0.0.1:9000/movies/%5BTRAILER%5D%20C%E1%BB%ADu%20Ngh%C4%A9a%20Nh%C3%A2n%20-%20Ng%C3%B4%20Thi%E1%BA%BFn%20%26%20L%C3%BD%20Gia%20H%C3%A0ng%20-%20Phim%20C%E1%BB%95%20Trang%20Trung%20Qu%E1%BB%91c%20-%20WeTV.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=VRYVN5E5A9XN7P85YM4M%2F20231011%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231011T130048Z&X-Amz-Expires=604800&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJWUllWTjVFNUE5WE43UDg1WU00TSIsImV4cCI6MTY5NzA3MjQzNywicGFyZW50IjoiYWRtaW4ifQ.Mx6SeRNIjx28zaIatUvlLvS7aJpFQn53nlEkoU16YV0WAeqG6Haka9Zara0CHWDDaq_tQE2cRIg2zwHYgPvjpA&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=bcd82189f60499a993fe543ae9db52895396bf1bc228616d92cecb8e94cb9c85"
                    controls={true}
                    onProgress={handleProgress}
                    className="watching-player"
                    width="100%"
                    height={640}
                />
            </div>
            <div className="watching-info-container">
                <MainInfoFilm
                    className="watching-main-info-container"
                    name="One piece"
                    hashtag={['Anime', '2023', 'HD']}
                    desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    view={30000000}
                    episode={1}
                />

                <div className="watching-sub-info-container">
                    <div className="watching-feature">
                        <IconWithText
                            icon={
                                <CommentOutlined className="watching-feature-icon" />
                            }
                            text="Bình luận"
                        />
                        <IconWithText
                            icon={
                                <ShareAltOutlined className="watching-feature-icon" />
                            }
                            text="Chia sẻ"
                        />
                    </div>
                    <div className="watching-sub-info">
                        {subInfo.map((value) => (
                            <SubInfo
                                title={value.title}
                                content={value.content}
                                className="watching-sub-info-item"
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="watching-list-film-container">
                <ListFilm
                    title="Danh sách tập"
                    subInfo={['16/16', 'Phát sóng lúc 20h thứ 7 hàng tuần']}
                    sessions={items}
                    multiSessions
                    listFilm={homePageData}
                />
                <ListFilm title="Phim liên quan" listFilm={homePageData} />
            </div>
            {/* <div className="box-comment" id="tabs-facebook">
                <PluginComment dataHref="http://localhost:3000/watching" />
            </div> */}
            <div className="comment-container">
                <Comment
                    title="Comments"
                    isLogin={isLogin}
                    currentUser={currentUser}
                    placeholder="Write a comment..."
                />
            </div>
        </div>
    );
};
