import React from 'react';
import { PersonListing } from '../person/Listing';
import { Radar, Pie } from 'react-chartjs-2';

export class History extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hiddenClass: 'hidden',
            moodDataList: [],
            personList: [],
            timer: null,
            timelapseDuration: 50,
            moodLabels: [
                'Happy',
                'Sad',
                'Angry',
                'Surprised',
                'Disgusted',
                'Calm',
                'Confused',
                'Unknown'
            ],
            moodTotals: [0, 0, 0, 0, 0, 0, 0, 0]
        };
    }

    async componentDidMount() {
        let currentPersonListIndex = 0;
        let personDataList = [];
        let moodDataList = [];
        const timelapseDuration = this.props.match.params.count || 250;

        const data = await fetch('http://52.56.44.112/api/moods/last/' + timelapseDuration).then(
            results => {
                return results.json();
            }
        );
        if (data != null) {
            personDataList = data.moodTimeFrames;
            moodDataList = data.moodTimestampSummary;
        }

        const updatePersonList = listIndex => {
            if (currentPersonListIndex < personDataList.length) {
                this.setState({
                    personList: personDataList[listIndex]
                });
            } else {
                currentPersonListIndex = 0;
                clearInterval(this.state.timer);
            }
        };

        updatePersonList(currentPersonListIndex);

        this.setState({
            timer: setInterval(function() {
                currentPersonListIndex++;
                updatePersonList(currentPersonListIndex);
            }, timelapseDuration > 50 ? 500 : 1000),
            moodDataList: moodDataList
        });

        const moodTotalData = [0, 0, 0, 0, 0, 0, 0, 0];
        console.log('this.state.moodDataList.length', this.state.moodDataList.length);
        for (let i = 0; i < this.state.moodDataList.length; i++) {
            const mood = moodDataList[i];
            console.log('mood', mood);
            if (mood.name === 'happy') {
                moodTotalData[0] = mood.count;
            }
            if (mood.name === 'sad') {
                moodTotalData[1] = mood.count;
            }
            if (mood.name === 'angry') {
                moodTotalData[2] = mood.count;
            }
            if (mood.name === 'surprised') {
                moodTotalData[3] = mood.count;
            }
            if (mood.name === 'disgusted') {
                moodTotalData[4] = mood.count;
            }
            if (mood.name === 'calm') {
                moodTotalData[5] = mood.count;
            }
            if (mood.name === 'confused') {
                moodTotalData[6] = mood.count;
            }
            if (mood.name === 'unknown') {
                moodTotalData[7] = mood.count;
            }
        }

        this.setState({
            moodTotals: moodTotalData
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        const { personList, hiddenClass, moodTotals, moodLabels } = this.state;
        const timelapseDuration = this.props.match.params.count || 250;

        const timelapseDurationInMinutes = timelapseDuration / 2;
        const chartData = {
            labels: moodLabels,
            datasets: [
                {
                    label: 'Moods',
                    data: moodTotals,
                    backgroundColor: [
                        '#ffff00',
                        '#3366cc',
                        '#ff0000',
                        '#7303c0',
                        '#295e70',
                        '#86dcf9',
                        '#71b280',
                        '#664400'
                    ]
                }
            ],
            borderWidth: 1
        };

        return (
            <div>
                <h2>History</h2>
                <h4>Timelapse of the last {timelapseDurationInMinutes} minutes</h4>

                <div className={`content-container ${hiddenClass}`}>
                    {personList ? <PersonListing personList={personList} /> : null}
                </div>
                <h2>Historical Chart</h2>
                {/* <Radar data={chartData} width={400} height={400} /> */}
                <br />
                <Pie data={chartData} width={400} height={400} />
            </div>
        );
    }
}
