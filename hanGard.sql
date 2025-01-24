-- Create Hanging Gardens database
CREATE DATABASE IF NOT EXISTS HangingGardens;
USE HangingGardens;

-- Create the main Registration table with common fields
CREATE TABLE Registration (
    RegID INT AUTO_INCREMENT PRIMARY KEY,
    Name1 VARCHAR(255) NOT NULL,
    Name2 VARCHAR(255) NOT NULL,
    PhoneNo VARCHAR(15) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Gender ENUM('Male', 'Female'),
    RegType ENUM('Admin', 'Customer', 'Farmer', 'Landlord', 'Proprietor', 'Money Lender', 'Sacco') NOT NULL,
    dLocation ENUM('Nairobi CBD', 'Westlands', 'Karen', 'Langata', 'Kilimani', 'Eastleigh', 'Umoja', 'Parklands', 'Ruiru', 'Ruai', 'Gikambura', 'Kitengela', 'Nairobi West', 'Nairobi East'),
    accStatus ENUM('Pending', 'Approved', 'Inactive') DEFAULT 'Pending',
    lastAccessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Individual tables for each RegType to store additional details

-- Farmer table with Type field for livestock or crop
CREATE TABLE Farmer (
    FarmerID INT PRIMARY KEY,
    Type ENUM('Livestock', 'Crop') NOT NULL,
    FOREIGN KEY (FarmerID) REFERENCES Registration(RegID)
);

-- Customer table
CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
    PreferredCropType VARCHAR(255),
    FOREIGN KEY (CustomerID) REFERENCES Registration(RegID)
);

-- Landlord table
CREATE TABLE Landlord (
    LandlordID INT PRIMARY KEY,
    PropertyLocation VARCHAR(255),
    FOREIGN KEY (LandlordID) REFERENCES Registration(RegID)
);

-- Proprietor table
CREATE TABLE Proprietor (
    ProprietorID INT PRIMARY KEY,
    BusinessName VARCHAR(255),
    FOREIGN KEY (ProprietorID) REFERENCES Registration(RegID)
);

-- Money Lender table
CREATE TABLE MoneyLender (
    LenderID INT PRIMARY KEY,
    LicenseNo VARCHAR(255) UNIQUE,
    FOREIGN KEY (LenderID) REFERENCES Registration(RegID)
);

-- Bank table
CREATE TABLE Bank (
    BankID INT PRIMARY KEY,
    BankName VARCHAR(255),
    FOREIGN KEY (BankID) REFERENCES Registration(RegID)
);


-- Deposit table for handling STK transactions
CREATE TABLE Deposit (
    DepositID INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID INT,
    Amount DECIMAL(10, 2) NOT NULL,
    TransactionID VARCHAR(255) UNIQUE NOT NULL,
    TransactionStatus ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending',
    TransactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CustomerID) REFERENCES Registration(RegID)
);
--Payment Table
CREATE TABLE Payment (
    PayId INT AUTO_INCREMENT PRIMARY KEY,
    RegId INT,
    Name1 VARCHAR(255),
    Name2 VARCHAR(255),
    Email VARCHAR(255),
    PayDate DATE,
    PayStatus ENUM('Pending', 'Paid', 'Cancelled'),
    FOREIGN KEY (RegId) REFERENCES Registration(RegID) ON DELETE CASCADE
);

-- Reports table for recording transactions and other analytics
CREATE TABLE Reports (
    ReportID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    ReportType ENUM('Finances', 'Accounts') NOT NULL,
    Details TEXT,
    ReportDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Registration(RegID)
);

-- Auxiliary Contact table
CREATE TABLE Contact (
    PhoneNo VARCHAR(15),
    EmailAddress VARCHAR(255),
    Instagram VARCHAR(255),
    Facebook VARCHAR(255),
    POBox VARCHAR(255)
);
CREATE TABLE About (
    Detail TEXT
);
-- Auxiliary Feedback table
CREATE TABLE Feedback (
    FeedbackID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Comments TEXT,
	Response TEXT,
    FeedbackDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Registration(RegID)
);
CREATE TABLE RegStats (
    StatID INT AUTO_INCREMENT PRIMARY KEY,
    RegType ENUM('Pending', 'Approved', 'Inactive'),
    Month VARCHAR(20),
    Year INT,
    Count INT
);

-- Finances table
CREATE TABLE Finances (
    FinanceID INT AUTO_INCREMENT PRIMARY KEY,
    RegID INT,
    Name1 VARCHAR(255) NOT NULL,
    Name2 VARCHAR(255) NOT NULL,
    PhoneNo VARCHAR(15) NOT NULL,
    Balance INT,
    FOREIGN KEY (RegID) REFERENCES Registration(RegID)
);

-- Transaction table
CREATE TABLE Transaction (
    TransactionID INT AUTO_INCREMENT PRIMARY KEY,
    RegID INT,
    FinanceID INT,
    Name1 VARCHAR(255) NOT NULL,
    Name2 VARCHAR(255) NOT NULL,
    PhoneNo VARCHAR(15) NOT NULL,
    Amount INT,
    FOREIGN KEY (RegID) REFERENCES Registration(RegID),
    FOREIGN KEY (FinanceID) REFERENCES Finances(FinanceID)
);
-- Produce table
CREATE TABLE Produce (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    FarmerID INT,
    Type ENUM('Livestock', 'Crop') NOT NULL,
    Quality ENUM('Best', 'Good'),
    Price INT,
    SaleStatus ENUM('Unsold','sold'),
    FOREIGN KEY (FarmerID) REFERENCES Farmer(FarmerID)
);