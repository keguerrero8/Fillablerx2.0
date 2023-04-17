import './Banner.css';
import { Link } from 'react-router-dom';

function Banner(props) {

    const announcementPrimary = "Website Downtime scheduled for 4/18/23 11:00 pm - 7:00 am";
    const announcementSecondary = "BETA period now open in select markets!";
    const announcementTertiary = "Shortage Announcement: Albuterol (inhalation solution), Albuterol-Ipratropium (inhalation solution)";
    const announcementLink = "For a list of current Drug Shortages, click";



    return (
        <div className='banner'>
            <div className='text-container'>
                <h3>{announcementPrimary}</h3>
                <h3>{announcementSecondary}</h3>
                <h3>{announcementTertiary}</h3>
                {/*
                <h3>{announcementLink}
                    <Link to='/drug-shortages' className='banner-link'>here</Link>.
                </h3>
                */}
            </div>
        </div>
    );
}

export default Banner;