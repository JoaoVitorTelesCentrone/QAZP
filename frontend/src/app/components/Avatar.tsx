import React from 'react';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

function getInitials(name: string) {
    const initials = name
        .split(' ')
        .slice(0, 2)
        .map(word => word[0])
        .join('');

    return initials.toUpperCase();
}

interface AvatarUserProps {
    name: string;
}

const AvatarUser: React.FC<AvatarUserProps> = ({ name }) => {

    return (
        <Tooltip title={name} arrow>
            <Avatar sx={{ bgcolor: '#7FFFD4', color: 'black', width: 56, height: 56 }}>
                {getInitials(name)}
            </Avatar>
        </Tooltip>
    );
};

export default AvatarUser;
