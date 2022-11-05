// import * as dotenv from "dotenv"
// dotenv.config()
// import express from 'express'

// const dotenv = require('dotenv');
// dotenv.config();

module.exports = {
    REACT_APP_GATEWAY1: process.env.REACT_APP_GATEWAY1 || 'localhost',
    REACT_APP_GATEWAY1_PORT: process.env.REACT_APP_GATEWAY1_PORT || 5001,
    DOMAIN: process.env.FEDOMAIN || 'localhost',
    FE_PORT: process.env.FEPORT || 3000,
    CLIENT_ID: process.env.CLIENT_ID || "624148654388-pep2rsbqfuscb5mibsh16l3fv1hhlp7e.apps.googleusercontent.com"
}
