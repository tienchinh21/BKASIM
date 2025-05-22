require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to SQL Server');

        await sequelize.sync();
        console.log('Database synchronized');

        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
            console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('DB Connection failed:', error);
        process.exit(1);
    }
})();
