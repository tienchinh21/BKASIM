const { Client } = require('ssh2');

function runSSHCommand(command = 'ls -la') {
    const conn = new Client();

    conn.on('ready', () => {
        console.log('SSH Connection ready');

        conn.exec(command, (err, stream) => {
            if (err) throw err;

            stream.on('close', (code, signal) => {
                console.log(`Command closed with code ${code}, signal ${signal}`);
                conn.end();
            }).on('data', (data) => {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).connect({
        host: '14.183.169.204',
        port: 22,
        username: 'chinh',
        password: 'chinh123Az@',
        // privateKey: require('fs').readFileSync('/path/to/id_rsa'),
    });
}

module.exports = runSSHCommand;
