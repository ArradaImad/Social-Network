import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createPost } from "../lib/social-network-library"; // Import de la fonction login


function Postform () {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleCreatePost = async () => {
        let result = await createPost(title, content); // Utilisation de la fonction login
       
        if (!result) {
            throw new Error(`Error while registering : ${result}`)
        }

        console.log(result);
    }



    return (
        <div className="grow flex flex-col justify-center items-center">
            <div className="max-w-lg w-full shadow-md rounded-lg p-8">
                <div className="flex flex-col space-y-4">
                    <Typography variant="h2" align="center" gutterBottom component="div">
                    A quoi <br/> pensez-vous ?
                    </Typography>
                    <TextField 
                        id="posttitle" 
                        label="Title" 
                        variant="outlined" 
                        value={title} onChange={(e) => setTitle(e.target.value)} />

                    <TextField
                        id="outlined-multiline-static"
                        label="Content"
                        multiline
                        rows={4}
                        defaultValue=""
                        value={content} onChange={(e) => setContent(e.target.value)}
                    />
                    <Button onClick={handleCreatePost} variant="contained">Publier</Button>
                </div>
            </div>
        </div>

    )



}



export default Postform;
