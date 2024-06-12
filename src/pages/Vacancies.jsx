import React, { useState } from 'react';

import SearchInput from '../global_components/search/SearchInput';

import SearchBtns from '../global_components/search_btn/SearchBtns';

import { partenrshipBtns } from '../global-constants/constants';

import PostCard from '../global_components/newsware/cards/post-card/PostCard';

import '../scss/Vacancies.scss';
import '../pages/Home/scss/Home.scss';
import Newsware from '../global_components/newsware/Newsware';

import newsware_data from '../data/newsware_data.json';

const Vacancies = () => {
  const [aboba, setA] = useState('');

  function handleClick(e) {
    if (e.target.name) {
      setA(e.target.name);
    }
  }

  return (
    <>
      <SearchInput />
      <SearchBtns dataSet={partenrshipBtns} state={aboba} onClick={handleClick} />
      <Newsware {...newsware_data[0]} />
      <Newsware {...newsware_data[0]} />
    </>
  );
};
export default Vacancies;
