import React, { useState } from 'react';
import { Space, Rate } from 'antd';

const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Hay', 'Rất hay'];
export const ModalRating: React.FC = () => {
    const [value, setValue] = useState(3);

    return (
        <Space>
            <Rate tooltips={desc} onChange={setValue} value={value} />
            {/* {value ? <span>{desc[value - 1]}</span> : ''} */}
        </Space>
    );
};
