import React, { Component } from "react";
import "./Signup.css";

class Signup extends Component{
	
	constructor(props){
		super(props)
		
	}

	handleSubmit(e){
		e.preventDefault();
		let usersList = JSON.parse(localStorage.getItem("usersList"));
		let newUserId = usersList[usersList.length-1].id + 1;
		usersList.push({id: newUserId, name: this.refs.name.value, email: this.refs.email.value, phone_number: this.refs.phone_number.value, password: this.refs.password.value})
		localStorage.setItem("usersList", JSON.stringify(usersList));
		this.props.onFormSubmit()
	}

	render (){
		if(this.props.display == "none"){
			return <div></div>
		}else{
			return (
				<div className="container">
					<h1>Applicant Signup</h1>
					<form onSubmit={this.handleSubmit.bind(this)} className="signup-form">
						<div className="form-group">
							<label>Name</label>
							<input type="text" className="form-control border-primary" ref="name" />
						</div>

						<div className="form-group">
							<label>Email</label>
							<input type="email" className="form-control border-primary" ref="email" />
						</div>

						<div className="form-group">
							<label>Phone Number</label>
							<input type="text" className="form-control border-primary" ref="phone_number" />
						</div>

						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control border-primary" ref="password" />
						</div>

						<div>
							<input type="submit" value="Sing-Up" className="btn btn-primary"/>
						</div>
					</form>
				</div>
			)	
		}
		
	}
}

export default Signup;