import React, { Component } from 'react';
import './welcome.scss'

class WelcomeForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            mobile: '',
        }      
        this.handleSubmit = this.handleSubmit.bind(this);
        this.stringifyForm = this.stringifyForm.bind(this)
    }

    stringifyForm(){
        const slotsString = JSON.stringify({
            "slots": this.state
         })
        const triggerString = "/"+this.props.intent+slotsString
        console.log(triggerString)
        return triggerString
    }
      
    handleSubmit(event){
      event.preventDefault();
      const trigger  = this.stringifyForm()
      this.props.onChange("Form submited",trigger);
    }
   
    render() {
      return (
        <form onSubmit={this.handleSubmit} class="welcome-form">
            <div className="form-header">
                Contact Information
            </div>
            <div class="form-body">
                <input 
                type="text" 
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })}
                placeholder="Full Name" 
                required 
                /><br/>

                <input 
                type="phone" 
                value={this.state.mobile}
                onChange={event => this.setState({ mobile: event.target.value })}
                placeholder="Mobile" 
                required 
                /><br/>

                <input 
                type="email" 
                value={this.state.email}
                onChange={event => this.setState({ email: event.target.value })}
                placeholder="Email"  
                />
            </div>
            <div className="form-footer">
                <button>Submit</button>
            </div>
          </form>
        );
      }
  }
  export default WelcomeForm
