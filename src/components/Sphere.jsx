import React from 'react';

import interest_data from '../data/interest_data.json';
import '../css/Sphere.css';

const Sphere = ({ sign, bg, num }) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const interestRef = React.useRef();

  const selectInterest = () => {
    setIsSelected(!isSelected);
    isSelected
      ? interestRef.current.classList.remove('interest_selected')
      : interestRef.current.classList.add('interest_selected');
  };

  React.useEffect(() => {
    interestRef.current.innerHTML = interest_data[num].icon;
  }, []);

  return (
    <div className="interest" onClick={selectInterest}>
      <div
        className="interest_sphere"
        ref={interestRef}
        style={{ backgroundImage: `url('${bg}')` }}></div>
      <p className="interest_sign">{sign}</p>
    </div>
  );
};

export default Sphere;
