class EventEmitter {

    private readonly _events: {[type: string]: any};

    constructor() {
        this._events = {};
    }

    public emit(type: string, payload: object | null = null) {
        if (!this._events[type]) return;

        this._events[type].forEach((fun: Function) => {
            fun(payload);
        });
    }

    public removeListener(event: string, handler: Function) {
        if (!this._events[event]) return;

        let index: number = this._events[event].indexOf(handler);

        if (index === -1) return;
        this._events[event].splice(index, 1);
    }

    public on(type: string, handler: Function) {
        if (!this._events[type]) {
            this._events[type] = [];
        }

        this._events[type].push(handler);
    }
}


export default EventEmitter;