import React, { Component } from "react";
import * as StringSimilarity from 'string-similarity';
import "./UserSearchHeader.css";
import * as $ from "jquery";

class UserSearchHeader extends Component{

	constructor(props){
		super(props)
		this.state = {
			namePlaceholder: "Search Name",
			emailPlaceHolder: "Search Email",
			phonePlaceHolder: "Search Phone Number",
			saveButtonText: "Add New"
		}
	}

	handleSubmit(e){
		e.preventDefault();
		
		var usersList = JSON.parse(localStorage.getItem("usersList"))
		var newUsersList = [];
		usersList.forEach((user)=>{
			if(this.refs.name.value != ""){
				console.log(this.refs.name.value)
				if(StringSimilarity.compareTwoStrings(user.name, this.refs.name.value) > 0.2){
					newUsersList.push(user)
				}
			}
			
			if(this.refs.email.value != ""){ 
				console.log(this.refs.email.value)
				if(StringSimilarity.compareTwoStrings(user.email, this.refs.email.value) > 0.2){
					newUsersList.push(user)
				}
			}

			if(this.refs.phone_number.value != ""){ 
				console.log(this.refs.name.value)
				if(StringSimilarity.compareTwoStrings(user.phone_number, this.refs.phone_number.value) > 0.2){
					newUsersList.push(user)
				}
			}
		})

		localStorage.setItem("usersList", JSON.stringify(newUsersList));

		this.props.resetUsersList()
	}

	setAddState(){
		this.setState({
			namePlaceholder: "Add Name",
			emailPlaceHolder: "Add Email",
			phonePlaceHolder: "Add Phone Number",
			saveButtonText: "Save"
		})
	}

	setSearchState(){
		this.setState({
			namePlaceholder: "Search Name",
			emailPlaceHolder: "Search Email",
			phonePlaceHolder: "Search Phone Number",
			saveButtonText: "Add New"
		})
	}

	addUser(){
		let usersList = JSON.parse(localStorage.getItem("usersList"));
		let newUserId = usersList[usersList.length-1].id + 1;
		usersList.push({
			id: newUserId, 
			name: this.refs.name.value, 
			email: this.refs.email.value, 
			phone_number: this.refs.phone_number.value
		})
		localStorage.setItem("usersList", JSON.stringify(usersList));
		this.props.resetUsersList()	
		this.setSearchState()
		this.resetRefValues()
	}

	resetRefValues(){
		this.refs.name.value = "";
		this.refs.email.value = "";
		this.refs.phone_number.value = "";
	}

	handleAddNew(){
		if(this.state.saveButtonText == "Add New"){
			this.setAddState()
			$(this.refs.cancel_button).css("display","block")
		}

		if(this.state.saveButtonText == "Save"){
			this.addUser()
		}
		
	}

	cancelAddUser(){
		this.refs.name.value = "";
		this.refs.email.value = "";
		this.refs.phone_number.value = "";
		$(this.refs.cancel_button).css("display","none");
		this.setState({
			saveButtonText: "Add New"
		})
	}


	componentDidMount(){
		$(this.refs.phone_number).on("input",()=>{
			$(this.refs.phone_number).val($(this.refs.phone_number).val().replace(/[A-z]/g,""))
		})
	}

	render(){
		return(
			<div className="user-search-header-div">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="row">
						<div className="col-md-1"></div>
						<div className="col-md-2 user-search-input-div">
							<input className="user-search-input" ref="name" placeholder={this.state.namePlaceholder} />
						</div>
						<div className="col-md-2 user-search-input-div">
							<input className="user-search-input" ref="email" placeholder={this.state.emailPlaceHolder} />
						</div>
						<div className="col-md-2 user-search-input-div">
							<input className="user-search-input" ref="phone_number" placeholder={this.state.phonePlaceHolder} />
						</div>
						<div className="col-md-2">
							<button className="user-save-button" style={{display: "none", margin: "auto"}} ref="cancel_button" type="button" onClick={this.cancelAddUser.bind(this)}>Cancel</button>
						</div>
						<div className="col-md-2">
							<button className="user-save-button" type="button" onClick={this.handleAddNew.bind(this)}>{this.state.saveButtonText}</button>
						</div>
					</div>
					<input type="submit" style={{ display: "none" }} />
				</form>
			</div>
		)
	}
}

export default UserSearchHeader;