'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const variantsData = [
      {
        variant: 'Непотопляемый технический тепостойкий резервуар',
        question_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        variant: 'протокол передачи гипертекста',
        question_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        variant: 'High transport transform protocol',
        question_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        variant: 'Стартовой строки, HTTP заголовков, тела запроса',
        question_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        variant: 'Метода Fetch, ключевых слов async/await, метода GET',
        question_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        variant: 'На усмотрение разрабочика',
        question_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('Variants', variantsData);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Variants');
  },
};
