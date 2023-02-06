import React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Dialog,
    DialogTitle,
    Input,
    List
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CharacterModel from "../data_model/Character.model";
import axios from "axios";
import * as _ from 'lodash';
import ExpeditionModel from "../data_model/Expedition.model";
import CharacterList from "./CharacterList";

export default function ExpeditionManagementDialog({openState, closeFunc}: { openState: boolean; closeFunc: any }) {
    const [searchTextState, setSearchTextState] = React.useState('');
    const [searchResultState, setSearchResultState] = React.useState<ExpeditionModel | undefined | null>();
    const [isSearchActivate, setSearchActivate] = React.useState(false);
    const [favoriteExpeditionsState, setFavoriteExpeditionsState] = React.useState<Array<ExpeditionModel> | undefined>(JSON.parse(localStorage.getItem('favoriteExpeditions') || '[{}]'))

    const onSearch = () => {
        axios({
            url: 'https://developer-lostark.game.onstove.com/characters/' + searchTextState + '/siblings',
            responseType: 'json',
            headers: {
                accept: 'application/json',
                authorization: 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNjE5MTkifQ.BXD1VFjuMHvXBYJZto2v3H06GvnSeSxSkSv5jf0PuKYImAPiLHxybdx3oWodWKDvfzqr-egJQZ328jVP2yu-ZjN9gMDdZ8QGTpkIc_x9mnKBXg5Ok9RsFpLzr-siozRNSg8Lgit77hsltt97s3xq5pJQbTI9MYN6v1B4UM1PHPRZWRGd2KHdRzpkrw-GetF0SDlihsueSMQZ0ZfapZyL7WyqfMq-nT6RteBoAvwsBaW0bizvdhCi8MRG90KzjRTuJDhIUQSQTvsUN70gA9qNy5Ph7LY0Wbe1X7fixroy8Sv3_qJO-Q2Wd-Ua8JoQJmhIGCg--Ml0lRSKpLeLVUR7GQ'
            }
        }).then((response) => {
            if (response.status !== 200 || !response.data) {
                setSearchResultState(null);
                return;
            }

            const resultData: ExpeditionModel = {
                memo: searchTextState,
                characters: response.data
            }

            setSearchResultState(resultData)
        })
    }

    function onInputKeyDown(e: any) {
        if (e.key === 'Enter') {
            onSearch();
        } else if(e.key ==='Escape') {
            setSearchTextState('');
            setSearchResultState(null);
            setSearchActivate(false);
        } else{
            setSearchActivate(true);
        }
    }

    const onAddClick = () => {
        const addedList = _.concat(favoriteExpeditionsState, searchResultState) as Array<ExpeditionModel>;
        setFavoriteExpeditionsState(addedList);
        localStorage.setItem('favoriteExpeditions', JSON.stringify(addedList));

        // closeFunc();
    }

    const onCharFocus = () => {
        setSearchActivate(true);
    }

    const onCharBlur =  () => {
        setSearchTextState('');
    }
    const onClose = (reason: string) => {
        if(!isSearchActivate && reason === 'escapeKeyDown') {
            closeFunc();
        }
    }

    return (
        <Dialog
            id='expeditionDialog'
            open={openState}
            onClose={(e,reason) => onClose(reason)}
        >
            <DialogTitle>
                관심 원정대 관리
            </DialogTitle>
            <Box>
                <Input placeholder="캐릭터 검색"
                       value={searchTextState}
                       onFocus={onCharFocus}
                       onBlur={onCharBlur}
                       onChange={(e) => setSearchTextState(e.target.value)}
                       onKeyDown={(e) => onInputKeyDown(e)}/>
                <Button onClick={onSearch}>Search</Button>
            </Box>
            {isSearchActivate &&
                <div>
                    {searchResultState &&
                        <div>
                            <Accordion key={searchResultState.memo}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                > {searchResultState.memo}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <CharacterList characterList={searchResultState.characters}/>
                                </AccordionDetails>
                            </Accordion>
                            <Button onClick={onAddClick}>Add Expedition</Button>
                        </div>
                    }
                    {!searchResultState &&
                        <span>검색 결과가 없음</span>
                    }
                </div>
            }
            {!isSearchActivate &&
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
                                                <CharacterList characterList={expedition.characters}/>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })
                            }

                        </div>
                    }
                </div>
            }
        </Dialog>);
}
