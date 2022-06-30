const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

    await Post.bulkCreate(postData);  

    await Comment.bulkCreate(commentData);
    
    process.exit(0);
  };


// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   // const posts = await Post.bulkCreate(postData, {
//   //   individualHooks: true,
//   //   returning: true,
//   // });

//   for (const post of postData) {
//     await Post.create({
//       ...post,
//       //user_id & post_id must be linked somehow (i think)
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }


//   // for (const comment of commentData) {
//   //   await Comment.create({
//   //     ...comment,
//   //     //user_id & post_id must be linked somehow (i think)
//   //     user_id: users[Math.floor(Math.random() * users.length)].id,
//   //     post_id: posts[Math.floor(Math.random() * posts.length)].id
//   //   });
//   // }

//   process.exit(0);
// };

seedDatabase();
