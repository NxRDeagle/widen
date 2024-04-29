import React from 'react';
import ContentLoader from 'react-content-loader';

import Newsware from '../../global_components/newsware/Newsware';
import Preload from '../../components/Preload';

import newsware_data from '../../data/newsware_data.json';

import { mainContext } from '../../App';

import { HeaderFilter, Header } from './components/home-components';

import './css/Home.css';

const Home = () => {
    const { currentNewswareFilter,
        myProfile,
        isNewswareFilterOpen,
        onClickHeaderFilter,
        setIsNewswareFilterOpen } = React.useContext(mainContext);

    const [isLoading, setIsLoading] = React.useState(true); // setTimeOut убрать

    //Функция нажатия на фильтр
    function clickHeaderFilter(e) {
        if (e.target.tagName === 'LI') {
            onClickHeaderFilter(e.target.getAttribute('name'));
        }
    };

    setTimeout(() => {
        setIsLoading(false);
    }, 1000);

    return isLoading ? (
        <Preload />
    ) : (
        <>
            <HeaderFilter onClick={clickHeaderFilter} className={isNewswareFilterOpen ? 'filter_newsware_box filter_newsware_box_open' : 'filter_newsware_box'}></HeaderFilter>
            <Header onClick={setIsNewswareFilterOpen} className={isNewswareFilterOpen ? 'arrow_open arrow_box' : 'arrow_box'}></Header>
            <main className="mainBackground">
                <div className="newsware_container">
                    {false ? (
                        <div className="post_box">
                            {[...new Array(3)].map((_, index) => {
                                return (
                                    <ContentLoader
                                        key={index}
                                        speed={1}
                                        width={360}
                                        height={300}
                                        viewBox="0 0 360 300"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#7e52ee">
                                        <circle cx="47" cy="16" r="16" />
                                        <rect x="72" y="5" rx="3" ry="3" width="65" height="8" />
                                        <rect x="72" y="20" rx="3" ry="3" width="50" height="6" />
                                        <rect x="31" y="50" rx="3" ry="3" width="320" height="8" />
                                        <rect x="31" y="70" rx="10" ry="10" width="320" height="188" />
                                    </ContentLoader>
                                );
                            })}
                        </div>
                    ) : (
                        newsware_data.map((item, id) => {
                            return (item.authorId === myProfile.userId ||
                                myProfile.subscriptions.includes(item.authorId)) &&
                                (item.type === currentNewswareFilter || currentNewswareFilter === 'all') ? (
                                <Newsware {...item} key={id} />
                            ) : null;
                        })
                    )}
                </div>
            </main>
        </>
    );
};

export default Home;
