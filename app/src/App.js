import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';
import { SiteHeader } from './components/shared/SiteHeader';
import { Menu } from './components/shared/Menu';
import { Themes } from './Contexts/Themes';
import { AppContext } from './Contexts/AppContext';

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
        let requestCurrentData = () =>
            fetch('http://52.56.44.112/api/moods/current/')
                .then(results => {
                    if (results.status === 200) {
                        return results.json();
                    } else {
                        return null;
                    }
                })
                .then(data => {
                    if (data != null) {
                        const { moodSummary } = data;
                        const commonMoodName = data.commonMood ? data.commonMood.name : 'unknown';
                        const personList = data;

                        this.setState({
                            appStore: {
                                commonMoodName,
                                moodSummary,
                                personList
                            },
                            isDataLoaded: true
                        });
                    }
                });

        requestCurrentData();

        this.setState({
            timer: setInterval(function() {
                requestCurrentData();
                console.log('get again');
            }, 15000)
        });
    }

    // componentWillUnmount() {
    //     console.log('main app timer stopped');
    //     clearInterval(this.state.timer);
    // }

    render() {
        const { appStore, iconClassName, navigationClassName, isDataLoaded } = this.state;
        const { commonMoodName } = appStore;
        return (
            <Router>
                <AppContext.Provider value={appStore}>
                    <div className={`App bg-${commonMoodName ? commonMoodName : 'unknown'}`}>
                        <SiteHeader
                            toggleNavigation={this.toggleNavigation}
                            iconClassName={iconClassName}
                        />

                        <Menu
                            toggleNavigation={this.toggleNavigation}
                            navigationClass={navigationClassName}
                        />

                        <div className="main-content">{isDataLoaded ? <Routes /> : null}</div>
                    </div>
                </AppContext.Provider>
            </Router>
        );
    }
}

export default App;
