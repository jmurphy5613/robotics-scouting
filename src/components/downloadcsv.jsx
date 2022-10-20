import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'; 
//import { downloa}

const useStyles = makeStyles(theme => ({
    fetchButton: {
        textTransform: 'none',
        backgroundColor: '#ffffff',
        color: '#000000',
        '&:hover': {
            backgroundColor: '#E879F9',
            color: '#ffffff'
        }
    }
}))

const DownloadButton = (props) => {

    const classes = useStyles();

    const getDat = () => {
        let j = JSON.parse(localStorage.getItem("teamList"));

        if (j == null) {
            return "error getting data from localstorage";
        }

let csv = `team, match, low goal auto (scored not points), hight goal auto (scored not points), low goal (scored not points), high goal (scored not points), rung climbed to (actually points), team score (ommitting taxies), traversals

RAW DATA

`;

        for (let i = 0; i < j.length; i++) {
            let team = JSON.parse(localStorage.getItem(j[i].toString()));

            if (team == null) {
                return `error getting data from localstorage team ${ j[i] }`;
            }

            for (let k = 0; k < team.length; k++) {
csv += `${j[i]}, ${team[k].matchId}, ${team[k].lowGoalAuto}, ${team[k].highGoalAuto}, ${team[k].lowGoalOperated}, ${team[k].highGoalOperated}, ${(team[k].rungClimedTo === undefined || team[k].rungClimedTo === null) ? team[k].rungClimbedTo : team[k].rungClimedTo }
`;
            }
        }

csv += `
AVERAGED DATA

`;

        for (let i = 0; i < j.length; i++) {
            let avgLGA  = 0;
            let avgHGA  = 0;
            let avgLGO  = 0;
            let avgHGO  = 0;
            let avgRung = 0;
            let trav    = 0;
            let overall = 0;


            let team = JSON.parse(localStorage.getItem(j[i].toString()));

            console.log( `team: ${team}` );

            for (let k = 0; k < team.length; k++) {
                avgLGA  += parseInt(team[k].lowGoalAuto);
                avgHGA  += parseInt(team[k].highGoalAuto);
                avgLGO  += parseInt(team[k].lowGoalOperated);
                avgHGO  += parseInt(team[k].highGoalOperated);
                avgRung += (team[k].rungClimedTo === undefined || team[k].rungClimedTo === null) ? parseInt(team[k].rungClimbedTo) : parseInt(team[k].rungClimedTo);
                //ternary expression from hell!???!??!?!?
                trav    += (team[k].rungClimedTo === undefined || team[k].rungClimedTo === null) ? (parseInt(team[k].rungClimbedTo) === 15) ? 1 : 0 : (parseInt(team[k].rungClimedTo) === 15) ? 1 : 0;

            }

            overall = (avgHGA * 4) + (avgLGA * 2) + (avgLGO) + (avgHGO * 2) + avgRung * 5;

            avgLGA  = avgLGA / team.length;
            avgHGA  = avgHGA / team.length; 
            avgLGO  = avgLGO / team.length;
            avgHGO  = avgHGO / team.length;
            avgRung = avgRung / team.length;

csv += `${j[i]}, , ${avgLGA}, ${avgHGA}, ${avgLGO}, ${avgHGO}, ${avgRung}, ${overall}, ${trav}
`;

        }

        return csv;
    }

    const download = () => {
        let blob = new Blob([getDat()], { 
            type: "text/csv"
        });
        let fileUrl = URL.createObjectURL(blob);

        window.open(fileUrl, "_blank");
    }

    return (
        <Button title='Download as CSV' className={classes.fetchButton} onClick={ e => { download() }}>Download as CSV</Button>
    )

}

export default DownloadButton;