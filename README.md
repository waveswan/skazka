# 📚 Skazka

Пакет предоставляет красивую систему toast-уведомлений для Meteor с Blaze. Ключевые особенности:

- Плавные анимации появления/исчезновения
- Стек уведомлений с эффектом "пачки"
- Кастомизируемые типы и стили
- Простое API
## 🚀 Быстрый старт

### Установка

```bash
meteor add waveswan:skazka
```
## Импорт

```javascript
import {
toast,
success,
error,
info,
warning,
setPosition,
removeToast
} from 'meteor/waveswan:skazka';
```
## Базовое использование

```javascript
// Простое уведомление
toast('Привет, мир!');

// Уведомление с типом
success('Данные сохранены!');

// С опциями
error('Ошибка соединения', {
duration: 5000,
title: 'Ошибка'
});
```
## 🔧 API

### Основные методы

`toast(message, options)`
* `message` - Текст уведомления
* `options`:
  - `title` - Заголовок
  -   `type` - Тип (default, success, error, info, warning)
  -   `duration` - Время показа в ms (по умолчанию 4000)
  -   `closeButton` - Показывать кнопку закрытия (по умолчанию true)

### Специальные методы

* `success(message, options)`
* `error(message, options)`
* `info(message, options)`
* `warning(message, options)`
### Управление

#### `setPosition(position)`

Устанавливает позицию:

* `top-right` (по умолчанию)
* `top-left`
* `bottom-right`
* `bottom-left`
#### `removeToast(id)`

Удаляет уведомление по ID

#### `updateToast(id, options)`

Обновляет существующее уведомление

## 🎨 Кастомизация

### Позиционирование

```javascript
setPosition('top-left');
```
### Стилизация

#### Переопределите CSS-классы:

`.skazka-toast` - базовый стиль уведомления
`.skazka-toast-success` - стиль успешного уведомления
`.skazka-toast-error` - стиль ошибки
и т.д.
### Анимации

#### Измените CSS-анимации:

```css
@keyframes toast-enter {
/* ваши стили */
}

@keyframes toast-exit {
/* ваши стили */
}
```
## 🌟 Особенности

### Анимации

* Появление: вылет снизу
* Исчезновение: улет вниз
* При наведении на стек - плавное раскрытие
### Ограничения

* Максимум 5 видимых уведомлений
* Старые уведомления автоматически удаляются
## 📚 Примеры

### Продвинутый пример

``` javascript
const toastId = info('Загрузка данных...', { duration: Infinity });

setTimeout(() => {
    updateToast(toastId, {
    message: 'Загрузка завершена!',
    type: 'success',
    duration: 2000
    });
}, 3000);
```
Обработка ошибок

```javascript
try {
    // Код с ошибкой
} catch (err) {
error(err.message, {
    title: 'Ошибка',
    duration: 8000
    });
}
```
## 💡 Советы

1. Для темной темы добавьте класс .skazka-theme-dark к контейнеру
2. Используйте will-change для оптимизации анимаций
3. Настройте duration для контроля времени показа
## 🔗 Логика работы

1. При создании тоста:
    * Генерируется уникальный ID
    * Добавляется в ReactiveVar
    * Запускается таймер (если указан duration)
2. При закрытии:
   * Устанавливается флаг visible: false
   * Запускается анимация исчезновения
   * После анимации тост удаляется  
   
Теперь у вас есть красивые, анимированные уведомления с понятным API! 🎉