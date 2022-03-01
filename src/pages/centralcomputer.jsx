import { makeStyles } from "@material-ui/core";
import BackButton from "../components/backbutton";
import { useEffect, useState } from "react";
import QrCodePopup from "../components/qrcodepopup";



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
        width: '20rem',
        backgroundColor: '#ffffff',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        fontSize: '1rem',
        margin: '3rem'
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

    const [teamData, setTeamData] = useState();

    useEffect(() => {
        //get all items from local storage
        const teams = JSON.parse(localStorage.getItem('teamList'));

        // let teamData = [];
        // for(let i = 0; i < teams.length(); i++) {
        //     let currentTeamData = JSON.parse(localStorage.getItem(`${teams[i]}`));
        //     teamData.push(currentTeamData);
        // }
        setTeamData(teams);
    
    }, []);


    return (
        <div className={classes.root}>
            <BackButton title={'Home'} lastPage={'/'} />
            <QrCodePopup qrData={qrData} setQrData={setQrData} />

            <div className={classes.mainContent}>
                <input type="text" placeholder="Search Team" className={classes.searchField} />
            </div>

        </div>
    )
}

export default CentralComputer;