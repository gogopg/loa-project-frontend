import CharacterModel from "./Character.model";

export default interface ScheduleModel {
    title: string,
    date: string,
    dungeon: string,
    level: string,
    memo: string,
    invitedCharacters: Array<CharacterModel>
}