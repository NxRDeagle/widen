import './scss/loader.scss';

export function BtnLoader() {
  return (
    <p className="btn-loader">
      Ожидайте
      <span className="btn-loader__circle circle--1">.</span>
      <span className="btn-loader__circle circle--2">.</span>
      <span className="btn-loader__circle circle--3">.</span>
    </p>
  );
}
