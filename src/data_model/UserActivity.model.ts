import Character from "./Character.model";
import Activity from "./Activity.model";

interface UserActivity {
    _id: string,
    user_id: string,
    character: Character
    date: Date,
    activity_value: string, // Activity.value
}

export default UserActivity;