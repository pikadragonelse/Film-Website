import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import './index.scss';

export const Search = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const navigate = useNavigate();
    const valueRef = useRef<HTMLInputElement | null>(null);

<<<<<<< HEAD
=======

    const debouncedValue: string = useDebounced(searchValue, 50);


>>>>>>> bdfd244fee9788dc7e4c5790c0d2463792aa43ac
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleSearch = () => {
        if (searchValue.trim() !== '') {
            navigate({
                pathname: '/search',
                search: `search=${encodeURIComponent(searchValue)}`,
            });
        }
    };

    const handleClear = () => {
        setSearchValue('');

        if (valueRef.current) {
            valueRef.current.focus();
        }
    };

    return (
        <div className="search">
            <input
                ref={valueRef}
                value={searchValue}
                spellCheck={false}
                placeholder="Search"
                onChange={handleChange}
                onKeyDown={(event) => (event.key === 'Enter' ? handleSearch() : undefined)}
            />

            {!!searchValue && <CloseOutlined className="clear-search" onClick={handleClear} />}
            <button className="search-btn" onClick={handleSearch}>
                <SearchOutlined />
            </button>
        </div>
    );
};
