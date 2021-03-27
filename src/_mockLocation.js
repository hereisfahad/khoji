import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001;

const getLocation = increment => {
    return {
        timestamp: 1000,
        mocked: true,
        coords: {
            "speed": 0.00044024622184224427,
            "heading": 89.65129852294922,
            "accuracy": 10.793000221252441,
            "altitudeAccuracy": 3,
            "altitude": 170,
            "latitude": 31.4257848 + (increment * tenMetersWithDegrees),
            "longitude": 74.381875 + (increment * tenMetersWithDegrees),
        }
    };
};

let counter = 0;
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    });
    counter++;
}, 1000);
