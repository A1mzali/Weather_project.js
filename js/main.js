const apiKey = '4287a525975e4fa28f0143307230106'

// Элементы на странице 
const header = document.querySelector('.header')
const form = document.querySelector('#form')
const input = document.querySelector('#inputCity')



// Слушаем отправку формы
form.onsubmit = function (e) {
  // Отменяем отправку формы
  e.preventDefault();

// Берем значение из инпута, обрезаем пробелы
  let city = input.value.trim();

  // Делае запрос на сервер
  // Адрес запроса

  
const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;



// Выполняем зарос

    fetch(url)
    .then((response) => response.json())
    .then((data) => {

      
      console.log(data);

      // Проверяем ошибку

      if (data.error) {
        // Если есть ошибка -выводим его

        // Удаляем предыдующую карточку
        const prevCard = document.querySelector('.card');
        if (prevCard)prevCard.remove();


        // Отобразить карточку с ошибкой
        const html = `<div class="card">${data.error.message}</div>`
        
        header.insertAdjacentHTML('afterend', html)


      }else {

        // Если ошибки нет -выводим карту
        // Отображаем полученные данные на карточке

        // Удаляем предыдующую карточку
        const prevCard = document.querySelector('.card');
        if (prevCard)prevCard.remove();
      

      // создаем разметку для карточки
        const html = `<div class="card">
                        <h2 class="card__city">${data.location.name}
                        <span>${data.location.country}</span></h2>
                    
                        <div class="card__weather">
                          <div class="card__value">${data.current.temp_c}<sup>°c</sup></div>
                          <img src="./img/example.png" alt="WEATHER" class="card__img">
                        </div>
                    
                        <div class="card__desc">${data.current.condition.text}</div>
                      
                      </div>`

      // Отображаем карточку на странице

      header.insertAdjacentHTML('afterend', html)

      }

    });

}