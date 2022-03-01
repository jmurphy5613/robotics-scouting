import { makeStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import { Button, IconButton } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import QrReader from "react-qr-scanner";
import CloseIcon from '@mui/icons-material/Close';


const useStyles = makeStyles(theme => ({
    addDataButton: {
        backgroundColor: '#32a852',
        color: '#ffffff',
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        '&:hover': {
            background: "#32a852",
        }
    },
    popupBackground: {
        backgroundColor: '#000000b3',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    exitButton: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        '&:hover': {
            background: "#8892B0",
        }
    }
}));

const QrCodePopup = (props) => {


    const handleError = (er) => {
        console.log(er);
    }


    const classes = useStyles();

    return (
        <Popup
            modal
            nested
            trigger={
                <Button
                    variant="contained"

                    className={classes.addDataButton}
                    endIcon={<AddIcon />}
                >Import QrCode</Button>
            }
        >

            {popupShow => 
                <div className={classes.popupBackground}>
                    <IconButton color="secondary" className={classes.exitButton}>
                        <CloseIcon onClick={popupShow} />
                    </IconButton>
                    <QrReader
                        onError={handleError}
                        onScan={(result) => {
                            console.log(result);
                            // if(props.qrData !== result && result != null) {
                                
                                //stores the qr code data in the local storage
                                // let data = JSON.parse(result);
                                // let name = data.teamName;
                                // localStorage.setItem(name, result.toString());

                                // //appends the team to the team list
                                // let currentTeamList = localStorage.getItem("teamList");
                                // localStorage.setItem("teamList", currentTeamList + "," + name);

                                
                                // props.setQrData(result);
                                // popupShow();
                            // }
                    
                        }}
                    >
                    </QrReader>
                </div>
            }

        </Popup>
    )
}

export default QrCodePopup;