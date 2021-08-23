function productos(sequelize, DataTypes){
    const alias = "productos"
    const cols = {
        id:{
            type: DataTypes.INTEGER(10).UNSIGNED, 
            primaryKey: true, 
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        categoria:{
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        imagen: {
            type: DataTypes.STRING(45),
            allowNull: false,
        }
    }

    const config = {
        tableName: "productos",
        timestamps: false

    }

const productos = sequelize.define(alias, cols, config);
productos.belongsToMany(models.usuarios, {
    as: 'usuarios',
    through: 'compras',
    foreignKey: 'idProducto',
    otherKey: 'idUsuario',
    timestamps: true
});
return productos ;
}

module.exports = productos