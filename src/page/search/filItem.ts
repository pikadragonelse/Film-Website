export type Option = {
    label: string,
    value: any,
}

export type QueryFilter = 'sort' | 'nation' | 'year' | 'genre' | 'isSeries';

export type FilterItem = {
    placeholder?: string,
    query?: QueryFilter,
    options: Option[],
}


export const items: FilterItem[] = [
    {
        placeholder: 'Tiêu chí',
        query: 'sort',
        options:[{
            "label":"Phim mới nhất",
            "value":"newest",
        },
        {
            "label":"Đánh giá phim",
            "value":"highRated"
        },
        {
            "label":"Lượt yêu thích",
            "value":"highFavorited"
        }]
    },
    {
        placeholder: 'Loại phim',
        query: 'isSeries',
        options:[
            {
                "label":"Phim bộ",
                "value":true
            },
            {
                "label":"Phim lẻ",
                "value":false
            }
        ]
    },
    {
        placeholder: 'Thể loại',
        query: 'genre',
        options:[
            {
                "label":"Hành Động",
                "value":1
            },
            {
                "label":"Hài kịch",
                "value":2
            },
            {
                "label":"Khoa học viễn tưởng",
                "value":3
            },
            {
                "label":"Tình cảm",
                "value":4
            },
            {
                "label":"Kinh dị",
                "value":5
            },
            {
                "label":"Phiêu lưu",
                "value":6
            },
            {
                "label":"Hoạt hình",
                "value":7
            },
            {
                "label": "Tiên hiệp",
                "value":8
            },
            {
                "label": "Tội phạm",
                "value":9
            },
            {
                "label":"Lãng mạn",
                "value":10
            }

        ]
          
    },
    {
        placeholder: 'Quốc gia',
        query: 'nation',
        options:[
            {
                "label":"America",
                "value":"America"
            },
            {
                "label":"Trung Quốc",
                "value":"Trung Quốc"
            },
            {
                "label":"Hàn Quốc",
                "value":"Hàn Quốc"
            },
            {
                "label":"Thái Lan",
                "value":"Thái Lan"
            },
            {
                "label":"Mỹ",
                "value":"Mỹ"
            }
        ]
    },
    {
        placeholder: 'Năm sản xuất',
        query: 'year',
        options:[
            {
                "label":"Năm 2023",
                "value":2023
            },
            {
                "label":"Năm 2022",
                "value":2022
            },
            {
                "label":"Năm 2021",
                "value":2021
            },
            {
                "label":"Năm 2019",
                "value":2019
            }
        ]
    }
]
