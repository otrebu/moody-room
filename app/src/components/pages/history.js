import React from 'react';
import { PersonListing } from '../person/Listing';

export class History extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hiddenClass: 'hidden',
            personList: [],
            timer: null
        };
    }

    componentDidMount() {
        // get data
        const moodsInTime = [
            {
                currentMoods: {
                    happy: 1
                },
                personList: [
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
                    }
                ]
            },
            {
                currentMoods: {
                    happy: 1
                },
                personList: [
                    {
                        mood: 'confused',
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
                    }
                ]
            },
            {
                currentMoods: {
                    happy: 1
                },
                personList: [
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
                        mood: 'disgusted',
                        facialAttributes: {
                            hasBeard: false,
                            hasMoustache: true,
                            hasSunglasses: false,
                            hasGlasses: false
                        }
                    }
                ]
            },
            {
                currentMoods: {
                    happy: 1
                },
                personList: [
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
                ]
            },
            {
                currentMoods: {
                    happy: 1
                },
                personList: [
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
                        mood: 'calm',
                        facialAttributes: {
                            hasBeard: false,
                            hasMoustache: false,
                            hasSunglasses: true,
                            hasGlasses: false
                        }
                    }
                ]
            },
            {
                currentMoods: {
                    sad: 4
                },
                personList: [
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
                ]
            }
        ];
        let currentPersonListIndex = 0;

        const updatePersonList = listIndex => {
            console.log(
                'currentPersonListIndex ',
                currentPersonListIndex,
                'moodsInTime',
                moodsInTime.length,
                currentPersonListIndex <= moodsInTime.length
            );

            if (currentPersonListIndex < moodsInTime.length) {
                console.log('updated personList', moodsInTime[listIndex].personList);
                this.setState({
                    personList: moodsInTime[listIndex].personList
                });
            } else {
                currentPersonListIndex = 0;
                clearInterval(this.state.timer);
            }
        };

        updatePersonList(currentPersonListIndex);

        // timeout changed my personList till end of the array, then start over?
        this.setState({
            timer: setInterval(function() {
                console.log('timer hit');
                currentPersonListIndex++;
                updatePersonList(currentPersonListIndex);
            }, 5000)
        });
    }

    componentWillUnmount() {
        console.log('state timer before unmount', this.state.timer);
        clearInterval(this.state.timer);
        console.log('timer stopped from component unmount');
    }

    render() {
        const { personList, hiddenClass } = this.state;

        return (
            <div>
                <div className="title-container">
                    <h2>History</h2>
                </div>
                <div className={`content-container ${hiddenClass}`}>
                    {personList ? <PersonListing personList={personList} /> : null}
                </div>
            </div>
        );
    }
}
