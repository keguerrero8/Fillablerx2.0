import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

import './HomePageCards.css';

import BlogCard from './BlogCard';

import SpecialtyDrugsArticle from './20230520SpecialtyDrugs';
import DrugShortagesArticle from './20230513DrugShortages';
import UrgentCareArticle from './20230506UrgentCareCost';
import AdherenceArticle from './20230527Adherence';
import OzempicArticle from './20230603Ozempic';
import AqiArticle from './20230610AQI';
import RsvArticle from './20230617RSV';

const HomePage = () => {
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
  ];

  const sortedArticles = blogArticles.sort((a, b) => b.postId - a.postId);

  const recentArticles = sortedArticles.slice(0, 3);

  return (
    <div className="blog-section">
      <h2>{<Link className='section-link' to="/blog">Latest Articles</Link>}</h2>
      <div className="hero-card-container">
        {recentArticles.map((article, index) => (
            <BlogCard 
            key={index} 
            title={article.title}
            subtitle={article.subtitle}
            image={article.image}
            postId={article.postId}
        />
        ))}
      </div>
      <h3>{<Link className='section-link' to="/blog">View All</Link>}</h3>
    </div>
  );
};

export default HomePage;
