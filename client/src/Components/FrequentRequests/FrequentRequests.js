import React from 'react';
import { Link } from 'react-router-dom';

import './FrequentRequests.css';

function FrequentRequests() {
    const dataColumn1 = [
        { req: 1, name: 'Aprepitant 125mg-80mg' },
        { req: 2, name: 'Megestrol 40mg/mL' },
        { req: 3, name: 'Tamoxifen 20mg' },
      ];
    const dataColumn2 = [
        { req: 1, name: 'Anastrozole 1mg' },
        { req: 2, name: 'Cefdinir 300mg' },
        { req: 3, name: 'Lidocaine Viscous Solution 2%' },
      ];
    const dataColumn3 = [
        { req: 1, name: 'Exemestane 25mg' },
        { req: 2, name: 'Eliquis 5mg' },
        { req: 3, name: 'Deferasirox 360mg' },
      ];

    return (
            <div className='recent-container'>
                <h2>Most Frequent Requests:</h2>
<<<<<<< HEAD
                <h3>{"Week of 7/17/23"}</h3>
=======
                <h3>{"Week of 7/10/23"}</h3>
>>>>>>> b2be4960db4f13f159a9ef26c90c3f0a11d81bac
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