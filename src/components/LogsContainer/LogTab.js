import React, { Component } from 'react';
import './LogTab.css';

class LogTab extends Component {
  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }

  render() {
    const { 
      onClick,
      props: {
        activeTab,
        label,
      },
    } = this;

    let className = 'tabs-nav__btn waves-effect waves-light';

    if (activeTab === label) {
      className += ' tabs-nav__btn_active';
    }

    return (
      <li>
        <button 
            type='button'
            onClick={onClick} 
            className={className}>{label}</button>
      </li>
    );
  }
}


export default LogTab;