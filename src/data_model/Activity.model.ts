import Character from "./Character.model";

interface Activity {
    category: string, // 가디언 토벌, 카오스 던전,도전가디언토벌, 도전어비스던전, 군단장 레이드, 어비스 던전,어비스 레이드, 일일에포나, // 주간에포나
    value: string, //unique // papunika_1
    period: string,
    count: number,
    reward: [Reward],
    name_ko: string,
    name_en: string,
}

interface Reward {
    reward_type: rewards_type_enum,
    amount: number,
    bound?: boolean
}

enum rewards_type_enum {
    gold,
    shilling,
    honor_leapstone,
    leapstone_lv1,
    leapstone_lv2,
    leapstone_lv3,
    leapstone_lv4,
    honor_shard,
    destruction_stone_lv1,
    destruction_stone_lv2,
    destruction_stone_lv3,
    guardian_stone_lv1,
    guardian_stone_lv2,
    guardian_stone_lv3,
    gem
}


export default Activity;
