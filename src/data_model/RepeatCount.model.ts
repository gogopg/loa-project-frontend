interface RepeatCount {
    user_id: string;
    epona_daily_record: [string], // max 2
    epona_rest_count: number, //max 10
    epona_weekly_record: [string], // max 3
    chaos_dungeon_record: [string], //max 2
    chaos_dungeon_rest_count: number, //max 10
    guardian_raid_count: number, // max 2
    guardian_raid_rest_count: number, // max 10
    legion_raid_record: [string], // activity.value
}

export default RepeatCount;