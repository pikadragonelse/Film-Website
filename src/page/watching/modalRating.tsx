import { Rate, Space } from 'antd';
import Cookies from 'js-cookie';
import { request } from '../../utils/request';
import './index.scss';
interface ratingProp {
    movieId: number;
    rating: number;
}
const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Hay', 'Rất hay'];
export const ModalRating = ({ movieId, rating }: ratingProp) => {
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const handleRating = async (newValue: number) => {
        try {
            const response = await request.post(
                'ratings/create',
                {
                    movieId: movieId,
                    rating: newValue,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            const data = response.data;
            console.log(data);
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <Space>
            <Rate tooltips={desc} onChange={(e) => handleRating(e)} value={rating} />
        </Space>
    );
};
