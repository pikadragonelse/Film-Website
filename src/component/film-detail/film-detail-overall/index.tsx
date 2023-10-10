import { CaretRightOutlined } from '@ant-design/icons';
import type { CSSProperties } from 'react';
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';
import './index.scss';
const text = `
Liên Hoa Lâu là một bộ phim võ hiệp trinh thám do Quách Hổ và Nhậm Hải Đào đạo diễn, với sự tham gia của các diễn viên Thành Nghị, Tăng Thuấn Hy, Tiêu Thuận Nghiêu. Bộ phim được chuyển thể từ tiểu thuyết  Liên Hoa Lầu Cát Tường của Tùng Bình, kể về Lý Tương Di - Môn chủ Tứ Cố Môn nổi tiếng trong võ lâm, sau một trận chiến lớn bị thương nặng và từ đó lui về làm một lang trung không thèm quan tâm danh vọng. Trong cuộc gặp gỡ người bạn mới Phương Đa Bệnh và Địch Phi Thanh - kẻ thù cũ, Tương Di quyết định trở lại giang hồ một lần nữa. Mười năm trước, Lý Tương Di (do Thành Nghị thủ vai) - Chủ Môn phái Tứ Cố Môn, với thanh kiếm Tương Di Đại Kiếm vô song thiên hạ, trở thành ánh sáng của võ lâm chính đạo. Nhưng vì chiến hẹn Đông Hải với Địch Phi Thanh (Tiêu Thuận Nghiêu thủ vai) -Minh Chủ Kim Oanh Môn, hai cao thủ này biến mất khỏi giang hồ. Tứ Cố Môn và Kim Oanh Môn cũng dần dần biến mất khỏi giang hồ. Mười năm sau đó, Lý Liên Hoa (do Thành Nghị thủ vai) - một y sĩ lang thang trong làng, nhận được danh hiệu danh y. Ông không hề muốn tham gia giang hồ nhưng lại bị cuốn vào. Phương Đa Bệnh (do Tăng Thuấn Hy thủ vai) - thiếu gia nhiệt huyết với ước mơ công lý, nhận ra Lý Liên Hoa không đơn giản như vậy và quyết tìm ra bằng chứng về việc Lý Liên Hoa mạo danh danh y. Địch Phi Thanh, người luôn coi Lý Tương Di là đối thủ mạnh, sau khi trở lại giang hồ, không nhận ra Lý Tương Di. Sau một chuỗi vụ án, ba người họ đã xây dựng một tình bạn sâu sắc chỉ bằng mồm mép và trào phúng khi phá án. Lý Liên Hoa, ban đầu không quan tâm đến giang hồ, vì Địch Phi Thanh, cùng với sự lôi kéo của Phương Đa Bệnh, lại lần nữa thắp lên niềm đam mê nhiệt huyết. Ba người họ cùng nhau chiến đấu, phá giải những vụ án kỳ quái trong giang hồ, gìn giữ công lý và hòa bình thế giới.
`;

const detail = `Chi tiết`;
const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (
    panelStyle,
) => [
    {
        key: '1',
        label: 'Mô tả chi tiết',
        children: <p style={{ color: '#989898' }}>{text}</p>,
        style: panelStyle,
    },
    {
        key: '2',
        label: 'Thông tin khác',
        children: <p style={{ color: '#989898' }}>{detail}</p>,
        style: panelStyle,
    },
];

const FilmDetailOverall: React.FC = () => {
    const { token } = theme.useToken();

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    return (
        <Collapse
            bordered={false}
            defaultActiveKey={['1', '2']}
            expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{
                background: token.colorBgContainer,
                marginTop: '26px',
                backgroundColor: 'var(--main-color)',
            }}
            items={getItems(panelStyle)}
        />
    );
};

export default FilmDetailOverall;
