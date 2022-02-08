import React, { useState, useEffect } from 'react';
import { getCurrentUserProfile, getPosts, updateCurrentUserProfile, isUserLoggedIn } from "../lib/social-network-library";
import { Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faIdCard, faBirthdayCake, faBuilding, faAt } from '@fortawesome/free-solid-svg-icons';
import Post from './Post';
import { Link } from 'react-router-dom';

export function LoadingProfile(props) {
    return (
        <div className="p-4 w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-24 w-24"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                            <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                        </div>
                        <div className="h-4 w-20 bg-slate-200 rounded"></div>
                        <div className="h-4 bg-slate-200 rounded"></div>
                        <div className="h-4 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function LoadingRecentPosts() {
    return (
        <div className="flex flex-col space-y-6">
            <div className="p-4 w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                                <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                            </div>
                            <div className="h-4 w-20 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                                <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                            </div>
                            <div className="h-4 w-20 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                                <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                            </div>
                            <div className="h-4 w-20 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name, size) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: size,
            height: size,
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}


function Profile() {

    const isLoggedIn = isUserLoggedIn();

    const [userInfos, setUserInfos] = useState();
    const [recentPosts, setRecentPosts] = useState([]);

    const [open, setOpen] = useState(false);
    const handleClickOpenEditDialog = () => {
        setOpen(true);
    };
    const handleCloseEditDialog = () => {
        setOpen(false);
    };

    const [editedUserInfo, setEditedUserInfo] = useState(
        {
            firstname: '',
            lastname: '',
            age: '',
            email: '',
            occupation: ''
        }
    );

    const handleProfileEdit = async () => {
        let result = await updateCurrentUserProfile(editedUserInfo.firstname, editedUserInfo.lastname, editedUserInfo.email, editedUserInfo.age, editedUserInfo.occupation);

        if (!result) {
            throw new Error(`Error while updating user data : ${result}`)
        }

        setUserInfos(editedUserInfo);
        setOpen(false);
    }

    useEffect(() => {
        if (!userInfos) {
            getCurrentUserProfile()
                .then((infos) => {
                    if (!infos) {
                        throw new Error(`Error while displaying profile : ${infos}`);
                    }
                    setUserInfos(infos);
                    setEditedUserInfo({ firstname: "", lastname: "", age: "", occupation: "", email: "", ...infos });
                })
        }

        if (recentPosts.length === 0) {
            getPosts(0, 10)
                .then((results) => {
                    if (!results) {
                        throw new Error(`Error while fetching posts : ${results}`);
                    }
                    console.log(results);
                    setRecentPosts(results.posts);
                });
        }
    }, [userInfos, editedUserInfo, recentPosts]);

    const displayUserInfos = (user) => {
        return (
            <>
                { isLoggedIn ? 
                <div className='absolute top-0 right-0 mt-6 mr-6'>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<FontAwesomeIcon icon={faEdit} />}
                        onClick={handleClickOpenEditDialog}
                    >
                        Edit
                    </Button>
                </div>
                : '' }
                <div className="flex flex-col items-center space-y-8">
                    <Avatar
                        alt={user.firstname + ' ' + user.lastname}
                        sx={{ width: 96, height: 96, fontSize: 64 }}
                        {...stringAvatar(user.firstname.toUpperCase() + ' ' + user.lastname.toUpperCase(), 128)}
                    />
                    <div className="flex flex-col">
                        <Typography variant="h4" gutterBottom component="div">
                            <FontAwesomeIcon icon={faIdCard} className="text-sky-600 text-2xl fa-fw mr-4" />
                            {user.firstname + ' ' + user.lastname}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            <FontAwesomeIcon icon={faBirthdayCake} className="text-sky-600 text-2xl fa-fw mr-4" />
                            {user.age} an(s)
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            <FontAwesomeIcon icon={faBuilding} className="text-sky-600 text-2xl fa-fw mr-4" />
                            {user.occupation}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            <FontAwesomeIcon icon={faAt} className="text-sky-600 text-2xl fa-fw mr-4" />
                            {user.email}
                        </Typography>
                    </div>
                </div>
            </>
        );
    }

    const handleChangeUser = (e) => {
        setEditedUserInfo({ ...editedUserInfo, [e.target.name]: e.target.value });
    }

    const displayRecentPosts = () => {
        return (
            <div className="flex flex-col space-y-6">
                {recentPosts.map(post =>
                    <Post key={post._id} post={post} currentUser={userInfos}/>
                )}

                <Button sx={{ my: 2, color: 'primary', display: 'block' }}>
                    <Link to="/">See more</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="grow flex flex-col justify-center items-center">
            <div className="max-w-2xl w-full shadow-md rounded-lg p-8 mb-8 relative">
                {userInfos ? displayUserInfos(userInfos) : <LoadingProfile />}
            </div>
            <div className="max-w-2xl w-full shadow-md rounded-lg p-8 mb-8 relative">
                <Typography variant="h4" gutterBottom component="div" className="mb-4">
                    Recent posts
                </Typography>
                {recentPosts.length !== 0 ? displayRecentPosts() : <LoadingRecentPosts />}
            </div>

            <Dialog open={open} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit your profile</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={editedUserInfo.firstname}
                        onChange={(e) => handleChangeUser(e)}
                        margin="dense"
                        id="firstname"
                        name="firstname"
                        label="Your firstname"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        value={editedUserInfo.lastname}
                        onChange={(e) => handleChangeUser(e)}
                        margin="dense"
                        id="lastname"
                        name="lastname"
                        label="Your lastname"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        value={editedUserInfo.age}
                        onChange={(e) => handleChangeUser(e)}
                        margin="dense"
                        id="age"
                        name="age"
                        label="Your age"
                        type="number"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        value={editedUserInfo.occupation}
                        onChange={(e) => handleChangeUser(e)}
                        margin="dense"
                        id="occupation"
                        name="occupation"
                        label="Your occupation"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        value={editedUserInfo.email}
                        onChange={(e) => handleChangeUser(e)}
                        margin="dense"
                        id="email"
                        name="email"
                        label="Your email"
                        type="email"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={handleProfileEdit}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Profile;