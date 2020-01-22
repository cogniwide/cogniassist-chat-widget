import React, { Component } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import './chatwidget.css';
import updateArrow from './assets/update-arrow.png'
import smileEmoji from './assets/smile.svg'
import normalEmoji from './assets/normal.svg'
import worstEmoji from './assets/worst.svg'
import chatIcon from './assets/chat-icon.png'

import ChatBubble from './components/chatbubble';
import datepicker from 'js-datepicker';
import 'js-datepicker/dist/datepicker.min.css';


class ChatWidget extends Component {
  constructor(props) {
    super(props);
    this.state={
      sender_id: this.createOrRetriveSenderId(),
      userMessage: '',
      conversation: [],
      quick_replies:[],
      loading: false,
      opened: false,
      unread:1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendText = this.sendText.bind(this);
    this.sendRequest = this.sendRequest.bind(this);

    this.messages=[
      [
        {
            "text": "Welcome to Cogniwide ",
        },
        {
            "text": " How can i help you ?",
        }
      ],
      [
        {
            "text": "Cogniwide specialises in AI powered enterprise products.",
            "buttons": [
                {
                    "title": "CogniAssist",
                    "payload": "CogniAssist"
                },
                {
                    "title": "CogniMLASS",
                    "payload": "CogniMLASS"
                }
            ]
        }
      ],
      [
        {
          "text":"Do you want to continue ?",
          "quick_replies":[{
            "title": "CogniAssist",
            "payload": "CogniAssist"
        },
        {
          "title": "CogniMLASS",
          "payload": "CogniMLASS"
      }]
        }
      ],      [
        {
            "text": "Welcome to Cogniwide ",
        },
        {
            "text": " How can i help you ?",
        }
      ],
      [
        {
          "text": "What is Your Name?",
        }
      ],
      [
        {
          "text": "Do you select to gender ?",
          "buttons": [
            {
              "title": "Male",
              "payload": "Male"
            },
            {
              "title": "Female",
              "payload": "Female"
            }
          ]
        }
      ],
      [
        {
          "text": "Date of birth",
          "datepicker": true
        }
      ],
      [
        {
          "text": "Upload Your ID",
          "upload": true
        }
      ],
      [
        {
          "text": "Sample Image",
          "image": 'http://placekitten.com/640/360'
        }
      ],
      [
        {
          "text": "Sample Audio",
          "audio": 'https://geekanddummy.com/wp-content/uploads/2014/01/Killer-Choir.mp3'
        }
      ],
      [
        {
          "text": "Feedback",
          "star_rating": true
        }
      ],
      [
        {
          "text": "Thanks for your feedbacks",
          "end": true,
        }
      ]
      ]


  }
  loading(val){
    this.setState({
      loading: val
    });
  }


  createOrRetriveSenderId() {
    return "default"
  }

  componentDidMount() {

    $(".chat_box_container").hide();
    $('.left').hide();
    $('.right').hide();
    $('.panel-footer').show();
    $('.left.initial_show').show(450);
    $('.close').click(function () {
        $('.chat_box_container').hide(1000).removeClass('chat_box_active');
    });

    $('.see_next').click(function () {
        $('li:eq(1)').show(300);
        setTimeout(function () { $('li:eq(2)').show(2000); }, 2000);

    });

    $('.chat_btn_container').click(()=>{
        $(".chat_box_container").show(100).toggleClass('chat_box_active');
        this.setState((prevState)=>({
          opened: !prevState.opened,
          unread: 0
        }))
    });

    $('.see_all').click(function () {
        $('.left,.right').show(1000);
        $('.panel-footer').show(2000);
    });


    $(".panel-body").scroll(function () {
        // declare variable
        var topPos=$(this).scrollTop();
        if (topPos>50) {
            $(".panel-heading ").addClass("shaddow");

        } else {
            $(".panel-heading").removeClass("shaddow");
        }

    });

    $('.feedback-emoji li').click(function () {
        $('.chat_box_container').hide(1000).removeClass('chat_box_active');
        $('.panel-body .banner, .panel-body ul.chat, .panel-footer').delay(2000).show();
        $('.panel-body .feedback').delay(2000).hide();
    });

  $(".mic-btn").click(()=> 
	{
		$(".textInput").focus();
	    if (window.hasOwnProperty('webkitSpeechRecognition')) {    
        $(".mic-btn").css({opacity : 1})
        var SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
	      var recognition=new SpeechRecognition();
	 
	      recognition.continuous=false;
	      recognition.interimResults=false;
	 
	      recognition.lang="en-IN";
	      recognition.start();
	 
	      recognition.onresult=(e)=>{
            recognition.stop();
            $(".mic-btn").css({opacity : .6})
            console.log(e.results)
            // set text
	        setTimeout(this.sendText(e.results[0][0].transcript), 1000);
	      };
	 
	      recognition.onerror=function(e) {
	        recognition.stop();
	      }
	 
	    }
  });
  
  /* 1. Visualizing things on Hover - See next part for action on click */
$(document).on("mouseover", "#stars li", function (e) {
  var onStar=parseInt($(this).data('value'), 10); // The star currently mouse on
 
  // Now highlight all the stars that's not after the current hovered star
  $(this).parent().children('li.star').each(function(e){
    if (e < onStar) {
      $(this).addClass('hover');
    }
    else {
      $(this).removeClass('hover');
    }
  });
  
}).on('mouseout', function(){
  $(this).parent().children('li.star').each(function(e){
    $(this).removeClass('hover');
  });
});


    /* 2. Action to perform on click */

    $(document).on("click", "#stars li", function (e) {
      var onStar=parseInt($(this).data('value'), 10); // The star currently selected
      var stars=$(this).parent().children('li.star');
      
      for (let i=0; i < stars.length; i++) {
        $(stars[i]).removeClass('selected');
      }
      
      for (let i=0; i < onStar; i++) {
        $(stars[i]).addClass('selected');
      }
      
      // JUST RESPONSE (Not needed)
      var ratingValue=parseInt($('#stars li.selected').last().data('value'), 10);
      var ratingMsg="";
      if (ratingValue > 2) {
        ratingMsg="Thanks! I'm glad we could help you";
      }
      else {
        ratingMsg="Sorry,We will improve ourselves.";
      }
      const msg={
        text: ratingMsg,
        user: 'ai',
      };

      this.setState({
        conversation: [...this.state.conversation, msg],
      });
      
    });

    datepicker('.datepickerIcon', {
      position: 'tr',
      onSelect: (instance, date) => {
        let dateVal = this.getFormattedDate(date);
        $('.chat_box_container .panel-footer #textInput').val($('.chat_box_container .panel-footer #textInput').val()+dateVal).trigger('change');
      }
    })
    this.sendRequest(this.props.initialPayload)
  }

  getFormattedDate(date){
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
  }
              
   scrollToBottom() {
    $(".panel-body").stop().animate({ scrollTop: $(".panel-body")[0].scrollHeight}, 1000);
  }

  handleChange(event){
    this.setState({ userMessage: event.target.value });
  };

  handleSubmit(e){
    if (e.key==='Enter') {
      event.preventDefault();
      if (!this.state.userMessage.trim()) return;
      this.sendText()

    }
  };

  addMessage(message,user){
    const msg={
      text: message,
      user: user,
    };
    this.setState((prevState) => ({
      conversation: [...prevState.conversation, msg],
    }));
  }

  sendText(message=null){
    message = (message==null)?this.state.userMessage:message
    const msg={
      text: message,
      user: 'human',
    };

    this.setState((prevState) => ({
      conversation: [...prevState.conversation, msg],
    }));
    
    this.sendRequest(message)
    this.setState({ userMessage: '' });
    this.scrollToBottom()
  }


  sendRequest(query=null){

    let payload={
      sender: this.state.sender_id,
    }
    if(query==null){
      payload["message"]= this.state.userMessage;
    }else{
      payload["message"]= query;
    }

    // let dummyResponse = this.dummyRequest()
    // this.renderResponse(dummyResponse);

    this.loading(true);

    fetch(this.props.botURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    .then(response=> response.json())
    .then(response=> {
      this.loading(false);
      console.log(response)
      this.renderResponse(response)

    });

  }

  renderResponse(responses){
    let messages =[]
    let quick_replies =[]
    responses.forEach(response=>{
      const msg={
        ...response,
        "user":"ai"
      };
      if ("quick_replies" in response)
      {
        quick_replies.push(...response["quick_replies"]) 
      }
      messages.push(msg)
    })

    this.setState((prevState) => ({
      conversation: [...prevState.conversation, ...messages],
      quick_replies: quick_replies
    }));

    this.scrollToBottom()
  }


  dummyRequest(){
  
    return this.messages.shift()
  }


  render() {
    var aiIndex = 0;
    const chat=this.state.conversation.map((e, index)=>{
        if(e.user==='human'){
          aiIndex = 0;
        }else{
          aiIndex++;
        }
        if(e.end){
          $('.panel-body .banner, .panel-body ul.chat, .panel-footer').hide();
          $('.panel-body .feedback').show();
        }
        return (
          <ChatBubble botIcon={this.props.botIcon} parent={this} message={e}  index={index}  key={index} user={e.user} avatar={aiIndex==1}/>
        );
      }
    );

    const restartStyle={
      width: '20px',
      marginTop:'3px'
    };

    const closeBtnStyle={
      width: '20px'
    }
    const bannerStyle = {backgroundImage: "url("+this.props.bannerURL+")"}
    let className = 'send-button text-white';
    if (this.state.userMessage.length) {
      className += ' send-active';
    }
    return (
      <div>
          <div className="chat_btn_container position-fixed">
          <button className="btn border-25 border-0">
            <img src={chatIcon} width="60" />
            {this.state.unread > 0 &&
              <span className="badge badge-pill badge-danger unreadCount">1</span>
            }
          </button>        
        </div>
        { !this.state.opened &&
          <div class="chat-heading arrow-bottom">
          <h5> {this.props.botWelcomeMessage}</h5>
          </div>
        }

          <div className="chat_box_container position-relative">
              <div className="col-md-12 p-0 h-100">
                  <div className="panel panel-primary">
                      <div className="panel-heading d-flex justify-content-between align-items-center px-2 bg-primary">
                          <span className="text-white font-weight-bold"> {this.props.botName}</span>
                          <div className="btn-group pull-right">
                              <a href="#!" className="restart" style={restartStyle}>
                                  <img src={updateArrow} alt="refresh" className="img-responsive" width="15"/>
                              </a>
                              <button type="button" className="close" aria-label="Close" style={closeBtnStyle}>
                                  <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                      <path
                                          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                                      </path>
                                  </svg>
                              </button>
                          </div>
                      </div>
                      <div className="panel-body">
                        <div className="banner" style={bannerStyle}>
                          {this.props.bannerText}
                        </div>
                            <ul className="chat">
                              {chat}
                              <li className="loading" style={{display: this.state.loading ? "block" : "none" }}>
                                <div className="d-flex justify-content-start">
                                  <div className="chat-body bubble clearfix flex-column">
                                    <img src="https://cogniwide.github.io/cogniassist-chat-widget/public/assets/tenor.gif"/>
                                  </div>
                                </div>
                              </li>
                            </ul>
                            <div className="feedback" style={{display: "none" }}>
                              Feedback
                              <ul className="feedback-emoji">
                                <li data-name="worst"><img src={worstEmoji} width="50" /></li>
                                <li data-name="normal"><img src={normalEmoji} width="50" /></li>
                                <li data-name="smile"><img src={smileEmoji} width="50" /></li>
                              </ul>
                            </div>
                      </div>
                      <div className="panel-footer position-fixed">
                          <div className="suggestion_box bg-white">
                              <div className="d-flex flex-row quick-replies">
                              {this.state.quick_replies.map((button,index)=> <button type="button" id="quick_reply_btn" key={index}
                               className="btn btn-outline-info text-left mx-2 see_all pl-4 bg-white"
                               onClick={()=> this.sendText(button.title)}
                               data={button}>{button.title}</button>
)} 
                              </div>
                          </div>
                          <div id="composer"
                              className="composer d-flex justify-content-between align-items-center position-relative">
                                <textarea 
                                  value={this.state.userMessage}
                                  onKeyUp={this.handleSubmit}
                                  onChange={this.handleChange}
                                  id="textInput" 
                                  className="textInput" 
                                  placeholder="Type an answer"
                                  ></textarea>
                              <pre className={className}></pre>
                              <pre className="mic-btn text-white"></pre>
                              <pre className="cal-btn text-white datepickerIcon"></pre>
                          </div>
                           <div class="power-by">
                             <span>Powered by <a href="#">Cogniwide</a></span>
                          </div>
                      </div>
                  </div>
              </div>
              </div>
          </div>
    );
  }
}


export default ChatWidget;