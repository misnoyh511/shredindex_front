import { CImg } from '@coreui/react';
import React from 'react';

const Developers = () => (
  <>
    <div className="m-auto p-4 d-flex align-items-center">
      <div>
        <CImg
          src="https://shredindex.com/storage/app/uploads/public/5c0/04f/e78/thumb_43_90_90_0_0_crop.png"
          className="c-avatar-img developer-avatar round"
          width="120"
          height="120"
          alt="admin@bootstrapmaster.com"
        />
      </div>
      <div className="p-4">
        <span className="mr-1 font-weight-bold">
          <a href="https://thomasandrewhansen.com" target="_blank" rel="noopener noreferrer">
            T
            Hansen
          </a>
        </span>
      </div>
    </div>
    <div className="m-auto p-4 d-flex align-items-center">
      <div className="p-4">
        <a href="https://thomasandrewhansen.com" target="_blank" rel="noopener noreferrer">
          <span className="mr-1 font-weight-bold">
            J Darlow
          </span>
        </a>
      </div>
      <div>
        <CImg
          src="https://media-exp1.licdn.com/dms/image/C5603AQFCq5jKlKuFOQ/profile-displayphoto-shrink_200_200/0/1516800185433?e=1620259200&v=beta&t=TEizzz94vIHLCf0t6cUHhIEF10iBBjc-DNAM_7FHsBk"
          className="c-avatar-img developer-avatar round"
          alt="admin@bootstrapmaster.com"
        />
      </div>
    </div>
  </>
);

export default Developers;
