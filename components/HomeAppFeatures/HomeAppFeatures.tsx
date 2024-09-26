import React from 'react';
import {
  CButton, CCol, CContainer, CRow,
} from '@coreui/react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import ExpandShot from '../../images/homepage/expand-shot.svg';
import HighlightsShot from '../../images/homepage/ratings-shot.svg';
import CommentsShot from '../../images/homepage/comments-shot.svg';
import breakpoints from '../../src/js/components/config/breakpoints';

interface TitleDescription {
  id: string;
  defaultMessage: string;
}

interface FeatureRowProps {
  title: TitleDescription;
  description: TitleDescription;
  Image: React.FC<React.SVGProps<SVGSVGElement>>;
  isReversed: boolean;
}

const FeatureRow: React.FC<FeatureRowProps> = ({
  title, description, Image, isReversed,
}) => (
  <div className="mb-5">
    <CRow className="pb-5 flex-column flex-md-row align-items-center gx-4">
      <CCol
        xs={12}
        md={6}
        className={`text-center text-md-${isReversed ? 'end' : 'start'} order-md-${isReversed ? '1' : '2'}`}
      >
        <div className="w-100">
          <h4 className="fw-bold mb-4 order-1 order-md-1">
            <FormattedMessage id={title.id} defaultMessage={title.defaultMessage} />
          </h4>
          <div className="order-3 order-md-2 d-md-block d-none">
            <p>
              <FormattedMessage
                id={description.id}
                defaultMessage={description.defaultMessage}
                values={{ lineBreak: <br /> }}
              />
            </p>
          </div>
        </div>
      </CCol>
      <CCol xs={12} md={6} className={`order-2 order-md-${isReversed ? '2' : '1'} mb-3 mb-md-0 text-center`}>
        <Image className="w-100 app-features-image" />
      </CCol>
      <div className="order-3 order-md-2 d-md-none d-sm-block text-center">
        <p>
          <FormattedMessage
            id={description.id}
            defaultMessage={description.defaultMessage}
            values={{ lineBreak: <br /> }}
          />
        </p>
      </div>
    </CRow>
  </div>
);

const features: FeatureRowProps[] = [
  {
    title: {
      id: 'shredindex.homeFeatures.QUICKVIEW',
      defaultMessage: 'Save time with quick view',
    },
    description: {
      id: 'shredindex.homeFeatures.QUICKVIEWDESCRIPTION',
      defaultMessage: 'Get the vibe of a resort in a flash with the click of a button.{lineBreak}{lineBreak}We\'ve got the top details right where you want them.',
    },
    Image: ExpandShot,
    isReversed: true,
  },
  {
    title: {
      id: 'shredindex.homeFeatures.HIGHLIGHTSLOWLIGHTS',
      defaultMessage: 'Highlight & Lowlights',
    },
    description: {
      id: 'shredindex.homeFeatures.HIGHLIGHTSLOWLIGHTSDESCRIPTION',
      defaultMessage: 'Get a sense of the place by the things that suit your lifestyle without having to have a try on the hunch a resort might be your paradise.',
    },
    Image: HighlightsShot,
    isReversed: false,
  },
  {
    title: {
      id: 'shredindex.homeFeatures.COMMENTSANDTIPS',
      defaultMessage: 'Comments and tips',
    },
    description: {
      id: 'shredindex.homeFeatures.COMMENTSANDTIPSDESCRIPTION',
      defaultMessage: 'Get the top comments and tips.{lineBreak}{lineBreak}We gather insights from professional athletes, seasons travellers and experienced residents.',
    },
    Image: CommentsShot,
    isReversed: true,
  },
];

const Vibe: React.FC = () => (
  <span className="text-warning">
    &apos;
    <FormattedMessage
      id="shredindex.homeFeatures.VIBE"
      defaultMessage="vibe"
    />
    &apos;
  </span>
);

const HomeAppFeatures: React.FC = () => (
  <div className="home-app-features mt-5">
    <h3 className="fw-bold text-center mb-5">
      <FormattedMessage
        id="shredindex.homeFeatures.GETTHEVIBE"
        defaultMessage="Get the {vibe} as you scroll..."
        values={{ vibe: <Vibe /> }}
      />
    </h3>
    <CContainer className="px-3 px-sm-4 mw" style={{ maxWidth: `${breakpoints.md}px` }}>
      {features.map((feature) => (
        <FeatureRow key={feature.title.id} {...feature} />
      ))}
    </CContainer>
    <div className="button-group align-items-center text-center mb-5">
      <Link href="/resorts">
        <CButton className="p-2 pe-4 ps-4" color="warning">
          <FormattedMessage
            id="shredindex.homeFeatures.STARTSCROLLING"
            defaultMessage="Start scrolling"
          />
        </CButton>
      </Link>
    </div>
  </div>
);

export default HomeAppFeatures;
