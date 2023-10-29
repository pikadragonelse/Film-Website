import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebouced } from '../../../redux/hook';

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

    const debouncedValue: string = useDebouced(searchValue, 500);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && debouncedValue.trim() !== '') {
            setSearchValue('');
            navigate('/search', {
                state: { searchValue: debouncedValue },
                // state: { searchValue: encodeURIComponent(debouncedValue) },
            });
        }
    };
    const handleSearch = () => {
        if (debouncedValue.trim() !== '') {
            setSearchValue('');
            navigate('/search', {
                // state: { searchValue: encodeURIComponent(debouncedValue) },
                state: { searchValue: debouncedValue },
            });
            // navigate(`/search?query=${encodeURIComponent(debouncedValue)}`);
        }
    };
    const handleClear = () => {
        setSearchValue('');
        if (valueRef.current) {
            valueRef.current.focus();
        }
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setShowbtnLoading(false);
            return;
        } else {
            setShowbtnLoading(true);
        }

        const timeoutId = setTimeout(() => {
            setShowbtnClear(true);
            setShowbtnLoading(false);
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [debouncedValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                valueRef.current &&
                !valueRef.current.contains(event.target as Node)
            ) {
                setSearchValue('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
