import React from 'react';

import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    Box,
    Paper,
    Card,
    Divider, Avatar, CardHeader,
    ListItem, ListItemAvatar
} from '@mui/material';

let avatarSrc = 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/elemental_master.png';

export default function CharacterProfile() {
    return (
        <Card sx={{maxWidth: '20rem'}}>
            <ListItemAvatar>
                <Avatar src={avatarSrc}/>
            </ListItemAvatar>

            <p>Lv 60(1580.6)</p>
            <p>메이플시나몬칩</p>
        </Card>
    )
}