import {Box, Grid, Tab, Tabs, Typography} from "@mui/material";
import React, {useState} from "react";
import {Player} from "../scripts/draft";
import getDb from "../assets/Db";
import ExportPanel from "../components/ExportPanel";
import SortingPanelDndKit from "../components/SortingPanelDndKit";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const db: Player[] = getDb();
const gks: Player[] = db.filter((item: Player) => item.role === 'P');
const defs: Player[] = db.filter((item: Player) => item.role === 'D');
const mids: Player[] = db.filter((item: Player) => item.role === 'C');
const fwds: Player[] = db.filter((item: Player) => item.role === 'A');

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function SortingPage() {
    const [value, setValue] = React.useState(0);
    const [portieri, setPortieri] = useState<Player[]>(gks);
    const [difensori, setDifensori] = useState<Player[]>(defs);
    const [centrocampisti, setCentrocampisti] = useState<Player[]>(mids);
    const [attaccanti, setAttaccanti] = useState<Player[]>(fwds);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{borderRight: 1, borderColor: 'divider'}}
                >
                    <Tab label="Portieri" {...a11yProps(0)} />
                    <Tab label="Difensori" {...a11yProps(1)} />
                    <Tab label="Centrocampisti" {...a11yProps(2)} />
                    <Tab label="Attaccanti" {...a11yProps(3)} />
                    <Tab label="Esporta" {...a11yProps(4)} />
                </Tabs>
            </Grid>
            <Grid item xs={6}>
                <TabPanel value={value} index={0}>
                    <SortingPanelDndKit players={portieri} setPlayers={setPortieri}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <SortingPanelDndKit players={difensori} setPlayers={setDifensori}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <SortingPanelDndKit players={centrocampisti} setPlayers={setCentrocampisti}/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <SortingPanelDndKit players={attaccanti} setPlayers={setAttaccanti}/>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <ExportPanel gs={portieri} ds={difensori} ms={centrocampisti} fs={attaccanti}/>
                </TabPanel>
            </Grid>
            <Grid item sx={3}>{undefined}</Grid>
        </Grid>
    );
}
