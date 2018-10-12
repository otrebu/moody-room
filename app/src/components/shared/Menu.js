import React from "react";

export class Menu extends React.Component {
  render() {
    const { navigationClass } = this.props;

    return (
      <div>
        <div className={`navigation ${navigationClass}`}>
          <h2>
            <a href="/">Home</a>
          </h2>
          <h2>
            <a href="/current">Current</a>
          </h2>
          <h2>
            <a href="/history">History</a>
          </h2>
          <h2>
            <a href="/people">People</a>
          </h2>
          <h2>
            <a href="/settings">Settings</a>
          </h2>
        </div>
      </div>
    );
  }
}
