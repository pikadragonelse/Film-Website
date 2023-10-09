import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const FilmDetailEpisodes: React.FC = () => (
    <>
        <p style={{ marginTop: '18px', fontSize: '1.2rem', color: '#989898' }}>
            Tổng số tập : 3
        </p>
        <div className="grid grid-cols-4 gap-12">
            <Card
                hoverable
                style={{
                    width: 200,
                    marginTop: '20px',
                }}
                cover={
                    <img
                        alt="example"
                        src="https://image.tmdb.org/t/p/original/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg"
                    />
                }
            >
                <Meta title="Elemental" description="Tập 1" />
            </Card>
            <Card
                hoverable
                style={{
                    width: 200,
                    marginTop: '20px',
                }}
                cover={
                    <img
                        alt="example"
                        src="https://image.tmdb.org/t/p/original/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg"
                    />
                }
            >
                <Meta title="Elemental" description="Tập 2" />
            </Card>
            <Card
                hoverable
                style={{
                    width: 200,
                    marginTop: '20px',
                }}
                cover={
                    <img
                        alt="example"
                        src="https://image.tmdb.org/t/p/original/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg"
                    />
                }
            >
                <Meta title="Elemental" description="Tập 3" />
            </Card>
        </div>
    </>
);

export default FilmDetailEpisodes;
