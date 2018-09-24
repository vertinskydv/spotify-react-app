import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

export const Button = (props) => {
  const { onClick, children, style } = props;
  return (
    <button
      className={css(SS.button, style)}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

const SS = StyleSheet.create({
  button: {
    color: '#fff',
    backgroundColor: '#1db954',
    borderWidth: 0,
    fontSize: 12,
    lineHeight: 1,
    borderRadius: 500,
    padding: 11,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 9,
    fontFamily: 'inherit',
    outline: 'none',
    transitionProperty: 'background-color,border-color,color,box-shadow,filter',
    transitionDuration: '.3s',

    ':hover': {
      backgroundColor: '#1ed760',
    },
    ':active': {
      backgroundColor: '#1aa34a',
      boxShadow: '0 0 0 2px rgba(0,0,0,.1)inset',
    },
  },
});

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};
