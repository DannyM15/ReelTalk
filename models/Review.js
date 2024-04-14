const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model { }

Review.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    post: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    timeCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    StarRating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        }
    },
    // Store a refernce of the 'id' of the 'user' that creates the post
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        }
    }

},
{
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'review'
}
);

module.exports = Review