import { makeStyles } from "@material-ui/core";
import { Button } from '@material-ui/core';
import HomeButton from "../components/homebutton";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import QrReader from 'react-qr-scanner';
import Popup from 'reactjs-popup';



const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.palette.primary.main
    },
    navbarButtons: {
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '2rem'
    },
    addDataButton: {
        backgroundColor: '#32a852',
        color: '#ffffff',

    },
    popupBackground: {
        backgroundColor: '#000000b3',
        height: '100vh',
        width: '100vw'
    },
    searchField: {
        width: '15rem',
        backgroundColor: '#ffffff',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        fontSize: '1rem',
    },
    mainContent: {
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
    }

}))


const CentralComputer = () => {

    const classes = useStyles();


    const [qrData, setQrData] = useState({ test: 'lol' });

    const [teamData, setTeamData] = useState([]);



    return (
        <div className={classes.root}>
            <HomeButton />


            <div className={classes.mainContent}>
                <input type="text" placeholder="Search Team" className={classes.searchField} />
            </div>

        </div>
    )
}

export default CentralComputer;