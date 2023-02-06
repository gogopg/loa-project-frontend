import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Dialog, DialogTitle, List, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from '@mui/lab';
import ExpeditionModel from "../data_model/Expedition.model";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CharacterModel from "../data_model/Character.model";
import CharacterList from "./CharacterList";
import * as _ from "lodash";
import {useRecoilState} from "recoil";
import {selectedCharacterListState} from "../store/schedule.store";

export default function SelectCharacterDialog({openDialogState, closeFunction}:{openDialogState:boolean, closeFunction:any}) {
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

    return (
        <Dialog id='dialog' onClose={closeFunction} open={openDialogState}>
            <DialogTitle>캐릭터 추가</DialogTitle>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tabVal}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="관심 원정대" value="1" />
                            <Tab label="최근 초대 캐릭터" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <div>
                            {favoriteExpeditionsState &&
                                <div>
                                    {favoriteExpeditionsState &&
                                        favoriteExpeditionsState.map((expedition) => {
                                            return (
                                                <Accordion key={'acc-' + expedition.memo}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon/>}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    > {expedition.memo}
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <CharacterList characterList={expedition.characters} clickFunc={selectCharacter}/>
                                                    </AccordionDetails>
                                                </Accordion>
                                            )
                                        })
                                    }

                                </div>
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                </TabContext>
            </Box>
        </Dialog>)
}