// import { EventEmitter } from "events";
// export const EventBus = new EventEmitter();

class EventBusClass {
	constructor() {
		this.events = {};
	}

	on(event, listener) {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(listener);
	}

	off(event, listener) {
		if (!this.events[event]) return;

		const index = this.events[event].findIndex((l) => l === listener);
		if (index !== -1) {
			this.events[event].splice(index, 1);
		}
	}

	emit(event, ...args) {
		if (!this.events[event]) return;

		for (let listener of this.events[event]) {
			listener(...args);
		}
	}
}

export const EventBus = new EventBusClass();
