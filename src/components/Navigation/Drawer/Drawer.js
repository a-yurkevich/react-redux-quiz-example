import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';
import './Drawer.scss';

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClick();
  };

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            onClick={this.clickHandler}
          >{link.label}</NavLink>
        </li>
      );
    });
  }

  render() {
    const classes = [
      'Drawer',
      !this.props.isOpen ? 'close' : ''
    ];

    const links = [
      {to: '/', label: 'List of quizzes', exact: true}
    ];

    if (this.props.isAuthenticated) {
      links.push({to: '/quiz-creator', label: 'Create test', exact: false});
      links.push({to: '/logout', label: 'Logout', exact: false});
    } else {
      links.push({to: '/auth', label: 'Login', exact: false});
    }

    return (
      <div>
        <nav className={classes.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClick}/> : null}
      </div>
    );
  }
}

export default Drawer;
