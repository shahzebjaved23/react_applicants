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
					<div className="heading-div" >
						<h1 className="heading" ><b>Nord Software</b></h1>	
					</div>

					<div className="applicants-heading-div">
						<h1 className="applicants-heading"><b>List Of Applicants</b></h1>
					</div>
					
					<div className="user-search-div">
						<UserSearchHeader resetUsersList={this.resetUsersList.bind(this)}></UserSearchHeader>
					</div>

					<div className="user-header-row">	
						<div className="row user-header-row-div">
							<div className="col-md-1">Id</div>
							<div className="col-md-2">
								<a onClick={this.sortByName.bind(this)}>Name</a>
							</div>
							<div className="col-md-2">
								<a onClick={this.sortByEmail.bind(this)}>Email</a>
							</div>
							<div className="col-md-2">
								<a onClick={this.sortByPhoneNumber.bind(this)}>Phone Number</a>
							</div>
							<div className="col-md-2"></div>
							<div className="col-md-2"></div>
						</div>
					</div>
					<div className="user-list">
						{this.state.usersList.map((user)=>{
							return <UserView resetUsersList={this.resetUsersList.bind(this)} key={user.id} user={user} />
						})}	
					</div>
				</div>
			) 
		}
		
	}
}

export default UserList;