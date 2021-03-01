import React, { Component } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../styles/cogniwide-chatbubble.scss';
import Calendar from 'react-calendar';
import Cloud from '../cogniwide-assets/cloud-upload.png'
import Dropdown from './custom-responses/dropdown'
import CheckboxContainer from './custom-responses/checkbox-container'
import  CustomComponentWrapper from '../../CustomComponents/registry'

class ChatBubble extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            showLoader: false,
            uploading: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.dropDownOnChange = this.dropDownOnChange.bind(this)
        this.checkboxSubmit = this.checkboxSubmit.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
    }


    onChange = date => {
        let readable_date = date.toDateString();
        let formatted_date = this.getFormattedDate(date)
        if(this.props.message.datepicker.defaultView == "decade"){
            readable_date = date.getFullYear()
        }
        this.props.parent.chooseReply(readable_date, formatted_date);

    }

    getFormattedDate(date) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return month + '/' + day + '/' + year;
    }
    handleClick(reply) {
        const payload = reply.payload;
        const title = reply.title;

        if(payload.startsWith("link:")){
            const link = payload.split("link:")[1]
            window.open(link, "_blank")
            return;
        }
        this.props.parent.chooseReply(title, payload);
    }

    dropDownOnChange(change) {
        this.props.parent.chooseReply(change.title, change.value);
    };

    
    checkboxSubmit(title,payload){
        this.props.parent.chooseReply(title, payload);
    }

    formSubmit(title,payload){
        this.props.parent.chooseReply(title,payload);

    }


    handleFiles(files){
        this.setState({
            uploading: true
          })

        this.props.parent.sendFile(files[0]).then(
            ()=>{
                this.setState({
                    uploading: false
                  })
            }
        )


    }
    render() {
        if ("line" in this.props.message) {
            return (
                <li className='cwc-right'>
                    <div className="session-border"><span>{new Date().toDateString()}</span></div>
                </li>
            )
        }
        else if (this.props.user === 'human')
            return (
                <li className='cwc-right'>
                    <div className="clientchat">
                        <div className="chat-body bubble clearfix">
                            <p>
                                {((typeof(this.props.message.text) == "string") && this.props.message.text.startsWith("/"))? "Event": this.props.message.text}
                            </p>
                        </div>
                    </div>
                    {/* <span className="timeStamp">1:35 AM</span> */}
                </li>
            )
        else if ('customComponent' in this.props.message)
        {
            return (
                <li className='cwc-left'>
                    <div className="adminchatlist">
                        <span className="avatar_wrapper mr-2">
                            {(this.props.avatar) &&
                                <img src={this.props.botIcon} alt="User Avatar"
                                    className="img-circle avatar" />
                            }
                        </span>
                        <div className="chat-body bubble clearfix flex-column">
                            <CustomComponentWrapper 
                                formSubmit={this.formSubmit}
                                customComponent={this.props.message.customComponent} />
                        </div>
                        </div>
                </li>
            )
        }

        else
            return (
                <li className='cwc-left'>
                    <div className="adminchatlist">
                        <span className="avatar_wrapper mr-2">
                            {(this.props.avatar) &&
                                <img src={this.props.botIcon} alt="User Avatar"
                                    className="img-circle avatar" />
                            }
                        </span>
                        <div className="chat-body bubble clearfix flex-column">

                            {('text' in this.props.message) &&
                                <div className="content">
                                    <p dangerouslySetInnerHTML={{ __html: this.props.message.text }}></p>
                                </div>
                            }

                            {('html' in this.props.message) &&
                                <div className="content">
                                    <p dangerouslySetInnerHTML={{ __html: this.props.message.html }}></p>
                                </div>
                            }

                            {('elements' in this.props.message) &&
                                <div className="scrolling-wrapper-flexbox">
                                    {this.props.message.elements.map((element, index) =>
                                        <div className="card" onClick={() => this.handleClick(element)} key={index}>
                                            <span className="title">{element.title}</span> <br />
                                            <span className="subtitle">{element.subtitle}</span> <br />
                                        </div>
                                    )}
                                </div>
                            }


                            {('image' in this.props.message) &&
                                <p>
                                    <img src={this.props.message.image} alt="" width="250" height="200" />
                                </p>
                            }

                            {('audio' in this.props.message) &&
                                <audio controls="controls" id="player">
                                    <source src={this.props.message.audio} />
                                    <p> Could'nt load audio </p>
                                </audio>
                            }

                            {('buttons' in this.props.message) &&
                                <span className="mt-2 diplayalign">
                                    {this.props.message.buttons.map((button, index) => <button onClick={() => this.handleClick(button)} type="button" key={index} id="quick_reply_btn"
                                        className="cwc-borderbtn see_all" data={button.payload}>{button.title}</button>)}

                                </span>
                            }

                            {'rating' in this.props.message &&
                                <div className='rating-stars text-center'>
                                    <ul id='stars'>
                                        <li className='star' title='Poor' data-value='1' onClick={() => this.handleClick({ "title": "1 Rating", "payload": "1" })} >
                                            <i className='fa fa-star fa-fw'></i>
                                        </li>
                                        <li className='star' title='Fair' data-value='2' onClick={() => this.handleClick({ "title": "2 Rating", "payload": "2" })} >
                                            <i className='fa fa-star fa-fw'></i>
                                        </li>
                                        <li className='star' title='Good' data-value='3' onClick={() => this.handleClick({ "title": "3 Rating", "payload": "3" })} >
                                            <i className='fa fa-star fa-fw'></i>
                                        </li>
                                        <li className='star' title='Excellent' data-value='4' onClick={() => this.handleClick({ "title": "4 Rating", "payload": "4" })} >
                                            <i className='fa fa-star fa-fw'></i>
                                        </li>
                                        <li className='star' title='WOW!!!' data-value='5' onClick={() => this.handleClick({ "title": "5 Rating", "payload": "5" })} >
                                            <i className='fa fa-star fa-fw'></i>
                                        </li>
                                    </ul>
                                </div>
                            }
                            {('datepicker' in this.props.message) &&
                                <span className="mt-2 diplayalign">
                                    <Calendar
                                        maxDate = {this.props.message.datepicker.maxDate ? new Date(this.props.message.datepicker.maxDate) : 
                                        (
                                            this.props.message.datepicker.disableFuture ? new Date(): undefined 
                                        )
                                        }
                                        minDate={this.props.message.datepicker.minDate ? new Date(this.props.message.datepicker.minDate) : undefined}
                                        onChange={this.onChange}
                                        maxDetail={this.props.message.datepicker.defaultView ? this.props.message.datepicker.defaultView : undefined}
                                    />
                                </span>
                            }

                            {('upload' in this.props.message) &&
                                <span className="mt-2 diplayalign">
                                    <div className="attachment">
                                        <div className="upload-btn-wrapper">
                                            <button className="upload_btn" onClick={()=>{this.upload.click()}}><img className="upload-icon" src={Cloud} alt="Upload file" />Upload a file</button>
                                            <input type="file" ref={(ref) => this.upload = ref} accept={this.props.message.upload.accept} name="myfile" onChange={(e) => { this.handleFiles(e.target.files)}} />
                                        </div>
                                    </div>
                                </span>
                            }

                            {('select' in this.props.message) &&
                                <div className="mt-2 diplayalign">
                                    <Dropdown id='chat-dropdown'
                                        options={this.props.message.select.options}
                                        value={this.props.message.select.value}
                                        labelField={this.props.message.select.labelField}
                                        valueField={this.props.message.select.valueField}
                                        onChange={this.dropDownOnChange} />
                                </div>
                            }

                            {('checkbox' in this.props.message) &&
                                <div className="mt-2 diplayalign">
                                    <CheckboxContainer id='chat-checkbox-container'
                                        options={this.props.message.checkbox}
                                        onChange={this.checkboxSubmit} />
                                </div>
                            }



                        </div>
                    </div>
                    {/* {this.props.message.lastmessage === true &&
                        <div className="chatstimes">
                            <span className="timeStamp">1:35 AM</span>
                        </div>
                    } */}

                </li>
            )
    }
}
export default ChatBubble;