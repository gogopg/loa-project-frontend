import React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Button,
    Dialog,
    DialogTitle,
    List,
    Tab,
    TextField
} from "@mui/material";
import {TabContext, TabList, TabPanel} from '@mui/lab';
import ExpeditionModel from "../data_model/Expedition.model";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CharacterModel from "../data_model/Character.model";
import CharacterList from "./CharacterList";
import * as _ from "lodash";
import {useRecoilState} from "recoil";
import {selectedCharacterListState} from "../store/schedule.store";
import AlertMessageService, {ALERT_SEVERITY} from '../services/alertMessage.service'

export default function LoginDialog({
                                        openDialogState,
                                        closeFunction
                                    }: { openDialogState: boolean, closeFunction: any }) {
    const [tabVal, setTabVal] = React.useState('1');
    const [favoriteExpeditionsState, setFavoriteExpeditionsState] = React.useState<Array<ExpeditionModel> | undefined>(JSON.parse(localStorage.getItem('favoriteExpeditions') || '[{}]'))
    const [selectedCharacterList, setSelectedCharacterList] = useRecoilState(selectedCharacterListState);

    function selectCharacter(data: CharacterModel) {
        const list = _.cloneDeep(selectedCharacterList);
        list.push(data)
        setSelectedCharacterList(list);
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabVal(newValue);
    };

    const onLogin = function() {
        AlertMessageService.addAlertMessage('test', ALERT_SEVERITY.info);
    }

    return (
        <Dialog id='dialog' onClose={closeFunction} open={openDialogState}>
            <DialogTitle>Log in</DialogTitle>
            <Box sx={{width: '100%', typography: 'body1'}}>
                <Box>
                    <TextField id="outlined-basic" label="Email" variant="outlined"/>
                </Box>

                <Box>
                    <TextField id="outlined-basic" label="password" variant="outlined"/>
                </Box>
                <Box>
                    <Button onClick={onLogin}>OK</Button>
                    <Button>Cancel</Button>
                </Box>
            </Box>
        </Dialog>)
}