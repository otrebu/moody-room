const { exec } = require('child_process');
const util = require('util');
const FormData = require('form-data');
const http = require('http');
const fs = require('fs');

const execAsync = util.promisify(exec);
const unlinkAsync = util.promisify(fs.unlink);

const main = async () => {
    const pictureName = `${Date.now()}.jpg`;
    const pictureFolderPath = '/home/pi/Pictures';
    const pictureFullPath = `${pictureFolderPath}/${pictureName}`;
    const takePictureCommand = `raspistill -o "${pictureFullPath}"`;

    try {
        const response = await execAsync(takePictureCommand);
        console.log(`Taken picture: ${pictureFullPath}`);

        const form = new FormData();
        form.append('file', fs.createReadStream(pictureFullPath));

        const options = {
            port: 8080,
            hostname: '52.56.44.112',
            path: '/picture-receiver',
            method: 'POST',
            headers: form.getHeaders()
        };

        const request = http.request(options, response => {
            console.log(`STATUS: ${response.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
        });

        request.on('error', e => {
            console.error(`problem with request: ${e.message}`);
        });

        request.on('response', async response => {
            console.log(response.statusCode);
            if (response.statusCode === 200) {
                await unlinkAsync(pictureFullPath);
                console.log(`${pictureFullPath} was deleted`);
            }
        });

        form.pipe(request);
    } catch (error) {
        console.log(error);
    }
};

main();
