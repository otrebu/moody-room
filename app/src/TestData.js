import React from 'react';

export const TestData = {
    [
        createPerson("happy", true, false, false, false)
    ]
};

const personObject = {
    mood: 'unknown',
    facialAttributes: {
        hasBeard: false,
        hasMoustache: false,
        hasSunglasses: false,
        hasGlasses: false
    }
};

const createPerson = (mood, hasBeard, hasMoustache, hasSunglasses, hasGlasses) => {
    let newPersonObject = personObject;
    newPersonObject.mood = mood;
    newPersonObject.facialAttributes = {
        hasBeard,
        hasMoustache,
        hasSunglasses,
        hasGlasses
    };
    return newPersonObject;
};
