/* Proprietor Script */
import { Proprietor } from "../../bodyGard.js";

export async function readReg() {
    const regDetails = () => {
        const regArray = [];

        // Retrieve input fields
        const name1 = document.querySelector('.name1')?.value || '';
        const name2 = document.querySelector('.name2')?.value || '';
        const email = document.querySelector('.email')?.value || '';
        const passwordF = document.querySelector('.password1')?.value || '';
        const location = document.querySelector('.location')?.value || '';
        const gender = document.querySelector('.gender')?.value || '';
        const phoneNo = document.querySelector('.phoneNo')?.value || '';

        // Determine the registration type
        const regTypeDropdown = document.querySelector('.regType');
        const regType = regTypeDropdown?.value === 'Proprietor' ? 'Proprietor' : (regTypeDropdown.value = 'Proprietor');

        // Push the retrieved values into the array
        regArray.push(name1, name2, email, phoneNo, location, gender, regType, passwordF);

        return regArray;
    };

    return regDetails();
}

export async function newProprietor(regID) {
    const proprietor = new Proprietor(regID);
    const regArray = await readReg();

    async function setProprietor(proprietor, regArray) {
        if (regArray.length >= 8) {
            proprietor.name1 = regArray[0];
            proprietor.name2 = regArray[1];
            proprietor.email = regArray[2];
            proprietor.phoneNo = regArray[3];
            proprietor.dLocation = regArray[4];
            proprietor.gender = regArray[5];
            proprietor.regType = regArray[6];
            proprietor.password = regArray[7];
        } else {
            console.error("Error: regArray doesn't have enough elements.");
        }

        return proprietor;
    }

    async function storeProprietor(proprietor) {
        const proprietorData = {
            name1: proprietor.name1,
            name2: proprietor.name2,
            email: proprietor.email,
            phoneNo: proprietor.phoneNo,
            dLocation: proprietor.dLocation,
            gender: proprietor.gender,
            regType: proprietor.regType,
            password: proprietor.password,
        };

        try {
            const response = await fetch('registrationHandler.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(proprietorData),
            });

            const result = await response.json();
            if (result.success) {
                console.log("Proprietor successfully registered!");
            } else {
                console.error("Error storing proprietor details:", result.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const updatedProprietor = await setProprietor(proprietor, regArray);
    await storeProprietor(updatedProprietor);
}

export async function getProprietors(regType) {
    const totalProprietors = [];

    try {
        const response = await fetch(`registrationHandler.php?RegType=${encodeURIComponent(regType)}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch proprietors. Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
            result.data.forEach((proprietor) => {
                if (proprietor.RegType === regType) {
                    totalProprietors.push(proprietor);
                }
            });
        } else {
            console.warn("No proprietors found or unexpected response format.", result.message);
        }
    } catch (error) {
        console.error("Error fetching proprietors:", error.message);
    }

    return totalProprietors;
}
