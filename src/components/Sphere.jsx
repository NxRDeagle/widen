import React from 'react';

import interest_data from '../data/interest_data.json';
import '../css/Sphere.css';
import ellipse from '../img/Ellipse.svg';

const Sphere = ({ sign, bg, num }) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const interestRef = React.useRef();
  const selectionRef = React.useRef();

  const selectInterest = () => {
    setIsSelected(!isSelected);
    isSelected
      ? selectionRef.current.classList.remove('interest_selected')
      : selectionRef.current.classList.add('interest_selected');
  };

  React.useEffect(() => {
    interestRef.current.innerHTML = interest_data[num].icon;
  }, []);

  return (
    <div className="interest" onClick={selectInterest}>
      <div
        ref={interestRef}
        className="interest_sphere"
        style={{ backgroundImage: `url('${bg}')` }}></div>
      <img loading='lazy' ref={selectionRef} src={ellipse} className="selected_int" alt="selected_int" />
      <p className="interest_sign">{sign}</p>
    </div>
  );
};

export default Sphere;
