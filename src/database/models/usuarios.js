function usuarios(sequelize, DataTypes){
    const alias = "usuarios"
    const cols = {
        id:{
            type: DataTypes.INTEGER(100).UNSIGNED, 
            primaryKey: true, 
            autoIncrement: true,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,            
        },
        admin:{
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
        password: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        imagen: {
            type: DataTypes.STRING(5000),
            allowNull: false,
        }
    }
    
    const config = {
        tablename: "usuarios",
        timestamps: false

    }

const usuarios = sequelize.define(alias, cols, config) 
usuarios.associate = function(models) {
    usuarios.belongsToMany(models.productos, {
        as: 'productos',
        through: 'compras',
        foreignKey: 'idUsuario',
        otherKey: 'idProducto',
        timestamps: true
    });
}

return usuarios
}

module.exports = usuarios
