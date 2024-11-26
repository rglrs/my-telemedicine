const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./userModel');
const Doctor = require('./doctorModel');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'declined'), // Pastikan nilai enum benar
    allowNull: false,
    defaultValue: 'pending',
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Doctor,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Menambahkan relasi antara Appointment dan Doctor, serta User
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });
Appointment.belongsTo(User, { as: 'Patient', foreignKey: 'patientId' });
Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });
User.hasMany(Appointment, { foreignKey: 'patientId' });

module.exports = Appointment;
