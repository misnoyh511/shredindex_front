import React from 'react';
import { FormattedMessage } from 'react-intl';

interface TypeDescriptionProps {
  label: string;
  prefix?: string;
  defaultMessage?: string;
}

export const TypeDescription: React.FC<TypeDescriptionProps> = ({
  label,
  prefix = 'shredindex.filterdescription',
  defaultMessage = 'NO_DESCRIPTION',
}) => {
  const formatMessageId = React.useCallback((inputLabel: string): string => {
    return inputLabel.toUpperCase().replace(/ /g, '_');
  }, []);

  const messageId = `${prefix}.${formatMessageId(label)}`;

  return (
    <FormattedMessage
      id={messageId}
      description={messageId}
      defaultMessage={defaultMessage}
    />
  );
};
