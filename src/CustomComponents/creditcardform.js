import React, { Component } from 'react';
import './creditcardform.scss'

class CreditCardForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            cardnumber: '',
            expirationdate: '',
            securitycode: ''
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
          <form onSubmit={this.handleSubmit} className="form">
                <div className="form-container">
                    <div className="field-container">
                        <label htmlFor="name">Name</label>
                        <input id="name" maxLength="20" type="text"  
                        value={this.state.name} 
                        onChange={event => this.setState({ name: event.target.value })}/>
                    </div>
                    <div className="field-container">
                        <label htmlFor="cardnumber">Card Number</label>
                        <input id="cardnumber" type="text" pattern="[0-9]*" inputMode="numeric"/>
                    </div>
                    <div className="field-container">
                        <label htmlFor="expirationdate">Expiration (mm/yy)</label>
                        <input id="expirationdate" type="text" pattern="[0-9]{2}/[0-9]{2}" inputMode="numeric"/>
                    </div>
                    <div className="field-container">
                        <label htmlFor="securitycode">Security Code</label>
                        <input id="securitycode" type="password" pattern="[0-9]*" inputMode="numeric"/>
                    </div>
                    <button>Pay</button>
                </div>
            </form>

        );
      }
  }
  export default CreditCardForm
