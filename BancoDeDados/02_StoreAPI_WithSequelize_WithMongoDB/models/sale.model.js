import Sequelize from "sequelize";
import db from "../repositories/db.js";
import Product from "./product.model.js";
import Client from "./client.model.js";


const Sale = db.define('sales', {
    saleId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    }, 
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    }
}, { underscored: true });//underscore transforma de camelcase para underscore. Porque no banco de dados está em underline

Sale.belongsTo(Client, { foreignKey: "clientId"})
Sale.belongsTo(Product, { foreignKey: "productId"})

export default Sale;