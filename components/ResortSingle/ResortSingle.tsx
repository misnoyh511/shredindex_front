import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import {
  CCard, CCardBody, CCol, CContainer, CRow,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilArrowLeft } from '@coreui/icons';
import ResortHeader from '@/ResortSingle/ResortHeader/ResortHeader';
import ResortRatings from '@/ResortSingle/ResortRatings/ResortRatings';
import ResortNumerics from '@/ResortSingle/ResortNumerics/ResortNumerics';
import ResortsParallaxBackground from '@/ResortsParallaxBackground/ResortsParallaxBackground';
import ResortComments from '@/ResortSingle/ResortComments/ResortComments';
import ResortImageCarousel from '@/ResortSingle/ResortImageCarousel/ResortImageCarousel';
import ResortHeaderSkeleton from '@/ResortSingle/ResortHeader/ResortHeaderSkeleton';
import ResortImageCarouselSkeleton from '@/ResortSingle/ResortImageCarousel/ResortImageCarouselSkeleton';
import ResortNumericsSkeleton from '@/ResortSingle/ResortNumerics/ResortNumericsSkeleton';
import ResortRatingsSkeleton from '@/ResortSingle/ResortRatings/ResortRatingsSkeleton';
import ResortMapSkeleton from '@/ResortSingle/ResortMapCard/ResortMap/ResortMapSkeleton';
import Gear from '@/Advertisers/Gear/Gear';
import ResortGenerics from '@/ResortSingle/ResortGenerics/ResortGenerics';
import Accomodation from '@/Advertisers/Accomodation/Accomodation';
import AdvertiseHere from '@/Advertisers/AdvertiseHere/AdvertiseHere';
import ResortMapCard from '@/ResortSingle/ResortMapCard/ResortMapCard';
import { Resort } from '../../types/resortTypes';
import ResortCardError from '../ResortCard/ResortCardError/ResortCardError';

interface ResortProps {
  resortData: Resort | null;
  error?: {
    message: string
  };
  loading?: boolean;
}

const ResortSingle: React.FC<ResortProps> = ({ resortData, error, loading }) => {
  const router = useRouter();
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);

  useEffect(() => {
    // Store the previous URL with query parameters
    const handleRouteChange = () => {
      setPreviousUrl(router.asPath); // Capture the current URL before navigating away
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.asPath, router.events]);

  const handleBackClick = () => {
    if (previousUrl) {
      router.push(previousUrl).then(() => {
        // Force a reload in case the router push doesn't work as expected
        window.location.href = previousUrl;
      });
    } else {
      router.back();
    }
  };



  if (loading) {
    return (
      <CContainer>
        <ResortsParallaxBackground />
        <div className="resort resort-single mt-4 h-100 w-100">
          <div className="resort back-button-wrap mb-4 w-100 d-flex justify-content-end justify-content-lg-start">
            <div
              role="button"
              aria-label="Back button"
              tabIndex={-1}
              className="resort back-button skeleton"
            >
              <span className="skeleton-text back-button-text" />
            </div>
          </div>
          <CRow>
            <CCol lg={8}>
              <ResortHeaderSkeleton />
              <ResortImageCarouselSkeleton />
              <ResortNumericsSkeleton />
              <ResortRatingsSkeleton />
            </CCol>
            <CCol lg={4}>
              <h3 className="resort__description-title h6">
                <FormattedMessage
                  id="shredindex.resort.Map"
                  defaultMessage="Map"
                />
              </h3>
              <CCard className="resort__map-card mb-4">
                <CCardBody>
                  <ResortMapSkeleton />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </CContainer>
    );
  }

  if (error || !resortData) {
    return (
      <CContainer>
        <ResortsParallaxBackground />
        <div className="resort resort-single mt-4">
          <ResortCardError
            helpId="shredindex.resortcarderror.HELP"
            help="Looks like we french fried instead of pizza'd."
            titleId="shredindex.resortcarderror.TITLE"
            title="Woah!!... Gnarly Crash"
            errorName={'Gnarly Crash'}
            errorMessageId="shredindex.resortcarderror.ERRORMESSAGE"
            errorMessage="There was an error loading this resort."
            suggestionId="shredindex.resortcarderror.SUGGESTION"
            suggestion="Maybe try searching for something else..."
          />
        </div>
      </CContainer>
    );
  }

  const {
    affiliate_url,
    resort_images,
    ratingScores,
    numerics,
    generics,
    location,
    comments,
  } = resortData;

  return (
    <CContainer>
      <ResortsParallaxBackground />
      <div className="resort resort-single mt-4">
        <div className="resort back-button-wrap mb-4 w-100 d-flex justify-content-end justify-content-lg-start">
          <div
            role="button"
            aria-label="Back button"
            tabIndex={0}
            onClick={handleBackClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleBackClick();
              }
            }}
            className="resort back-button"
          >
            <CIcon icon={cilArrowLeft} />
          </div>
        </div>
        <CRow>
          <CCol lg={8}>
            <ResortHeader resort={resortData} />
            <ResortImageCarousel images={resort_images} />
            <ResortNumerics numerics={numerics} />
            <ResortGenerics generics={generics} />
            <ResortRatings ratings={ratingScores} />
            <ResortComments comments={comments} />
          </CCol>
          <CCol lg={4}>
            <Accomodation affiliateUrl={affiliate_url} />
            <AdvertiseHere affiliateUrl={affiliate_url}/>
            <Gear />
            <ResortMapCard location={location}/>
          </CCol>
        </CRow>
      </div>
    </CContainer>
  );
};

export default ResortSingle;
