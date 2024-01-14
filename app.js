//получение элементов DOM
const nameInput = document.getElementById('name');
const linkInput = document.getElementById('link');
const commentInput = document.getElementById('comment');
const commentTitleName = document.querySelector('.comment-box__title-name');
const commentInputName = document.querySelector('.comment-box__input-name');
const addButton = document.querySelector('.submit');
const yesCheckbox = document.getElementById('yes');
const noCheckbox = document.getElementById('no');
const chatWindow = document.querySelector('.chat-window');

// массив ссылок на изображения
const images = [
    './assets/img/animal1.png',
    './assets/img/animal2.png',
    './assets/img/animal3.png',
    './assets/img/animal4.png',
    './assets/img/animal5.png',
    './assets/img/animal6.png',
];

// функция для генерации случайного числа в заданном диапазоне
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// функция для получения текущей даты и времени в нужном формате
function reData() {
    const currentTime = new Date(); // время написания коммента
    const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][currentTime.getDay()];
    const currentMonth = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ][currentTime.getMonth()];
    const userTime = `${weekDay}, ${currentTime.getDate()} ${currentMonth} ${currentTime.getFullYear()} at ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
    return userTime;
}

// функция для определения имени пользователя
function reName() {
    let name = nameInput.value.replace(/\s+/g, '');
    if (!name) name = 'username';
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

// функция для выбора изображения пользователя
function rePic() {
    if (linkInput.value.replace(/\s+/g, '')) {
        return linkInput.value;
    } else {
        return images[getRandomNumber(0, images.length - 1)];
    }
}


// функция для обработки комментария (замена спам-слов)
function reComment() {
    const spamRegExp = /viagra|xxx/gi;
    return commentInput.value.replace(spamRegExp, '***');
}

// функция для добавления комментария в чат
function addCommentToChat() {
    const chatUser = document.createElement('div');
    chatUser.classList.add('chat-window__user');
    const template = `
    <div class='user'>
    <div class='user-left'>
    <img class='user-pic__pic' src='${rePic()}'>
    <p class='user-name__name'>${reName()}</p>
    </div>
    <div class='user-right'>
    <p class='chat-data__time'>${reData()}</p>
    </div>
    </div>
    <div class='user-comment'>
    <p class='user-comment__comment'>${reComment()}</p>
    </div>
    `;
    chatUser.innerHTML = template;
    chatWindow.prepend(chatUser);
}

// отображение имени
function showName() {
    if (noCheckbox.checked) {
        commentTitleName.style.display = 'none';
        commentInputName.style.display = 'none';
        nameInput.value = '';
    } if (yesCheckbox.checked) {
        commentTitleName.style.display = 'block';
        commentInputName.style.display = 'block';
    }
}

// обработчики на чекбоксы
yesCheckbox.addEventListener('change', showName);
noCheckbox.addEventListener('change', showName);


// обработчик клика по кнопке
addButton.addEventListener('click', function () {
    showName();
    // добавление комментария в чат
    addCommentToChat();
});