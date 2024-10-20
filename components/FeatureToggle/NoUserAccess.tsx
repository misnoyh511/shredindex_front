import React from 'react';
import { CButton, CCard, CCardBody } from '@coreui/react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { useRecoilState } from 'recoil';
import { showLoginTray } from '../../atoms/showLoginTray';

interface NoUserAccessProps {
  title?: string;
  image?: string | StaticImageData;
  height?: string | number;
}

const NoUserAccess: React.FC<NoUserAccessProps> = ({ title, image, height }) => {
  const [, setLoginVisible] = useRecoilState(showLoginTray);

  return (
    <>
      <h3 className="no-user-access">
        {title}
      </h3>
      <CCard className="no-user-access__card mb-4">
        {image && (
          <div className="p-3 hidden-feautre-image">
            <Image
              className="p-3 border-radius-large"
              src={image}
              alt={'hidden-feature-image'}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <CCardBody>
          <div className="p-4 d-flex flex-column justify-content-center align-content-center" style={{ height: height }}>
            <p className="h6 user-select-none mb-2 text-center caption-text">
              Login to view this feature.
            </p>
            <div className="d-flex justify-content-center align-content-center">
              <div className="button-group align-items-center">
                <CButton className="p-2 pe-4 ps-4 m-2" color="primary" onClick={() => setLoginVisible('login')}>
                  Login
                </CButton>
                <Link href="/resorts" passHref>
                  <CButton className="p-2 pe-4 ps-4 m-2" color="secondary">
                    Become a member
                  </CButton>
                </Link>
              </div>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  );
};

export default NoUserAccess;
