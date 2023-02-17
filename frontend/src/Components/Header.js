import '../styles/header.css';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';

import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


function Header() {
    return(
        <Box sx={{ flexGrow: 1, p: 2 }} id="header">
            <Grid container spacing={3}>
                <Grid xs display="flex" justifyContent="left" alignItems="center">
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Grid>
                <Grid xs={6} display="flex" justifyContent="center" alignItems="center">
                    <HomeIcon/>
                </Grid>
                <Grid xs display="flex" justifyContent="right" alignItems="center">
                    <EmojiEventsIcon/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Header;