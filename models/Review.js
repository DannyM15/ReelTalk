const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

const { SERIALIZABLE } = require('sequelize/types/table-hints');

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
        validate: {
            isURL: {
                args: false,
                msg: 'content cannot be a URL (╯°□°)╯︵ ┻━┻'
            }
        },
    },
    post: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isURL: {
                args: false,
                msg: 'content cannot be a URL ┻━┻ ︵╰(°□°╰)'
            }
        },
    },
    timeCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
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
Review.belongsTo(User);

module.exports = Review