import { makeStyles } from "@material-ui/core";
import BackButton from "../components/backbutton";
import { useEffect, useState } from "react";
import QrCodePopup from "../components/qrcodepopup";
import ClearStorage from "../components/clearstorage";
import TeamGrid from "../components/team-grid";
import LeaderboardButton from "../components/leaderboardbutton";
import DataFetchButton from "../components/data-fetch-button";
import DownloadButton from "../components/downloadcsv";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100vh',
        backgroundColor: theme.palette.primary.main,
    },
    navbarButtons: {
        width: '100%',
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
        height: '100%',
        width: '100%'
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
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    buttons: {
        position: 'absolute',
        bottom: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '45vw',
        display: 'flex',
        justifyContent: 'space-between'
    }

}))


const CentralComputer = () => {

    const classes = useStyles();


    const [qrData, setQrData] = useState({ test: 'lol' });

    const [searchParam, setSearchParam] = useState('');


    return (
        <div className={classes.root}>
            <BackButton title={'Home'} lastPage={'/'} />
            <div className={classes.buttons}>
                <LeaderboardButton />
                <DownloadButton />
                <ClearStorage />
                <QrCodePopup qrData={qrData} setQrData={setQrData} />
                <DataFetchButton />
            </div>

            <div className={classes.mainContent}>
                <input type="text" placeholder="Search Team" className={classes.searchField} onChange={e => setSearchParam(e.target.value)} />
            </div>
            <TeamGrid searchField={searchParam} />
        </div>
    )
}

export default CentralComputer;