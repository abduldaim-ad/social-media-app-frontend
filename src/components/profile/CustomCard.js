import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './styles/CustomCard.css'

const CustomCard = ({ title, desc }) => {

    return (
        <Card sx={{ maxWidth: 345 }} className='card-style'>
            <CardActionArea>
                <CardMedia
                    component="img"
                    // height="140"
                    image="https://wallpapers.com/images/featured/nature-2ygv7ssy2k0lxlzu.jpg"
                    alt="profile post"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {desc?.slice(0, 150)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Read More
                </Button>
            </CardActions>
        </Card>
    );
}

export default CustomCard