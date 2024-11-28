import React, { useState } from 'react';
import Link from 'next/link';
import { CButton } from '@coreui/react';

interface ResortDescriptionProps {
  description?: string;
  affiliateUrl?: string;
}

// Create paragraphs with proper React elements instead of HTML strings
const TextWithLineBreaks = ({ text }: { text: string }) => {
  if (!text) return null;

  return (
    <>
      {text.split('\n\n').map((paragraph, index) => (
        <p key={index}>
          {paragraph.split('\n').map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {line}
              {lineIndex < paragraph.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      ))}
    </>
  );
};

const ResortDescription: React.FC<ResortDescriptionProps> = ({ affiliateUrl, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 600;
  const descriptionId = 'resort-description';
  const buttonId = 'expand-description';

  if (!description) return null;

  const truncatedDescription = description.length > maxLength && !isExpanded
    ? description.slice(0, maxLength) + '...'
    : description;

  return (
    <section
      className="resort-card__description-single-resort mb-3 me-2 user-select-none"
      aria-labelledby={descriptionId}
    >
      <Link
        className="resort-card__affiliate-link link-unstyled"
        rel="noreferrer noopener"
        target="_blank"
        href={affiliateUrl || '#'}
        aria-label="Book near by ski resort acccomdation (opens in new tab)"
      >
        <div
          id={descriptionId}
          role="article"
          aria-expanded={isExpanded}
        >
          <TextWithLineBreaks text={truncatedDescription} />
        </div>
      </Link>
      {description.length > maxLength && (
        <div
          className="button-group align-items-center"
          role="group"
          aria-controls={descriptionId}
        >
          <CButton
            id={buttonId}
            color="primary"
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2"
            aria-expanded={isExpanded}
            aria-controls={descriptionId}
            aria-label={isExpanded ? 'Show less description' : 'Show full description'}
          >
            {isExpanded ? 'Show less' : 'Show me more'}
          </CButton>
        </div>
      )}
    </section>
  );
};

export default ResortDescription;
