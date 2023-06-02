const apiKey = '4287a525975e4fa28f0143307230106'

// Элементы на странице 
const header = document.querySelector('.header')
const form = document.querySelector('#form')
const input = document.querySelector('#inputCity')

function removeCard() {
  // Удаляем предыдующую карточку

  const prevCard = document.querySelector('.card');
  if (prevCard)prevCard.remove();
};

function showError(errorMessage) {
  // Отобразить карточку с ошибкой
  const html = `<div class="card">${errorMessage}</div>`

   // Отображаем карточку на странице
  header.insertAdjacentHTML('afterend', html)

}

function showCard (name,country, temp_c, condition) {
  // создаем разметку для карточки
         const html = `<div class="card">
              <h2 class="card__city">${name}
              <span>${country}</span></h2>
            
              <div class="card__weather">
                <div class="card__value">${temp_c}<sup>°c</sup><div>
                <img src="./img/example.png" alt="WEATHER" class="card__img">
              </div>
            
              <div class="card__desc">${condition}</div>

            </div>`

    // Отображаем карточку на странице
    header.insertAdjacentHTML('afterend', html)

}

async function getWeather(city) {
  // Адрес запроса
   const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
   const response = await fetch(url);
   const data =  await response.json();   
} 

// Слушаем отправку формы
form.onsubmit = async function (e) {
  // Отменяем отправку формы
  e.preventDefault();

// Берем значение из инпута, обрезаем пробелы
  let city = input.value.trim();

  // Получаем данные с сервера
  const data = await getWeather(city);

  // Проверяем ошибку

if (data.error) {
  // Если есть ошибка -выводим его
    removeCard()
    showError(data.error.message);
 } else {
  // Если ошибки нет -выводим карту
  // Отображаем полученные данные на карточке
    removeCard()
    showCard (
          data.location.name, 
          data.location.country,
          data.current.temp_c,
          data.current.condition.text
          );
        }  
// Выполняем зарос

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Проверяем ошибку

      if (data.error) {
        // Если есть ошибка -выводим его
        removeCard()
        showError(data.error.message);

        }else {
        // Если ошибки нет -выводим карту
        // Отображаем полученные данные на карточке

        removeCard()

        showCard (
          data.location.name, 
          data.location.country,
          data.current.temp_c,
          data.current.condition.text
          );
        }    
    });
}