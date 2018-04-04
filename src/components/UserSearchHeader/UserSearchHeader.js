import React, { Component } from "react";
import * as StringSimilarity from 'string-similarity';

class UserSearchHeader extends Component{

	constructor(props){
		super(props)
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

		setTimeout(()=>{
			this.props.resetUsersList()
		},1000)
		
	}

	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="row">
						<div className="col-md-1"></div>
						<div className="col-md-2">
							<input ref="name" placeholder="Search Name" />
						</div>
						<div className="col-md-2">
							<input ref="email" placeholder="Search Email" />
						</div>
						<div className="col-md-2">
							<input ref="phone_number" placeholder="Search Phone Number" />
						</div>
						<div className="col-md-2"></div>
						<div className="col-md-2"></div>
					</div>
					<input type="submit" style={{ display: "none" }} />
				</form>
			</div>
		)
	}
}

export default UserSearchHeader;