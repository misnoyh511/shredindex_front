import React from 'react';
import { CIcon } from '@coreui/icons-react';

const SVGToCIcon = ({ src, size = 'xl', className = '' }) => {
  // Helper to convert number pairs to viewBox format
  const formatViewBox = (dimensions) => {
    if (typeof dimensions === 'string' && dimensions.includes(' ')) {
      return `0 0 ${dimensions}`;
    }
    return dimensions;
  };

  // Extract SVG content from string that might contain nested SVG tags
  const extractSVGContent = (content) => {
    // If content contains a full SVG tag, extract just the inner content
    if (content.includes('<svg')) {
      const match = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
      return match ? match[1].trim() : content;
    }
    return content;
  };

  // Clean up SVG content by removing unnecessary newlines and extra spaces
  const cleanSVGContent = (content) => {
    return content
      .replace(/\n\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  };

  // Get CIcon props based on input format
  const getCIconProps = () => {
    // If src is already in CIcon format (has icon property)
    if (src && typeof src === 'object' && 'icon' in src) {
      return src.icon;
    }

    // If src is in array format [viewBox, content]
    if (Array.isArray(src)) {
      const [dimensions, content] = src;
      const cleanContent = cleanSVGContent(extractSVGContent(content));

      return {
        viewBox: formatViewBox(dimensions),
        content: [cleanContent],
      };
    }

    // If src is a full SVG string
    if (typeof src === 'string' && src.includes('<svg')) {
      const viewBoxMatch = src.match(/viewBox=["']([^"']+)["']/);
      const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
      const content = extractSVGContent(src);

      return {
        viewBox,
        content: [cleanSVGContent(content)],
      };
    }

    // If src is direct CIcon format (has viewBox and content)
    if (src && typeof src === 'object' && ('viewBox' in src || 'content' in src)) {
      return {
        viewBox: src.viewBox || '0 0 24 24',
        content: Array.isArray(src.content)
          ? src.content.map(cleanSVGContent)
          : [cleanSVGContent(src.content)],
      };
    }

    // Default fallback
    return {
      viewBox: '0 0 24 24',
      content: [],
    };
  };

  // Get the icon props
  const iconProps = getCIconProps();

  return (
    <CIcon
      {...iconProps}
      style={{ width: size, height: size }}
      className={className}
    />
  );
};

export default SVGToCIcon;
