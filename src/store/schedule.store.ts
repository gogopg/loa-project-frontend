import {atom} from "recoil";
import CharacterData from '../data_model/Character.model'
import ScheduleModel from "../data_model/Schedule.model";

export let selectedCharacterListState = atom<CharacterData[]>({
    key: 'selectedCharacterListState',
    default: []
});

export let scheduleListState = atom<ScheduleModel[]>({
    key: 'scheduleListState',
    default: JSON.parse(localStorage.getItem('privateScheduleList') || '[]')
});