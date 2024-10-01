import React, { ReactNode } from 'react';

interface ChildrenProps {
  children: ReactNode;
}

const ReactMarkdownMock = ({ children }: ChildrenProps) => {
  return (
    <p>{children}</p>
  );
};

export default ReactMarkdownMock;
