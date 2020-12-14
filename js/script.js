'use strict';

const person = document.querySelector('.hello__name'),
    registerButton = document.querySelector('#register'),
    authButton = document.querySelector('#auth'),
    list = document.querySelector('#list');

let userName,
    login,
    password;

class AppData {
    constructor() {
        this.database = [];
    }
    registration() { 
        userName = prompt("Введите через пробел Имя и фамилию пользователя");
        
        let count = 0,
            name,
            surname,
            i = 0;
        for(let i = 0; i < userName.length; i++){
            if(userName[i] === ' '){
                count += 1;
            }
        }
        if(count !== 1 || userName[userName.length - 1] === ' ') {
            alert("Ошибка! Введите корректные данные");
            userName = prompt("Введите через пробел Имя и фамилию пользователя");
        }

        while(i < userName.length) {
            if(userName[i] === ' '){
                name = userName.slice(0, i);
                surname = userName.slice(i + 1, userName.length);
                break;
            }
            i++;
        }
        
        login = prompt("Введите логин");
        password = prompt("Введите пароль");


        let date = new Date(),
        dayNum = date.getDate(),
        newMonth = date.toLocaleString('ru', {month: 'long'}),
        month = newMonth.replace(newMonth[newMonth.length - 1], 'я'),
        year = date.getFullYear(),
        hours = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    
        const registrationDate =  `${dayNum} ${month} ${year} года, ${hours}:${min}:${sec}`;
        const userObj = {
            name: name,
            surname: surname,
            date: registrationDate
        };
    
        this.database.push(userObj);

        const li = document.createElement('li');
        li.innerHTML = `Имя: ${name}, фамилия: ${surname}, зарегестрирован: ${registrationDate}`;

        list.appendChild(li);

        localStorage.setItem('database', JSON.stringify(this.database));

    }
    eventListeners() {
        const registerFunc = this.registration.bind(this);
        registerButton.addEventListener('click', registerFunc);
    }
    loadData() { 
        let data = [];
        data = JSON.parse(localStorage.getItem('database'));
        if (data) {
            this.database = data;
        }
        this.database.forEach(function (item) {
            const li = document.createElement('li');

            li.innerHTML = `Имя: ${item.name}, фамилия: ${item.surname}, зарегестрирован: ${item.registrationDate}`;
            list.appendChild(li);
        });
    }   
}

const appData = new AppData();
appData.eventListeners();
appData.loadData();