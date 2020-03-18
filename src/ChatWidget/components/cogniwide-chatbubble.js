import React, { Component } from 'react';
import './cogniwide-chatbubble.scss';
import Calendar from 'react-calendar';
import Cloud from '../cogniwide-assets/cloud-upload.png'
import Dropdown from './custom-responses/dropdown'
import 'react-calendar/dist/Calendar.css';

class ChatBubble extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            showLoader: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.dropDownOnChange = this.dropDownOnChange.bind(this)
    }


    onChange = date => {
        console.log(date)
        this.props.parent.sendText(this.getFormattedDate(date));

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
        this.props.parent.chooseReply(title, payload);
    }

    dropDownOnChange(change) {
        this.props.parent.chooseReply(change.title, change.value);
    };

    render() {
        if ("line" in this.props.message) {
            return (
                <li className='cwc-right'>
                    <div className="session-border"><span>{new Date().toLocaleString()}</span></div>
                </li>
            )
        }
        else if (this.props.user === 'human')
            return (
                <li className='cwc-right'>
                    <div className="clientchat">
                        <div className="chat-body bubble clearfix">
                            <p>
                                {this.props.message.text}
                            </p>
                        </div>
                    </div>
                    <span className="timeStamp">1:35 AM</span>
                </li>
            )
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
                                        onChange={this.onChange}
                                        maxDetail={this.props.message.datepicker.defaultView ? this.props.message.datepicker.defaultView : undefined}
                                    />
                                </span>
                            }
                            {('upload' in this.props.message) &&
                                <span className="mt-2 diplayalign">
                                    <div className="attachment">
                                        <div className="upload-btn-wrapper">
                                            <button className="upload_btn"><img className="upload-icon" src={Cloud} alt="Upload file" />Upload a file</button>
                                            <input type="file" accept={this.props.message.upload.accept} name="myfile" onChange={() => { this.props.parent.sendText("File Uploaded Successfully"); }} />
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

                        </div>
                    </div>
                    {this.props.message.lastmessage === true &&
                        <div className="chatstimes">
                            <span className="timeStamp">1:35 AM</span>
                        </div>
                    }

                </li>
            )
    }
}
export default ChatBubble;