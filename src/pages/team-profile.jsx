import  { useParams } from "react-router-dom";
import { makeStyles, Typography } from '@material-ui/core';
import BackButton from "../components/backbutton";
import { useEffect, useState } from "react";

import { getRungFromPoints } from '../helpers/calculations';

import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

import '../fonts.css';


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    sectionTitle: {
        color: '#ffffff',
        fontFamily: 'medium',
        marginTop: '3rem'
    }
}))


const TeamProfile = () => {

    const teamNumber = useParams();
    const classes = useStyles();

    const [teleopColumnDefs] = useState([
        { field: "Match Number", sortable: true, filter: true, width: 300  },
        { field: "High Goal Teleop", sortable: true, filter: true, width: 300  },
        { field: "Low Goal Teleop", sortable: true, filter: true, width: 300  },
        { field: "Rung Climbed To", sortable: true, filter: true, width: 300 },
    ]); 

    const [autoRowData, setAutoRowData] = useState([]);

    const [autoColumnDefs] = useState([
        { field: "Match Number", sortable: true, filter: true, width: 300  },
        { field: "High Goal Auto", sortable: true, filter: true, width: 300  },
        { field: "Low Goal Auto", sortable: true, filter: true, width: 300  },
        { field: "Taxi", sortable: true, filter: true, width: 300  }
    ]);

    const [teleopRowData, setTeleopRowData] = useState([]);
    useEffect(() => {
        let data = [];
        data = localStorage.getItem(`${teamNumber.teamId}`);
        console.log(data);
        JSON.parse(data).forEach((element, index) => {
            let currentTeleop = {
                "Match Number": element.matchId, 
                "High Goal Teleop": element.highGoalOperated,
                "Low Goal Teleop": element.lowGoalOperated,
                "Rung Climbed To": getRungFromPoints(element.rungClimbedTo),
            };
            let currentAuto = {
                "Match Number": element.matchId,
                "High Goal Auto": element.highGoalAuto,
                "Low Goal Auto": element.lowGoalAuto,
                "Taxi": element.taxi
            }
            teleopRowData.push(currentTeleop);
            autoRowData.push(currentAuto);

        });
    }, []);

    return (
        <div className={classes.root}>

            {/*Fetches localstorage data depending on the team (react-router)*/}
            <BackButton title="Team List" lastPage="/#/central-computer" />
            <Typography variant="h2" className={classes.sectionTitle}>
                    Teleop
            </Typography>
            <div className="ag-theme-alpine-dark" style={{height: 250, width: 1200 }}>
                <AgGridReact 
                    columnDefs={teleopColumnDefs}
                    rowData={teleopRowData}
                />
            </div>
            <Typography variant="h2" className={classes.sectionTitle}>
                    Autonomous
            </Typography>
            <div className="ag-theme-alpine-dark" style={{height: 250, width: 1200 }}>
                <AgGridReact 
                    rowData={autoRowData}
                    columnDefs={autoColumnDefs}
                />
            </div>

        </div>
    )
}

export default TeamProfile;