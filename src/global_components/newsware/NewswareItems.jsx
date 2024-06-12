import './scss/Newsware.scss';

import Newsware from './Newsware';

//Компонент со списком новостной ленты, находящейся где-либо. Передаётся список ленты и фильтр для неё
export default function NewswareItems({ dataSet, filter = false }) {
  return (
    <main className="main-background">
      {dataSet
        .filter((d) => (typeof filter === 'function' ? filter(d) : true))
        .map((d) => (
          <Newsware key={d.id} {...d} />
        ))}
    </main>
  );
}
