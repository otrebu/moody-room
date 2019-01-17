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
    boxen('Starting to analyse the mood in this room...'.rainbow, {
        padding: 1
    })
);

const main = async () => {
    const pictureName = `${Date.now()}.jpg`;
    const pictureFolderPath = '/home/pi/Pictures';
    const pictureFullPath = `${pictureFolderPath}/${pictureName}`;
    const takePictureCommand = `raspistill -o "${pictureFullPath}"`;

    try {
        console.log(
            'About to take a picture. Act normally. If you can'.rainbow
        );

        await execAsync(takePictureCommand);

        console.log('Picture taken, too late to smile now'.rainbow);

        const form = new FormData();

        form.append('file', fs.createReadStream(pictureFullPath));

        form.submit(
            'http://api.moodyroom.space/pi/picture-receiver',
            async (error, response) => {
                await unlinkAsync(pictureFullPath);
                console.log(
                    'The last picture has been deleted. Hopefully.'.rainbow
                );
                console.clear();
                response.resume();
            }
        );
    } catch (error) {
        console.log(`A damn error: ${error}`.red);
    }
};

main();
setInterval(main, 30000);
