'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      {
        title: 'HTTP',
        description: 'Категория создана на основе лекции Эльбрус',
        user_id: 1,
      },
      {
        title: 'React SSR',
        description: 'Категория создана на основе лекции Эльбрус',
        user_id: 1,
      },
      {
        title: 'REST',
        description: 'Категория создана на основе лекции Эльбрус',
        user_id: 1,
      },
      {
        title: 'Express',
        description: 'Категория создана на основе лекции Эльбрус',
        user_id: 1,
      },
      {
        title: 'AJAX',
        description: 'Категория создана на основе лекции Эльбрус',
        user_id: 1,
      },
    ];

    const categoriesData = categories.map((category) => ({
      title: category.title,
      description: category.description,
      user_id: category.user_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    return queryInterface.bulkInsert('Categories', categoriesData);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories');
  },
};
