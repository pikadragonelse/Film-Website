import { CloseOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Logo, LogoIcon } from '../../asset/icon/logo';
import './index.scss';

interface botchatProp {
    onClose: () => void;
}
interface Message {
    id: number;
    text: string;
    sender: string;
}

const message = [
    {
        id: 1,
        text: 'Xin chào! Tôi có thể giúp gì cho bạn?',
        sender: 'bot',
    },
    {
        id: 2,
        text: 'Tôi muốn biết thông tin về phim.',
        sender: 'user',
    },
    {
        id: 3,
        text: 'Bạn có thể giới thiệu một bộ phim hay không?',
        sender: 'user',
    },
    {
        id: 4,
        text: 'Tất nhiên! Dưới đây là một bộ phim hay:',
        sender: 'bot',
    },
    {
        id: 5,
        text: 'Tên phim: Tên phim 1',
        sender: 'bot',
    },
    {
        id: 6,
        text: 'Nội dung: Mô tả nội dung của bộ phim 1.',
        sender: 'bot',
    },
    {
        id: 7,
        text: 'Đạo diễn: Đạo diễn phim 1',
        sender: 'bot',
    },
];

export const Botchat = ({ onClose }: botchatProp) => {
    const ref = useRef<any>(null);
    const [messages, setMessages] = useState<Message[]>(message);
    const [newMessage, setNewMessage] = useState<string>('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const newId = messages.length + 1;
            setMessages([...messages, { id: newId, text: newMessage, sender: 'user' }]);
            setNewMessage('');
        }
    };
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="message-box">
            <div className="header-box">
                <Logo />

                <CloseOutlined style={{ fontSize: '20px' }} onClick={onClose} />
            </div>
            <div className="message-list" ref={ref}>
                {messages.map((mess) => (
                    <div key={mess.id} className={'message '}>
                        {mess.sender === 'bot' && (
                            <div className="bot">
                                <Avatar
                                    size={36}
                                    icon={<LogoIcon />}
                                    style={{ backgroundColor: 'white' }}
                                />
                                <div className={`message bot`}>{mess.text}</div>
                            </div>
                        )}
                        {mess.sender === 'user' && (
                            <div className="user">
                                <div className={`message user`}>{mess.text}</div>
                                <Avatar
                                    size={36}
                                    icon={<UserOutlined />}
                                    style={{ backgroundColor: '#87d068' }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="input-box">
                <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <SendOutlined
                    style={{ fontSize: '20px', color: '#ccc' }}
                    onClick={handleSendMessage}
                />
            </div>
        </div>
    );
};
