import { Template } from 'meteor/templating';
import { SkazkaInstance } from '../lib/skazka.js';
import './skazka.html';
import './skazka.css';

SkazkaInstance.maxVisible = 5; // Максимум 5 тостов в стеке

SkazkaInstance.getVisibleToasts = function() {
    const allToasts = this.toasts.get();
    return allToasts.slice(-this.maxVisible).map((toast, index, arr) => {
        const isLast = index === arr.length - 1;
        return {
            ...toast,
            isStacked: !isLast,
            zIndex: isLast ? this.maxVisible + 1 : this.maxVisible - index,
            visible: toast.visible !== false
        };
    });
};

// Добавляем анимацию удаления
SkazkaInstance.removeToastWithAnimation = function(id) {
    const currentToasts = this.toasts.get();
    const toastIndex = currentToasts.findIndex(t => t.id === id);

    if (toastIndex === -1) return;

    // Создаем копию массива
    const updatedToasts = [...currentToasts];

    // Важно: создаем новый объект с visible: false
    updatedToasts[toastIndex] = {
        ...updatedToasts[toastIndex],
        visible: false // Убедитесь, что это строка 'false' (не булево false)
    };

    this.toasts.set(updatedToasts);

    // Удаляем после анимации
    setTimeout(() => {
        const newToasts = this.toasts.get().filter(t => t.id !== id);
        this.toasts.set(newToasts);
    }, 400);
};

Template.skazkaToaster.helpers({
    visibleToasts() {
        return SkazkaInstance.getVisibleToasts();
    },
    position() {
        return SkazkaInstance.position;
    }
});

Template.skazkaToaster.events({
    'click .skazka-toast-close'(e) {
        e.preventDefault();
        e.stopPropagation();
        const id = e.currentTarget.getAttribute('data-id');
        SkazkaInstance.removeToastWithAnimation(id);
    },
    'click .skazka-toast'(e) {
        if (e.target.classList.contains('skazka-toast-close')) return;
        const id = e.currentTarget.getAttribute('data-id');
        SkazkaInstance.removeToastWithAnimation(id);
    }
});

Meteor.startup(() => {
    const toasterDiv = document.createElement('div');
    document.body.appendChild(toasterDiv);
    Blaze.render(Template.skazkaToaster, toasterDiv);
});

// Обновляем методы API для использования анимации
export const toast = SkazkaInstance.toast.bind(SkazkaInstance);
export const success = (msg, opts) => SkazkaInstance.toast(msg, { ...opts, type: 'success' });
export const error = (msg, opts) => SkazkaInstance.toast(msg, { ...opts, type: 'error' });
export const info = (msg, opts) => SkazkaInstance.toast(msg, { ...opts, type: 'info' });
export const warning = (msg, opts) => SkazkaInstance.toast(msg, { ...opts, type: 'warning' });
export const setPosition = (pos) => { SkazkaInstance.position = pos; };
export const removeToast = SkazkaInstance.removeToastWithAnimation.bind(SkazkaInstance);
export const updateToast = SkazkaInstance.updateToast.bind(SkazkaInstance);