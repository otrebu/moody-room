const { exec } = require('child_process');
const util = require('util');
const FormData = require('form-data');
const fs = require('fs');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const boxen = require('boxen');

const execAsync = util.promisify(exec);
const unlinkAsync = util.promisify(fs.unlink);

console.log(
    boxen('Starting to analyse the mood in this room...'.green, {
        padding: 1
    })
);

const randomPhrase = () => {
    const phrases = [
        'You look great!',
        'You look miserable, I feel sorry for you.',
        'I wish I could do something to help you...',
        'I am sure you will be happy one day!',
        'Wow! Just wow!',
        'Happy crowd!',
        'Mh...'
    ];
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
};

const main = async () => {
    const pictureName = `${Date.now()}.jpg`;
    const pictureFolderPath = '/home/pi/Pictures';
    const pictureFullPath = `${pictureFolderPath}/${pictureName}`;
    const takePictureCommand = `raspistill -o "${pictureFullPath}"`;

    try {
        console.log('About to take a picture. Act normally if you can.'.green);

        await execAsync(takePictureCommand);

        console.log(
            `Picture taken, too late to smile now. ${randomPhrase()}`.green
        );

        const form = new FormData();

        form.append('file', fs.createReadStream(pictureFullPath));

        form.submit(
            'http://api.moodyroom.space/pi/picture-receiver',
            async (error, response) => {
                await unlinkAsync(pictureFullPath);
                console.log(
                    'The last picture has been deleted. Hopefully.'.green
                );

                response.resume();
            }
        );
    } catch (error) {
        console.log(`A damn error: ${error}`.red);
    }

    console.log('...');
    console.log('...');
};

main();
setInterval(main, 30000);
