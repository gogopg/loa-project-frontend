import React from 'react';
import {Box, Button} from "@mui/material";
import CreateScheduleDialog from "../components/CreateScheduleDialog";
import ExpeditionManagementDialog from "../components/ExpeditionManageDialog";
import ScheduleCard from "../components/ScheduleCard";
import axios from "axios";
import ExpeditionModel from "../data_model/Expedition.model";

export default function RaidPage() {
    const [scheduleDialogOpen, setScheduleDialogOpen] = React.useState(false);
    const [expeditionDialogOpen, setExpeditionDialogOpen] = React.useState(false);
    const [scheduleListState, setScheduleListState] = React.useState([]);
    const scheduleCloseFunc = () => {
        setScheduleDialogOpen(false);
    }
    const expeditionCloseFunc = () => {
        setExpeditionDialogOpen(false);
    }

    React.useEffect(() => {
        setScheduleListState(JSON.parse(localStorage.getItem('scheduleList') || '[]'));
    }, []);

    const test = () => {
        axios({
            url: 'https://lostark.game.onstove.com/Board/GetExpandInfo?memberNo=183271045',

        },).then((response) => {
            console.log('response', response)
        })
    }

    return (
        <div>
            <Box>
                <Button variant="contained" onClick={() => setScheduleDialogOpen(true)}>일정 생성</Button>
                <Button variant="contained" onClick={() => setExpeditionDialogOpen(true)}>관심 원정대 관리</Button>
                <Button variant="contained" onClick={() => test()}>테스트</Button>
            </Box>
            <Box sx={{mt: 2}}>
                {scheduleListState &&
                    scheduleListState.map((schedule) => {
                        return <ScheduleCard data={schedule}/>
                    })
                }
            </Box>

            <CreateScheduleDialog openState={scheduleDialogOpen} closeFunc={scheduleCloseFunc}/>
            <ExpeditionManagementDialog openState={expeditionDialogOpen} closeFunc={expeditionCloseFunc}/>
        </div>
    )
}