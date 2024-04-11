import Sequelize from "sequelize";
import db from "../repositories/db.js"

const Supplier = db.define('suppliers', {
    supplierId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, { underscored: true });//underscore transforma de camelcase para underscore. Porque no banco de dados está em underline

export default Supplier;