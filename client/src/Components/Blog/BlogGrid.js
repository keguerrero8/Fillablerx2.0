import React, {useEffect} from 'react';

import BlogCard from './BlogCard';

import SpecialtyDrugsArticle from './20230520SpecialtyDrugs';
import DrugShortagesArticle from './20230513DrugShortages';
import UrgentCareArticle from './20230506UrgentCareCost';
import AdherenceArticle from './20230527Adherence';
import OzempicArticle from './20230603Ozempic';
import AqiArticle from './20230610AQI';
import RsvArticle from './20230617RSV';
import NurseStrikeArticle from './20230624NurseStrike';
import EndCovidArticle from './20230701EndCovid';
import HeatWaveArticle from './20230708HeatWave';
import OtcBirthControlArticle from './20230715OtcBirthControl';
import LeqembiArticle from './20230722Leqembi';

import './BlogGrid.css'

const BlogGrid = () => {

    const blogArticles = [
    {
        title: SpecialtyDrugsArticle.title,
        subtitle: SpecialtyDrugsArticle.subtitle,
        image: SpecialtyDrugsArticle.image,
        postId: SpecialtyDrugsArticle.postId,
    },
    {
        title: DrugShortagesArticle.title,
        subtitle: DrugShortagesArticle.subtitle,
        image: DrugShortagesArticle.image,
        postId: DrugShortagesArticle.postId,
    },
    {
        title: UrgentCareArticle.title,
        subtitle: UrgentCareArticle.subtitle,
        image: UrgentCareArticle.image,
        postId: UrgentCareArticle.postId,
    },
    {
        title: AdherenceArticle.title,
        subtitle: AdherenceArticle.subtitle,
        image: AdherenceArticle.image,
        postId: AdherenceArticle.postId,
    },
    {
        title: OzempicArticle.title,
        subtitle: OzempicArticle.subtitle,
        image: OzempicArticle.image,
        postId: OzempicArticle.postId,
    },
    {
        title: AqiArticle.title,
        subtitle: AqiArticle.subtitle,
        image: AqiArticle.image,
        postId: AqiArticle.postId,
    },
    {
        title: RsvArticle.title,
        subtitle: RsvArticle.subtitle,
        image: RsvArticle.image,
        postId: RsvArticle.postId,
    },
    {
        title: NurseStrikeArticle.title,
        subtitle: NurseStrikeArticle.subtitle,
        image: NurseStrikeArticle.image,
        postId: NurseStrikeArticle.postId,
    },
    {
        title: EndCovidArticle.title,
        subtitle: EndCovidArticle.subtitle,
        image: EndCovidArticle.image,
        postId: EndCovidArticle.postId,
    },
    {
        title: HeatWaveArticle.title,
        subtitle: HeatWaveArticle.subtitle,
        image: HeatWaveArticle.image,
        postId: HeatWaveArticle.postId,
    },
    {
        title: OtcBirthControlArticle.title,
        subtitle: OtcBirthControlArticle.subtitle,
        image: OtcBirthControlArticle.image,
        postId: OtcBirthControlArticle.postId,
    },
    {
        title: LeqembiArticle.title,
        subtitle: LeqembiArticle.subtitle,
        image: LeqembiArticle.image,
        postId: LeqembiArticle.postId,
    },
  ];

  const sortedArticles = blogArticles.sort((a, b) => b.postId - a.postId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='blog-container'>
        <h2>Blog Articles</h2>
        <div className="blog-grid">
        {sortedArticles.map((article, index) => (
            <BlogCard 
                key={index} 
                title={article.title}
                subtitle={article.subtitle}
                image={article.image}
                postId={article.postId}
            />
        ))}
        </div>
    </div>

  );
};

export default BlogGrid;
