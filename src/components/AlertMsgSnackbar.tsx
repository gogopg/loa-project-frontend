import React, {useEffect, useState} from 'react';
import {Snackbar} from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertMessageService, {AlertMessage} from '../services/alertMessage.service';
import {SnackbarCloseReason} from '@mui/material/Snackbar/Snackbar';

export default function AlertMsgSnackbar() {
    const [currentMessage, setCurrentMessage] = useState<AlertMessage>({
        message: 'not generated',
        severity: 'error',
        date: new Date(),
        duration: 1000,
    });
    const [isToastOpen, setToastOpen] = useState<boolean>(false);

    const handleClose = (event: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setToastOpen(false);
    };

    const closeButtonClick = () => {
        setToastOpen(false);
    }

    function setDisplayToast() {
        const message = AlertMessageService.pullAlertMessage() as AlertMessage;
        if (!message) {
            return;
        }

        setCurrentMessage(message);
    }

    useEffect(() => {
        const subscriber = AlertMessageService.queueEvent$.subscribe(() => {
            setToastOpen(true);
        });

        return () => {
            subscriber.unsubscribe();
        }
    }, []);

    useEffect(() => {
        if (isToastOpen) {
            setDisplayToast();
        } else {
            if (!AlertMessageService.isMessageQueueEmpty()) {
                // toast가 연속 될 경우, 한번 닫히는 에니메이션을 위해 0.5초 대기
                setTimeout(() => {
                    setToastOpen(true);
                }, 500);
            }
        }
    }, [isToastOpen]);

    return (
        <Snackbar open={isToastOpen} autoHideDuration={currentMessage.duration} onClose={handleClose}>
            <Alert onClose={closeButtonClick} severity={currentMessage.severity} sx={{width: '100%'}}>
                {currentMessage.message}
            </Alert>
        </Snackbar>
    );
}