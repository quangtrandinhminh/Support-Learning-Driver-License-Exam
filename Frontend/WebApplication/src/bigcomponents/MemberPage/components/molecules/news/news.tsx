import './news.scss'
import NewsImg from '../../../../../../assets/imgs/news/news-img.jpeg'
import { useEffect, useState } from 'react';
import api from '../../../../../config/axios';

function News() {

    const [data, setData] = useState(null);

    const getAllNews = async () => {
        try {
            const response = await api.get('News/list');
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
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

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        } else {
            return text.slice(0, maxLength) + '...';
        }
    }

    return (
        <div className='news-home-container' id='news-section'>
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
                                            <a href='' className={`news-${i + 1}-title`}>{newsItem.title}</a>
                                            <h3 className={`news-${i + 1}-description`}>{newsItem.description}</h3>
                                            <p className={`news-${i + 1}-content`}>{truncateText(newsItem.content, 100)}</p>
                                            <div className='date-container'>
                                                <p className={`news-${i + 1}-date`}>{formatDate(newsItem.createdTime)}</p>
                                            </div>
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
        </div>
    )
}

export default News
