import { MODEL } from '../constants';
import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  const device = sequelize.define(MODEL.DEVICE, {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    ip: {
      type: DataTypes.STRING,
    },
    key: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  });

  return device;
};
