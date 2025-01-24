// bodyGard.js

// Base Registration class
class Registration {
    constructor(regID, name, phoneNo, email, password, gender, regType, dLocation, accStatus = 'Pending', lastAccessed = new Date()) {
        this.regID = regID;
        this.name = name;
        this.phoneNo = phoneNo;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.regType = regType;
        this.dLocation = dLocation;
        this.accStatus = accStatus;
        this.lastAccessed = lastAccessed;
    }

    // Method to update last accessed timestamp
    updateLastAccessed() {
        this.lastAccessed = new Date();
    }
}

// Farmer class extending Registration
class Farmer extends Registration {
    constructor(regID, name, phoneNo, email, password, gender, dLocation, accStatus, lastAccessed, type) {
        super(regID, name, phoneNo, email, password, gender, 'Farmer', dLocation, accStatus, lastAccessed);
        this.type = type; // Enum: 'Livestock' or 'Crop'
    }
}

// Customer class extending Registration
class Customer extends Registration {
    constructor(regID, name, phoneNo, email, password, gender, dLocation, accStatus, lastAccessed, preferredCropType = null) {
        super(regID, name, phoneNo, email, password, gender, 'Customer', dLocation, accStatus, lastAccessed);
        this.preferredCropType = preferredCropType;
    }
}

// Landlord class extending Registration
class Landlord extends Registration {
    constructor(regID, name, phoneNo, email, password, gender, dLocation, accStatus, lastAccessed, propertyLocation = null) {
        super(regID, name, phoneNo, email, password, gender, 'Landlord', dLocation, accStatus, lastAccessed);
        this.propertyLocation = propertyLocation;
    }
}

// Proprietor class extending Registration
class Proprietor extends Registration {
    constructor(regID, name, phoneNo, email, password, gender, dLocation, accStatus, lastAccessed, businessName = null) {
        super(regID, name, phoneNo, email, password, gender, 'Proprietor', dLocation, accStatus, lastAccessed);
        this.businessName = businessName;
    }
}

// MoneyLender class extending Registration
class MoneyLender extends Registration {
    constructor(regID, name, phoneNo, email, password, gender, dLocation, accStatus, lastAccessed, licenseNo = null) {
        super(regID, name, phoneNo, email, password, gender, 'Money Lender', dLocation, accStatus, lastAccessed);
        this.licenseNo = licenseNo;
    }
}

// Bank class extending Registration
class Sacco extends Registration {
    constructor(regID, name, phoneNo, email, password, gender, dLocation, accStatus, lastAccessed, saccoName = null) {
        super(regID, name, phoneNo, email, password, gender, 'Sacco', dLocation, accStatus, lastAccessed);
        this.saccoName = saccoName;
    }
}

// Deposit class
class Deposit {
    constructor(depositID, customerID, amount, transactionID, transactionStatus = 'Pending', transactionDate = new Date()) {
        this.depositID = depositID;
        this.customerID = customerID;
        this.amount = amount;
        this.transactionID = transactionID;
        this.transactionStatus = transactionStatus;
        this.transactionDate = transactionDate;
    }

    // Method to update transaction status
    updateTransactionStatus(status) {
        this.transactionStatus = status;
    }
}

// Report class
class Report {
    constructor(reportID, userID, reportType, details, reportDate = new Date()) {
        this.reportID = reportID;
        this.userID = userID;
        this.reportType = reportType; // Enum: 'Transaction', 'UserActivity', 'Performance'
        this.details = details;
        this.reportDate = reportDate;
    }
}

// Contact class
class Contact {
    constructor(contactID, userID, subject, message, status = 'Pending', contactDate = new Date()) {
        this.contactID = contactID;
        this.userID = userID;
        this.subject = subject;
        this.message = message;
        this.status = status;
        this.contactDate = contactDate;
    }

    // Method to update status
    resolveContact() {
        this.status = 'Resolved';
    }
}

// Feedback class
class Feedback {
    constructor(feedbackID, userID, rating, comments, feedbackDate = new Date()) {
        this.feedbackID = feedbackID;
        this.userID = userID;
        this.rating = rating; // Value between 1 and 5
        this.comments = comments;
        this.feedbackDate = feedbackDate;
    }
}

//Produce class
class Produce extends Farmer{
    constructor(regID, name, productID, productType, Quality, Price){
        super(regID, name);
        this.productID = productID;
        this.productType = productType;
        this.Quality = Quality;
        this.Price = Price;
    }
}

// Exporting the classes
module.exports = {
    Registration,
    Farmer,
    Customer,
    Landlord,
    Proprietor,
    MoneyLender,
    Sacco,
    Deposit,
    Report,
    Contact,
    Feedback,
    Produce
};
