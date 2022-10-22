import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import '../fonts.css';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    gridItem: {
        height: '15vh',
        backgroundColor: '#1c1f31',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '1rem',
        transition: 'transform 0.25s ease-out',
        border: '1px solid #3750a8',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.02)',
            border: '1px solid #E879F9'
        }
    },
    teamTitle: {
        color: '#ffffff',
        fontSize: '3rem',
        fontFamily: 'medium',
        padding: '0',
        margin: '0'
    },
    nickNameTitle: {
        color: '#ffffff',
        padding: 0,
        margin: 0,
        fontSize: '1.5rem',
        fontFamily: 'medium'
    }
}))

const TeamGridItem = (props) => {

    const classes = useStyles();

    const [teamData, setTeamData] = useState([])
    const [nickName, setNickName] = useState('');

    useEffect(() => {
        let teamData = JSON.parse(localStorage.getItem(`${props.team}`));
        setTeamData(teamData);
        let teamNumber = props.team.toString();

        axios.get(`https://www.thebluealliance.com/api/v3/team/frc${teamNumber}`, {
            headers:  {
                'X-TBA-Auth-Key': '2RlFFFGFtkzhlFVcMD2dsNKcTO12lBqHbz7ZIwVaqLfSK0xtsv8TAZngRZOFc5E7'
            }
        }).then(res => setNickName(res.data.nickname));

    }, []);


    return  (
        <a href={`/#/team-profile/${props.team}`} style={{ textDecoration: 'none' }}>
            <div className={classes.gridItem}>
                <h2 className={classes.teamTitle}>
                    {props.team}
                </h2>
                <h4 className={classes.nickNameTitle}>{nickName}</h4>
            </div>
        </a>
    )
}

export default TeamGridItem