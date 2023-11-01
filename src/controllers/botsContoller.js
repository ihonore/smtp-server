
export class BotsController {
    runBot(req, res) {
        const { exec } = require('child_process');
        const command = 'C:/Users/ihono/OneDrive/Documents/RTILA/bots/rtila-cli-win.exe';
        const options = {
            cwd: 'C:/Users/ihono/OneDrive/Documents/RTILA/bots',
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

            res.status(200).json({ message: `Executed ${command}` });
        });
        
        child.stdin.write('\n');
        child.stdin.end();

    }

}