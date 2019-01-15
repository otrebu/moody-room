import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { SiteHeader } from './shared/SiteHeader';
import { Menu } from './shared/Menu';
import { Themes } from '../Contexts/Themes';
import { AppContext } from '../Contexts/AppContext';
import api from '../data/api';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavigationOpen: Themes.navigation.isOpen,
            navigationClassName: Themes.navigation.container.closedClassName,
            iconClassName: Themes.navigation.icon.closedClassName,
            appStore: {},
            timer: null,
            isDataLoaded: false,
            currentMoodTimer: null
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
        const requestCurrentData = async () => {
            const data = await api.getCurrentStatus();
            if (data) {
                this.setState({
                    appStore: {
                        ...data
                    },
                    isDataLoaded: true
                });
            }
        };

        requestCurrentData();

        this.setState({
            timer: setInterval(() => {
                requestCurrentData();
            }, 15000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        const {
            appStore,
            iconClassName,
            navigationClassName,
            isDataLoaded
        } = this.state;
        const { commonMoodName } = appStore;
        return (
            <Router>
                <AppContext.Provider value={appStore}>
                    <div
                        className={`App bg-${
                            commonMoodName ? commonMoodName : 'unknown'
                        }`}
                    >
                        <SiteHeader
                            toggleNavigation={this.toggleNavigation}
                            iconClassName={iconClassName}
                        />

                        <Menu
                            toggleNavigation={this.toggleNavigation}
                            navigationClass={navigationClassName}
                        />

                        <div className="main-content">
                            {isDataLoaded ? <Routes /> : null}
                        </div>
                    </div>
                </AppContext.Provider>
            </Router>
        );
    }
}

export default App;
