/* Customer Script */
import { Customer } from "../../bodyGard.js";

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
        const regType = regTypeDropdown?.value === 'Customer' ? 'Customer' : (regTypeDropdown.value = 'Customer');

        // Push the retrieved values into the array
        regArray.push(name1, name2, email, phoneNo, location, gender, regType, passwordF);

        return regArray;
    };

    return regDetails();
}

export async function newCustomer(regID) {
    const customer = new Customer(regID);
    const regArray = await readReg();

    async function setCustomer(customer, regArray) {
        if (regArray.length >= 8) {
            customer.name1 = regArray[0];
            customer.name2 = regArray[1];
            customer.email = regArray[2];
            customer.phoneNo = regArray[3];
            customer.dLocation = regArray[4];
            customer.gender = regArray[5];
            customer.regType = regArray[6];
            customer.password = regArray[7];
        } else {
            console.error("Error: regArray doesn't have enough elements.");
        }

        return customer;
    }

    async function storeCustomer(customer) {
        const customerData = {
            name1: customer.name1,
            name2: customer.name2,
            email: customer.email,
            phoneNo: customer.phoneNo,
            dLocation: customer.dLocation,
            gender: customer.gender,
            regType: customer.regType,
            password: customer.password,
        };

        try {
            const response = await fetch('registrationHandler.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerData),
            });

            const result = await response.json();
            if (result.success) {
                console.log("Customer successfully registered!");
            } else {
                console.error("Error storing customer details:", result.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const updatedCustomer = await setCustomer(customer, regArray);
    await storeCustomer(updatedCustomer);
}

export async function getCustomers(regType) {
    const totalCustomers = [];

    try {
        const response = await fetch(`registrationHandler.php?RegType=${encodeURIComponent(regType)}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch customers. Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
            result.data.forEach((customer) => {
                if (customer.RegType === regType) {
                    totalCustomers.push(customer);
                }
            });
        } else {
            console.warn("No customers found or unexpected response format.", result.message);
        }
    } catch (error) {
        console.error("Error fetching customers:", error.message);
    }

    return totalCustomers;
}

export async function thisCustomer(totalCustomers, regID){
    const totalCustomers = await getCustomers();
}