import './scss/projects.scss';

import React, {useContext} from 'react';

import ProjectBtn from './components/components';

import { mainContext } from '../../App';

export default function Projects() {

    const {navigate} = useContext(mainContext);

    //Константа для описания проектов(Когда все разделы будут активны поле disabled будет не нужно)
    const projects = [
        {
            name: 'Партнёрства',
            disabled: false,
            caption: 'Здесь вы можете рассказать о своей идее и найти единомышленников для ее реализации.',
            navigateTo: '/partnerships' 
        },
        {
            name: 'Фриланс-проекты',
            disabled: true,
            caption: 'Здесь вы можете найти интересные проекты от заказчиков по разным направлениям.',
            navigateTo: '/' 
        },
        {
            name: 'Вакансии',
            disabled: true,
            caption: 'Здесь вы можете увидеть вакансии от компаний, которые ищут крутых специалистов.',
            navigateTo: '/' 
        },
        {
            name: 'Краудфандинг',
            disabled: true,
            caption: 'Здесь вы можете поделиться своей идеей и найти финансирование для ее реализации.',
            navigateTo: '/' 
        }
    ];

    return (
        <>
            <header className='projects-header'>Widen-Проекты</header>
            <main className='projects-container'>
                {
                    projects.map((p, idx) => {return(
                        <ProjectBtn onClick={(_) => navigate(p.navigateTo)} key={idx} disabled={p.disabled} caption={p.caption} navigateTo={p.navigateTo}>{p.name}</ProjectBtn>
                    )})
                }
            </main>
        </>
    )
}