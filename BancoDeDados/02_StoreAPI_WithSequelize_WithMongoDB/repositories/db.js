import Sequelize from "sequelize";

const sequelize = new Sequelize(
    "postgres://xcmplidk:n2pWC32Nv1sgPK57dIqseqSgBSyYql5N@bubble.db.elephantsql.com/xcmplidk",
    {
        dialect: "postgres",
        define: {
            timestamps: false
        }
    }
)


export default sequelize;