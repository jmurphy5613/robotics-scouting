import { Button, IconButton, Typography } from '@material-ui/core';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    fetchButton: {
        textTransform: 'none',
        backgroundColor: '#ffffff',
        color: '#000000',
        '&:hover': {
            backgroundColor: '#E879F9',
            color: '#ffffff'
        }
    }
}))

const DataFetchButton = (props) => {
    const classes = useStyles();

    const fetchData = async () => {
        axios.get('https://what-am-i-doing-production.up.railway.app/game/get-all').then((res) => {
            const games = res.data
            for(const game of games) {
                console.log(game)
                let name = game.teamId;

                //check if the team list exsists
                if(localStorage.getItem("teamList") === null) {
                    let teamList = [];
                    localStorage.setItem("teamList", JSON.stringify(teamList));
                }

                if(localStorage.getItem(name) === null) {
                    let oldTeamList = JSON.parse(localStorage.getItem('teamList'));
                    console.log(oldTeamList, name);
                    oldTeamList.push(JSON.parse(name));
                                            
                    localStorage.setItem('teamList', `${JSON.stringify(oldTeamList)}`);
                    localStorage.setItem(name, `[${JSON.stringify(game)}]`);
                }
                else {
                    let oldData = JSON.parse(localStorage.getItem(name));
                    for(const teamMatch of oldData) {
                        if(teamMatch.teamId === game.teamId && teamMatch.matchId === game.matchId) return;
                    }
                    oldData.push(game);
                    localStorage.setItem(name, JSON.stringify(oldData));
                }
            }
        })


    }

    return (
        <Button onClick={fetchData} className={classes.fetchButton}>Fetch Data</Button>
    )
}

export default DataFetchButton;



