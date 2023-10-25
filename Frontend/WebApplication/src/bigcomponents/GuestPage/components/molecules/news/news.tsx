import { useEffect, useState } from 'react'
import NewsImg from '../../../../../../assets/imgs/news/news-img.jpeg'
import './new.scss'
import { Backdrop, CircularProgress } from '@mui/material';
import api from '../../../../../config/axios';

function News() {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getAllNews = async () => {
        const response = await api.get('News/list');
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

    const maxNewsDisplayed = 3; // Set the maximum number of courses to display

    return (
        <div className='news-container' id='news-section'>
            <h1>Tin tức</h1>
            <div className="news-list">
                {
                    !isLoading ? (
                        data.length > 0 ? (
                            console.log(data[0].title),
                            data.slice(0, maxNewsDisplayed).map((course, i) => (
                                <>
                                    <div className={`news-section-${i + 1}`}>
                                        <img src={NewsImg} alt="news-img" />
                                        <h2 className={`news-${i + 1}-title`}>{course.title}</h2>
                                        <p className={`news-${i + 1}-content`}>{course.content}</p>
                                        <p className={`news-${i + 1}-date`}>Ngày {formatDate(course.createdTime)}</p>
                                        <button className='mt-1'>Đọc thêm</button>
                                    </div>
                                </>
                            ))
                        ) : (
                            <h1 className='text-center'>Không có thông tin để hiển thị</h1>
                        )
                    ) : (
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={true}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    )
                }
            </div>
            <div className="news-page-nav">
                <a href="">1</a>
                <a href="">2</a>
                <a href="" className='page-nav-text'>Trang sau</a>
            </div>
        </div>
    )
}

export default News