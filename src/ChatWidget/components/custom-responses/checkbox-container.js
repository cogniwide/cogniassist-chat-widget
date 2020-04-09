import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/checkbox-container.scss'
import Checkbox from './checkbox';

class CheckboxContainer extends Component {

    static defaultProps = {
        options: []
      }

    constructor(props) {
        super(props);
        this.state = {
            checkedItems: new Map(),
          }      
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        console.log(this.state)
    }

    findCheckboxItem(id){
        return this.props.options.find(o => o.id === id);
    }

    onSubmit(){
        
        var titles = []
        var payloads = []

        this.state.checkedItems.forEach((k,v)=>{
            if(v){
                const item = this.findCheckboxItem(v)
                titles.push(item.title)
                payloads.push(item.id)

            }
        } )
        
        const title = titles.join(", ")
        const payload = payloads.join(", ")
        
        this.props.onChange(title,payload)
    }


      render() {
        return (
            <React.Fragment>
            {
              this.props.options.map(item => (
                <label key={item.id} className="_checkbox_label">
                  <Checkbox name={item.id} checked={this.state.checkedItems.get(item.id)} onChange={this.handleChange} />
                  {item.title}
                </label> 
              ))
            }
            <button onClick={this.onSubmit} className="btn_trans_block ">Done</button>
          </React.Fragment>
        );
      }

}; 

CheckboxContainer.propTypes = {
    options: PropTypes.array.isRequired
};

export default CheckboxContainer
