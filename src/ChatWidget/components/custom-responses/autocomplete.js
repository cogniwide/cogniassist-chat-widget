import React, { useState } from 'react';
import arrowDown from '../../../../public/assets/modal/arrow-down.svg';

function AutoComplete(props) {
  const { labelField, valueField } = props;
  const [text, setText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState((props && props.options) || []);
  const [allOptions, setAllOptions] = useState((props && props.options) || []);

  function searchOption(val) {
    console.log(val);
    if (val !== '') {
      let tempOpt = [...allOptions];
      tempOpt = tempOpt.filter((opt) => {
        return (
          opt[labelField].toLowerCase().includes(val.toLowerCase()) ||
          opt[labelField].toLowerCase().includes(val.toLowerCase())
        );
      });
      setOptions(tempOpt);
    } else if (val == '') {
      setOptions(allOptions);
    }
  }

  function handleChange(title, value) {
    props.onChange({ title: title, value: value });
  }
  return (
    <div className='autocomplete-wrapper'>
      <div className='input-wrapper'>
        <input
          type='text'
          name='autocompleteinput'
          className='autocomplete-input'
          value={text}
          onFocus={() => {
            setShowOptions(true);
          }}
          onChange={(e) => {
            setText(e.target.value);
            searchOption(e.target.value);
          }}
        />
        <img
          src={arrowDown}
          className='input-arrowdown'
          onClick={() => {
            setOptions(allOptions);
            setShowOptions(true);
          }}
        />
      </div>
      {showOptions && (
        <div className='auto-items-wrapper'>
          {options &&
            options.length > 0 &&
            options.map((option) => {
              return (
                <div
                  className='auto-items'
                  onClick={() => {
                    handleChange(option[labelField], option[valueField]);
                    setText(option[labelField]);
                    setShowOptions(false);
                  }}
                >
                  {option[labelField]}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
export default AutoComplete;
