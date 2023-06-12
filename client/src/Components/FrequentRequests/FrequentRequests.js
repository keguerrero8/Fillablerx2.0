import React from 'react';
import { Link } from 'react-router-dom';

import './FrequentRequests.css';

function FrequentRequests() {
    const dataColumn1 = [
        { req: 1, name: 'Aprepitant 125mg-80mg' },
        { req: 2, name: 'Lidocaine Viscous Solution 2%' },
        { req: 3, name: 'Eliquis 5mg' },
      ];
    const dataColumn2 = [
        { req: 1, name: 'Anastrozole 1mg' },
        { req: 2, name: 'Deferasirox 360mg' },
        { req: 3, name: 'Stimate 0.15mg' },
      ];
    const dataColumn3 = [
        { req: 1, name: 'Zarxio 300mcg/0.5mL' },
        { req: 2, name: 'Enoxaparin 30mg/0.3mL' },
        { req: 3, name: 'Cyclobenzaprine 10mg' },
      ];

    return (
            <div className='recent-container'>
                <h2>Most Frequent Requests:</h2>
                <h3>{"Week of 6/5/23"}</h3>
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