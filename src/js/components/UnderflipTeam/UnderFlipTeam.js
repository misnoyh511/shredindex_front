import React from 'react';
import TeamConfig from '../config/team-config';
import TeamMember from '../TeamMember/TeamMember';

const UnderflipTeam = () => TeamConfig
  .map((item) => (
    <TeamMember member={item} />
  ));

export default UnderflipTeam;
