import items from './filItem.json';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Cascader } from 'antd';
import { FilmItem } from '../../component/film-item';
import './index.scss';
import { PaginationFilm } from '../../component/pagination-film';
import { request } from '../../utils/request';
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
        name: 'Film 3',
        yearOfManufacture: 2022,
        category: ['Hành động'],
        poster: 'https://image.tmdb.org/t/p/original/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg',
    },
    {
        name: 'Film 4',
        yearOfManufacture: 2022,
        category: ['Hành động'],
        poster: 'https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg',
    },
    {
        name: 'Film 5',
        yearOfManufacture: 2022,
        category: ['Hành động'],
        poster: 'https://image.tmdb.org/t/p/original/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
    },
    {
        name: 'Film 6',
        yearOfManufacture: 2022,
        category: ['Hành động'],
        poster: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    },
    {
        name: 'Film 7',
        yearOfManufacture: 2022,
        category: ['Tình cảm'],
        poster: 'https://image.tmdb.org/t/p/original/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg',
    },
    {
        name: 'Film 8',
        yearOfManufacture: 2022,
        category: ['Tình cảm'],

        poster: 'https://image.tmdb.org/t/p/original/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg',
    },
    {
        name: 'Film 9',
        yearOfManufacture: 2022,
        category: ['Tình cảm'],

        poster: 'https://image.tmdb.org/t/p/original/iOJX54nVAsnPawagFiWXKv1Y6sB.jpg',
    },
    {
        name: 'Film 10',
        yearOfManufacture: 2022,
        category: ['Tình cảm'],
        poster: 'https://image.tmdb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    },
    {
        name: 'Film 11',
        yearOfManufacture: 2022,
        category: ['Tình cảm'],
        poster: 'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    },
    {
        name: 'Film 12',
        yearOfManufacture: 2022,
        category: ['Tình cảm'],
        poster: 'https://image.tmdb.org/t/p/original/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg',
    },
    {
        name: 'Film 13',
        yearOfManufacture: 2021,
        category: ['Kinh dị'],
        poster: 'https://image.tmdb.org/t/p/original/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg',
    },
    {
        name: 'Film 14',
        yearOfManufacture: 2022,
        category: ['Kinh dị'],
        poster: 'https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
    },
    {
        name: 'Film 15',
        yearOfManufacture: 2022,
        category: ['Kinh dị'],
        poster: 'https://image.tmdb.org/t/p/original/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg',
    },
    {
        name: 'Film 22',
        yearOfManufacture: 2022,
        category: ['Kinh dị'],
        poster: 'https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg',
    },
    {
        name: 'Film 32',
        yearOfManufacture: 2022,
        category: ['Kinh dị'],
        poster: 'https://image.tmdb.org/t/p/original/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
    },
    {
        name: 'Film 42',
        yearOfManufacture: 2022,
        category: ['Kinh dị'],
        poster: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    },
];

export const SearchPage: React.FC = () => {
    const location = useLocation();
    const { searchValue } = location.state;
    const [searchResults, setSearchResults] = useState<FilmItem[]>([]);

    const fetchData = async () => {
        try {
            const response = await request.get('movies?', {
                params: {
                    search: searchResults,
                },
            });
            const data = response.data;
            setSearchResults(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    console.log(searchValue);
    console.log(searchResults);

    //lọc

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
            {hasResults ? (
                <PaginationFilm
                    title="Kết quả tìm kiếm"
                    number={4}
                    listFilm={searchResults}
                    // listFilm={filmMap}
                />
            ) : (
                <p>Không tìm thấy kết quả phù hợp.</p>
            )}
        </div>
    );
};
