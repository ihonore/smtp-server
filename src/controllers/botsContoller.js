const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

export class BotsController {
    runBot(req, res) {

        let botPath = req.query.botPath;
        const fileType = req.query.fileType || 'csv';

        if (!botPath.endsWith('/')) {
            botPath += '/';
        }

        // const command = botPath + 'rtila-cli-win.exe';
        const command = botPath + 'rtila-cli-linux.sh';

        const { exec } = require('child_process');
        const options = {
            cwd: botPath,
            // timeout: 5000,
        };

        // Create the child process
        const child = exec(command, options, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`);
                res.status(500).send(`Error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);


            // List files in the botPath directory
            fs.readdir(botPath, (err, files) => {
                if (err) {
                    console.error(`Error listing files: ${err}`);
                    res.status(500).send(`Error listing files: ${err}`);
                    return;
                }

                // Filter for files based on fileType
                const filteredFiles = files.filter((file) => {
                    if (fileType === 'json') {
                        return path.extname(file).toLowerCase() === '.json';
                    } else if (fileType === 'csv') {
                        return path.extname(file).toLowerCase() === '.csv';
                    }
                    return false;
                });

                filteredFiles.sort((a, b) => {
                    return fs.statSync(botPath + b).mtime.getTime() - fs.statSync(botPath + a).mtime.getTime();
                });

                if (filteredFiles.length > 0) {
                    const latestFile = filteredFiles[filteredFiles.length - 1];
                    const filePath = path.join(botPath, latestFile);

                    if (fileType === 'json') {
                        fs.readFile(filePath, 'utf8', (readErr, data) => {
                            if (readErr) {
                                console.error(`Error reading JSON file: ${readErr}`);
                                res.status(500).send(`Error reading JSON file: ${readErr}`);
                                return;
                            }
                            const jsonData = JSON.parse(data);
                            res.status(200).json({status:200,data:jsonData});
                        });
                    } else if (fileType === 'csv') {
                        const results = [];
                        fs.createReadStream(filePath)
                            .pipe(csv())
                            .on('data', (data) => results.push(data))
                            .on('end', () => {
                                res.status(200).json({status:200,data:results});
                            });
                    }
                } else {
                    res.status(404).send(`No ${fileType.toUpperCase()} files found in the directory.`);
                }
            });
        });

        child.stdin.write('\n');
        child.stdin.end();

    }

}