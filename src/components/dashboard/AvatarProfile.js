import React from 'react';
import { Avatar } from 'rsuite';
import { getNameInitial } from '../../misc/helpers';

const AvatarProfile = ({ name, ...avatarProps }) => {
  return (
    <Avatar circle {...avatarProps}>
      {getNameInitial(name)}
    </Avatar>
  );
};

export default AvatarProfile;
