const registrationForm = document.forms['register'];
const authentificationForm = document.forms['auth'];

const answerForm = document.forms['answer'];
const wrapper = document.querySelector('.wrapper');

const newQuestionForm = document.forms['newQuestion'];

const addCategoryLink = document.getElementById('addCategory');

const patchQuestionLinks = document.querySelectorAll('.question_patch_link');

const removeQuestionAndAnswerLinks = document.querySelectorAll(
  '.question_remove_link'
);

if (registrationForm) {
  registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      const formData = Object.fromEntries(new FormData(registrationForm));
      const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseJson = await response.json();
      if (response.ok) {
        window.location.assign(`/`);
      } else {
        const errorPage = document.createElement('div');

        errorPage.innerText = responseJson.message;
        errorPage.classList.add('error_message');
        document.querySelector('body').append(errorPage);
      }
    } catch (error) {
      console.log({ REGISTRATION_ERROR: error });
    }
  });
}

if (authentificationForm) {
  authentificationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      const formData = Object.fromEntries(new FormData(authentificationForm));
      const response = await fetch('/signin', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const responseJson = await response.json();
      if (response.ok) {
        window.location.assign(`/`);
      } else {
        const errorPage = document.createElement('div');

        errorPage.innerText = responseJson.message;
        errorPage.classList.add('error_message');
        document.querySelector('body').append(errorPage);
      }
    } catch (error) {
      console.log({ AUTHENTIFICATION_ERROR: error });
    }
  });
}

if (answerForm) {
  answerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(answerForm));
    const question_id = answerForm.dataset.question_id;
    const response = await fetch(
      `/categories/${answerForm.dataset.category_id}/questions/${answerForm.dataset.question_number}`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ ...formData, question_id }),
      }
    );

    const responseJson = await response.json();
    const message = document.createElement('div');
    if (responseJson.message) {
      message.classList.add('right_message');
      message.innerText = 'Правильный ответ!';
      wrapper.append(message);
    } else {
      message.classList.add('wrong_message');
      message.innerText = 'Неверный ответ!';
      wrapper.append(message);
    }
    document.getElementById('btnInput').disabled = 'true';
    function nextQuestion() {
      window.location.assign(
        `/categories/${answerForm.dataset.category_id}/questions/${
          Number(answerForm.dataset.question_number) + 1
        }`
      );
    }
    setTimeout(nextQuestion, 1500);
  });
}

if (addCategoryLink) {
  addCategoryLink.addEventListener('click', (event) => {
    const formAddCategory = document.createElement('form');
    const inputTitle = document.createElement('input');
    const inputDescription = document.createElement('input');
    const inputSubmit = document.createElement('input');
    inputTitle.setAttribute('type', 'text');
    inputTitle.setAttribute('name', 'title');
    inputDescription.setAttribute('type', 'text');
    inputDescription.setAttribute('name', 'description');
    inputSubmit.setAttribute('type', 'submit');
    inputSubmit.setAttribute('value', 'добавить');
    formAddCategory.setAttribute('name', 'formAddCategory');
    const labelTitle = document.createElement('label');
    labelTitle.innerText = 'Название:';
    const labeDescription = document.createElement('label');
    labeDescription.innerText = 'Описание:';
    formAddCategory.append(
      labelTitle,
      inputTitle,
      labeDescription,
      inputDescription,
      inputSubmit
    );
    document.body.append(formAddCategory);
    formAddCategory.classList.add('form_add_category');

    formAddCategory.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(formAddCategory));
      formAddCategory.remove();
      try {
        const response = await fetch('/users/categories', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const responseJson = await response.json();
        if (response.ok) {
          const newCategoryDiv = document.createElement('div');
          newCategoryDiv.classList.add('card_category');

          const newCategoryLink = document.createElement('a');
          newCategoryLink.classList.add('category_link');
          newCategoryLink.setAttribute('href', `categories/${responseJson.id}`);
          newCategoryLink.innerText = `${responseJson.title}`;
          const newCategoryRemoveLink = document.createElement('a');
          newCategoryRemoveLink.classList.add('category_link_remove');
          newCategoryRemoveLink.setAttribute('href', `#`);
          newCategoryRemoveLink.setAttribute('data-id', `${responseJson.id}`);
          newCategoryRemoveLink.innerText = 'X';

          const newCategoryPatchLink = document.createElement('a');
          newCategoryPatchLink.classList.add('category_link_patch');
          newCategoryPatchLink.setAttribute('href', `#`);
          newCategoryPatchLink.setAttribute('data-id', `${responseJson.id}`);
          newCategoryPatchLink.innerText = 'редактировать';

          newCategoryDiv.append(
            newCategoryLink,
            newCategoryRemoveLink,
            newCategoryPatchLink
          );
          addCategoryLink.before(newCategoryDiv);
        }
      } catch (error) {
        console.log({ ERROR_ADD_NEW_CATEGORY: error });
      }
    });
  });
}

