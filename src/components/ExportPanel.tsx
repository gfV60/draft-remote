import {Stack, TextField} from "@mui/material";
import {Player} from "../scripts/draft";

interface ExportPanelProps {
    gs: Player[];
    ds: Player[];
    ms: Player[];
    fs: Player[];
}

export default function ExportPanel(props: ExportPanelProps){
    function generateJson() {
        return props.gs.map(extractName)
            .concat(props.ds.map(extractName))
            .concat(props.ms.map(extractName))
            .concat(props.fs.map(extractName));
    }

    function extractName(p: Player) {
        return p.name;
    }

    return(
        <Stack spacing={2}>
            <TextField multiline fullWidth value={JSON.stringify(generateJson())} />
        </Stack>
    );
}