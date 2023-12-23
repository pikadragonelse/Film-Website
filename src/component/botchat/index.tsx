import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import {
    CloseCircleOutlined,
    CloseOutlined,
    MinusOutlined,
    SendOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Logo } from '../../asset/icon/logo';
import { Avatar } from 'antd';
import { request } from '../../utils/request';
import Cookies from 'js-cookie';

interface botchatProp {
    onClose: () => void;
}
export const Botchat = ({ onClose }: botchatProp) => {
    const ref = useRef<any>(null);
    const [question, setQuestion] = useState<string>('');
    const [messages, setMessages] = useState<{ question?: string; answer?: string | any }[]>(() => {
        const savedMessages = Cookies.get('historyMessenger');
        return savedMessages
            ? JSON.parse(savedMessages)
            : [{ answer: 'Tôi có thể giúp gì cho bạn?' }];
    });
    const LoadingSpinner = () => (
        <div className="loading-spinner flex gap-1 pt-2">
            <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
        </div>
    );
    const postAnswer = async (ques: string) => {
        try {
            setMessages((prevState) => [
                ...prevState,
                { question: `${ques}`, answer: <LoadingSpinner /> },
            ]);
            const response = await request.post('chat', {
                history: messages,
                question: `${ques}`,
            });
            const data = response.data.data;
            setMessages((prevState) => {
                const updatedMessages = [...prevState];
                const lastMessageIndex = updatedMessages.length - 1;
                updatedMessages[lastMessageIndex] = {
                    ...updatedMessages[lastMessageIndex],
                    answer: data,
                };

                return updatedMessages;
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSendMessage = () => {
        if (question.trim() !== '') {
            postAnswer(question);
            setQuestion('');
        }
    };
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
        Cookies.set('historyMessenger', JSON.stringify(messages), { expires: 1 });
    }, [messages]);
    const [timeStart, setTimeStart] = useState<string>('');
    useEffect(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        setTimeStart(`${hours}:${minutes}`);
    }, []);

    return (
        <div className="message-box">
            <div className="header-box">
                <Logo />
                <CloseOutlined style={{ fontSize: '20px' }} onClick={onClose} />
            </div>

            <div className="message-list" ref={ref}>
                <div className="header-avt">
                    <Avatar
                        size={96}
                        src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"
                        style={{ backgroundColor: 'white' }}
                    />
                    <h1 className="admin-box">MovTime</h1>
                    <p>Hãy cho chúng tôi biết bạn cần gì nhé.</p>
                    <p>Chúng tôi rất vui khi được hỗ trợ cho bạn.</p>
                </div>
                <p className="flex justify-center"> {timeStart}</p>
                {messages.map((mess, index) => (
                    <div key={index} className={'message'}>
                        {mess.question && (
                            <div className="user">
                                <div className={`message user`}>{mess.question}</div>
                                <Avatar
                                    size={36}
                                    icon={<UserOutlined />}
                                    style={{ backgroundColor: '#87d068' }}
                                />
                            </div>
                        )}
                        {mess.answer && (
                            <div className="bot">
                                <Avatar
                                    size={36}
                                    src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"
                                    style={{ backgroundColor: 'white' }}
                                />

                                <div className={`message bot`}>{mess.answer}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="input-box">
                <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
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