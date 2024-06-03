'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const questionsAndAnswersData = [
      {
        category_id: 1,
        question: 'HTTP это',
        answer: 'протокол передачи гипертекста',
        variants: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: 1,
        question:
          'Протокол, который отвечает за обмен данными. Он  управляет их отправкой и следит за тем, чтобы они дошли до получателя в целости:',
        answer: 'TCP',
        variants: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: 1,
        question:
          'Протокол, отвечающий за адресацию. Его задача — связывать друг с другом устройства и нарезать данные на пакеты для удобной отправки. Чтобы протокол мог быстро найти дорогу от одного компьютера к другому, придумали ...-адреса — уникальные идентификаторы, которые есть у каждого устройства в Сети.',
        answer: 'IP',
        variants: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: 1,
        question: 'Из чего состоит HTTP запрос?',
        answer: 'Стартовой строки, HTTP заголовков, тела запроса',
        variants: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert(
      'QuestionAndAnswers',
      questionsAndAnswersData
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('QuestionAndAnswers');
  },
};
