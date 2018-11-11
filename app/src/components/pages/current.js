import React from 'react';
import { PersonListing } from '../person/Listing';
import { AppContext } from '../../Contexts/AppContext';

export class Current extends React.Component {
    render() {
        return (
            <AppContext.Consumer>
                {appStore => {
                    let { moodSummary } = appStore;
                    const happy = moodSummary.filter(mood => mood.name === 'happy')[0];
                    const happyCount = happy ? happy.count : 0;

                    const sad = moodSummary.filter(mood => mood.name === 'sad')[0];
                    const sadCount = sad ? sad.count : 0;
                    moodSummary = moodSummary
                        .map(mood => {
                            if (mood.name !== 'happy' && mood.name !== 'sad') {
                                return mood;
                            }
                            return null;
                        })
                        .filter(mood => mood);
                    return (
                        <div>
                            <div className="title-container">
                                <h2>Current Moods</h2>
                            </div>

                            <div className="content-container">
                                <div>
                                    <span className="smiley-tag">Happy: {happyCount}</span>
                                    <span className="smiley-tag">Sad: {sadCount}</span>
                                    {moodSummary.map(mood => (
                                        <span key={mood.name} className="smiley-tag">
                                            {mood.name}: {mood.count}
                                        </span>
                                    ))}
                                </div>
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
