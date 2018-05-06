import React, { Component } from "react";
import Fire from "./../firebase/Fire";
import COUNTRY from './../constants/country-code.json';


class PhoneVerification extends Component {

  state = {
    showConfirm : false,
    phone : '',
    code : "",
    country: COUNTRY,
    dial: "null"
  }

  componentDidMount(){
    Fire.setAutoCaptcha();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { phone, code, dial } = this.state;
    if (!phone) return;

    const fullPhoneNumber = `${dial}${phone}`
    console.log(fullPhoneNumber)

    if (!code){
      Fire.sendVerificationCode(fullPhoneNumber, this.showConfirmation);
    } else {
      Fire.logInUserWithCode(code);
    }
  }

  showConfirmation = () =>{
    this.setState({ showConfirm : true });
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  changeCountry = (event) => {
    this.setState({ dial: event.target.value });
  }

  render (){
    const { phone, showConfirm, code, country, dial} = this.state;
    return(
      <div>
        <button id="sign-in-button" className="invisible">Login</button>
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            {!showConfirm ?
              <div className="input-group">
                <select className="custom-select" id="inputGroupSelectDial" onChange={this.changeCountry} value={dial}>
                  {
                    country.map((item, key) => {
                      return  <option key={key} value={item.dial_code}>{item.name} {item.dial_code}</option>
                    })
                  }
                </select>
                <div className="input-group-append">
                  <input type="text" id="phone" value={phone} onChange={this.handleChange} className="input-group-text" aria-label="Type phone number" />
                </div>
              </div>
              :
              <div className="input-group">
                <label>Type the 6 digits code recived by sms:</label>
                <input type="text" id="code" value={code} onChange={this.handleChange} className="input-group-text"   />
              </div>
            }
            </div>
            <button type="submit" className="btn btn-primary">{ !showConfirm ? "Send Verification Code" : "Confirm"} </button>
        </form>
      </div>
    )
  }
}

export default PhoneVerification;
