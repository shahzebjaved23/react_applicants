import React, {Component} from "react";
import UserView from "../UserView/UserView";
import "./UserList.css";

class UserList extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			usersList: JSON.parse(localStorage.getItem("usersList"))
		}
	}

	onUserDelete(){
		console.log("set state")
		this.setState({
			usersList: JSON.parse(localStorage.getItem("usersList"))
		})
		console.log(this.state.usersList)
	}
	
	render(){
		console.log('user list render')
		if(this.props.display == "none"){
			return <div></div>
		}else{
			return (
				<div>
					<h1 style={{textAlign: "center"}}>Applicants List</h1>
					<div className="container user-list">
						{this.state.usersList.map((user,index)=>{
							return (<UserView onUserDelete={this.onUserDelete.bind(this)} key={index} user={user} />)
						})}	
					</div>
				</div>
				
			) 
		}
		
	}
}

export default UserList;