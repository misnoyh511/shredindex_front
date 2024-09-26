import React, { useState } from 'react';
import Link from 'next/link';
import { CButton } from '@coreui/react';

interface ResortDescriptionProps {
  description?: string;
  affiliateUrl?: string;
}

const textWithLineBreaks = ({ text }: { text: string }): string => {
  if (text) {
    return text.split('\n\n').map((paragraph) =>
      `<p>${paragraph.replace(/\n/g, '<br />')}</p>`,
    ).join('');
  }
  return '';
};

const ResortDescription: React.FC<ResortDescriptionProps> = ({ affiliateUrl, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200; // Adjust this value to change the initial visible length

  if (!description) return null;

  const truncatedDescription = description.length > maxLength && !isExpanded
    ? description.slice(0, maxLength) + '...'
    : description;

  return (
    <div className="resort-card__description-single-resort mb-3 me-2 user-select-none">
      <Link
        className="resort-card__affiliate-link link-unstyled"
        rel="noreferrer noopener"
        target="_blank"
        href={affiliateUrl || ''}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: textWithLineBreaks({ text: truncatedDescription }),
          }}
        />
      </Link>
      {description.length > maxLength && !isExpanded && (
        <div className="button-group align-items-center">
            <CButton
              color="primary"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2"
            >
              {isExpanded ? 'Show less' : 'Show me more'}
            </CButton>
        </div>
      )
      }
    </div>
  );
};

export default ResortDescription;
