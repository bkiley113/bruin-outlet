import fs from 'fs';
import readline from 'readline-sync';

let dbkey = await String(readline.question("Enter DB key: "));
updateEnv("DB_URI", dbkey);
let emailPass = await String(readline.question("Enter email app key: "));
updateEnv("AUTH_PASS", emailPass);

function updateEnv(key, value) {
    //read contents of .env
    fs.readFile('.env', 'utf8', (err, text) => {
        if (key.trim().length === 0 ){
            console.error('Empty key.');
            return;
        }
        if (err) {
            console.error('Error reading .env file:', err);
            return;
        };
    //split env variables into newlines
    const vars = text.split('\n');
    let varExists = false;
    //go through all lines. If key is found, update its value to $value
    for (let i=0; i<vars.length; i++) {
        if (vars[i].startsWith(`${key}=`)) {
            vars[i] = `${key}=${value}`;
            varExists = true;
            break;
        }
    }
    //if variable not in env file, create it 
    if (!varExists)
        vars.push(`${key}=${value}`);
    //update .env with new variables
    fs.writeFile('.env', vars.join('\n'), 'utf-8', (err => {
        if (err)
            console.error('Error updating .env file: ', err);
        else
            console.log('.env file successfully set.')
    }))
    }
    )
}