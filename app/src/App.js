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
            isDataLoaded: false
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
        fetch('http://52.56.44.112/api/current-moods')
            .then(results => {
                if (results.status === 200) {
                    return results.json();
                } else {
                    return null;
                }
            })
            .then(data => {
                if (data != null) {
                    console.log(data);

                    const { commonMoodName, moodSummary } = data;
                    const personList = data.facialAttributes;

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
    }

    render() {
        const { appStore, iconClassName, navigationClassName, isDataLoaded } = this.state;
        const { commonMoodName } = appStore;
        return (
            <Router>
                <AppContext.Provider value={appStore}>
                    <div className={`App bg-${commonMoodName}`}>
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
