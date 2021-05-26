const seedTrails = require('./trail-seeds');
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedTrails();
    console.log('\n----- TRAILS SEEDED -----\n');
  
    process.exit(0);
};

seedAll();