import * as fs from 'fs';

const roleLimits: {[key: string]: number} = { 'P': 3, 'D': 8, 'C': 8, 'A': 6, };
const mode = "AtoP";

const jsonString = fs.readFileSync('./src/assets/db.json', 'utf-8');
const db: Player[] = JSON.parse(jsonString);

const inputLists: string[][] = [[],[],[],[],[],[],[],[],];

const jsonString2 = fs.readFileSync('./src/assets/list-example.json', 'utf-8');
const parsedExampleList: string[] = JSON.parse(jsonString2);
for(let i=0; i<8; i++) {
    inputLists[i] = parsedExampleList;
}

let fullLists: Player[][] = [[],[],[],[],[],[],[],[],];

export interface Player {
    id: number;
    name: string;
    role: string;
    fvm: number;
}

const rosters: Player[][] = [[],[],[],[],[],[],[],[],];
const assigned: Player[] = [];
const currentRosterValue: number[] = [0, 0, 0, 0, 0, 0, 0, 0,];

export default function doDraft() {
    fullLists = inflateLists();

    let order: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
    randomiseStartingOrder(order);

    const roleOrder: string[] = mode === 'AtoP' ? ['A','C','D','P'] : (mode === 'PtoA' ? ['P','D','C','A'] : ["Z"]);
    let currentRole = roleOrder[0];
    while(!rosters[0] || rosters[0].length < 25) {
        if(!isSlotAvailable(rosters[0], currentRole)) {
            currentRole = roleOrder[roleOrder.indexOf(currentRole)+1];
        }
        for(const i of order) {
            assignNextValidPlayer(i, currentRole);
        }
        order = resortOrder(currentRosterValue);
    }
//    const pino=1;

}

function inflateLists(): Player[][] {
    const ret: Player[][] = [[],[],[],[],[],[],[],[],];
    for(const i in inputLists) {
        for(const j of inputLists[i]) {
            const player: Player = db.find((p) => p.name === j) as Player;
            ret[i].push(player);
        }
        ret[i].reverse();
    }
    return ret;
}

function randomiseStartingOrder(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function assignNextValidPlayer(teamIndex: number, currentRole: string): void {
    let curr: Player;
    for(let i=fullLists[teamIndex].length-1; i >= 0; i--) {
        curr = fullLists[teamIndex][i];
        if(curr.role !== currentRole) {
            continue;
        }
        fullLists[teamIndex].splice(i, 1);
        if(!isAssigned(curr) && isSlotAvailable(rosters[teamIndex], curr.role)) {
            rosters[teamIndex].push(curr);
            currentRosterValue[teamIndex] = currentRosterValue[teamIndex] + curr.fvm;
            assigned.push(curr);
            break;
        }
    }

    // for(let i=0; i < fullLists[teamIndex].length; i++) {
    //     curr = fullLists[teamIndex][i];
    //     if(!isAssigned(curr) && isSlotAvailable(rosters[teamIndex], curr.role)) {
    //         rosters[teamIndex].push(curr);
    //         currentRosterValue[teamIndex] = currentRosterValue[teamIndex] + curr.fvm;
    //         assigned.push(curr);
    //         fullLists[teamIndex].splice(0, i+1);
    //         break;
    //     }
    // }
}

function isAssigned(player: Player):boolean {
    return !!assigned.find((p) => p.id === player.id);
}

function isSlotAvailable(list: Player[], role: string):boolean {
    if(role === 'Z') {
        return true;
    }
    const currentlyAssignedForRole = list.reduce((acc, cur) => {
        acc += (cur.role === role ? 1 : 0);
        return acc;
    }, 0);
    return currentlyAssignedForRole < roleLimits[role];
}

function resortOrder(order: number[]): number[] {
    const result: number[] = Array.from(order.keys())
        .sort((a, b) => order[a] - order[b]);
    return result;
}
