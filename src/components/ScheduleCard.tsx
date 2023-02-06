import ScheduleModel from "../data_model/Schedule.model";
import {Card, CardContent, CardHeader, Typography} from "@mui/material";

export default function ScheduleCard({data}: { data: ScheduleModel }) {
    return (
        <Card sx={{maxWidth: 345}}
              id={data.title}
              onClick={()=>{console.log('aaaaa')}}
        >
            <CardHeader
                title={data.title}
                subheader={data.date}
            />
            <CardContent>
                <Typography>
                    {data.dungeon} - {data.level}
                </Typography>
                <Typography>
                    {data.memo}
                </Typography>
                {/*{*/}
                {/*    data.invitedCharacters.map((char) => {*/}
                {/*       return <Typography id={char.CharacterName}>*/}
                {/*           {char.CharacterName}*/}
                {/*       </Typography>*/}
                {/*    })*/}
                {/*}*/}

            </CardContent>
        </Card>
    );
}