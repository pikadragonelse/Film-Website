import { Avatar, Col, Row, Typography, Carousel } from 'antd';
import './index.scss';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { CarouselRef } from 'antd/es/carousel';
import { Link } from 'react-router-dom';

const { Text } = Typography;

export type ActorFamousInfo = {
    actorId?: number;
    name: string;
    avatar: string;
};

interface ActorFamousProps {
    actors: ActorFamousInfo[];
}

export const ActorFamous = ({ actors }: ActorFamousProps) => {
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
            <Text className="text-white text-[22px] font-medium ml-20 mt-4">Người nổi tiếng</Text>
            <Carousel className="ml-[68px] mb-10 mr-14 mt-4" ref={actorRef} dots={false}>
                {multipleActorRows.map((actorRows, index) => (
                    <div key={index}>
                        <Row gutter={[0, 16]} className="flex gap-5">
                            {actorRows.map((actor) => (
                                <Link
                                    to={`/actor/${actor.actorId}`}
                                    key={actor.actorId}
                                    className="flex flex-col flex-wrap content-start gap-2 "
                                >
                                    <Avatar
                                        className="hover:border-4 hover:border-red-800"
                                        src={actor.avatar}
                                        size={150}
                                    />
                                    <Text className="actor-famous__name text-center mt-4 hover:text-red-800">
                                        {actor.name}
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
