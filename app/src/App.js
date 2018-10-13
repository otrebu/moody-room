import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';
import { SiteHeader } from './components/shared/SiteHeader';
import { Menu } from './components/shared/Menu';
import { Themes } from './themes/Themes';

const AppContext = React.createContext({ commondMood: 'unknown' });

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavigationOpen: Themes.navigation.isOpen,
            navigationClassName: Themes.navigation.container.closedClassName,
            iconClassName: Themes.navigation.icon.closedClassName,
            appStore: {}
        };

        this.toggleNavigation = () => {
            this.setState(state => ({
                isNavigationOpen: state.isNavigationOpen ? false : true,

                navigationClassName: state.isNavigationOpen
                    ? Themes.navigation.container.closedClassName
                    : Themes.navigation.container.openedClassName,

                iconClassName: state.isNavigationOpen
                    ? Themes.navigation.icon.closedClassName
                    : Themes.navigation.icon.openedClassName
            }));
        };
    }

    componentDidMount() {
        const response = {
            moodCount: 2,
            commonMood: 'confused'
        };

        const { moodCount, commonMood } = response;

        this.setState({
            appStore: { commonMood, moodCount }
        });
    }

    render() {
        const { appStore, iconClassName, navigationClassName } = this.state;
        const { commonMood, moodCount } = appStore;
        return (
            <Router>
                <AppContext.Provider value={appStore}>
                    {commonMood ? (
                        <div className={`App bg-${commonMood}`}>
                            <SiteHeader
                                toggleNavigation={this.toggleNavigation}
                                iconClassName={iconClassName}
                            />

                            <Menu
                                toggleNavigation={this.toggleNavigation}
                                navigationClass={navigationClassName}
                            />

                            <div className="main-content">
                                <Routes />
                            </div>
                        </div>
                    ) : null}
                </AppContext.Provider>
            </Router>
        );
    }
}

export default App;
