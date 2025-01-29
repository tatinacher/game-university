const locationPositions = {
    0: { coordinates: [499, 433] },
    1: { coordinates: [343, 470] },
    2: { coordinates: [269, 513] },
    3: { coordinates: [182, 532] },
    4: { coordinates: [103, 504] },
    5: { coordinates: [111, 436], isCheckpoint: true }
};

const BUTTON_HEIGHT = 10;
const BUTTON_WIDTH = 16;
const BUTTON_CHECKPOINT_HEIGHT = 17;
const BUTTON_CHECKPOINT_WIDTH = 25;
const HIDE_CLASS = 'hide-animation';
const SHOW_CLASS = 'show-animation';
const ERROR_NO_POSITION = 'Position not found';
const TRANSLATE_OFFSET = 60;

const data = {
    "rating": [
        {
            "id": "123",
            "name": "Владимир",
            "lastName": "Ларионов",
            "img": "./male.png",
            "points": "463"
        },
        {
            "id": "9",
            "name": "Владимир",
            "lastName": "Сергеев",
            "img": "./male.png",
            "points": "521"
        },
        {
            "id": "231",
            "name": "Вениамин",
            "lastName": "Васильев",
            "img": "./male.png",
            "points": "865"
        },
        {
            "id": "321",
            "name": "Мария",
            "lastName": "Логинова",
            "img": "./female.png",
            "points": "865"
        },
        {
            "id": "492",
            "name": "Борис",
            "lastName": "Казанцев",
            "img": "./male.png",
            "points": "784"
        },
        {
            "id": "452",
            "name": "Полина",
            "lastName": "Калинина",
            "img": "./female.png",
            "points": "225"
        },
        {
            "id": "796",
            "name": "Даниил",
            "lastName": "Воробьёв",
            "img": "./male.png",
            "points": "642"
        },
        {
            "id": "4",
            "name": "Эрик",
            "lastName": "Аксёнов",
            "img": "./male.png",
            "points": "150"
        },
        {
            "id": "1155",
            "name": "Иван",
            "lastName": "Иванов",
            "img": "./male.png",
            "points": "100"
        },
        {
            "id": "12145",
            "name": "Артем",
            "lastName": "Алексеев",
            "img": "./male.png",
            "points": "1000"
        }
    ],
    "friends": [
        {
            "id": "9",
            "name": "Владимир",
            "lastName": "Сергеев",
            "img": "./male.png"
        },
        {
            "id": "4",
            "name": "Эрик",
            "lastName": "Аксёнов",
            "img": "./male.png"
        },
        {
            "id": "15411",
            "name": "Ирина",
            "lastName": "Чеснокова",
            "img": "./female.png"
        },
        {
            "id": "15564",
            "name": "Дарина",
            "lastName": "Боброва",
            "img": "./female.png"
        }
    ]
}


class Student {
    constructor(position = 0) {
        this.position = position;
    }
    get() {
        return this.position;
    }
    goToUniversity() {
        this.position += 1;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const student = new Student();
    let currentSliderOffset = 0;

    const universityBnt = document.querySelector("#university-btn");
    const modalBtn = document.querySelector("#modal-close-btn");
    const ratingBtn = document.querySelector('#rating-btn');
    const modal = document.querySelector('#modal-top-rating');
    const modalBackground = document.querySelector('#modal-background');
    const usersPrev = document.querySelector('#users-list-prev');
    const usersNext = document.querySelector('#users-list-next');
    const userList = document.querySelector("#users-list");

    setRatingTable();
    setBottomMenuUsers();

    universityBnt.addEventListener("click", () => changeStudentPosition(student));
    modalBtn.addEventListener("click", () => hideModal(modal));
    modalBackground.addEventListener("click", () => hideModal(modal));
    ratingBtn.addEventListener("click", () => showModal(modal));

    usersPrev.addEventListener("click", () => {
        currentSliderOffset += TRANSLATE_OFFSET;
        if (currentSliderOffset > 0) {
            return;
        }
        userList.style.transform = 'translate(' + currentSliderOffset + 'px, 0px)';
    });

    usersNext.addEventListener("click", () => {
        currentSliderOffset -= TRANSLATE_OFFSET;
        if (currentSliderOffset <= -300) {
            return;
        }
        userList.style.transform = 'translate(' + currentSliderOffset + 'px, 0px)';

    });
});

function setBottomMenuUsers() {
    const modalRatingList = document.querySelector('#users-list');
    data.rating.forEach(({ id }) => {
        addDivElement(modalRatingList, "", 'users-list-item', "", id);
    });
}


function addDivElement(parent, innerText, className, image, id) {
    const element = document.createElement("div");
    element.innerText = innerText;
    element.classList.add(className);
    element.setAttribute("data-id", id);

    if (image) {
        element.style.backgroundImage = "url(" + image + ")";
    }

    parent.appendChild(element);
}

function setRatingTable() {
    const modalRatingList = document.querySelector('#modal-rating-list');

    const ratingList = data.rating;
    const friendsList = data.friends;

    const ratingListFriends = ratingList.map((user) => {
        const isFriend = friendsList.find((friend) => friend.id == user.id)
        return { ...user, isFriend: Boolean(isFriend) }
    });

    const ratingListSorted = ratingListFriends.sort((a, b) => b.points - a.points);

    ratingListSorted.forEach(({ id, name, lastName, points, img, isFriend }, index) => {
        const listItem = document.createElement("div");
        listItem.classList.add('rating-background');

        addDivElement(listItem, index, 'rating-position');
        addDivElement(listItem, "", 'rating-image', img);
        addDivElement(listItem, name + " " + lastName, 'rating-name');
        addDivElement(listItem, points, 'rating-score');

        if (isFriend) {
            listItem.style.filter = "sepia(1)";
        }

        modalRatingList.appendChild(listItem);
    });

}

function hideModal(modal) {
    modal.style.top = -modal.offsetHeight + 'px';
}

function showModal(modal) {
    modal.style.top = 0;
}

async function changeStudentPosition(student) {
    const studentFigure = document.querySelector("#student");

    student.goToUniversity();
    const postiton = student.get();
    if (!locationPositions[postiton]) {
        console.log(ERROR_NO_POSITION);
        return;
    }
    studentFigure.classList.remove(SHOW_CLASS);
    studentFigure.classList.add(HIDE_CLASS);

    await delay(700);

    const { coordinates, isCheckpoint } = locationPositions[postiton];

    let positionLeft = coordinates[0] - (studentFigure.offsetWidth / 2);
    let positionTop = coordinates[1] - (studentFigure.offsetHeight);

    if (isCheckpoint) {
        positionLeft += BUTTON_CHECKPOINT_WIDTH / 2;
        positionTop += BUTTON_CHECKPOINT_HEIGHT / 2;
    } else {
        positionLeft += BUTTON_WIDTH / 2;
        positionTop += BUTTON_HEIGHT / 2;
    }

    studentFigure.style.left = positionLeft + 'px';
    studentFigure.style.top = positionTop + 'px';
    studentFigure.style.opacity = 1;

    studentFigure.classList.remove(HIDE_CLASS);
    studentFigure.classList.add(SHOW_CLASS);
}

const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
});