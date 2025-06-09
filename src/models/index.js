'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config');
const basename = path.basename(__filename);

const db = {};

// Initialize Sequelize using config
const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
        host: config.db.host,
        dialect: config.db.dialect || 'postgres',
        logging: false, // disable logging or set to console.log for debugging
    }
);

// Dynamically import all models
fs.readdirSync(__dirname)
    .filter(
        (file) =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
    )
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

// Apply model associations if defined
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Export the sequelize instance and db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
