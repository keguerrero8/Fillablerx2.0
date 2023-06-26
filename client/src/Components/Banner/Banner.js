import './Banner.css';
import { Link } from 'react-router-dom';

function Banner() {

    const announcementPrimary = "Website Downtime scheduled for 5/30/23 11:00 pm - 7:00 am";
    const announcementSecondary = "BETA pharmacies now serving patients in select parts of Queens and Long Island, NY!";
    const announcementTertiary = "Shortage Announcement: 5/30 Budesonide Inhalation Suspension, 5/31 Protamine Injection, 6/14 Enalaprilat Injection, 6/19 Lisdexamfetamine Capsules";
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