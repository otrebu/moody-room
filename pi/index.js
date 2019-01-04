const { exec } = require('child_process');
const util = require('util');
const FormData = require('form-data');
const fs = require('fs');

const execAsync = util.promisify(exec);
const unlinkAsync = util.promisify(fs.unlink);

const main = async () => {
    const pictureName = `${Date.now()}.jpg`;
    const pictureFolderPath = '/home/pi/Pictures';
    const pictureFullPath = `${pictureFolderPath}/${pictureName}`;
    const takePictureCommand = `raspistill -o "${pictureFullPath}"`;

    try {
        await execAsync(takePictureCommand);
        console.log(`Taken picture: ${pictureFullPath}`);

        const form = new FormData();
        form.append('file', fs.createReadStream(pictureFullPath));

        form.submit('http://api.moodyroom.space/pi/picture-receiver', async (error, response) => {
            console.log(response.statusCode);
            if (response.statusCode === 200) {
                await unlinkAsync(pictureFullPath);
                console.log(`${pictureFullPath} was deleted`);
            }
            response.resume();
        });
    } catch (error) {
        console.log(error);
    }
};

setInterval(main, 30000);
