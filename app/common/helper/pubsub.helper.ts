import EventEmitter from 'events';

const ee = new EventEmitter();

export const EVENTS = {
  MESSAGE_ADDED: 'MESSAGE_ADDED',
};

export const pubsub = {
  publish(event: string, payload: any) {
    // schedule on next tick to avoid sync issues
    process.nextTick(() => ee.emit(event, payload));
  },
  asyncIterator(event: string) {
    const iterator = {
      async next() {
        return new Promise((resolve) => {
          const handler = (payload: any) => {
            resolve({ value: payload, done: false });
          };
          ee.once(event, handler);
        });
      },
      return() {
        return Promise.resolve({ value: undefined, done: true });
      },
      throw(error: any) {
        return Promise.reject(error);
      },
      [Symbol.asyncIterator]() {
        return this;
      },
    };
    return iterator;
  },
};
