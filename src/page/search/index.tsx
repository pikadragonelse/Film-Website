import { QueryFilter, items } from './filItem';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ConfigProvider, Select, Spin } from 'antd';
import { FilmItem } from '../../component/film-item';
import './index.scss';
import { PaginationFilm } from '../../component/pagination-film';
import axios from 'axios';
import { FilterParams } from '../../model/filter-params';
import { handleSearchParams } from '../../utils/handle-search-params';
import { convertParams } from '../../utils/convert-prams';
import { LoadingOutlined } from '@ant-design/icons';
import { endpoint } from '../../utils/baseUrl';

export const SearchPage: React.FC = () => {
    const { search } = useLocation();
    const [searchResults, setSearchResults] = useState<FilmItem[]>([]);
    const [amountMovies, setAmountMovies] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [filterParamsState, setFilterParamsState] = useState<FilterParams>({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getDataBySearchParams = (searchParams: string) => {
        console.log(searchParams);

        axios
            .get(`${endpoint}/api/movies?${searchParams}&page=${currPage}&pageSize=12`)
            .then((res) => {
                setSearchResults(res.data.movies);
                setAmountMovies(res.data.totalCount);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        console.log(window.location.hash.split('?'));

        setIsLoading(true);
        getDataBySearchParams(window.location.hash.split('?')[1]);
        const paramsObj = handleSearchParams(window.location.hash.split('?')[1]);
        delete paramsObj['search'];
        setFilterParamsState(convertParams(paramsObj));
    }, [search, currPage]);

    const handleSetFilterParams = async () => {
        let str = '';
        const arrValueFilterParams = Object.values(filterParamsState);
        let count = 0;
        for (let key in filterParamsState) {
            if (arrValueFilterParams[count] != null) {
                if (count != 0) {
                    str += '&';
                }
                str += key + '=' + encodeURIComponent(arrValueFilterParams[count]);
                count++;
            }
        }
        setIsLoading(true);
        getDataBySearchParams(str);

        navigate({
            pathname: '/search',
            search: ``,
        });

        const url = window.location.href?.split('?')[0];
        window.history.replaceState('', '', url + str);
    };

    return (
        <div className="wrapper-searchPage">
            <div className="searchPage-header"></div>
            <div className="header-filter">
                {items.map((item, index) => (
                    <div className="menu-label">
                        <Select
                            className="select-menu w-full"
                            key={index}
                            value={filterParamsState[item.query as QueryFilter]}
                            options={item.options}
                            placeholder={item.placeholder}
                            onChange={(value) => {
                                const tempObj: any = { ...filterParamsState };
                                if (item.query != null) {
                                    tempObj[item.query] = value;
                                    setFilterParamsState(tempObj);
                                }
                            }}
                            allowClear
                        />
                    </div>
                ))}
                <Button className="btn-filter" type="primary" onClick={handleSetFilterParams}>
                    Lọc phim
                </Button>
            </div>
            <hr className="my-6 border-neutral-800" />
            <div className="relative min-h-[30vh]">
                <ConfigProvider
                    theme={{
                        token: {
                            colorBgContainer: '#111111',
                            colorLinkHover: 'rgb(209, 19, 19)',
                        },
                    }}
                >
                    <Spin
                        indicator={
                            <LoadingOutlined
                                style={{ fontSize: 36 }}
                                spin
                                className="text-red-600"
                            />
                        }
                        spinning={isLoading}
                    >
                        <PaginationFilm
                            title={`Kết quả tìm kiếm`}
                            number={4}
                            listFilm={searchResults}
                            amountMovies={amountMovies}
                            currPage={currPage}
                            setCurrPage={setCurrPage}
                            hidden={searchResults.length === 0}
                        />
                    </Spin>
                </ConfigProvider>

                <p className="absolute top-0" hidden={searchResults.length !== 0}>
                    Không tìm thấy kết quả phù hợp.
                </p>
            </div>
        </div>
    );
};
