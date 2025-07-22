import { Random } from 'meteor/random';


class SkazkaToaster {
    constructor() {
        this.toasts = new ReactiveVar([]);
        this.position = 'bottom-right';
        this.theme = 'light';
    }

    addToast(options) {
        const id = Random.id();
        const toast = {
            id,
            ...options,
            createdAt: Date.now()
        };

        const currentToasts = this.toasts.get();
        this.toasts.set([...currentToasts, toast]);

        if (toast.duration !== Infinity) {
            setTimeout(() => {
                this.removeToastWithAnimation(id);
            }, toast.duration || 4000);
        }

        return id;
    }

    removeToast(id) {
        const currentToasts = this.toasts.get();
        this.toasts.set(currentToasts.filter(toast => toast.id !== id));
    }

    removeToastWithAnimation(id) {
        const currentToasts = this.toasts.get();
        const toastIndex = currentToasts.findIndex(t => t.id === id);

        if (toastIndex === -1) return;

        // Создаем полностью новый объект для реактивности
        const updatedToasts = currentToasts.map((toast, index) =>
            index === toastIndex ? { ...toast, visible: false } : toast
        );

        this.toasts.set(updatedToasts);

        // Полное удаление после анимации
        setTimeout(() => {
            const newToasts = this.toasts.get().filter(t => t.id !== id);
            this.toasts.set(newToasts);
        }, 400); // Должно совпадать с duration анимации
    }

    updateToast(id, options) {
        const currentToasts = this.toasts.get();
        this.toasts.set(currentToasts.map(toast => {
            if (toast.id === id) {
                return { ...toast, ...options };
            }
            return toast;
        }));
    }

    getVisibleToasts() {
        const allToasts = this.toasts.get();
        return allToasts.slice(-this.maxVisible).map((toast, index, arr) => ({
            ...toast,
            visible: toast.visible !== false, // гарантирует true/false
            isStacked: index < arr.length - 1
        }));
    }

    toast(message, options = {}) {
        return this.addToast({ message, ...options });
    }

    success(message, options = {}) {
        return this.toast(message, { ...options, type: 'success' });
    }

    error(message, options = {}) {
        return this.toast(message, { ...options, type: 'error' });
    }

    info(message, options = {}) {
        return this.toast(message, { ...options, type: 'info' });
    }

    warning(message, options = {}) {
        return this.toast(message, { ...options, type: 'warning' });
    }

    setPosition(position) {
        this.position = position;
    }

    setTheme(theme) {
        this.theme = theme;
    }
}

export const SkazkaInstance = new SkazkaToaster();