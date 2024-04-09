const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init ({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
            // validate: {
            //     isURL: {
            //         args: false,
            //         msg: 'content cannot be a URL (╯°□°)╯︵ ┻━┻'
            //     }
            // },
        },
        timeCreated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        review_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'review',
                key: 'id',
            }
        }

    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment