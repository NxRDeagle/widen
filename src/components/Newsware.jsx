import React from 'react';

import PostCard from './PostCard';
import CaseCard from './CaseCard';
import EventCard from './EventCard';

import '../css/Newsware.css';

const Newsware = (props) => {
  switch (props.type) {
    case 'post':
      return <PostCard {...props} />;
    case 'case':
      return <CaseCard {...props} />;
    case 'event':
      return <EventCard {...props} />;
    default:
      return null;
  }
};

export default Newsware;
