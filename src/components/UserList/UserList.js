import React, {Component} from "react";
import UserView from "../UserView/UserView";
import UserSearchHeader from "../UserSearchHeader/UserSearchHeader"
import "./UserList.css";

class UserList extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			usersList: JSON.parse(localStorage.getItem("usersList"))
		}
	}

	sortByName(){
		this.setState({
			usersList: this.state.usersList.sort((a, b) => a.name > b.name)
		})
	}

	sortByEmail(){
		this.setState({
			usersList: this.state.usersList.sort((a, b) => a.email > b.email)
		})
	}

	sortByPhoneNumber(){
		this.setState({
			usersList: this.state.usersList.sort((a, b) => a.phone_number > b.phone_number)
		})
	}

	resetUsersList(){
		this.setState({
			usersList: JSON.parse(localStorage.getItem("usersList"))
		})
	}
	
	render(){
		if(this.props.display == "none"){
			return <div></div>
		}else{
			return (
				<div>
					<h1 style={{textAlign: "center"}}>Applicants List</h1>
					<div>
						<UserSearchHeader resetUsersList={this.resetUsersList.bind(this)}></UserSearchHeader>
						<div className="row">
							<div className="col-md-1"></div>
							<div className="col-md-2">
								<button onClick={this.sortByName.bind(this)}>Name</button>
							</div>
							<div className="col-md-2">
								<button onClick={this.sortByEmail.bind(this)}>Email</button>
							</div>
							<div className="col-md-2">
								<button onClick={this.sortByPhoneNumber.bind(this)}>Phone Number</button>
							</div>
							<div className="col-md-2"></div>
							<div className="col-md-2"></div>
						</div>
					</div>
					<div className="container user-list">
						{this.state.usersList.map((user)=>{
							return <UserView key={user.id} user={user} />
						})}	
					</div>
				</div>
			) 
		}
		
	}
}

export default UserList;