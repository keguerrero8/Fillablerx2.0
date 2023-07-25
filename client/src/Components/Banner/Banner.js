import './Banner.css';
import { Link } from 'react-router-dom';

function Banner() {

    const announcementPrimary = "Website Downtime scheduled for 5/30/23 11:00 pm - 7:00 am";
    const announcementSecondary = "BETA pharmacies now serving patients in select parts of Queens and Long Island, NY!";
    const announcementTertiary = "Shortage Announcement: 6/19 Lisdexamfetamine Capsules, 6/29 Testosterone 2% Gel, 6/29 Cefdinir Capsules & Suspension, 7/19 Oxycoodne-Acetaminophen Tablets, 7/20 Liraglutide Injection";
    const announcementLink = "For a list of current Drug Shortages, click";



    return (
        <div className='banner'>
            <div className='text-container'>
                {/*
                    <h3>{announcementPrimary}</h3>
                */}
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