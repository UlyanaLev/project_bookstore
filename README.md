# project_bookstore

Bookstore — это многостраничное приложение для книжного интернет-магазина, разработанное с использованием технологий React и Redux. Данный проект позволяет пользователям:

- Искать книги с помощью продвинутой функции поиска, результаты которого отображаются на отдельной странице.
- Добавлять книги в корзину или в список "Любимые", доступ к которым также реализован через отдельные страницы.
- Удалять книги из корзины и списка "Любимые".
- Переключаться между страницами с использованием пагинации.
- Обращаться к детальной странице книги, используя маршруты с параметрами (например, /book/:id).
- Кроме того, приложение поддерживает как светлую, так и темную темы, позволяя пользователям выбирать предпочтительный интерфейс.

Данные загружаются через API, а управление состоянием приложения осуществляется с помощью Redux. Использование react-router-dom обеспечивает удобную навигацию пользователям.

## Установка
Для того чтобы запустить проект на Вашем локальном компьютере, выполните следующие шаги:

1. Клонирование репозитория:
  
   ```bash
   git clone https://github.com/UlyanaLev/project_bookstore.git
   ```

2. Установка зависимостей с использованием npm:

   cd project_bookstore

   ```bash
   npm install
   ```

3. Запуск проекта:

   ```bash
   npm run start
   ```

   Теперь Вы сможете открыть приложение в веб-браузере по адресу 
   http://localhost:3000


## Использованные технологии

React: для создания пользовательских интерфейсов.
Redux: для управления состоянием приложения.
react-router-dom: для навигации по страницам.
CSS/SASS: для стилизации компонентов и настройки тем.
   
Примечание:
Убедитесь, что у Вас установлен Node.js и npm перед выполнением вышеуказанных команд.
