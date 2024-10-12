import React from 'react';
import { CCard, CCardBody } from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import ResortMap from '@/ResortSingle/ResortMapCard/ResortMap/ResortMap';
import NoUserAccess from '@/FeatureToggle/NoUserAccess';
import MapDummy from '../../../images/map-dummy.png';
import { Location } from '../../../types/resortTypes';
import { useRecoilState } from 'recoil';
import { loggedInUserName } from '../../../atoms/userName';

const ResortMapCard: React.FC <Location> = ({ location }) => {
  const [loggedInUsername] = useRecoilState(loggedInUserName);

  return (
    <>
      <h3 className="resort-single__map resort-single-card-heading user-select-none mb-2">
        <FormattedMessage
          id="shredindex.resort.Map"
          defaultMessage="Map"
        />
      </h3>
      {loggedInUsername ? (
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
        <NoUserAccess image={MapDummy} height={'400px'}/>
      )}
    </>
  );
};

export default ResortMapCard;
