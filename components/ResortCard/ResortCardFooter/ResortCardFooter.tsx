import React, { ReactNode, useEffect } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { cilArrowRight, cilChevronBottom } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import queryCMSPage from '../../../utility/query-cms-page';


const QUERY_RESORT = gql`
  query ResortByURLSegment($url_segment: String!) {
    resortByUrlSegment(url_segment: $url_segment) {
      id
      title
      # Add other fields you need
    }
  }
`;

interface ResortFetchingLinkProps {
  to: string;
  resortUrlSegment: string;
  className?: string;
  children?: ReactNode;
}

const ResortFetchingLink: React.FC<ResortFetchingLinkProps> = ({
  to,
  resortUrlSegment,
  className,
  children,
}) => {
  const client = useApolloClient();
  const router = useRouter();

  useEffect(() => {
    // Prefetch the page data
    router.prefetch(`/resort/${to}`);

    // Prefetch CMS page
    client.query(queryCMSPage(`/resort/${to}`))
      .catch(error => console.error('Error prefetching CMS page:', error));

    // Prefetch resort data
    client.query({
      query: QUERY_RESORT,
      variables: { url_segment: resortUrlSegment },
    }).catch(error => console.error('Error prefetching resort data:', error));
  }, [to, resortUrlSegment, client, router]);

  return (
    <Link
      href={`/resort/${to}`}
      className={className}
    >
      {children}
    </Link>
  );
};

interface ResortCardFooterTypes {
  urlSegment: string;
  collapsed?: boolean;
  setCollapsed?: (event: React.MouseEvent<HTMLDivElement>) => void;
  noCollapse?: boolean;
}

const ResortCardFooter: React.FC<ResortCardFooterTypes> = ({ urlSegment, collapsed, noCollapse = false, setCollapsed }) => (
  <div className="resort-card__footer d-flex justify-content-between">
    <div className="resort-card__expand" onClick={setCollapsed}>
      {!noCollapse && (
        <CIcon icon={cilChevronBottom} />
      )}
    </div>
    <ResortFetchingLink
      to={urlSegment}
      resortUrlSegment={urlSegment}
      className="resort-card__resort-link"
    >
      <div className="resort-card__go-to-resort-button">
        <span className="resort-card__go-to-resort-text me-2 user-select-none">
          {collapsed ? null : (
            <FormattedMessage id="shredindex.resortcard.GO_TO_RESORT" defaultMessage="Go to ResortSingle" />
          )}
        </span>
        <CIcon icon={cilArrowRight} />
      </div>
    </ResortFetchingLink>
  </div>
);

export default ResortCardFooter;
