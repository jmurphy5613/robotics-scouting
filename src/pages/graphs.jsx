// using recharts for charting i guess. looked good and was the first one
// api docs: https://recharts.org/en-US/api
//
// click "show data format" in corner of code examples to see data format.


import BackButton from "../components/backbutton";
import Select from "react-select"
import { LineChart, Line, Legend, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'; // FOUND ONE
import '../fonts.css';
import { useEffect } from "react";
import { ButtonBase, makeStyles } from "@material-ui/core";
import { Typography, Button } from "@material-ui/core";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { useState } from "react";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.palette.primary.main,
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        position: 'absolute',
        bottom: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '37vw',
        display: 'flex',
        justifyContent: 'space-between'
    }, 
    sectionTitle: {
        color: '#ffffff',
        fontFamily: 'medium',
        marginTop: '3rem',
        textAlign: 'center'
    },
    buttonMain: {
        color: '#ffffff',
        backgroundColor: '#882222',
        marginTop: '3rem'
    }

}));

const DataGraphs = () => {

    const [lines, setLines] = useState([]);
    const [data, setData] = useState(null);
    const [teamSelect, setTeamSelect] = useState([]);
    const [configList, setConfigList] = useState([]);
    const [teamList, setTeamList] = useState([]);


    let selectConfig = [
        { value: "highGoalAuto", label: "High Goal Auto" },
        { value: "lowGoalAuto", label: "Low Goal Auto" },
        { value: "highGoalOperated", label: "High Goal" },
        { value: "lowGoalOperated", label: "Low Goal" },
        { value: "rungClimedTo", label: "Rung Climed To" }
    ]

    //let teamSelect = [ ]; //gets loaded later in use effect

    //let configList = [ ];

    //let teamList = [ ];

    useEffect( () => {
        let arr = JSON.parse(localStorage.getItem("teamList"));

        if (arr == null) {
            console.log("NO DATA");
            setTeamSelect( { value: "Empty", label: "No Team Data" } );
            return;
        }

        //setTeamSelect(JSON.parse(localStorag.getItem(arr[i])))

        for (let i = 0; i < arr.length; i++) {
            let data = JSON.parse(localStorage.getItem(arr[i]));

            if (data == null) {
                console.log( "ERR AT " + arr[i].toString() );
                continue;
            }

            teamSelect.push( { value: arr[i].toString(), label: arr[i].toString() } );
        }
    }, []);

    /*let data = [
        {
            xAxis: 0,
            a: 0,
            b: 0
        },
        {
            xAxis: 1,
            a: 1,
            b: 2
        },
        {
            xAxis: 2,
            a: 15,
            b: 27
        },
        {
            xAxis: 3,
            a: 2,
            b: 2
        },
    ];*/

    const classes = useStyles();

    const updateGraph = () => {
        console.log(teamList);

        let jsonData = `{
            "maxLength": ${JSON.parse(localStorage.getItem(teamList[0])).length},
            "dataList": [
        `;
            
        for (let k = 0; k < configList.length; k++) {
            console.log(k);
            for (let i = 0; i < teamList.length; i++) {
                let team = JSON.parse(localStorage.getItem(teamList[i]));
                console.log(localStorage.getItem(teamList[i]));

                if (team === null) {
                    console.log("INVALID TEAM: " + teamList[i]);
                    continue;
                }

                jsonData += `{ 
                    "name": "${teamList[i] + " - " + configList[k]}",
                    "data": [
                `;
                
                for (let j = 0; j < team.length; j++) {
                    jsonData +=` ${team[j][configList[k]]}${ (j === team.length - 1) ? "" : ", " }`
                }

                jsonData += ` ]
                    }${ (k === configList.length - 1 && i === teamList.length - 1) ? "" : ", " }
                `;
            }
        }

        jsonData += ` ]
        }
        `;

        console.log(jsonData);

        makeGraphData(JSON.parse(jsonData));
    }

    const updateConfig = (e) => {
        console.log(e);
        setConfigList([]);
        setConfigList(e.map((element, index) => { return element.value }));
        for (let i = 0; i < e.length; i++) {
            console.log(e[i].value);
            //configList.push(e[i].value);
        }
    }

    const updateTeams = (e) => {
        console.log(e);
        setTeamList([]);
        //setTeamList(e);
        setTeamList(e.map((element, index) => { return element.value }));
        for (let i = 0; i < e.length; i++) {
            console.log(e[i].value);
            //teamList.push(e[i].value);
        }
    }

    const makeGraphData = (rawData) => {
        try {
        const worseIdea = [
            "#f00",
            "#0f0",
            "#00f",
            "#f0f",
            "#ff0",
            "#0ff",
            "#fff",
            "#000",
            "#ccc",
            "#cac",
            "#fac",
            "#caf",
            "#faf",
            "#bba",
            "#0ba",
            "#fae",
            "#eef",
            "#2fe",
            "#f8a",
            "#8fb",
            "#0fa",
            "#f0a"
        ];

        let lines = [];

        let dat = [];

        //FORMAT:
        /* 
            "rawdata": {
                "maxLength": 12,
                "dataList": [
                    {
                        "name": "a",
                        "data": [12, 12, 12, 12, 12, 12, 12, 12 ,12]
                    },
                    {
                        "name": "b",
                        "data": [12, 12, 12, 12, 12, 12, 12, 12, 12]
                    },
                ]
            }
        */

        for (let i = 0; i < rawData.maxLength; i++) {
            dat.push([]);
        }

        for (let i = 0; i < rawData.dataList.length; i++) {
            for (let j = 0; j < rawData.dataList[i].data.length && j < rawData.maxLength; j++) {
                dat[j].push(rawData.dataList[i].data[j]);
            }
            lines.push(<Line type="monotone" key={i.toString()} dataKey={rawData.dataList[i].name} stroke={worseIdea[i]} />); //replace worseIdea
        }

        /*
            dat = [
                [12, 12],
                [12, 12],
                [12, 12],
                [12, 12],
                etc...
            ]
        */

        let jsonStr = "[";

        for (let i = 0; i < dat.length; i++) {
            jsonStr += `{
                "xAxis": ${ i },
                `;

            for(let j = 0; j < dat[i].length; j++) {
                if (j === dat[i].length - 1) {
                    jsonStr += `"${rawData.dataList[j].name}": ${dat[i][j]}
                    `;
                    break;
                }

                jsonStr += `"${rawData.dataList[j].name}": ${dat[i][j]},
                `;
            }

            if (i === dat.length - 1) {
                jsonStr += "}";
                break;
            }

            jsonStr += "}, ";
        }

        jsonStr += "]";

        console.log(jsonStr);

        setLines(lines);

        setData(JSON.parse(jsonStr));

        /*for (let i = 0; i < rawArray.length; i++) {
            dat.push(<Line type="monotone" dataKey={badIdea[i]} stroke={worseIdea[i]} />);
            midString += `
                "${badIdea[i]}": ${rawArray[i]},
            `;
        }*/

        //data = dat
        } catch (e) {
            console.log(e); //gamign
        }
    }

    let testData = JSON.parse(`{"maxLength": 9, "dataList": [ { "name": "a", "data": [12, 11, 10, 9, 5, 12, 2, 1, 2] }, { "name": "b", "data": [10, 12, 9, 8, 4, 5, 12, 2, 11] } ] }`);

    return (
        <div className={classes.root}>
            <BackButton title={'Home'} lastPage={'/'} />
            <div className={classes.mainContent}>
                <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="5 3" />
                    <XAxis dataKey="xAxis" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {lines}
                </LineChart>

                <div className={classes.options}>
                    <Button title="Apply to Graph" className={classes.buttonMain} onClick={ e => updateGraph() }>generate</Button>
                    <Select options={selectConfig} isMulti={ true } isSearchable={ true } onChange={ e => { updateConfig(e) }}/>
                    <Select options={teamSelect} isMulti={ true } isSearchable={ true } onChange={e => { updateTeams(e) }} />
                </div>
            </div>
        </div>
    )
}

export default DataGraphs;