import React from 'react';
import {
  CCard, CCardBody, CCardFooter, CCardHeader,
} from '@coreui/react';
import useLocalStorageDrivenBooleanState from '../../hooks/useLocalStorageDrivenBooleanState';
import ResortCardFooter from './ResortCardFooter/ResortCardFooter';
import ResortCardBody from './ResortCardBody/ResortCardBody';
import ResortCardHeader from './ResortCardHeader/ResortCardHeader';
import { Resort } from '../../types/resortTypes';
import Link from 'next/link';

interface ResortCardProps {
  resortData: Resort;
}

const ResortCard: React.FC<ResortCardProps> = ({ resortData }) => {
  const [collapsed, setCollapsed] = useLocalStorageDrivenBooleanState('resortCollapsed', resortData.id);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  if (!resortData) {
    throw new Error('ResortSingle failed to load');
  }

  const {
    title, url, url_segment, total_score, affiliate_url,
  } = resortData;

  return (
    <div className="resort-card d-flex justify-content-center">
      <CCard className={`${!collapsed ? 'collapsed' : 'full-expanded'} resort-card__wrap`}>
        <CCardHeader className="resort-card__header-wrap pb-0">
          <Link
            className="resort-card__affiliate-link link-unstyled"
            rel="noreferrer noopener"
            target="_blank"
            href={affiliate_url ? affiliate_url : ''}>
            <ResortCardHeader title={title} totalScore={total_score} />
          </Link>
        </CCardHeader>
        <CCardBody className="resort-card__body-wrap pt-0 pb-0">
          <ResortCardBody resort={resortData} collapsed={!collapsed} />
        </CCardBody>
        <CCardFooter className="resort-card__footer-wrap pointer-event">
          <ResortCardFooter url={url} urlSegment={url_segment} collapsed={!collapsed} setCollapsed={onCollapse} />
        </CCardFooter>
      </CCard>
    </div>
  );
};

export default ResortCard;
