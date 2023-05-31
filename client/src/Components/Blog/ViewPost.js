import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';

import './BlogPost.css'

import SpecialtyDrugs from './20230520SpecialtyDrugs';
import DrugShortages from './20230513DrugShortages';
import UrgentCares from './20230506UrgentCareCost';
import AdherenceArticle from './20230527Adherence';


const ViewPost = () => {
    const { postId } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    return (
        <div className='document-container'>
            {postId === '20230520' && <SpecialtyDrugs />}
            {postId === '20230513' && <DrugShortages />}
            {postId === '20230506' && <UrgentCares />}
            {postId === '20230527' && <AdherenceArticle />}
        </div>
    );
}

export default ViewPost;