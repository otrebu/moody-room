import React from 'react';
import { PersonListing } from '../person/Listing';
import { AppContext } from '../../Contexts/AppContext';

export class Current extends React.Component {
    render() {
        return (
            <AppContext.Consumer>
                {appStore => {
                    const { moodSummary } = appStore;

                    return (
                        <div>
                            <div className="title-container">
                                <h2>Current Moods</h2>
                            </div>

                            <div className="content-container">
                                {moodSummary.length > 0 ? (
                                    <div>
                                        {moodSummary.map(mood => (
                                            <span
                                                key={mood.name}
                                                className="smiley-tag"
                                            >
                                                {mood.name}: {mood.count}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <span>
                                        No happy people, no sad people, no
                                        people?
                                    </span>
                                )}
                            </div>
                            <div>
                                <PersonListing
                                    personList={appStore.personList}
                                    hideTimestamp={true}
                                />
                            </div>
                        </div>
                    );
                }}
            </AppContext.Consumer>
        );
    }
}
