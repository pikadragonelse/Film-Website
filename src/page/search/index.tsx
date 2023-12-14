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
    const { search } = useLocation();
    const [searchResults, setSearchResults] = useState<FilmItem[]>([]);
    const [amountMovies, setAmountMovies] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [filterParamsInitial, setFilterParamsInitial] = useState<Record<string, string>>({});

    const handleSearchParamsFromURL = () => {
        let searchValue = search.split('?')[1];
        searchValue = searchValue.split('#')[0];
        let objParams = {};
        let arr = searchValue.split('&');
        arr.forEach((item) => {
            const obj: Record<string, string> = {};
            obj[item.split('=')[0]] = item.split('=')[1];
            objParams = { ...obj };
        });
        setFilterParamsInitial(objParams);
    };

    useEffect(() => {
        handleFilterClick();
        handleSearchParamsFromURL();
    }, [search]);

    const [selectedOptionsMap, setSelectedOptionsMap] = useState<{
        [key: string]: Option[];
    }>({});

    const onChange = (selectedOptions: Option[], cascaderName: string) => {
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
        const filterParams: { [key: string]: any } = { ...filterParamsInitial };

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
            const response = await request.get(`movies?page=1&pageSize=12&sortBy=DESC`, {
                params: filterParams,
            });

            console.log(response.request.responseURL);

            const data = response.data.movies;
            setSearchResults(data);
            setAmountMovies(response.data.totalCount);
        } catch (error) {
            console.log(error);
        }
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
                                onChange={(_, selectedOptions) =>
                                    onChange(selectedOptions, cascaderName)
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
                <PaginationFilm
                    title={`Kết quả tìm kiếm`}
                    number={4}
                    listFilm={searchResults}
                    amountMovies={amountMovies}
                    currPage={currPage}
                    setCurrPage={setCurrPage}
                />
            ) : (
                <p>Không tìm thấy kết quả phù hợp.</p>
            )}
        </div>
    );
};
