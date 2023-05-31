import React, {useEffect} from 'react';

import BlogCard from './BlogCard';

import SpecialtyDrugsArticle from './20230520SpecialtyDrugs';
import DrugShortagesArticle from './20230513DrugShortages';
import UrgentCareArticle from './20230506UrgentCareCost';
import AdherenceArticle from './20230527Adherence';

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
  ];

  const sortedArticles = blogArticles.sort((a, b) => b.postId - a.postId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='blog-container'>
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