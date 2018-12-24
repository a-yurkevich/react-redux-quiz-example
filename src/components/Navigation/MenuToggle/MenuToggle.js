import React from 'react';
import './MenuToggle.scss';

const MenuToggle = props => {
  const classes = [
    'MenuToggle',
    'fa',
    props.isOpen ? 'fa-times open' : 'fa-bars'
  ];

  return (
    <i
      className={classes.join(' ')}
      onClick={props.onToggle}
    />
  );
};

export default MenuToggle;
