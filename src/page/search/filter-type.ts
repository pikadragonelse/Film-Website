import axios from 'axios';
import { endpoint } from '../../utils/baseUrl';

export type Option = {
    label: string;
    value: any;
};

export type QueryFilter = 'sort' | 'nation' | 'year' | 'genre' | 'isSeries';

export type FilterItem = {
    placeholder?: string;
    query?: QueryFilter;
    options: Option[];
};

export const defaultFilterItems: FilterItem[] = [
    {
        placeholder: 'Tiêu chí',
        query: 'sort',
        options: [
            {
                label: 'Phim mới nhất',
                value: 'newest',
            },
            {
                label: 'Đánh giá phim',
                value: 'highRated',
            },
            {
                label: 'Lượt yêu thích',
                value: 'highFavorited',
            },
        ],
    },
    {
        placeholder: 'Loại phim',
        query: 'isSeries',
        options: [
            {
                label: 'Phim bộ',
                value: true,
            },
            {
                label: 'Phim lẻ',
                value: false,
            },
        ],
    },
];
