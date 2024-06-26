const User = require('./User');
const Review = require('./Review');
const Comment = require('./Comments');

User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Review.hasMany(Comment, {
    foreignKey: 'review_id',
    onDelete: 'CASCADE'
})

Review.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Review, {
    foreignKey: 'review_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Review, Comment };