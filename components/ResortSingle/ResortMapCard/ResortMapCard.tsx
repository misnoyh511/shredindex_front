import React from 'react';
import { CCard, CCardBody } from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import ResortMap from '@/ResortSingle/ResortMapCard/ResortMap/ResortMap';
import NoUserAccess from '@/FeatureToggle/NoUserAccess';
import MapDummy from '../../../images/map-dummy.png';
import { useRecoilState } from 'recoil';
import { loggedInUserProfile } from '../../../atoms/userProfile';

const ResortMapCard: React.FC = ({ location } ) => {
  const [userProfile] = useRecoilState(loggedInUserProfile);

  return (
    <>
      <h3 className="resort-single__map resort-single-card-heading user-select-none">
        <FormattedMessage
          id="shredindex.resort.Map"
          defaultMessage="Where you'll shred"
        />
      </h3>
      {userProfile ? (
        <CCard className="resort__map-card mb-4">
          <CCardBody>
            {location?.longitude && location?.latitude ? (
              <ResortMap longitude={location?.longitude} latitude={location?.latitude}/>
            ) : (
              <span>No map available</span>
            )}
          </CCardBody>
        </CCard>
      ) : (
        <NoUserAccess image={MapDummy} height={'480px'}/>
      )}
    </>
  );
};

export default ResortMapCard;
