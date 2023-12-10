import items from './filItem.json';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Cascader } from 'antd';
import { FilmItem } from '../../component/film-item';
import './index.scss';
import { PaginationFilm } from '../../component/pagination-film';
import { request } from '../../utils/request';

interface Option {
    value?: string | number | null | boolean;
    label: React.ReactNode;
    children?: Option[];
}

export const SearchPage: React.FC = () => {
    const location = useLocation();
    const { searchValue } = location.state;
    const [searchResults, setSearchResults] = useState<FilmItem[]>([]);
    const fetchedData = location.state?.fetchedData || [];
    const fetchData = async () => {
        try {
            const response = await request.get(
                `movies?search=${searchValue}&page=${1}&pageSize=${10000}`,
            );
            const data = response.data.movies;
            setSearchResults(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (fetchedData.length > 0) {
            setSearchResults(fetchedData);
        } else {
            fetchData();
        }
    }, [searchValue, fetchedData]);

    //lọc

    const [selectedOptionsMap, setSelectedOptionsMap] = useState<{
        [key: string]: Option[];
    }>({});

    const onChange = (
        value: (string | number | boolean | null)[],
        selectedOptions: Option[],
        cascaderName: string,
    ) => {
        const uniqueSelectedOptions = Array.from(new Set(selectedOptions));

        if (uniqueSelectedOptions.length === 0) {
            setSelectedOptionsMap((prevMap) => {
                const updatedMap = { ...prevMap };
                delete updatedMap[cascaderName];
                return updatedMap;
            });
        } else {
            setSelectedOptionsMap((prevMap) => ({
                ...prevMap,
                [cascaderName]: Array.isArray(prevMap[cascaderName])
                    ? [...prevMap[cascaderName], ...uniqueSelectedOptions]
                    : [...uniqueSelectedOptions],
            }));
        }
    };

    const handleFilterClick = async () => {
        const filterParams: { [key: string]: any } = {};

        for (const cascaderName in selectedOptionsMap) {
            if (selectedOptionsMap.hasOwnProperty(cascaderName)) {
                const latestOptions = selectedOptionsMap[cascaderName];
                const latestOption = latestOptions[latestOptions.length - 1];
                if (latestOption) {
                    switch (cascaderName) {
                        case 'sort':
                            filterParams['sort'] = latestOption.value;
                            break;
                        case 'isSeries':
                            filterParams['isSeries'] = latestOption.value;
                            break;
                        case 'genre':
                            filterParams['genre'] = latestOption.value;
                            break;
                        case 'nation':
                            filterParams['nation'] = latestOption.value;
                            break;
                        case 'year':
                            filterParams['year'] = latestOption.value;
                            break;
                    }
                }
            }
        }

        try {
            const response = await request.get(`movies?pageSize=${100}&sortBy=DESC`, {
                params: filterParams,
            });
            const data = response.data;
            console.log(data);

            setSearchResults(data);
        } catch (error) {
            console.log(error);
        }
        console.log(filterParams);
    };
    const params = ['sort', 'isSeries', 'genre', 'nation', 'year'];

    return (
        <div className="wrapper-searchPage">
            <div className="searchPage-header"></div>
            <div className="header-filter">
                {items.map((item, index) => {
                    const options = item.childrens.map((child) => ({
                        value: child.value,
                        label: child.label,
                    }));
                    const cascaderName = params[`${index}`];
                    return (
                        <div className="menu-label">
                            <Cascader
                                className="cascader-menu"
                                key={index}
                                options={options}
                                placeholder={item.label}
                                onChange={(value, selectedOptions) =>
                                    onChange(value, selectedOptions, cascaderName)
                                }
                            />
                        </div>
                    );
                })}
                <Button className="btn-filter" type="primary" onClick={handleFilterClick}>
                    Lọc phim
                </Button>
            </div>
            <hr className="my-6 border-neutral-800" />
            {searchResults.length !== 0 ? (
                <PaginationFilm title="Kết quả tìm kiếm" number={4} listFilm={searchResults} />
            ) : (
                <p>Không tìm thấy kết quả phù hợp.</p>
            )}
        </div>
    );
};
