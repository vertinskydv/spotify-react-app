import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { PropTypes } from 'prop-types';

export const Input = (props) => {
  const { onChange, value, style } = props;
  return <input type="text" value={value} className={css(SS.input, style)} onChange={onChange} />;
};

const SS = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderWidth: 0,
    backgroundColor: 'hsla(0,0%,100%,.8);',
    outline: 'none',
    padding: '10px 15px',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 1.5,
  },
});

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  style: PropTypes.object,
};

Input.defaultProps = {
  value: '',
  style: {},
};
