import React from 'react';
import { Link } from 'react-router-dom';

import './FrequentRequests.css';

function FrequentRequests() {
    const dataColumn1 = [
        { req: 1, name: 'Aprepitant 125mg-80mg' },
        { req: 2, name: 'Albuterol 2.5mg/3mL' },
        { req: 3, name: 'Granisetron 1mg' },
      ];
    const dataColumn2 = [
        { req: 1, name: 'Xarelto 15mg' },
        { req: 2, name: 'Xarelto Starter Pack' },
        { req: 3, name: 'Entecavir 0.5mg' },
      ];
    const dataColumn3 = [
        { req: 1, name: 'Eliquis Starter Pack' },
        { req: 2, name: 'Ondansetron ODT 8mg' },
        { req: 3, name: 'Megestrol 40mg/mL' },
      ];

    return (
            <div className='recent-container'>
                <h2>Most Frequent Requests:</h2>
                <h3>{"Week of 5/1/23"}</h3>
                <div className='request-groups'>
                    <ReqList data={dataColumn1}/>
                    <ReqList data={dataColumn2}/>
                    <ReqList data={dataColumn3}/>
                </div>
                <div className='pharmacy-reach'>
                    <h3>Are you a pharmacy that has these medications?</h3>
                    <Link to='/contact-us' className='contact-link'>Join our pharmacy network!</Link>
                </div>
            </div>
    );
}

function ReqList({ data }) {
    return (
      <ul>
        {data.map(item => (
          <li className='request-list' key={item.req}>{item.name}</li>
        ))}
      </ul>
    );
  }

export default FrequentRequests;