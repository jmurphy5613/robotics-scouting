import  { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import BackButton from "../components/backbutton";
import { useEffect, useState } from "react";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.primary.main
    }
}))


const TeamProfile = () => {

    const teamNumber = useParams();
    const classes = useStyles();

    const [teamData, setTeamData] = useState();


    useEffect(() => {
        let data = localStorage.getItem(`${teamNumber}`);
        setTeamData(data);
        console.log('Team Data: ', teamData);
        console.log('Local Storage Data: ', data);   
    }, []);


    return (
        <div className={classes.root}>
            {/*Fetches localstorage data depending on the team (react-router)*/}
            <BackButton title="Team List" lastPage="/central-computer" />
        </div>
    )
}

export default TeamProfile;