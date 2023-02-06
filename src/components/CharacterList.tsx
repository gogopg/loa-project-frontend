import {IconButton, List, ListItem, ListItemText} from "@mui/material";
import React from "react";
import CharacterModel from '../data_model/Character.model';
import DeleteIcon from '@mui/icons-material/Delete';

interface CharacterListItemProps {
    characterList: Array<CharacterModel>;
    clickFunc?: Function;
    deleteFunc?: Function;
}

export default function CharacterList({characterList, clickFunc, deleteFunc}: CharacterListItemProps) {
    return (
        <List>
            {characterList.map((characterData: CharacterModel) => {
                return (<ListItem key={characterData.CharacterName}
                                  onClick={() => clickFunc && clickFunc(characterData)}
                >
                    <ListItemText primary={characterData.CharacterName + ' <' + characterData.ServerName + '>'}
                                  secondary={'Lv: ' + characterData.ItemAvgLevel}/>
                    {deleteFunc &&
                        <IconButton onClick={() => deleteFunc && deleteFunc(characterData)}><DeleteIcon/></IconButton>}
                </ListItem>)
            })};
        </List>
    );
}
