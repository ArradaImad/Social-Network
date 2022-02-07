import React from "react";
import { Avatar } from "@mui/material";
import { stringAvatar } from "./Profile";

function Post(props) {
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
                    <h4 className="text-lg font-bold">{props.post.firstname + " " + props.post.lastname}</h4>
                    <p className="text-sm italic">{date}</p>
                </div>
            </div>
            <div className="mt-4 flex flex-col">
                <h5 className="font-semibold">{props.post.title}</h5>
                <div>{props.post.content}</div>
            </div>
        </div>
    );
}

export default Post;