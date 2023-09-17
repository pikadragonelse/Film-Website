import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    LoadingOutlined,
    CloseOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import './index.scss';

export const Search = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [showbtnloading, setShowbtnLoading] = useState<boolean>(false);
    const [showbtnclear, setShowbtnClear] = useState<boolean>(false);
    const navigate = useNavigate();
    const valueRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
            console.log(searchValue);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            navigate('/timkiem');
        }
    };
    const handleSearch = () => {
        navigate('/timkiem');
    };
    const handleClear = () => {
        setSearchValue('');
        if (valueRef.current) {
            valueRef.current.focus();
        }
    };

    useEffect(() => {
        if (!searchValue.trim()) {
            setShowbtnLoading(false);
            return;
        } else {
            setShowbtnLoading(true);
        }

        const timeoutId = setTimeout(() => {
            setShowbtnClear(true);
            setShowbtnLoading(false);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchValue]);

    return (
        <div className="search">
            <input
                ref={valueRef}
                value={searchValue}
                spellCheck={false}
                placeholder="Search"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            {showbtnloading && (
                <button className="loading-search">
                    <LoadingOutlined />
                </button>
            )}
            {!!searchValue && !showbtnloading && (
                <CloseOutlined className="clear-search" onClick={handleClear} />
            )}
            <button className="search-btn" onClick={handleSearch}>
                <SearchOutlined />
            </button>
        </div>
    );
};
