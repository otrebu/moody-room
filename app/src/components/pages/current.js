import React from 'react';
import { PersonListing } from '../person/Listing';

export class Current extends React.Component {
    render() {
        const personList = [
            {
                mood: 'unknown',
                facialAttributes: {
                    hasBeard: false,
                    hasMoustache: false,
                    hasSunglasses: false,
                    hasGlasses: false
                }
            },
            {
                mood: 'happy',
                facialAttributes: {
                    hasBeard: true,
                    hasMoustache: false,
                    hasSunglasses: false,
                    hasGlasses: false
                }
            },
            {
                mood: 'confused',
                facialAttributes: {
                    hasBeard: false,
                    hasMoustache: false,
                    hasSunglasses: false,
                    hasGlasses: true
                }
            },
            {
                mood: 'confused',
                facialAttributes: {
                    hasBeard: false,
                    hasMoustache: true,
                    hasSunglasses: false,
                    hasGlasses: true
                }
            },
            {
                mood: 'calm',
                facialAttributes: {
                    hasBeard: false,
                    hasMoustache: false,
                    hasSunglasses: false,
                    hasGlasses: true
                }
            },
            {
                mood: 'disgusted',
                facialAttributes: {
                    hasBeard: false,
                    hasMoustache: true,
                    hasSunglasses: false,
                    hasGlasses: false
                }
            },
            {
                mood: 'angry',
                facialAttributes: {
                    hasBeard: true,
                    hasMoustache: false,
                    hasSunglasses: false,
                    hasGlasses: false
                }
            },
            {
                mood: 'sad',
                facialAttributes: {
                    hasBeard: false,
                    hasMoustache: false,
                    hasSunglasses: true,
                    hasGlasses: false
                }
            }
        ];

        const happyCount = 1;
        const sadCount = 1;
        const angryCount = 1;
        const confusedCount = 1;
        const disgustedCount = 1;
        const surprisedCount = 1;
        const calmCount = 2;
        const unknownCount = 1;

        return (
            <div>
                <div className="title-container">
                    <h2>Current Moods</h2>
                </div>
                <div className="content-container">
                    <span className="smiley-tag">Happy: {happyCount}</span>
                    <span className="smiley-tag">Sad: {sadCount}</span>
                    {angryCount > 0 ? <span className="smiley-tag">Angry: {angryCount}</span> : ''}
                    {confusedCount > 0 ? (
                        <span className="smiley-tag">Confused: {confusedCount}</span>
                    ) : (
                        ''
                    )}
                    {disgustedCount > 0 ? (
                        <span className="smiley-tag">Disgusted: {disgustedCount}</span>
                    ) : (
                        ''
                    )}
                    {surprisedCount > 0 ? (
                        <span className="smiley-tag">Surprised: {surprisedCount}</span>
                    ) : (
                        ''
                    )}
                    {calmCount > 0 ? <span className="smiley-tag">Calm: {calmCount}</span> : ''}
                    {unknownCount > 0 ? (
                        <span className="smiley-tag">Unknown: {unknownCount}</span>
                    ) : (
                        ''
                    )}
                </div>
                <div>
                    <PersonListing personList={personList} isSlider={true} />
                </div>
            </div>
        );
    }
}
