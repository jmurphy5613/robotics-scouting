import { IconButton, Typography } from '@material-ui/core';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
    container: {
        width: '20em',
        display: 'inline-block'
    },
    add: {
        backgroundColor: '#00af80',
        color: '#0a0a0a',
        borderRadius: '20px',
        '&:hover': {
            background: "#00afa0",
        },
        marginLeft: '5rem',
        width: '10rem',
        height: '3em'
    },
    subtract: {
        backgroundColor: '#af0040',
        color: '#0a0a0a',
        borderRadius: '20px',
        '&:hover': {
            background: "#af0020",
        },
        marginLeft: '5rem',
        width: '10rem',
        height: '3em'
    },
    counter: {
        backgroundColor: '#0a0a0a',
        color: '#8a8a8a',
        textAlign: 'center',
        marginLeft: '5em',
        paddingTop: '5em',
        paddingBottom: '5em',
        fontFamily: 'medium',
        borderRadius: '20px',
        marginRight: '5em',
        marginTop: '0.75em',
        marginBottom: '0.75em'
    },
    title: {
        textAlign: 'center',
        marginTop: '1rem',
        marginLeft: '1em',
        marginRight: '1em',
        fontFamily: 'medium',
        marginBottom: '2rem',
        color: '#ffffff'
    }
}))

const Counter = (props) => {
    const classes = useStyles();

    const [counter, setCounter] = useState(0);

    return (
        <div className={classes.container}>
            <Typography
                variant="h4"
                className={classes.title}
            >
                {props.title}
            </Typography>
            <IconButton className={classes.add} onClick={e => {
                setCounter(counter+1);
                props.setter(counter+1);
            }}>
                <AddIcon fontSize="large"/>
            </IconButton>

            <Typography 
                className={classes.counter}
            >    
                {counter}
            </Typography>

            <IconButton className={classes.subtract} onClick={e => {
                if(counter > 0){setCounter(counter-1);props.setter(counter-1);}
            }}>
                <RemoveIcon fontSize="large"/>
            </IconButton>
        </div>
    )
}

export default Counter;