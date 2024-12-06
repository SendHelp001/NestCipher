function vigenereEncrypt(plaintext, key) {  
    let repeatedKey = (key.repeat(Math.ceil(plaintext.length / key.length))).slice(0, plaintext.length);  
    let ciphertext = "";  

    for (let i = 0; i < plaintext.length; i++) {  
        let pChar = plaintext[i].toUpperCase();  
        let kChar = repeatedKey[i].toUpperCase();  
        
        if (pChar >= 'A' && pChar <= 'Z') {  
            let shift = kChar.charCodeAt(0) - 'A'.charCodeAt(0);  
            let encryptedChar = String.fromCharCode((pChar.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % 26 + 'A'.charCodeAt(0));  
            ciphertext += encryptedChar;  
        } else {  
            ciphertext += pChar; // Non-alphabetic characters are not changed  
        }  
    }  

    return ciphertext;  
}  

function vigenereDecrypt(ciphertext, key) {  
    let repeatedKey = (key.repeat(Math.ceil(ciphertext.length / key.length))).slice(0, ciphertext.length);  
    let decryptedMessage = "";  

    for (let i = 0; i < ciphertext.length; i++) {  
        let cChar = ciphertext[i].toUpperCase();  
        let kChar = repeatedKey[i].toUpperCase();  
        
        if (cChar >= 'A' && cChar <= 'Z') {  
            let shift = kChar.charCodeAt(0) - 'A'.charCodeAt(0);  
            let decryptedChar = String.fromCharCode((cChar.charCodeAt(0) - 'A'.charCodeAt(0) - shift + 26) % 26 + 'A'.charCodeAt(0));  
            decryptedMessage += decryptedChar;  
        } else {  
            decryptedMessage += cChar; // Non-alphabetic characters are not changed  
        }  
    }  

    return decryptedMessage;  
}  

function showSteps(steps) {  
    const stepsDiv = document.getElementById('steps');  
    stepsDiv.innerHTML = '';  
    steps.forEach(step => {  
        const p = document.createElement('p');  
        p.textContent = step;  
        stepsDiv.appendChild(p);  
    });  
}  

document.getElementById('encryptBtn').addEventListener('click', () => {  
    const plaintext = document.getElementById('plaintext').value;  
    const key = document.getElementById('key').value;  
    
    if (plaintext && key) {  
        const ciphertext = vigenereEncrypt(plaintext, key);  
        document.getElementById('result').textContent = `Encrypted Message: ${ciphertext}`;  
        
        const steps = [  
            `1. Repeated Key: ${key.repeat(Math.ceil(plaintext.length / key.length)).slice(0, plaintext.length)}`,  
            `2. Ciphertext: ${ciphertext}`  
        ];  
        showSteps(steps);  
    } else {  
        alert("Please enter both message and key.");  
    }  
});  

document.getElementById('decryptBtn').addEventListener('click', () => {  
    const ciphertext = document.getElementById('result').textContent.split(": ")[1];  
    const key = document.getElementById('key').value;  
    
    if (ciphertext && key) {  
        const decryptedMessage = vigenereDecrypt(ciphertext, key);  
        document.getElementById('result').textContent = `Decrypted Message: ${decryptedMessage}`;  
        
        const steps = [  
            `1. Repeated Key: ${key.repeat(Math.ceil(ciphertext.length / key.length)).slice(0, ciphertext.length)}`,  
            `2. Decrypted Message: ${decryptedMessage}`  
        ];  
        showSteps(steps);  
    } else {  
        alert("Please enter a key.");  
    }  
});  