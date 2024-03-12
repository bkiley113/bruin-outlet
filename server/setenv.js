import fs from 'fs';

console.log('here');
updateEnv("DB_URI", "mongodb+srv://matthewk8:ii8M66Jp3SCk0HQ8@uclastore.lmtqaex.mongodb.net/?retryWrites=true");

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