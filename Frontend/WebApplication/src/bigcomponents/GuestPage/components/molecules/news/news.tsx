import './new.scss'
import NewsImg from '../../../../../../assets/imgs/news/news-img.jpeg'
import { useEffect, useState } from 'react';
import api from '../../../../../config/axios';
import { Backdrop, CircularProgress } from '@mui/material';

function News() {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getAllNews = async () => {
        const response = await api.get('News/list');
        console.log(response);
        setData(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        getAllNews();
    }, [])

    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const maxNewsDisplayed = 3; // Set the maximum number of divs to display

    return (
        <div className='news-container' id='news-section'>
            <h1>Tin tức</h1>
            <div className="news-list">
                {
                    maxNewsDisplayed > 0 ? (
                        Array.from({ length: maxNewsDisplayed }).map((_, i) => {
                            const newsItem = data && data[i];
                            return (
                                <div className={`news-section-${i + 1}`} key={i}>
                                    <img src={NewsImg} alt="news-img" />
                                    {newsItem ? (
                                        <>
                                            <h2 className={`news-${i + 1}-title`}>{newsItem.title}</h2>
                                            <p className={`news-${i + 1}-content`}>{newsItem.content}</p>
                                            <p className={`news-${i + 1}-date`}>Ngày {formatDate(newsItem.createdTime)}</p>
                                            <button className='mt-1'>Đọc thêm</button>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className={`news-${i + 1}-title`}>No news available</h2>
                                        </>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <h1 className='text-center'>Không có thông tin để hiển thị</h1>
                    )
                }
            </div>
            <div className="news-page-nav">
                <a href=''>1</a>
                <a href=''>2</a>
                <a href='' className='page-nav-text'>Trang sau</a>
            </div>
        </div>
    )
}

export default News
