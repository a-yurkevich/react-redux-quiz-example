import React from 'react';
import './Button.scss';

const Button = props => {
  const classes = ['Button', props.type];

  return (
    <button
      onClick={props.onClick}
      className={classes.join(' ')}
      disabled={props.disabled || false}
    >
      {props.children}
    </button>
  );
};

export default Button;
