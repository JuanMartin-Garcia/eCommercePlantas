function compras(sequelize, DataTypes){
    const alias = "compras"
    const cols = {
         id:{
             type: DataTypes.INTEGER(100).UNSIGNED, 
             primaryKey: true, 
             autoIncrement: true,
             allowNull: false,
         },
         factura: {
             type: DataTypes.STRING(45),
             allowNull: false,
         },
         precio_total: {
             type: DataTypes.FLOAT,
             allowNull: true,
         },
         cantidad:{
             type: DataTypes.INTEGER(45),
             allowNull: true, 
         },
       
         idProducto:{
             type: DataTypes.INTEGER,
             allowNull: false,  
            
         },
         idUsuario:{
             type: DataTypes.INTEGER,
             allowNull: false
         }
        
         }
    
     const config = {
         tableName: "compras", 
         timestamps: true 
         
    }

 const compras = sequelize.define(alias, cols, config)
 return compras
}

module.exports = compras
