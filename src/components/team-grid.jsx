import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import TeamGridItem from "./team-grid-item";


const useStyles = makeStyles(theme => ({
    teamGrid: {
        width: '70vw',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '20px',
        margin: '0 auto'
    }
}))


const TeamGrid = (props) => {

    const classes = useStyles();

    const [teams, setTeams] = useState([]);

    useEffect( () => {
        let teamList = [];
        if(localStorage.getItem('teamList') != null) {
            teamList = JSON.parse(localStorage.getItem('teamList'));
        }

        setTeams(teamList);
    }, []);

    const filteredTeams = () => {
        let filteredList = []

        console.log(props.searchField, teams)

        for(let i = 0; i < teams.length; i++) {
            if(String(teams[i]).includes(props.searchField)) {
                filteredList.push(teams[i])
            }
        }
        console.log(filteredList)
        return filteredList;
    }


    return (
        <div className={classes.teamGrid}>
            {filteredTeams().map(team => {
                return <TeamGridItem key={team.id} team={team} />
            })}
        </div>
    )
}

export default TeamGrid;