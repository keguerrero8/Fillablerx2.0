import './Banner.css';
import { Link } from 'react-router-dom';

function Banner(props) {
    return (
        <div className='banner'>
            <div className='text-container'>
                <h3>Website Downtime scheduled for 2/15/22 7pm-12am</h3>
                <h3>BETA period launching soon!</h3>
                <h3>Shortage Announcement: Children's Tylenol and Advil</h3>
                {/*
                <h3>For a list of current Drug Shortages, click 
                    <Link to='/drug-shortages' className='banner-link'>here</Link>.
                </h3>
                */}
            </div>
        </div>
    );
}

export default Banner;