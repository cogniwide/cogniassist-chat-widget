import React, { Component } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../styles/cogniwide-chatbubble.scss';
import Calendar from 'react-calendar';
import Cloud from '../../../public/assets/modal/upload-cloud.svg';
import Dropdown from './custom-responses/dropdown';
import Autocomplete from './custom-responses/autocomplete';
import Carousel from './custom-responses/carousel';
import RangeSlider from './custom-responses/rangeslider';
import CheckboxContainer from './custom-responses/checkbox-container';
import CustomComponentWrapper from '../../CustomComponents/registry';

class ChatBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showLoader: false,
      uploading: false,
      files: [],
      dropdown: {
        title: '',
        value: '',
      },
      errors: {},
      ratingHover: 0,
      ratingSelected: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.dropDownOnChange = this.dropDownOnChange.bind(this);
    this.dropDownOnSubmit = this.dropDownOnSubmit.bind(this);
    this.checkboxSubmit = this.checkboxSubmit.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onChange = (date) => {
    let readable_date = date.toDateString();
    let formatted_date = this.getFormattedDate(date);
    if (this.props.message.datepicker.defaultView == 'decade') {
      readable_date = date.getFullYear();
    }
    this.props.parent.chooseReply(readable_date, formatted_date);
  };

  getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date
      .getDate()
      .toString()
      .padStart(2, '0');
    return month + '/' + day + '/' + year;
  }
  handleClick(reply) {
    const payload = reply.payload;
    const title = reply.title;
    this.setState({ ratingSelected: payload });

    if (payload.startsWith('link:')) {
      const link = payload.split('link:')[1];
      window.open(link, '_blank');
      return;
    }
    this.props.parent.chooseReply(title, payload);
  }
  handleHover(target) {
    this.setState({ ratingHover: target });
  }

  dropDownOnChange(change) {
    this.setState({ dropdown: { title: change.title, value: change.value } });
    this.setState({ errors: { dropdown: false } });
  }
  dropDownOnSubmit() {
    if (this.state.dropdown.title !== '') {
      this.props.parent.chooseReply(
        this.state.dropdown.title,
        this.state.dropdown.value
      );

      this.setState({ dropdown: { title: '', value: '' } });
      this.setState({ errors: { dropdown: false } });
    } else {
      this.setState({ errors: { dropdown: true } });
    }
  }

  checkboxSubmit(title, payload) {
    this.props.parent.chooseReply(title, payload);
  }

  formSubmit(title, payload) {
    this.props.parent.chooseReply(title, payload);
  }

  handleFiles() {
    console.log(this.state);
    if (this.state.files.length > 0) {
      this.setState({
        uploading: true,
      });

      this.props.parent.sendFile(this.state.files[0]).then(() => {
        this.setState({
          uploading: false,
          files: [],
        });
        this.setState({ errors: { file: false } });
      });
    } else {
      this.setState({ errors: { file: true } });
    }
  }
  handleModalFiles(files) {
    this.setState({
      uploading: true,
    });

    this.props.parent.sendFile(files[0]).then(() => {
      this.setState({
        uploading: false,
      });
    });
  }
  getCurrentTime() {
    let newDate = new Date().toLocaleString().split(', ');
    return newDate[1];
  }
  render() {
    if ('line' in this.props.message) {
      return (
        <li className='cwc-right'>
          <div className='session-border'>
            <span>{new Date().toDateString()}</span>
          </div>
        </li>
      );
    } else if (this.props.user === 'human')
      return (
        <li className='cwc-right'>
          <div className='clientchat'>
            {this.props.template === 'Modal' && this.props.userAvatar && (
              <span className='user_avatar_wrapper mr-2'>
                <img
                  src={this.props.userIcon}
                  alt='User Avatar'
                  className='img-circle avatar'
                />
              </span>
            )}
            <div className='chat-body bubble clearfix'>
              <p>
                {typeof this.props.message.text == 'string' &&
                this.props.message.text.startsWith('/')
                  ? 'Event'
                  : this.props.message.text}
              </p>
            </div>
          </div>
          {/* <span className="timeStamp">1:35 AM</span> */}
        </li>
      );
    else if ('customComponent' in this.props.message) {
      return (
        <li className='cwc-left'>
          <div className='adminchatlist'>
            <span className='avatar_wrapper mr-2'>
              {this.props.avatar && (
                <img
                  src={this.props.botIcon}
                  alt='User Avatar'
                  className='img-circle avatar'
                />
              )}
            </span>
            <div className='chat-body bubble clearfix flex-column'>
              <CustomComponentWrapper
                formSubmit={this.formSubmit}
                customComponent={this.props.message.customComponent}
              />
            </div>
          </div>
        </li>
      );
    } else
      return (
        <li className='cwc-left'>
          <div className='adminchatlist'>
            <span className='avatar_wrapper mr-2'>
              {this.props.avatar && (
                <img
                  src={this.props.botIcon}
                  alt='User Avatar'
                  className='img-circle avatar'
                />
              )}
            </span>
            <div className='chat-body bubble clearfix flex-column'>
              {'text' in this.props.message && (
                <div className='content'>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: this.props.message.text,
                    }}
                  ></p>
                </div>
              )}

              {'html' in this.props.message && (
                <div className='content'>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: this.props.message.html,
                    }}
                  ></p>
                </div>
              )}

              {'elements' in this.props.message && (
                <div>
                  {this.props.template === 'Modal' ? (
                    <div className='scrolling-wrapper-flexbox'>
                      <Carousel
                        elements={this.props.message.elements}
                        handleClick={(ele) => {
                          this.handleClick(ele);
                        }}
                      />
                    </div>
                  ) : (
                    <div className='scrolling-wrapper-flexbox'>
                      {this.props.message.elements.map((element, index) => (
                        <div
                          className='card'
                          onClick={() => this.handleClick(element)}
                          key={index}
                        >
                          <span className='title'>{element.title}</span> <br />
                          <span className='subtitle'>
                            {element.subtitle}
                          </span>{' '}
                          <br />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {'slider' in this.props.message && (
                <div>
                  <RangeSlider
                    range={this.props.message.slider}
                    rangeOnSubmit={(budget) => {
                      this.props.parent.chooseReply(budget, budget);
                    }}
                  />
                </div>
              )}

              {'image' in this.props.message && (
                <p>
                  <img
                    src={this.props.message.image}
                    className='responseImg'
                    alt=''
                    width='250'
                    height='200'
                  />
                </p>
              )}

              {'audio' in this.props.message && (
                <audio controls='controls' id='player'>
                  <source src={this.props.message.audio} />
                  <p> Could'nt load audio </p>
                </audio>
              )}

              {'buttons' in this.props.message && (
                <span className='mt-2 diplayalign'>
                  {this.props.message.buttons.map((button, index) => (
                    <button
                      onClick={() => this.handleClick(button)}
                      type='button'
                      key={index}
                      id='quick_reply_btn'
                      className='cwc-borderbtn see_all'
                      data={button.payload}
                    >
                      {button.title}
                    </button>
                  ))}
                </span>
              )}

              {'rating' in this.props.message && (
                <div className='rating-stars text-center'>
                  <ul id='stars'>
                    <li
                      className={`star ${
                        this.state.ratingHover >= 1 ? 'hover' : ''
                      } ${this.state.ratingSelected >= 1 ? 'selected' : ''}`}
                      title='Poor'
                      data-value='1'
                      onMouseOver={(e) => {
                        this.handleHover(1);
                      }}
                      onMouseOut={() => {
                        this.setState({ ratingHover: 0 });
                      }}
                      onClick={() => {
                        this.setState({ ratingHover: 5 });
                        this.setState({ ratingSelected: 5 });
                        this.handleClick({ title: '1 Rating', payload: '1' });
                      }}
                    >
                      <i className='fa fa-star fa-fw'></i>
                    </li>
                    <li
                      className={`star ${
                        this.state.ratingHover >= 2 ? 'hover' : ''
                      } ${this.state.ratingSelected >= 2 ? 'selected' : ''}`}
                      title='Fair'
                      data-value='2'
                      onMouseOver={(e) => {
                        this.handleHover(2);
                      }}
                      onMouseOut={() => {
                        this.setState({ ratingHover: 0 });
                      }}
                      onClick={() =>
                        this.handleClick({ title: '2 Rating', payload: '2' })
                      }
                    >
                      <i className='fa fa-star fa-fw'></i>
                    </li>
                    <li
                      className={`star ${
                        this.state.ratingHover >= 3 ? 'hover' : ''
                      } ${this.state.ratingSelected >= 3 ? 'selected' : ''}`}
                      title='Good'
                      data-value='3'
                      onMouseOver={(e) => {
                        this.handleHover(3);
                      }}
                      onMouseOut={() => {
                        this.setState({ ratingHover: 0 });
                      }}
                      onClick={() =>
                        this.handleClick({ title: '3 Rating', payload: '3' })
                      }
                    >
                      <i className='fa fa-star fa-fw'></i>
                    </li>
                    <li
                      className={`star ${
                        this.state.ratingHover >= 4 ? 'hover' : ''
                      } ${this.state.ratingSelected >= 4 ? 'selected' : ''}`}
                      title='Excellent'
                      onMouseOver={(e) => {
                        this.handleHover(4);
                      }}
                      onMouseOut={() => {
                        this.setState({ ratingHover: 0 });
                      }}
                      data-value='4'
                      onClick={() =>
                        this.handleClick({ title: '4 Rating', payload: '4' })
                      }
                    >
                      <i className='fa fa-star fa-fw'></i>
                    </li>
                    <li
                      className={`star ${
                        this.state.ratingHover >= 5 ? 'hover' : ''
                      } ${this.state.ratingSelected >= 5 ? 'selected' : ''}`}
                      title='WOW!!!'
                      data-value='5'
                      onMouseOver={(e) => {
                        this.handleHover(5);
                      }}
                      onMouseOut={() => {
                        this.setState({ ratingHover: 0 });
                      }}
                      onClick={() =>
                        this.handleClick({ title: '5 Rating', payload: '5' })
                      }
                    >
                      <i className='fa fa-star fa-fw'></i>
                    </li>
                  </ul>
                </div>
              )}
              {'datepicker' in this.props.message && (
                <span className='mt-2 diplayalign'>
                  <Calendar
                    onChange={this.onChange}
                    maxDetail={
                      this.props.message.datepicker.defaultView
                        ? this.props.message.datepicker.defaultView
                        : undefined
                    }
                  />
                </span>
              )}

              {'upload' in this.props.message && (
                <span
                  className={`mt-2 diplayalign ${
                    this.state.errors.file ? 'errors' : ''
                  }`}
                >
                  {this.props.template === 'Modal' ? (
                    <div className='attachment '>
                      <div className='upload-btn-wrapper'>
                        <div className='dropbox-container'>
                          <img
                            className='upload-icon'
                            src={Cloud}
                            alt='Browse file'
                          />
                          <p>Drag & Drop Files here</p>
                          <p>or</p>
                        </div>
                        <input
                          type='file'
                          ref={(ref) => (this.upload = ref)}
                          accept={this.props.message.upload.accept}
                          name='myfile'
                          onChange={(e) => {
                            this.handleModalFiles(e.target.files);
                          }}
                        />
                        <button
                          className='upload_btn'
                          onClick={() => {
                            this.upload.click();
                          }}
                        >
                          BROWSE FILE
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='attachment'>
                      <div className='upload-btn-wrapper'>
                        <button
                          className='upload_btn'
                          onClick={() => {
                            this.upload.click();
                          }}
                        >
                          <img
                            className='upload-icon'
                            src={Cloud}
                            alt='Upload file'
                          />
                          Upload a file
                        </button>
                        <input
                          type='file'
                          ref={(ref) => (this.upload = ref)}
                          accept={this.props.message.upload.accept}
                          name='myfile'
                          onChange={(e) => {
                            this.setState({ files: e.target.files });
                            this.setState({ errors: { file: false } });
                          }}
                        />
                      </div>
                      <button
                        onClick={this.handleFiles}
                        className='btn_trans_block '
                      >
                        Done
                      </button>
                    </div>
                  )}
                </span>
              )}

              {'select' in this.props.message && (
                <div
                  className={`mt-2 diplayalign ${
                    this.state.errors.dropdown ? 'errors' : ''
                  }`}
                >
                  {/* <Dropdown
                    id='chat-dropdown'
                    options={this.props.message.select.options}
                    value={this.props.message.select.value}
                    labelField={this.props.message.select.labelField}
                    valueField={this.props.message.select.valueField}
                    onChange={this.dropDownOnChange}
                  /> */}

                  <Autocomplete
                    options={this.props.message.select.options}
                    labelField={this.props.message.select.labelField}
                    valueField={this.props.message.select.valueField}
                    onChange={this.dropDownOnChange}
                  ></Autocomplete>

                  <datalist id='cities'></datalist>

                  <button
                    onClick={this.dropDownOnSubmit}
                    className='btn_trans_block '
                  >
                    Done
                  </button>
                </div>
              )}

              {'checkbox' in this.props.message && (
                <div className='mt-2 checkbox-container diplayalign'>
                  <CheckboxContainer
                    id='chat-checkbox-container'
                    options={this.props.message.checkbox}
                    onChange={this.checkboxSubmit}
                  />
                </div>
              )}
              <div className='currenttime'>{this.getCurrentTime()}</div>
            </div>
          </div>
          {/* {this.props.message.lastmessage === true && (
            <div className='chatstimes'>
              <span className='timeStamp'>1:35 AM</span>
            </div>
          )} */}
        </li>
      );
  }
}
export default ChatBubble;
