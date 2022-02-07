import { Avatar, Typography } from "@mui/material";
import React from "react";
import { stringAvatar } from './Profile';

function ProfileMini(props) {
    const user = props.user;
    return (
        <div className="p-4">
            <div className="flex items-center space-x-4">
                <Avatar
                    alt={user.firstname + ' ' + user.lastname}
                    sx={{ width: 96, height: 96, fontSize: 32 }}
                    {...stringAvatar(user.firstname.toUpperCase() + ' ' + user.lastname.toUpperCase(), 64)}
                />
                <div className="flex flex-col">
                    <Typography variant="h4" gutterBottom component="div">
                        {user.firstname + ' ' + user.lastname}
                    </Typography>
                    { user.age ? 
                    <Typography variant="subtitle1" gutterBottom component="div">
                        {user.age} an(s)
                    </Typography>
                    : '' }
                    {user.occupation ? 
                        <Typography variant="subtitle1" gutterBottom component="div">
                            {user.occupation}
                        </Typography>
                    : '' }
                    <Typography variant="subtitle1" gutterBottom component="div">
                        {user.email}
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default ProfileMini;