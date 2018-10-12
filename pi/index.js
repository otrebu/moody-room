const { exec } = require('child_process');
const util = require('util');
const FormData = require('form-data');
const http = require('http');
const fs = require('fs');
const FormData = require('form-data');

const execAsync = util.promisify(exec);
const unlinkAsync = util.promisify(fs.unlink);

const main = async () => {
    const pictureName = `${Date.now()}.jpg`;
    const pictureFolderPath = '/home/pi/Pictures';
    const pictureFullPath = `${path}/${pictureName}`;
    const takePictureCommand = `raspistill -o "${pictureFullPath}"`;

    try {
        const response = await execAsync(takePictureCommand);

        const form = new FormData();
        form.append('file', fs.createReadStream(pictureFullPath));

        const options = {
            port: 8080,
            path: '52.56.44.112/picture-receiver',
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

        form.pipe(request);

        request.on('response', response => {
            console.log(response.statusCode);
            if (response.statusCode === 200) {
                await unlinkAsync(pictureFullPath);
                console.log(`${pictureFullPath} was deleted`);
            }
        });

    } catch (error) {
        console.log(error);
    }
};

main();
