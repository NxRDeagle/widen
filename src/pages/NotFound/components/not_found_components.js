import arrowSvg from '../../../img/arrow.svg';

export const BackBtn = ({ children, onClick }) => {
    return (
        <div className="go_back_box" onClick={onClick}>
            <img loading='lazy' className="go_back_arrow" src={arrowSvg} alt="Arrow" />
            <button className="go_back_button">{children}</button>
        </div>
    );
}