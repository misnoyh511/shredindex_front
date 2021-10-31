import { useQuery } from '@apollo/react-hooks';
import { CFooter, CImage } from '@coreui/react';
import { gql } from 'apollo-boost';
import React from 'react';
import ReactMarkdown from 'react-markdown';

export const QUERY_SETTINGS = gql`
  {
    settings {
      copyright_message
    }
  }
`;

export const QUERY_TEAM_MEMBERS = gql`
  {
    teamMembers {
      name
      url
      sort_order
      image {
        path
        content_type
      }
    }
  }
`;

const Footer = () => {
  const { loading, data } = useQuery(QUERY_SETTINGS);

  if (loading) {
    return <></>;
  }

  const { settings: { copyright_message } } = data;

  return (
    <CFooter fixed={false} className="footer p-4 h-auto d-block">
      <div className="footer__copyright d-flex justify-content-center">
        <ReactMarkdown>{ copyright_message }</ReactMarkdown>
      </div>
      <div className="footer__team-members d-flex flex-wrap">
        <TeamMembers />
      </div>
    </CFooter>
  );
};

const TeamMembers = () => {
  const { loading, data } = useQuery(QUERY_TEAM_MEMBERS);

  if (loading) {
    return <></>;
  }

  const { teamMembers } = data;

  return teamMembers
    .sort((a, b) => (a.sort_order > b.sort_order ? 1 : -1))
    .map((member) => {
      const {
        url, name, image: { path }, sort_order,
      } = member;

      return (
        <div className="team-members__member m-auto p-4" key={sort_order}>
          <a href={url} className="team-members__member-link d-flex align-items-center" target="_blank" rel="noopener noreferrer">
            {path && (
              <div>
                <CImage
                  src={path}
                  className="team-members__member-image c-avatar-img developer-avatar round"
                  role="presentation"
                />
              </div>
            )}
            <div className="team-members__member-name p-4">
              <span className="mr-1 font-weight-bold">{name}</span>
            </div>
          </a>
        </div>
      );
    });
};

export default Footer;
