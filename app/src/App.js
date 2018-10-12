import React, { Component } from "react";
import { SiteHeader } from "./components/shared/SiteHeader";
import { Menu } from "./components/shared/Menu";
import { Themes } from "./themes/Themes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationClassName: "",
      menuIconClassName: Themes.menuOpenClassName
    };

    this.toggleNavigation = () => {
      this.setState(state => ({
        navigationClassName:
          state.navigationClassName === Themes.navigationOpenClassName
            ? ""
            : Themes.navigationOpenClassName,

        menuIconClassName:
          state.navigationClassName === Themes.navigationOpenClassName
            ? Themes.menuOpenClassName
            : Themes.menuCloseClassName
      }));
    };
  }

  render() {
    return (
      <div className="App bg-happy">
        <SiteHeader
          changeTheme={this.toggleNavigation}
          menuIconClassName={this.state.menuIconClassName}
        />
        <Menu navigationClass={this.state.navigationClassName} />
      </div>
    );
  }
}

export default App;
