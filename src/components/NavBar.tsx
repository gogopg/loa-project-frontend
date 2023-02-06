import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
// mui
import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    Box,
    Divider
} from '@mui/material';
import {styled} from '@mui/material/styles';
// stores
// components
import AlertMsgSnackbar from './AlertMsgSnackbar';
import AlertMessageService, {ALERT_SEVERITY} from '../services/alertMessage.service';
// import LanguageSwitch from './LanguageSwitch';
import {
    useRecoilState,
} from 'recoil';
import loginState from "../store/auth.store";
import LoginDialog from "./LoginDialog";

const drawerWidth = 240;

const CustomAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}: any) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,

            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function NavBar() {
    const [userAnchorEl, setUserAnchorEl] = React.useState<any>(null);
    const [isLogin, setIsLogin] = useRecoilState(loginState);
    const [isLoginDialogOpen, setLoginDialogOpen] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const open = Boolean(userAnchorEl);
    const navigate = useNavigate();

    const pages = ['원정대 관리', '수련장 기록', '공격대 일정', '보상 사전', '경매장 시세'];
    const urls = ['expedition', 'record', 'raid', 'reword_dictionary', 'auction'];

    const handleClose = () => {
        setUserAnchorEl(null);
    };

    const onLogout = () => {
        // authStore.logout(() => {
        //     navigate('/login');
        // });
        handleClose();
    };

    const test = () => {
        AlertMessageService.addAlertMessage(count+"", ALERT_SEVERITY.info);
        setCount(count+1);
        console.log('count', count)
    }

    const handleLogin = () => {
        setLoginDialogOpen(!isLoginDialogOpen);
        // setIsLogin(!isLogin);
    };

    const getLoginText = () => {
        return isLogin ? 'log out' : 'log in';
    }

    return (
        <CustomAppBar position="fixed">
            <Toolbar variant="dense">
                <Typography
                    style={{flex: '0 0 auto', textAlign: 'left'}}
                    variant="h6"
                    color="inherit"
                    onClick={() => navigate('/')}
                    noWrap
                >
                    {'Home'}
                </Typography>
                <Divider/>
                <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                    {pages.map((page, idx) => (
                        <Button key={urls[idx]} sx={{color: '#fff'}} onClick={() => navigate('/' + urls[idx])}>
                            {page}
                        </Button>
                    ))}
                </Box>
                <Button key={'test'} onClick={test} sx={{color: '#fff'}}>{'test'}</Button>
                <Button key={'loginTest'} onClick={handleLogin} sx={{color: '#fff'}}>{getLoginText()}</Button>
            </Toolbar>
            <AlertMsgSnackbar/>
            <LoginDialog openDialogState={isLoginDialogOpen} closeFunction={null}/>
        </CustomAppBar>
    );
};
