import React, { Component } from "react";
import "./UserView.css";

class UserView extends Component{

	constructor(props){
		super(props)
		this.state = {
			user: props.user,
			displayUserInfo: "block",
			displayInputs: "none",
			editButtonText: "Edit",
			deleteButtonText: "Delete",
			displaySelf: "block"
		}
	}

	displayInputBoxes(){
		this.setState({
			displayUserInfo: "none",
			displayInputs: "block",
			editButtonText: "Update",
			deleteButtonText: "Cancel"
		})
	}

	hideInputBoxes(){
		this.setState({
			displayUserInfo: "block",
			displayInputs: "none",
			editButtonText: "Edit",
			deleteButtonText: "Delete"
		})
	}

	updateUser(){
		let usersList = JSON.parse(localStorage.getItem("usersList"));
		let user = usersList.filter( user => user.id == this.state.user.id )[0]
		user.name = this.refs.name.value;
		user.phone_number = this.refs.phone_number.value;
		user.email = this.refs.email.value;
		let newUsersList = []
		usersList.map((u)=>{
			if(u.id == this.state.user.id){
				newUsersList.push(user)
			}else{
				newUsersList.push(u);
			}
		})
		localStorage.setItem("usersList",JSON.stringify(newUsersList))
		this.setState({
			user: {
				id: this.state.user.id,
				name: this.refs.name.value,
				email: this.refs.email.value,
				phone_number: this.refs.phone_number.value 
			}
		})
		this.props.resetUsersList()
	}

	handleEditUser(){
		if(this.state.editButtonText == "Edit"){
			this.displayInputBoxes();
		}
		if(this.state.editButtonText == "Update"){
			this.updateUser()
			this.hideInputBoxes()
		}
	}

	deleteUser(){
		console.log("wdnkslnvdklsvn")
		let usersList = JSON.parse(localStorage.getItem("usersList"));
		let newUsersList = []
		usersList.forEach( (user) => {
			if(user.id != this.state.user.id){
				newUsersList.push(user);
			} 
		})
		localStorage.setItem("usersList",JSON.stringify(newUsersList))
		this.setState({
			displaySelf: "none"
		})
		this.props.resetUsersList()
	}

	handleDeleteUser(){
		if(this.state.deleteButtonText == "Delete"){
			this.deleteUser()
		}
		if(this.state.deleteButtonText == "Cancel"){
			this.hideInputBoxes()
		}
	}

	render(){
		return (
			<div style={{display: this.state.displaySelf}} className="user-view">
				<div className="row userRow">
					<div className="col-md-1 user-row-elem">
						<span>{this.state.user.id}</span>
					</div>
					<div className="col-md-2 user-row-elem">
						<span style={{display: this.state.displayUserInfo}}>{this.state.user.name}</span>
						<input defaultValue={this.state.user.name} style={{display: this.state.displayInputs}} ref="name" />
					</div>
					<div className="col-md-2 user-row-elem">
						<span style={{display: this.state.displayUserInfo}}>{this.state.user.email}</span>
						<input defaultValue={this.state.user.email} style={{display: this.state.displayInputs}} ref="email" />
					</div>
					<div className="col-md-2 user-row-elem">
						<span style={{display: this.state.displayUserInfo}}>{this.state.user.phone_number}</span>
						<input defaultValue={this.state.user.phone_number} style={{display: this.state.displayInputs}} ref="phone_number" />
					</div>
					<div className="col-md-2 user-row-elem">
						<button onClick={this.handleEditUser.bind(this)} className="btn btn-small btn-success">{this.state.editButtonText}</button>
					</div>
					<div className="col-md-2 user-row-elem">
						<button onClick={this.handleDeleteUser.bind(this)} className="btn btn-small btn-danger">{this.state.deleteButtonText}</button>
					</div>
					
				</div>
					
			</div>
		)
	}
}

export default UserView;