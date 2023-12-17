import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Avatar, Carousel, Row, Typography } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const { Text } = Typography;

export type ActorFamousInfo = {
    actorId?: number;
    name: string;
    avatar: string;
    actor_id?: number;
};

interface ActorFamousProps {
    actors: ActorFamousInfo[];
    title?: string;
    size?: number;
    isShow?: boolean;
}

export const ActorFamous = ({ actors, title, size, isShow }: ActorFamousProps) => {
    const actorRef = useRef<CarouselRef>(null);
    const [actorPage, setActorPage] = useState<number>(1);
    const [actorMaxPage, setActorMaxPage] = useState<number>(1);
    const [multipleActorRows, setMultipleActorRows] = useState<ActorFamousInfo[][]>([]);

    useEffect(() => {
        const handledActorRows = handleSplitActorRows();
        setMultipleActorRows(handledActorRows);
        setActorMaxPage(handledActorRows.length);
    }, [actors]);

    const handleSplitActorRows = () => {
        let counts = 1;
        const actorRows: ActorFamousInfo[][] = [];
        let actorRow: ActorFamousInfo[] = [];

        actors.forEach((actor) => {
            actorRow.push(actor);

            if (counts % 8 === 0 || counts === actors.length) {
                actorRows.push(actorRow);
                actorRow = [];
            }
            counts++;
        });

        return actorRows;
    };

    return (
        <div className="mt-14 mb-14 actor-famous list">
            <Text className="text-white text-[22px] font-medium ml-20 mt-4">{title}</Text>
            <Carousel className="ml-[68px] mb-10 mr-10 mt-4" ref={actorRef} dots={false}>
                {multipleActorRows.map((actorRows, index) => (
                    <div key={index}>
                        <Row gutter={[0, 16]} className="flex gap-7">
                            {actorRows.map((actor) => (
                                <Link
                                    to={`/actor/${actor.actorId}`}
                                    key={actor.actorId}
                                    className="flex flex-col flex-wrap content-start gap-2 "
                                >
                                    <Avatar
                                        className="hover:border-[6px] hover:border-red-800 object-cover"
                                        src={actor.avatar}
                                        size={size}
                                    />
                                    <Text className="actor-famous__name text-center mt-4 hover:text-red-800">
                                        {actor.name}
                                    </Text>
                                    <Text className="!text-gray-500 opacity-100 text-[12px] text-center">
                                        {isShow && actor.actor_id
                                            ? 'Diễn viên'
                                            : isShow
                                            ? 'Đạo diễn'
                                            : null}
                                    </Text>
                                </Link>
                            ))}
                        </Row>
                    </div>
                ))}
            </Carousel>
            <div
                className={`icon-list-container right-move-container ${
                    actorPage === actorMaxPage ? 'hide' : ''
                }`}
                onClick={() => {
                    actorRef.current?.next();
                    setActorPage((prev) => prev + 1);
                }}
            >
                <RightOutlined className="icon-list cursor-pointer" />
            </div>
            <div
                className={`icon-list-container left-move-container ${
                    actorPage === 1 ? 'hide' : ''
                }`}
                onClick={() => {
                    actorRef.current?.prev();
                    setActorPage((prev) => prev - 1);
                }}
            >
                <LeftOutlined className="icon-list cursor-pointer" />
            </div>
        </div>
    );
};
