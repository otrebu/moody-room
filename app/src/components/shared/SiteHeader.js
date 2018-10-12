import React from "react";

export class SiteHeader extends React.Component {
  render() {
    const { changeTheme, menuIconClassName } = this.props;

    return (
      <header>
        <div className="menu-trigger" onClick={changeTheme}>
          <i className={"far " + menuIconClassName} />
        </div>
        <div className="logo">
          <h4>Moody Room</h4>
        </div>
      </header>
    );
  }
}
