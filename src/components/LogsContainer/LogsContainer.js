import React, { Component } from 'react';
import './LogsContainer.css';

import LogTab from './LogTab';

class LogsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <section className="logs-container">
        <ul className="tabs-nav z-depth-3">
          {children.map((child) => {
            const { label } = child.props;

            return (
              <LogTab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ul>
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </section>
    );
  }
}

export default LogsContainer;