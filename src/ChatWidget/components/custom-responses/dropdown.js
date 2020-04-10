import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/dropdown.scss'

class Dropdown extends Component {

    static defaultProps = {
        value: null,
        valueField: 'value',
        labelField: 'label',
        onChange: null
      }

    constructor(props) {
        super(props);
        this.state = {
            selected: this.getSelectedFromProps(this.props)
        };
    }
    
    componentWillReceiveProps(nextProps) {
        var selected = this.getSelectedFromProps(nextProps);
        this.setState({
           selected: selected
        });
    }
    
    getSelectedFromProps(props) {
        var selected;
        if (props.value === null && props.options.length !== 0) {
            // selected = props.options[0][props.valueField];
            selected = ""
        } else {
            selected = props.value;
        }
        return selected;
    }

    handleChange(e) {
        if (this.props.onChange) {
            var change = {
              oldValue: this.state.selected,
              value: e.target.value,
              title: e.target.options[e.target.selectedIndex].text
            }
            this.props.onChange(change);
        }
        this.setState({selected: e.target.value});
    }

    render() {
        var self = this;
        var options = self.props.options.map(function(option) {
            return (
                <option key={option[self.props.valueField]} value={option[self.props.valueField]}>
                    {option[self.props.labelField]}
                </option>
            )
        });
        return (
            <select className="select-css" id={this.props.id} 
                    value={this.state.selected} 
                    onChange={this.handleChange.bind(this)}>
                <option disabled key="" value="">Choose</option>
                {options}
            </select>
        )
    }

}; 

Dropdown.propTypes = {
    id: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.oneOfType(
        [
            PropTypes.number,
            PropTypes.string
        ]
    ),
    valueField: PropTypes.string,
    labelField: PropTypes.string,
    onChange: PropTypes.func
};

export default Dropdown
