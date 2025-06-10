// models/CartItem.js

module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        cart_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    }, {
        tableName: 'cart_items',
        timestamps: true,
    });

    CartItem.associate = (models) => {
        CartItem.belongsTo(models.Cart, {
            foreignKey: 'cart_id',
            as: 'cart',
        });
        CartItem.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'product',
        });
    };

    return CartItem;
};
  