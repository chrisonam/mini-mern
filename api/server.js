const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// expressjson for json format 
app.use(express.json());
// Bypasses some error from react app
app.use(cors());