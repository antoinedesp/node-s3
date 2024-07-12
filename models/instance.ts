import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('project3', 'project3', 'project3pwd', {
    host: 'localhost',
    dialect: 'mysql',
  });

  export default sequelize;