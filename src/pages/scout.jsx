import { IconButton, makeStyles, TextField } from "@material-ui/core";
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import Counter from "../components/counter"
import { useState } from 'react';
import Select from 'react-select'
import CloseIcon from '@mui/icons-material/Close';
import Popup from 'reactjs-popup';
import BackButton from "../components/backbutton";
import QRCode from "react-qr-code";
//TODO: add team name support in json and elsewhere
//remove backgruoursnd, close icon x in top right 
//download should be green button aligned center image below
//add support for yup
//conditoional rendreriong
//react select, rungs for climing
const options = [
    { value: 'bar0', label: 'Bar0' },
    { value: 'bar1', label: 'Bar1' },
    { value: 'bar2', label: 'Bar2' }
]

const useStyles = makeStyles( theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.palette.primary.main
    },
    popupBackground: {
        backgroundColor: '#ffffffb3',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    popupMain: {
        height: 'auto',
    },
    generator: {
        backgroundColor: '#afafaf',
        '&:hover': {
            backgroundColor: '#efefef'
        },
        fontSize: '20px',
    },
    exit: {
        color: '#000000',
        position: "absolute",
        right: '0',
        top: '0'
    },
    pngDown: {
        backgroundColor: '#00faa0',
        display: 'block',
        padding: '0',
        height: '3em',
        margin: '0',
        borderRadius: '0px 0px 20px 20px',
        '&:hover': {
            backgroundColor: '#00fa20'
        },
        width: '100%'
    },
    qr: {
        padding: '0',
        margin: '0'
    },
    getButtonContainer: {
        marginTop: '8em',
        display: 'flex',
        justifyContent: 'center',
        alignitems: 'center',
        width: '100%'
    },
    robotNumber: {
        marginTop: '2em',
        width: '10em',
        backgroundColor: '#727',
        borderRadius: '4px 4px 0px 0px',
    },
    robotNumberContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignitems: 'center',
        width: '100%'
    },
    barSelect: {
        width: '10em',
        marginTop: '1em'
    }
}));

let data = {
    'lowGoal': null,
    'highGoal': null
}
let jsonQR;

function createJson(p_lowGoal, p_highGoal){
    data = {
        'teamNumber': 0,
        'lowGoal': p_lowGoal,
        'highGoal': p_highGoal
    }
    jsonQR = JSON.stringify(data);
}

function saveQR(){
    //taken from github react-qr-code page. i dont how someone firgured out 
    //that this is how to do this in the first place
    const svg = document.getElementById("codeQR");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "codeQR";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
}

const Scout = () => {

    const [lowGoal, setLowGoal] = useState(0);
    const [highGoal, setHighGoal] = useState(0);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <HomeButton />
            <div className={classes.robotNumberContainer}>
                <Box
                    component="form"
                >
                    <TextField color="secondary" className={classes.robotNumber} variant="filled" label="Team Number" focused/>
                    <Select className={classes.barSelect} options={options} />
                </Box>
            </div>
            <div>
                <Counter title="Low Scores" setter={setLowGoal}/>
                <Counter title="High Scores" setter={setHighGoal}/>
            </div>
            <Popup
                modal
                nested
                trigger={
                <div className={classes.getButtonContainer}>
                    <Button className={classes.generator} onclick={createJson(lowGoal, highGoal)}>
                        Generate QR Code
                    </Button>
                </div>
                }
            >
                {popupShow =>
                    <div>
                        <IconButton onClick={popupShow} className={classes.exit}>
                            <CloseIcon />
                        </IconButton>
                        <div className={classes.popupBackground}>
                            <div className={classes.popupMain}>
                                <QRCode id="codeQR" value={jsonQR} level="H" title="jordanoutput"/>
                                <Button onClick={saveQR} className={classes.pngDown}>
                                    download as png
                                </Button>
                            </div>
                        </div>
                    </div>
                }
            </Popup>
        </div>
    )
}

export default Scout;