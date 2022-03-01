import { Grid, Typography } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    gridItem: {
        display: 'flex',
        flexDirection: 'column'
    }
}))


const TeamGrid = (props) => {

    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            {props.teams.map(team => {
                <Grid item xs={4} className={classes.gridItem}>
                    <Typography>
                        {team.teamName}
                    </Typography>
                </Grid>
            })}
        </Grid>
    )
}

export default TeamGrid;