import NewsImg from '../../../../../../assets/imgs/news/news-img.jpeg'
import './new.scss'

function News() {
  return (
    <div className='news-container' id='news-section'>
        <h1>Tin tức</h1>
        <div className="news-list">
            <div className="news-section-1">
                <img src={NewsImg} alt="news-img" />
                <h2 className="news-1-title">Mẫu tin 1</h2>
                <p className="news-1-content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed repudiandae similique consequuntur illo veritatis quidem quibusdam mollitia eveniet quae aperiam. Eligendi error quo cumque vitae autem rem voluptatum debitis ipsa!</p>
                <p className="news-1-date">21/11/2023</p>
                <button>Đọc thêm</button>
            </div>
            <div className="news-section-2">
                <img src={NewsImg} alt="news-img" />
                <h2 className="news-2-title">Mẫu tin 2</h2>
                <p className="news-2-content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed repudiandae similique consequuntur illo veritatis quidem quibusdam mollitia eveniet quae aperiam. Eligendi error quo cumque vitae autem rem voluptatum debitis ipsa!</p>
                <p className="news-2-date">21/11/2023</p>
                <button>Đọc thêm</button>
            </div>
            <div className="news-section-3">
                <img src={NewsImg} alt="news-img" />
                <h2 className="news-3-title">Mẫu tin 3</h2>
                <p className="news-3-content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed repudiandae similique consequuntur illo veritatis quidem quibusdam mollitia eveniet quae aperiam. Eligendi error quo cumque vitae autem rem voluptatum debitis ipsa!</p>
                <p className="news-3-date">21/11/2023</p>
                <button>Đọc thêm</button>
            </div>
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