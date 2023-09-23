import items from './filItem.json';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Cascader } from 'antd';
import { FilmItem } from '../../component/film-item';
import { VideoCameraOutlined } from '@ant-design/icons';
import './index.scss';
import { Col, Row, Pagination } from 'antd';
interface SearchResult {
    name: string;
    category: string;
    yearOfManufacture: number;
    poster: string;
    nation: string;
}
interface Option {
    value?: string | number | null;
    label: React.ReactNode;
    children?: Option[];
}

const filmMap: Array<FilmItem> = [
    {
        name: 'asdfadsf',
        category: 'asdsdf',
        yearOfManufacture: 2022,
        poster: 'https://images2.thanhnien.vn/528068263637045248/2023/7/5/anime-16885290131791004759743.jpg',
    },
    {
        name: 'asdfadsf',
        category: 'asdsdf',
        yearOfManufacture: 2022,
        poster: 'https://images2.thanhnien.vn/528068263637045248/2023/7/5/anime-16885290131791004759743.jpg',
    },
    {
        name: 'asdfadsf',
        category: 'asdsdf',
        yearOfManufacture: 2022,
        poster: 'https://images2.thanhnien.vn/528068263637045248/2023/7/5/anime-16885290131791004759743.jpg',
    },
    {
        name: 'asdfadsf',
        category: 'asdsdf',
        yearOfManufacture: 2022,
        poster: 'https://images2.thanhnien.vn/528068263637045248/2023/7/5/anime-16885290131791004759743.jpg',
    },
    {
        name: 'asdfadsf',
        category: 'asdsdf',
        yearOfManufacture: 2022,
        poster: 'https://images2.thanhnien.vn/528068263637045248/2023/7/5/anime-16885290131791004759743.jpg',
    },
    {
        name: 'asdfadsf',
        category: 'asdsdf',
        yearOfManufacture: 2022,
        poster: 'https://images2.thanhnien.vn/528068263637045248/2023/7/5/anime-16885290131791004759743.jpg',
    },
    {
        name: 'asdfadsf',
        category: 'asdsdf',
        yearOfManufacture: 2022,
        poster: 'https://images2.thanhnien.vn/528068263637045248/2023/7/5/anime-16885290131791004759743.jpg',
    },
];

export const SearchPage: React.FC = () => {
    const location = useLocation();
    const { searchValue } = location.state;
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 5;
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const displayedResults = searchResults.slice(startIndex, endIndex);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (searchValue) {
            fetch(
                `https://tiktok.fullstack.edu.vn/api/users/search?q=${searchValue}&type=less`,
            )
                .then((res) => res.json())
                .then((res) => {
                    setSearchResults(res.data);
                })
                .catch((error) => {
                    console.error('Lỗi khi gọi API tìm kiếm:', error);
                });
        }
    }, [searchValue]);

    //lọc

    // const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [hasResults, setHasResults] = useState(true);
    const [selectedOptionsMap, setSelectedOptionsMap] = useState<{
        [key: string]: Option[];
    }>({});

    const onChange = (
        value: (string | number)[],
        selectedOptions: Option[],
        cascaderName: string,
    ) => {
        const uniqueSelectedOptions = Array.from(new Set(selectedOptions));
        setSelectedOptionsMap((prevMap) => ({
            ...prevMap,
            [cascaderName]: Array.isArray(prevMap[cascaderName])
                ? [...prevMap[cascaderName], ...uniqueSelectedOptions]
                : [...uniqueSelectedOptions],
        }));
    };

    const handleFilterClick = () => {
        const latestOptionsMap: { [key: string]: Option } = {};

        setSelectedOptionsMap({});
        for (const cascaderName in selectedOptionsMap) {
            if (selectedOptionsMap.hasOwnProperty(cascaderName)) {
                const latestOptions = selectedOptionsMap[cascaderName];
                const latestOption = latestOptions[latestOptions.length - 1];
                latestOptionsMap[cascaderName] = latestOption;
            }
        }
        console.log(latestOptionsMap);

        // for (const cascaderName in latestOptionsMap) {
        //     if (latestOptionsMap.hasOwnProperty(cascaderName)) {
        //         // const latestOption = latestOptionsMap[cascaderName];
        //         //thực hiện lọc
        //         const keywords: string[] = Object.values(latestOptionsMap)
        //             .map((latestOption) => latestOption?.label?.toString())
        //             .filter(
        //                 (keyword) => keyword !== undefined && keyword !== null,
        //             ) as string[];

        //         const filteredResults = searchResults.filter((result) => {
        //             const resultContainsKeyword = keywords.some((keyword) => {
        //                 return (
        //                     result.nation?.includes(keyword) ||
        //                     result.category?.includes(keyword)
        //                 );
        //             });

        //             return resultContainsKeyword;
        //         });

        //         setHasResults(filteredResults.length > 0);
        //         setSearchResults(filteredResults);
        //     }
        // }
    };

    return (
        <div className="wrapper-searchPage">
            <div className="searchPage-header"></div>
            <div className="header-filter">
                {items.map((item, index) => {
                    const options = item.childrens.map((child) => ({
                        value: child.label,
                        label: child.label,
                    }));
                    const cascaderName = `cascader_${index}`;
                    return (
                        <div className="menu-label">
                            <Cascader
                                className="cascader-menu"
                                key={index}
                                options={options}
                                placeholder={item.label}
                                onChange={(value, selectedOptions) =>
                                    onChange(
                                        value,
                                        selectedOptions,
                                        cascaderName,
                                    )
                                }
                            />
                        </div>
                    );
                })}
                <Button
                    className="btn-filter"
                    type="primary"
                    onClick={handleFilterClick}
                >
                    Lọc phim
                </Button>
            </div>
            <hr className="my-6 border-neutral-800" />
            <div className="list-film">
                <div className="header-list-film">
                    <VideoCameraOutlined className="header-list-film-icon" />
                    <p className="header-list-film-title">Kết quả tìm kiếm</p>
                </div>
                <div className="content-list-film">
                    {hasResults ? (
                        <Row gutter={[12, 24]}>
                            {displayedResults.map((result, index) => (
                                <Col
                                    // xs={24}
                                    // sm={12}
                                    // md={8}
                                    // lg={4}
                                    className="gutter-row"
                                    span={4}
                                    key={index}
                                >
                                    <FilmItem
                                        name={result.name || ''}
                                        category={result.category || ''}
                                        yearOfManufacture={
                                            result.yearOfManufacture || 0
                                        }
                                        poster={result.poster || ''}
                                    />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p>Không tìm thấy kết quả phù hợp.</p>
                    )}
                </div>
                <div className="footer-list-film">
                    <Pagination
                        current={currentPage}
                        defaultPageSize={resultsPerPage}
                        total={searchResults.length}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
