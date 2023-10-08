import './news.scss'

function News() {

    return (
        <div className='news-container' id='news-section'>
            <h1>Tin tức</h1>
            <div className="news-list">
                <div className="news-section-1">
                    <img src="src/imgs/news/news-img.jpeg" alt="" />
                    <h2 className="news-1-title">Mẫu tin 1</h2>
                    <p className="news-1-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae lorem mauris. Donec laoreet enim sit amet </p>
                    <p className="news-1-date">21/11/2023</p>
                    <button>Đọc thêm</button>
                </div>
                <div className="news-section-2">
                    <img src="src/imgs/news/news-img.jpeg" alt="" />
                    <h2 className="news-1-title">Mẫu tin 2</h2>
                    <p className="news-2-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae lorem mauris. Donec laoreet enim sit amet </p>
                    <p className="news-2-date">21/11/2023</p>
                    <button>Đọc thêm</button>
                </div>
                <div className="news-section-3">
                    <img src="src/imgs/news/news-img.jpeg" alt="" />
                    <h2 className="news-1-title">Mẫu tin 3</h2>
                    <p className="news-3-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae lorem mauris. Donec laoreet enim sit amet </p>
                    <p className="news-3-date">21/11/2023</p>
                    <button>Đọc thêm</button>
                </div>
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
