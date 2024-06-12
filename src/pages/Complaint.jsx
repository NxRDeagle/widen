import React from 'react';

import { mainContext } from '../App';

import '../scss/Complaint.scss';

const Complaint = ({ complaint_post_id }) => {
  const { navigate } = React.useContext(mainContext);

  const [complaintType, setComplaintType] = React.useState(0);

  const selectComplaint = (e) => {
    e.target.className = 'selected';
    setTimeout(() => {
      setComplaintType(Number(e.target.id[4]));
    }, 1000);
  };

  return (
    <>
      {complaintType === 0 && (
        <>
          <div className="complaint_container">
            <svg
              onClick={() => {
                navigate(-1);
              }}
              className="complaint_arrow"
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="15"
              viewBox="0 0 21 15"
              fill="none">
              <path
                onClick={() => {
                  navigate(-1);
                }}
                d="M8.23767 0.393751C8.50023 0.656312 8.62626 0.973574 8.61576 1.34554C8.60438 1.7175 8.46741 2.03476 8.20485 2.29732L4.49617 6.006H19.134C19.5059 6.006 19.8179 6.13203 20.07 6.38408C20.3212 6.63527 20.4468 6.94684 20.4468 7.3188C20.4468 7.69076 20.3212 8.00278 20.07 8.25483C19.8179 8.50602 19.5059 8.63161 19.134 8.63161H4.49617L8.23767 12.3731C8.50023 12.6357 8.63151 12.9477 8.63151 13.3091C8.63151 13.6697 8.50023 13.9813 8.23767 14.2439C7.97511 14.5064 7.6631 14.6377 7.30164 14.6377C6.94106 14.6377 6.62948 14.5064 6.36692 14.2439L0.360834 8.23777C0.229553 8.10649 0.136341 7.96427 0.0812035 7.8111C0.0269413 7.65794 -0.000190735 7.49384 -0.000190735 7.3188C-0.000190735 7.14376 0.0269413 6.97966 0.0812035 6.8265C0.136341 6.67334 0.229553 6.53112 0.360834 6.39984L6.39974 0.360931C6.64042 0.12025 6.94106 -9.25064e-05 7.30164 -9.25064e-05C7.6631 -9.25064e-05 7.97511 0.131189 8.23767 0.393751Z"
                fill="black"
              />
            </svg>
            <p className="complaint_header">Причина жалобы</p>
          </div>
          <div className="complaint_container_inner">
            <ul className="complaint_list">
              <li className="complaint_el">
                <p id="comp1" onClick={selectComplaint}>
                  Контент с эротическим содержанием
                </p>
              </li>
              <li className="complaint_el">
                <p id="comp2" onClick={selectComplaint}>
                  Оскорбительное содержание
                </p>
              </li>
              <li className="complaint_el">
                <p id="comp3" onClick={selectComplaint}>
                  Мошенники
                </p>
              </li>
              <li className="complaint_el">
                <p id="comp4" onClick={selectComplaint}>
                  Нарушение закона{' '}
                </p>
              </li>
              <li className="complaint_el">
                <p id="comp5" onClick={selectComplaint}>
                  Прочее...
                </p>
              </li>
            </ul>
          </div>
        </>
      )}
      {complaintType !== 0 && (
        <>
          <div className="complaint_container">
            <p className="complaint_header" id="thx_complaint">
              Спасибо за обращение!
            </p>

            <p className="complaint_sign">
              После рассмотрения вашей жалобы администрацией платформы будут предприняты
              соответствующие меры.
            </p>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="next_button"
              style={{ marginTop: '55px' }}>
              Готово
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default Complaint;
