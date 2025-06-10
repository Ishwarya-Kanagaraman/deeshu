// models/Product.js

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        category_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true, // URL to image
        },
        url: {
            type: DataTypes.STRING, // optional external site URL
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        tableName: 'products',
        timestamps: true,
    });

    // Associations can be added here
    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category',
        });

        // If needed:
        // Product.hasMany(models.CartItem);
        // Product.hasMany(models.OrderItem);
    };

    return Product;
};
  