const sequelize = require('../config/connection');
const { User, Review, Comment } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const review of reviewData) {
        await Review.create({
            ...review,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }
    //    // replace for comments
    // for (const comment of commentData) {
    //     await Comment.create({
    //         ...comment,
    //         user_id: users[Math.floor(Math.random() * users.length)].id,
    //         review_id: reviews[Math.floor(Math.random() * reviews.length)].id,
    //     });
    // }
    process.exit(0);
}

seedDatabase();