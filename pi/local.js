const { exec } = require('child_process');
const util = require('util');
const FormData = require('form-data');
const http = require('http');
const fs = require('fs');

const main = async () => {
    const pictureName = 'Sanka.hakuu.jpg';
    const pictureFolderPath = '/home/nemo/Pictures';
    const pictureFullPath = `${pictureFolderPath}/${pictureName}`;

    try {
        const fileStream = fs.createReadStream(pictureFullPath);

        const form = new FormData();

        form.append('file', fileStream);

        form.submit('http://localhost:8080/pi/picture-receiver', (error, response) => {
            console.log(`STATUS: ${response.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
            response.resume();
        });
    } catch (error) {
        console.log(error);
    }
};

main();
