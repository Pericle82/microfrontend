export function appEventBus () {
    const listeners: Record<string, Function[]> = {};

    function on(eventType: string, callback: Function) {
        if (!listeners[eventType]) {
            listeners[eventType] = [];
        }
        listeners[eventType].push(callback);
    }

    function off(eventType: string, callback: Function) {
        if (!listeners[eventType]) {
            return;
        }
        listeners[eventType] = listeners[eventType].filter(
            (listener) => listener !== callback
        );
    }

    function emit(event: any) {
        if (!listeners[event.type]) {
            return;
        }
        listeners[event.type].forEach((listener) => {
            listener(event);
        });
    }

    return {
        on,
        off,
        emit,
    };
}