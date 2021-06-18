import React from 'react';
import './about.styles.scss';

const About = () => {
  return (
    <div className='about-container'>
      <div className='about'>
        <div className='developer-contact'>
          <div className='developer'>Developer :</div>
          <div className='name'>Ali Moradi</div>
        </div>
        <div className='developer-contact'>
          <div className='developer'>Email :</div>
          <div className='name'>ali.moradi.design@gmail.com</div>
        </div>
        <div className='developer-contact'>
          <div className='developer'>Phone-Number :</div>
          <div className='name'>+989196891321</div>
        </div>
        <div className='version'>version : 2.0.0</div>
      </div>
    </div>
  );
};

export default About;
