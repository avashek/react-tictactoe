import React, { Component } from 'react';
import './style.css';

function Box(props) {
    var arr = [];
    function handleClick(i, j) {
        return () => {
            props.handleClick(i, j);
        }
    }
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var cname = "box "+props.lineArr[i][j];
            arr.push(<div key={i + "" + j} className={cname} onClick={handleClick(i, j)}>{props.arr[i][j]}<div></div></div>)
        }
    }
    return (
        <div className="box-container">
            {arr}
        </div>
    )
}

class TTT extends Component {
    static initialize()
    {
        return {
            arr: [['', '', ''], ['', '', ''], ['', '', '']],
            mark: 'O',
            game: 'play',
            lineArr: [['', '', ''], ['', '', ''], ['', '', '']],
        }
    }
    constructor() {
        super();
        this.state = TTT.initialize();
        this.handleClick = this.handleClick.bind(this);
        this.checkWin = this.handleClick.bind(this);
        this.checkArray = this.checkArray.bind(this);
        this.newGame = this.newGame.bind(this);
    }
    handleClick(x, y) {
        if(this.state.game === 'play'){
            var arr = this.state.arr;
            if (arr[x][y] === '') {
                arr[x][y] = this.state.mark;
                this.setState(prevState => (
                    {
                        arr: arr,
                        mark: prevState.mark === 'X' ? 'O' : 'X',
                    }
                ))
            }
        }
    }
    checkWin() {
        //
    }
    newGame(){
        this.setState(TTT.initialize());
    }
    checkArray(a,c) {
        if (a[0] === 'X' && a[1] === 'X' && a[2] === 'X')
            return 'x';
        if (a[0] === 'O' && a[1] === 'O' && a[2] === 'O')
            return 'o';
        return false;
    }
    componentWillUpdate() {
        if (this.state.game === 'play') {
            var flag = false, i;
            var arr = this.state.arr;
            var lineArr = this.state.lineArr;
            for (i = 0; i < 3; i++) {
                if (this.checkArray(arr[i],'rows')) {
                    lineArr[i][0] = "lineh";lineArr[i][1] = "lineh";lineArr[i][2] = "lineh";
                    flag = true;
                    break;
                }
            }
            for (i = 0; i < 3; i++) {
                if (!flag && this.checkArray([arr[0][i], arr[1][i], arr[2][i]],'columns')) {
                    lineArr[0][i] = "linev"; lineArr[1][i] = "linev"; lineArr[2][i] = "linev";
                    flag = true;
                    break;
                }
            }
            if(!flag && this.checkArray([arr[0][0],arr[1][1],arr[2][2]],'dia1')){
                flag = true;
                lineArr[0][0] = 'dia1';lineArr[1][1] = 'dia1';lineArr[2][2] = 'dia1';
            }
            if(!flag && this.checkArray([arr[0][2],arr[1][1],arr[2][0]],'dia2')){
                flag=true;
                lineArr[0][2] = 'dia2';lineArr[1][1] = 'dia2';lineArr[2][0] = 'dia2';
            }
            if (flag)
                this.setState({
                    game: 'over',
                }, () => { flag = false });
        }
    }
    render() {
        const {arr, lineArr} = this.state;
        return (
            <div>
                <h1>Tic-Tac-Toe</h1>
                <Box arr={arr} handleClick={this.handleClick} lineArr={lineArr}/>
                {
                    this.state.game === 'play' ?
                        this.state.mark === 'O' ?
                        <h5>Player 1 turn</h5> :
                        <h5>Player 2 turn</h5> :
                        this.state.mark === 'X' ?
                        <h3>Player 1 Win</h3> :
                        <h3>Player 2 Win</h3>                        
                }
                <button onClick={()=>{this.newGame()}}>New Game</button>
            </div>
        )
    }
}

export default TTT;
