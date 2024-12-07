function caesarEncrypt(plaintext, shift) {  
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  
    let result = "";  

    for (let char of plaintext) {  
        if (alphabet.includes(char)) {  
            const index = (alphabet.indexOf(char) + shift) % 26;  
            result += alphabet[index];  
        } else {  
            result += char;  
        }  
    }  
    return result;  
}  

function caesarDecrypt(ciphertext, shift) {  
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  
    let result = "";  

    for (let char of ciphertext) {  
        if (alphabet.includes(char)) {  
            const index = (alphabet.indexOf(char) - shift + 26) % 26;  
            result += alphabet[index];  
        } else {  
            result += char;  
        }  
    }  
    return result;  
}  

function vigenereEncrypt(plaintext, key) {  
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  
    let ciphertext = "";  
    const repeatedKey = key.repeat(Math.ceil(plaintext.length / key.length)).slice(0, plaintext.length);  

    for (let i = 0; i < plaintext.length; i++) {  
        let pChar = plaintext[i];  
        let kChar = repeatedKey[i];  

        if (alphabet.includes(pChar)) {  
            const shift = alphabet.indexOf(kChar);  
            const index = (alphabet.indexOf(pChar) + shift) % 26;  
            ciphertext += alphabet[index];  
        } else {  
            ciphertext += pChar;  
        }  
    }  
    return ciphertext;  
}  

function vigenereDecrypt(ciphertext, key) {  
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  
    let plaintext = "";  
    const repeatedKey = key.repeat(Math.ceil(ciphertext.length / key.length)).slice(0, ciphertext.length);  

    for (let i = 0; i < ciphertext.length; i++) {  
        let cChar = ciphertext[i];  
        let kChar = repeatedKey[i];  

        if (alphabet.includes(cChar)) {  
            const shift = alphabet.indexOf(kChar);  
            const index = (alphabet.indexOf(cChar) - shift + 26) % 26;  
            plaintext += alphabet[index];  
        } else {  
            plaintext += cChar;  
        }  
    }  
    return plaintext;  
}  

function encrypt(plaintext, vigenereKey) {  
    const caesarKey = vigenereKey.length;  
    const vigenereCiphertext = vigenereEncrypt(plaintext, vigenereKey);  
    const caesarCiphertext = caesarEncrypt(vigenereCiphertext, caesarKey);  
    return { vigenereCiphertext, caesarCiphertext };  
}  

function decrypt(ciphertext, vigenereKey) {  
    const caesarKey = vigenereKey.length;  
    const vigenerePlaintext = vigenereDecrypt(ciphertext, vigenereKey);  
    const finalPlaintext = caesarDecrypt(vigenerePlaintext, caesarKey);  
    return { vigenerePlaintext, finalPlaintext };  
}  

function highlightTable(plaintext, key) {  
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  
    const table = document.getElementById("vigenereTable");  

    // Clear previous highlights  
    Array.from(table.querySelectorAll("td")).forEach(cell => {  
        cell.classList.remove("highlight");  
    });  

    // Filter non-alphabet characters  
    const filteredPlaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, '');  
    const filteredKey = key.toUpperCase().replace(/[^A-Z]/g, '');  

    const repeatedKey = filteredKey.repeat(Math.ceil(filteredPlaintext.length / filteredKey.length)).slice(0, filteredPlaintext.length);  

    for (let i = 0; i < filteredPlaintext.length; i++) {  
        const pChar = filteredPlaintext[i];  
        const kChar = repeatedKey[i];  

        if (alphabet.includes(pChar) && alphabet.includes(kChar)) {  
            const row = document.querySelector(`#vigenereTable .row-${pChar}`);  
            const cell = row.querySelector(`.col-${kChar}`);  
            if (cell) {  
                cell.classList.add("highlight");  
            }  
        }  
    }  
}  

function updateCaesarShiftInfo() {
    const vigenereKey = document.getElementById("vigenereKey").value;
    const shift = vigenereKey.length;
    document.getElementById("caesarShift").textContent = shift;
}

function createVigenereTable() {  
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  
    const tableDiv = document.getElementById("vigenereTable");  
    tableDiv.innerHTML = ""; // Clear previous content  

    const table = document.createElement("table");  

    const headerRow = document.createElement("tr");  
    const emptyCell = document.createElement("th");  
    headerRow.appendChild(emptyCell);  

    for (let char of alphabet) {  
        const th = document.createElement("th");  
        th.textContent = char;  
        headerRow.appendChild(th);  
    }  
    table.appendChild(headerRow);  

    for (let rowChar of alphabet) {  
        const row = document.createElement("tr");  
        row.classList.add(`row-${rowChar}`);  

        const rowHeader = document.createElement("th");  
        rowHeader.textContent = rowChar;  
        row.appendChild(rowHeader);  

        for (let colChar of alphabet) {  
            const td = document.createElement("td");  
            td.textContent = String.fromCharCode(  
                (rowChar.charCodeAt(0) + colChar.charCodeAt(0) - 2 * "A".charCodeAt(0)) % 26 + "A".charCodeAt(0)  
            );  
            td.classList.add(`col-${colChar}`);  
            row.appendChild(td);  
        }  
        table.appendChild(row);  
    }  
    tableDiv.appendChild(table);  
}  

document.getElementById("encryptBtn").addEventListener("click", () => {  
    const plaintext = document.getElementById("plaintext").value.toUpperCase();  
    const vigenereKey = document.getElementById("vigenereKey").value.toUpperCase();  

    if (plaintext && vigenereKey) {  
        const { vigenereCiphertext, caesarCiphertext } = encrypt(plaintext, vigenereKey);  

        document.getElementById("result").textContent = `Final Encrypted Message: ${caesarCiphertext}`;  

        const steps = [  
            `1. Vigenère Cipher Text (Before Caesar): ${vigenereCiphertext}`,  
            `2. Caesar Cipher Text (Final): ${caesarCiphertext}`,  
            `3. Vigenère Key: ${vigenereKey}`,  
            `4. Final Encrypted Message: ${caesarCiphertext}`  
        ];  
        document.getElementById("steps").innerHTML = steps.map(step => `<p>${step}</p>`).join("");  

        highlightTable(plaintext, vigenereKey); // Highlight intersection  
    } else {  
        alert("Please enter a message and Vigenère key.");  
    }  
});  

document.getElementById("vigenereKey").addEventListener("input", updateCaesarShiftInfo);

document.getElementById("decryptBtn").addEventListener("click", () => {  
    const ciphertext = document.getElementById("plaintext").value.toUpperCase();  
    const vigenereKey = document.getElementById("vigenereKey").value.toUpperCase();  
    
    if (ciphertext && vigenereKey) {  
        const { vigenerePlaintext, finalPlaintext } = decrypt(ciphertext, vigenereKey);  

        document.getElementById("result").textContent = `Decrypted Message: ${finalPlaintext}`;  

        const steps = [  
            `1. Vigenère Plaintext: ${vigenerePlaintext}`,  
            `2. Caesar Plaintext: ${finalPlaintext}`,  
            `3. Vigenère Key: ${vigenereKey}`,  
            `4. Final Decrypted Message: ${finalPlaintext}`  
        ];  
        document.getElementById("steps").innerHTML = steps.map(step => `<p>${step}</p>`).join("");  

        highlightTable(vigenerePlaintext, vigenereKey);   
    } else {  
        alert("Please enter a valid encrypted message and Vigenère key.");  
    }  
});  

createVigenereTable();
