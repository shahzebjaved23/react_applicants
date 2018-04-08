import React, {Component} from "react";
import UserView from "../UserView/UserView";
import UserSearchHeader from "../UserSearchHeader/UserSearchHeader"
import "./UserList.css";

class UserList extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			usersList: JSON.parse(localStorage.getItem("usersList")),
			listSortAsc: true 
		}
	}

	dynamicSort(property) {
	    var sortOrder = 1;
    	if(this.state.listSortAsc){
    		sortOrder = -1;
    		this.setState({ listSortAsc: false })
    	}else{
    		sortOrder = 1;	
    		this.setState({ listSortAsc: true })
    	}
        
        return function (a,b) {
	        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
	        return result * sortOrder;
	    }
	}

	sortById(){
		this.setState({
			usersList: this.state.usersList.sort(this.dynamicSort("id"))
		})
	}

	sortByName(){
		this.setState({
			usersList: this.state.usersList.sort(this.dynamicSort("name"))
		})
	}

	sortByEmail(){
		this.setState({
			usersList: this.state.usersList.sort(this.dynamicSort("email"))
		})
	}

	sortByPhoneNumber(){
		this.setState({
			usersList: this.state.usersList.sort(this.dynamicSort("phone_number"))
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
							<div className="col-md-1">
								<a onClick={this.sortById.bind(this)}>Id</a>
							</div>
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