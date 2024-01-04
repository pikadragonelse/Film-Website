import { Rate, Space, notification } from 'antd';
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
        } catch (error: any) {
            console.log(error);
            if (error.response?.status === 403) {
                notification.warning({
                    message: 'Thông báo!',
                    description: 'Bạn đã đánh giá bộ phim này trước đó.',
                });
            }
        }
    };

    return (
        <Space>
            <Rate tooltips={desc} onChange={(e) => handleRating(e)} value={rating} />
        </Space>
    );
};
