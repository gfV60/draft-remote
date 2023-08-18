import {Grid, Typography} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {Player} from "../scripts/draft";

interface SortingItemProps {
    key: number;
    player: Player;
    onDragStart: (Event)=>void;
    onDragEnter: (Event)=>void;
    onDragEnd: ()=>void;
    onDragOver: (Event)=>void;
}

export default function SortingItem(props: SortingItemProps) {
    return(
        <div className="list-item"
             draggable
             onDragStart={props.onDragStart}
             onDragEnter={props.onDragEnter}
             onDragEnd={props.onDragEnd}
             onDragOver={props.onDragOver}
        >
            <Grid container >
                <Grid item xs={1}>
                    <DragIndicatorIcon fontSize="large" />
                </Grid>
                <Grid item xs={11}>
                    <Typography fontSize={26}>{props.player.name}</Typography>
                </Grid>
            </Grid>
        </div>
    );
}