import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CRow,
} from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import Image from 'next/image';
import { CIcon } from '@coreui/icons-react';
import {
  cilExternalLink,
  cilMap,
  cilUser,
  cilTag,
  cilTruck,
} from '@coreui/icons';

const Gear: React.FC = () => {
  const gearItems = [
    {
      id: 1,
      title: 'Ski and Snow',
      image: 'https://www.lduhtrp.net/image-101303680-11972825',
      link: 'https://www.kqzyfj.com/click-101303680-11972825',
    },
    {
      id: 2,
      title: 'Kids Ski Collection',
      image: 'https://www.lduhtrp.net/image-101303680-12734966',
      link: 'https://www.jdoqocy.com/click-101303680-12734966',
    },
  ];

  return (
    <>
      <h3 className="resort-single-card-heading user-select-none">
        <FormattedMessage id="shredindex.resort.GEAR" defaultMessage="Gear" />
      </h3>

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {gearItems.map((item) => (
              <div key={item.id} className="mb-4">
                <div className="d-flex gap-3 align-items-start">
                  {/* Image Section */}
                  <div className="position-relative" style={{ width: '120px', height: '120px' }}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="rounded overflow-hidden object-fit-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h4 className="fw-bold mb-0">{item.title}</h4>
                      <div className="d-flex align-items-center gap-2">
                        <CIcon icon={cilTag} className="text-success" />
                      </div>
                    </div>

                    <ul className="p-0 list-unstyled small fw-lighter mb-3">
                      <li className="d-flex align-items-center gap-2 mb-1">
                        <CIcon icon={cilUser} className="text-muted" />
                        <span className="text-muted">Premium quality gear</span>
                      </li>
                      <li className="d-flex align-items-center gap-2 mb-1">
                        <CIcon icon={cilMap} className="text-muted" />
                        <span className="text-muted">Multiple pickup locations</span>
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <CIcon icon={cilTruck} className="text-muted" />
                        <span className="text-muted">Ship to slope available</span>
                      </li>
                    </ul>

                    <CButton
                      color="primary"
                      href={item.link}
                      target="_blank"
                      className="w-100 d-flex align-items-center justify-content-center gap-2"
                    >
                      View Deal
                      <CIcon icon={cilExternalLink} />
                    </CButton>
                  </div>
                </div>
              </div>
            ))}
          </CRow>

          {/* Winter Gear Promotion */}
          <div className="mt-4 bg-dark rounded p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold mb-1">Ready for Winter?</h5>
                <p className="text-muted mb-0 small">Get up to 25% off on all winter gear</p>
              </div>
              <CButton
                color="primary"
                href="https://www.kqzyfj.com/pi105xdmjdl0212345849021839322"
                target="_blank"
                className="d-flex align-items-center gap-2"
              >
                Shop Now
                <CIcon icon={cilExternalLink} />
              </CButton>
            </div>
          </div>

          <p className="text-center text-muted small mt-3 mb-0">
            You&apos;ll be redirected to our trusted partner site
          </p>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Gear;
