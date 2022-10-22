import BackButton from "../components/backbutton"
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import '../fonts.css';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    teamOverviewTitle: {
        color: '#ffffff',
        marginTop: '5%',
        fontFamily: 'medium'
    }
}))


const Leaderboard = () => {

    const classes = useStyles();

    const [columnDefs] = useState([
        { field: "Team Number", sortable: true },
        { field: "High Goal Auto Average", sortable: true},
        { field: "Low Goal Auto Average", sortable: true},
        { field: "High Goal Teleop Average", sortable: true },
        { field: "Low Goal Teleop Average", sortable: true },
        { field: "Climbpoint Average", sortable: true },
    ]);

    const [rowValues, setRowDefs] = useState([]);

    /* 
    JSON Format:
    {
        "High Goal Auto Average": fkjldasfda,
    }
    */

    useEffect(() => {
        let teams =  JSON.parse(localStorage.getItem('teamList'));
        if(!teams) return;
        teams.forEach(element => {
            let teamData = JSON.parse(localStorage.getItem(`${element}`));
            let gamesPlayed = teamData.length;

            //Totals
            let HighGoalAutoTotal = 0;
            let LowGoalAutoTotal = 0;
            let HighGoalTeleopTotal = 0;
            let LowGoalTeleopTotal = 0;
            let ClimberPointsTotal = 0;
            let teamId = 0;

            teamData.forEach(game => {
                teamId = game.teamId;
                HighGoalAutoTotal += game.highGoalAuto;
                LowGoalAutoTotal += game.lowGoalAuto;
                HighGoalTeleopTotal += game.highGoalOperated;
                LowGoalTeleopTotal += game.lowGoalOperated;
                ClimberPointsTotal += game.rungClimbedTo;
            })
            let teamJSON = {
                "Team Number": teamId,
                "High Goal Auto Average": HighGoalAutoTotal/gamesPlayed,
                "Low Goal Auto Average": LowGoalAutoTotal/gamesPlayed,
                "High Goal Teleop Average": HighGoalTeleopTotal/gamesPlayed,
                "Low Goal Teleop Average": LowGoalTeleopTotal/gamesPlayed,
                "Climbpoint Average": ClimberPointsTotal/gamesPlayed,
            };
            rowValues.push(teamJSON);
            
        });
        console.log(rowValues);

    }, [])

    return (
        <div className={classes.root}>
            <BackButton lastPage="/#/central-computer" title="Team List" />
            {/* <Typography variant="h2" className={classes.teamOverviewTitle}>
                Team Overview
            </Typography> */}
            <div className="ag-theme-alpine-dark" style={{height: 600, width: 1200 }}>
                {console.log(rowValues)}
                {console.log(columnDefs)}
                <AgGridReact 
                    rowData={rowValues}
                    columnDefs={columnDefs}
                />
            </div>
        </div>
    )
}

export default Leaderboard;