import React, { Component } from 'react';
import './cogniwide-chatbubble.css';
import Calendar from 'react-calendar';
import Cloud from '../cogniwide-assets/cloud-upload.png'

class ChatBubble extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            date: new Date(),
            loading: true,
            showLoader: false
          }

    }


    onChange = date => {
        this.setState({ date });
    } 
    getFormattedDate(date){
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
  render() {    
    if (this.props.user==='human')
        return (
        <li className='right'>
            <div className="d-flex justify-content-strat flex-row-reverse">
                <div className="chat-body bubble clearfix flex-column">
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
        <li className='left'>
            <div className="d-flex justify-content-start">
                <span className="avatar_wrapper mr-2">  
                {(this.props.avatar) && 
                            <img src={this.props.botIcon} alt="User Avatar"
                                className="img-circle avatar"/>
                }
                </span>
            <div className="chat-body bubble clearfix flex-column">
                
            {('text' in this.props.message) &&
                    <div className="content">
                        <p dangerouslySetInnerHTML={{ __html:this.props.message.text}}></p>
                    </div>
            }
            
            {('image' in this.props.message) &&    
                    <p>
                        <img src={this.props.message.image} alt="" width="250" height="200"/>
                    </p>
            }

            {('audio' in this.props.message) &&  
                    <audio controls="controls" id="player">
                        <source src={this.props.message.audio} />
                        <p> Could'nt load audio </p>
                    </audio>
            }   
                
                {('buttons' in this.props.message) &&  
                    <span className="mt-2 d-flex flex-column">
                        {this.props.message.buttons.map((button,index)=> <button onClick={()=> this.handleClick(button)} type="button" key={index} id="quick_reply_btn"
                            className="btn btn-outline-info text-left my-2 see_all pl-4 bg-white" data={button.payload}>{button.title}</button>)} 
                            
                    </span>
                }
            
                {'rating' in this.props.message &&  
                    <div className='rating-stars text-center'>
                        <ul id='stars'>
                            <li className='star' title='Poor' data-value='1' onClick={()=> this.handleClick({"title":"1 Rating","payload":"1"})} >
                                <i className='fa fa-star fa-fw'></i>
                            </li>
                            <li className='star' title='Fair' data-value='2' onClick={()=> this.handleClick({"title":"2 Rating","payload":"2"})} >
                                <i className='fa fa-star fa-fw'></i>
                            </li>
                            <li className='star' title='Good' data-value='3' onClick={()=> this.handleClick({"title":"3 Rating","payload":"3"})} >
                                <i className='fa fa-star fa-fw'></i>
                            </li>
                            <li className='star' title='Excellent' data-value='4' onClick={()=> this.handleClick({"title":"4 Rating","payload":"4"})} >
                                <i className='fa fa-star fa-fw'></i>
                            </li>
                            <li className='star' title='WOW!!!' data-value='5' onClick={()=> this.handleClick({"title":"5 Rating","payload":"5"})} >
                                <i className='fa fa-star fa-fw'></i>
                            </li>
                        </ul>
                    </div>
                }
                {('datepicker' in this.props.message) &&  
                    <span className="mt-2 d-flex flex-column">
                        <Calendar
                            onChange={this.onChange}
                            onClickDay={()=>{this.props.parent.sendText(this.getFormattedDate(this.state.date));}}
                            value={this.state.date}
                        />
                    </span>
                }
                {('upload' in this.props.message) &&  
                    <span className="mt-2 d-flex flex-column">
                        <div className="attachment">
                            <div className="upload-btn-wrapper">
                                <button className="upload_btn"><img className="upload-icon" src={Cloud} alt="Upload file" />Upload a file</button>
                                <input type="file" name="myfile" onChange={()=>{this.props.parent.sendText("File Uploaded Successfully");}} />
                            </div>
                        </div>
                    </span>
                }

            </div>
        </div>
        {this.props.message.lastmessage===true &&
            <div className="chatstimes">
               <span className="timeStamp">1:35 AM</span>
            </div>
        }
       
    </li>
    )
  }
}
export default ChatBubble;