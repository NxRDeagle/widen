import React from 'react';
import { useNavigate } from 'react-router-dom';

const FullMode = ({ imgSrc }) => {
  const navigate = useNavigate();

  return (
    <div className="full_mode">
      <i
        className="icon-cancel close_full"
        onClick={() => {
          navigate('/');
        }}></i>
      <img className="full_picture" src={imgSrc} alt="Full image" />
    </div>
  );
};

export default FullMode;
