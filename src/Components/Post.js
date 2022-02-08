import React, { useState } from "react";
import { Avatar, Button, Popover, Typography, IconButton, Collapse, TextField } from "@mui/material";
import { stringAvatar, LoadingProfile } from "./Profile";
import { getUserProfile, addLike, addComment } from "../lib/social-network-library";
import ProfileMini from "./ProfileMini";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComments, faHeart } from '@fortawesome/free-solid-svg-icons';


function Post(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [author, setAuthor] = useState();
    const [toggleCommentsSection, setToggleCommentsSection] = useState(false);
    const [comment, setComment] = useState("");

    const handlePopoverOpen = async (event) => {
        setAnchorEl(event.currentTarget);
        let user = await getUserProfile(props.post.userId);

        if (!user) {
            throw new Error(`Error while fetching author : ${user}`);
        }

        console.log(user);
        setAuthor(user);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleClickLike = async () => {
        let result = await addLike(props.post._id);

        if (!result) {
            throw new Error(`Error while liking post : ${result}`);
        }

        console.log(result);
    };

    const handleClickComment = () => {
        setToggleCommentsSection(!toggleCommentsSection);
    };

    const handleSendComment = async() => {
        let result = await addComment(props.post._id, comment);

        if (!result) {
            throw new Error(`Error while commenting post : ${result}`);
        }

        console.log(result);
    }

    const openPopover = Boolean(anchorEl);
    const date = new Date(props.post.date).toLocaleDateString();
    return (
        <div className="border border-gray-200 rounded-md p-4">
            <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                <Avatar
                    alt={props.post.firstname + ' ' + props.post.lastname}
                    sx={{ width: 96, height: 96, fontSize: 64 }}
                    {...stringAvatar(props.post.firstname.toUpperCase() + ' ' + props.post.lastname.toUpperCase(), 48)}
                />
                <div className="flex flex-col">
                    <h4 className="text-lg font-bold"
                        aria-owns={openPopover ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >{props.post.firstname + " " + props.post.lastname}</h4>
                    <Popover
                        id={'mouse-over-popover-' + props.post.userId}
                        sx={{
                            pointerEvents: 'none',
                        }}
                        open={openPopover}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        {author ? <ProfileMini user={author} /> : <LoadingProfile />}
                    </Popover>
                    <p className="text-sm italic">{date}</p>
                </div>
            </div>
            <div className="mt-4 flex flex-col pb-4 border-b border-gray-200">
                <h5 className="font-semibold text-lg">{props.post.title}</h5>
                <div>{props.post.content}</div>
            </div>
            <div className="flex justify-between items-center">
                <div className="w-full h-full space-x-4">
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<FontAwesomeIcon icon={faThumbsUp} />}
                        onClick={handleClickLike}
                    >
                        Like
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<FontAwesomeIcon icon={faComments} />}
                        onClick={handleClickComment}
                    >
                        Comments
                    </Button>
                </div>
                <div className="justify-self-end">
                    <IconButton color="primary">
                        <span className="mr-2">{props.post.comments.length}</span>
                        <FontAwesomeIcon icon={faHeart} />
                    </IconButton>
                </div>
            </div>
            <div className="">
                <Collapse in={toggleCommentsSection}>
                    <div className="py-4 flex flex-col space-y-4">
                        {props.post.comments.map((c, index) => 
                            <div className="flex items-center space-x-4" key={c._id}>
                                <Avatar
                                    alt={c.firstname + ' ' + c.lastname}
                                    sx={{ width: 64, height: 64, fontSize: 24 }}
                                    {...stringAvatar(c.firstname.toUpperCase() + ' ' + c.lastname.toUpperCase(), 36)}
                                />
                                <div className="flex flex-col bg-slate-200 rounded p-4">
                                    <h6 className="font-bold text-sm mb-2">{c.firstname + " " + c.lastname}</h6>
                                    <div className="">
                                        {c.content}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center space-x-4">
                            <Avatar
                                alt={props.currentUser.firstname + ' ' + props.currentUser.lastname}
                                sx={{ width: 64, height: 64, fontSize: 24 }}
                                {...stringAvatar(props.currentUser.firstname.toUpperCase() + ' ' + props.currentUser.lastname.toUpperCase(), 36)}
                            />
                            <TextField
                                autoFocus
                                size="small"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                margin="dense"
                                id="comment"
                                name="comment"
                                label="Your comment"
                                type="text"
                                variant="outlined"
                                fullWidth
                            />
                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={<FontAwesomeIcon icon={faComments} />}
                                onClick={handleSendComment}
                                className="p-2"
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    );
}

export default Post;