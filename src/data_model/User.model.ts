import Character from "./Character.model";

interface User {
    uuid: string,
    userID: string,
    password: string,
    character_authorization: boolean,
    own_characters: [Character],
    weekly_gold_gainers: [Character], // max 6

}

export default User;