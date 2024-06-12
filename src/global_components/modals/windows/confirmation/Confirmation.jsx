import './scss/Confirmation.scss';

export default function Confirmation() {
  function handleTouchStart(e) {
    e.target.classList.add('confirmation_options_btn_active');
  }

  function handleTouchEnd(e) {
    e.target.classList.remove('confirmation_options_btn_active');
  }

  return (
    <div className={true ? 'confirmation_box confirmation_box_open' : 'confirmation_box'}>
      <p className="confirmation_question">Перенести чат с Prin в архив?</p>
      <div className="confirmation_additional_section_box">
        <input type="checkbox" className="confirmation_additional_section_checkbox" />
        <p className="confirmation_additional_section_option">Удалить у Monkeeey</p>
      </div>
      <div className="confirmation_options_box">
        <button
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchEnd}
          className="confirmation_options_btn">
          Нет
        </button>
        <button
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchEnd}
          className="confirmation_options_btn">
          Да
        </button>
      </div>
    </div>
  );
}
