import React, { Component } from 'react';
import Signup from "./components/Signup/Signup";
import UserList from "./components/UserList/UserList";
import Users from "./seed/UsersSeed";
import './App.css';

class App extends Component {

    constructor(props){
        super(props)
        this.state = { displayForm: "block", displayUserList: "none" }
        localStorage.setItem("usersList", JSON.stringify(Users));
    }

    hideFormShowUserList(){
        this.setState({
            displayForm: "none",
            displayUserList: "block"
        })
    }

    onFormSubmit(){
        this.hideFormShowUserList();
    }

    componentDidMount(){
        this.hideFormShowUserList();
    }

    render() {
        return (
            <div className="App">
                <Signup display={this.state.displayForm} onFormSubmit={this.onFormSubmit.bind(this)} />
                <UserList display={this.state.displayUserList} />
            </div>
        );
    }
}

export default App;