const divWrapper = document.querySelector('.wrapper');

if (divWrapper) {
  divWrapper.addEventListener('click', async (event) => {
    if (event.target.classList.contains('category_link_remove')) {
      try {
        const response = await fetch('/users/categories', {
          method: 'DELETE',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ id: event.target.dataset.id }),
        });
        if (response.ok) {
          event.target.parentNode.remove();
        }
      } catch (error) {
        console.log({ ERROR_REMOVE_CATEGORY: error });
      }
    }

    if (event.target.classList.contains('category_link_patch')) {
      try {
        const response = await fetch(
          `/users/categories/data/${event.target.dataset.id}`
        );
        const responseJson = await response.json();

        const { title, description } = responseJson;

        const formPatchCategory = document.createElement('form');
        const inputTitle = document.createElement('input');
        const inputDescription = document.createElement('input');
        const inputSubmit = document.createElement('input');
        formPatchCategory.setAttribute('name', 'form_patch');
        formPatchCategory.setAttribute('data-id', event.target.dataset.id);
        inputTitle.setAttribute('type', 'text');
        inputTitle.setAttribute('name', 'title');
        inputTitle.value = title;
        inputDescription.setAttribute('type', 'text');
        inputDescription.setAttribute('name', 'description');
        inputDescription.value = description;
        inputSubmit.setAttribute('type', 'submit');
        inputSubmit.setAttribute('value', 'редактировать');
        formPatchCategory.setAttribute('name', 'formPatchCategory');
        const labelTitle = document.createElement('label');
        labelTitle.innerText = 'Название:';
        const labeDescription = document.createElement('label');
        labeDescription.innerText = 'Описание:';
        formPatchCategory.append(
          labelTitle,
          inputTitle,
          labeDescription,
          inputDescription,
          inputSubmit
        );
        document.body.append(formPatchCategory);
        formPatchCategory.classList.add('form_patch_category');

        formPatchCategory.addEventListener('submit', async (event) => {
          event.preventDefault();
          formPatchCategory.remove();
          const formData = Object.fromEntries(new FormData(formPatchCategory));
          const response = await fetch('/users/categories', {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              ...formData,
              id: formPatchCategory.dataset.id,
            }),
          });
          if (response.ok) {
            document.getElementById(formPatchCategory.dataset.id).innerText =
              formData.title;
          }
        });
      } catch (error) {
        console.log({ ERROR_PATCH: error });
      }
    }
  });
}

if (newQuestionForm) {
  newQuestionForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(newQuestionForm));
    try {
      const response = await fetch(
        `/users/categories/${newQuestionForm.dataset.id}`,
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
    } catch (error) {
      console.log({ ERROR_ADD_NEW_ANSWER_AND_QUESTION: error });
    }
  });
}

if (removeQuestionAndAnswerLinks.length != 0) {
  removeQuestionAndAnswerLinks.forEach((elem) => {
    elem.addEventListener('click', async (event) => {
      event.preventDefault();
      const response = await fetch(
        `/users/categories/${newQuestionForm.dataset.id}`,
        {
          method: 'DELETE',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ id: event.target.dataset.id }),
        }
      );

      if (response.ok) {
        event.target.parentNode.parentNode.remove();
      }
    });
  });
}

if (patchQuestionLinks.length !== 0) {
  patchQuestionLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const questionDiv = event.target.parentNode.querySelector('.question');

      const answerDiv = event.target.parentNode.querySelector('.rightanswer');

      const formPatchQuestion = document.createElement('form');
      const inputQuestion = document.createElement('input');
      inputQuestion.value = questionDiv.innerText;
      const inputAnswer = document.createElement('input');
      inputAnswer.value = answerDiv.innerText;
      const inputSubmit = document.createElement('input');
      formPatchQuestion.setAttribute('data-id', event.target.dataset.id);
      inputQuestion.setAttribute('type', 'text');
      inputQuestion.setAttribute('name', 'question');
      inputAnswer.setAttribute('type', 'text');
      inputAnswer.setAttribute('name', 'answer');
      inputSubmit.setAttribute('type', 'submit');
      inputSubmit.setAttribute('value', 'редактировать');
      const labelQuestion = document.createElement('label');
      labelQuestion.innerText = 'Вопрос:';
      const labelAnswer = document.createElement('label');
      labelAnswer.innerText = 'Ответ:';
      formPatchQuestion.classList.add('form_patch_question');
      formPatchQuestion.append(
        labelQuestion,
        inputQuestion,
        labelAnswer,
        inputAnswer,
        inputSubmit
      );

      event.target.parentNode.append(formPatchQuestion);
    });
  });
}
