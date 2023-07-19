import { Container, Input, Box, Typography,Stack } from '@mui/material'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useState } from 'react'
import avatar from "../assets/profile-image.jpeg"

const AvatarProfile = () => {
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState(false);

    const inputImage = (e) => {
        const file = e.target.files[0];
        if (file && file.type.substring(0,5)==="image"){
            setImage(file);
        }
        else {
            setImage(null)
        } 
    }

    return (
        <Container maxWidth="sm" sx={{marginTop: "8rem", marginBottom: "8rem", textAlign: "center"}}>
            { image ? (
                <Box 
                component="img"
                style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #4f04ff21"
                }}
                src={URL.createObjectURL(image)} alt="profile image"
            />
            )
            :
            (
                <Box 
                component="img"
                style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #4f04ff21"
                }}
                src={avatar} alt="profile image"
            />
            )
            }
            <h1>
                Select an avatar for your profile
            </h1>
            {success && 
                <Stack spacing={2} paddingBottom={2} sx={{color: "#000080"}}>
                    <ThumbUpOffAltIcon/>
                    <Typography variant="h6">
                        {success}
                    </Typography>
                </Stack>
            }
            <Input 
                type='file'
                onChange={inputImage}
            />
        </Container>
    )
}

export default AvatarProfile