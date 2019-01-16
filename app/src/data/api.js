//const baseUrl = 'http://api.moodyroom.space';
const baseUrl = 'http://localhost:8080';

const getJson = async apiEndPoint =>
    (await fetch(`${baseUrl}${apiEndPoint}`)).json();

const getCurrentStatus = async () => {
    const apiEndPoint = '/api/moods/current/';
    const data = await getJson(apiEndPoint);

    if (data != null) {
        const { moodSummary } = data;
        const commonMoodName = data.commonMood
            ? data.commonMood.name
            : 'unknown';
        const personList = data;

        return {
            moodSummary,
            commonMoodName,
            personList
        };
    }

    return null;
};

const getMoodsHistory = async timelapseDuration => {
    const apiEndPoint = `/api/moods/last/${timelapseDuration}`;
    const data = await getJson(apiEndPoint);

    if (data != null) {
        return data.moodTimeFrames;
    }
    return null;
};

const getHackathon = async () => {
    const apiEndPoint = '/api/moods/hackathon/';
    const data = await getJson(apiEndPoint);

    if (data != null) {
        return data.moodTimeFrames;
    }
    return null;
};

const api = {
    getCurrentStatus,
    getMoodsHistory,
    getHackathon
};

export default api;
