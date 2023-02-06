import React from 'react';
import {
    AppBar,
    Box,
    Button,
    Container,
    Dialog, FormControl,
    IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select,
    Slide,
    Stack,
    TextField, TextFieldProps,
    Toolbar,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {TransitionProps} from "@mui/material/transitions";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import AdapterDateFns from "@date-io/date-fns";
import {format} from "date-fns";
import SelectCharacterDialog from "./SelectCharacterDialog";
import {useRecoilState} from "recoil";
import {selectedCharacterListState, scheduleListState} from "../store/schedule.store";
import CharacterModel from "../data_model/Character.model";
import * as _ from 'lodash';
import CharacterList from "./CharacterList";
import ScheduleModel from "../data_model/Schedule.model";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateScheduleDialog({openState, closeFunc}: { openState: boolean; closeFunc: any }) {
    const [titleState, setTitleState] = React.useState<string>('');
    const [dateValue, setDateValue] = React.useState<string | null>(
        format(new Date(), 'yyyy/MM/dd HH:mm')
    );
    const [selectCharDialogState, setSelectCharDialogState] = React.useState(false);
    const [dungeonState, setDungeonState] = React.useState<string | null>('valtan');
    const [levelState, setLevelState] = React.useState<string | null>('normal');
    const [memoState, setMemoState] = React.useState<string>('');
    const [characterListState, setCharacterListState] = useRecoilState(selectedCharacterListState);
    const [scheduleList, setScheduleList] = useRecoilState(scheduleListState);

    // const privateScheduleList = JSON.parse(localStorage.getItem('privateScheduleList') || '[{}]');

    const deleteFunction = (deleteTarget: CharacterModel) => {
        let characterList = _.cloneDeep(characterListState);
        _.remove(characterList, (o) => {
            return o.CharacterName === deleteTarget.CharacterName;
        });
        setCharacterListState(characterList);
    }

    const saveSchedule = () => {
        const originList = _.cloneDeep(scheduleList);
        const newSchedule = {
            title: titleState,
            date: dateValue,
            dungeon: dungeonState,
            level: levelState,
            memo: memoState,
            invitedCharacters: characterListState
        } as ScheduleModel;

        originList.push(newSchedule)
        setScheduleList(scheduleList);
        localStorage.setItem('scheduleList', JSON.stringify(originList));

        // closeFunc();
    }

    const handleChangeTitle = (title: string) => {
        setTitleState(title);
    }


    function handleChangeMemo(memo: string) {
        setMemoState(memo);
    }

    return (<Dialog
        fullScreen
        open={openState}
        onClose={closeFunc}
        TransitionComponent={Transition}
    >
        <AppBar sx={{position: 'relative'}}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={closeFunc}
                    aria-label="close"
                >
                    <CloseIcon/>
                </IconButton>
                <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                    일정 생성
                </Typography>
                <Button autoFocus color="inherit" onClick={saveSchedule}>
                    저장
                </Button>
            </Toolbar>
        </AppBar>
        <Container sx={{mt: 2}}>
            <Stack
                direction="column"
                spacing={2}
            >
                <Box>
                    <TextField value={titleState} onChange={(e) => handleChangeTitle(e.target.value)}
                               label="제목 추가" variant="standard"/>
                </Box>
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="날짜"
                            inputFormat="yyyy/MM/dd hh:mm"
                            value={dateValue}
                            onChange={(newValue: React.SetStateAction<string | null>) => {
                                setDateValue(newValue);
                            }}
                            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) =>
                                <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <Box>
                    <FormControl sx={{minWidth: 200}}>
                        <InputLabel id="demo-simple-select-label">레이드</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={dungeonState}
                            label="raid"
                            onChange={(e) => {
                                setDungeonState(e.target.value);
                            }}
                        >
                            <MenuItem value={'valtan'}>발탄</MenuItem>
                            <MenuItem value={'viakiss'}>비아키스</MenuItem>
                            <MenuItem value={'abrelshud'}>아브렐슈드</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{minWidth: 200}}>
                        <InputLabel id="demo-simple-select-label">난이도</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={levelState}
                            label="raid"
                            onChange={(e) => {
                                setLevelState(e.target.value);
                            }}
                        >
                            <MenuItem value={'normal'}>노말</MenuItem>
                            <MenuItem value={'hard'}>하드</MenuItem>
                            <MenuItem value={'hell'}>헬</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <TextField
                        value={memoState}
                        label="설명 추가"
                        multiline
                        rows={4}
                        variant="filled"
                        onChange={(e) => handleChangeMemo(e.target.value)}
                    />
                </Box>
                <Box>
                    <Button onClick={() => setSelectCharDialogState(true)}>친구초대</Button>
                </Box>
            </Stack>
        </Container>

        <CharacterList characterList={characterListState} deleteFunc={deleteFunction}/>

        <SelectCharacterDialog openDialogState={selectCharDialogState} closeFunction={() => {
            setSelectCharDialogState(false)
        }}/>
    </Dialog>)
}