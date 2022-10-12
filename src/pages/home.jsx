import { makeStyles } from "@material-ui/styles";
import { Typography, Button } from "@material-ui/core";
import Typed from "react-typed";
import '../fonts.css';

const useStyles = makeStyles( theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.palette.primary.main,
    },
    title: {
        color: '#ffffff',
        fontFamily: 'medium',
        width: '70%',
    },
    introTitle: {
        color: theme.palette.secondary.main,
        fontFamily: 'nice',
    },
    pink: {
        color: theme.palette.secondary.main,
    },
    kindaCenter: {
        paddingTop: '17%',
        paddingLeft: '17%'
    },
    goToFieldButton: {
        backgroundColor: theme.palette.secondary.main,
        color: '#ffffff'
    },
    linkText: {
        color: theme.palette.secondary.light,
        fontFamily: 'nice',
    },
    anchorLink: {
        textDecoration: 'none',
        color: 'inherit'
    }
}))

const Home = () => {

    const classes = useStyles();

    return (
            <div className={classes.root}>
                <div className={classes.kindaCenter}>

                <Typography className={classes.introTitle}>Hey there, welcome to</Typography>
                <Typography 
                    variant="h2"
                    className={classes.title}
                >
                {`Jordan, the scouting software that stands for `}
                {
                    <Typed
                        className={classes.pink} 
                        strings={
                            [
                                'Just',
                                'Observe',
                                'Robots',
                                'Doing',
                                'Absolutely',
                                'Nothing'
                            ]
                        }
                        typeSpeed={20}
                        loop
                    />

                } 
                </Typography >
                {/* <Button variant="contained" className={classes.goToFieldButton}>Open Field</Button> */}
                <Typography className={classes.linkText} variant="h5">
                    <a className={classes.anchorLink} href="/#/scout">0. Scout</a>
                    <a style={{marginLeft: '3rem'}} className={classes.anchorLink} href="/#/central-computer">1. Central Computer</a>
                    <a style={{marginLeft: '3rem'}} className={classes.anchorLink} href="/#/graphing">2. Graphing</a>
                </Typography>
                {/* <Typography className={classes.linkText} variant="h5">1. <a className={classes.anchorLink} href="/central-computer">Central Computer</a></Typography> */}
            </div>
        </div>
    )
}

export default Home;