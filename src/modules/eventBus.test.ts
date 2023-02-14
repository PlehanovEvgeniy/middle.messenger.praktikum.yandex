import { expect } from 'chai';
import EventBus from './EventBus';

describe('EventBus', () => {
  let bus: EventBus<'event1' | 'event2', { event1: [string], event2: [number] }>;

  beforeEach(() => {
    bus = new EventBus();
  });

  it('should correctly register listeners', () => {
    const listener1 = (arg: string) => {};
    const listener2 = (arg: number) => {};

    bus.on('event1', listener1);
    bus.on('event2', listener2);

    expect(bus.listeners).to.have.keys('event1', 'event2');
    expect(bus.listeners.event1).to.deep.equal([listener1]);
    expect(bus.listeners.event2).to.deep.equal([listener2]);
  });

  it('should correctly emit events to listeners', () => {
    let event1Data: string | undefined;
    let event2Data: number | undefined;

    const listener1 = (arg: string) => { event1Data = arg };
    const listener2 = (arg: number) => { event2Data = arg };

    bus.on('event1', listener1);
    bus.on('event2', listener2);

    bus.emit('event1', 'Hello World');
    bus.emit('event2', 123);

    expect(event1Data).to.equal('Hello World');
    expect(event2Data).to.equal(123);
  });

  it('should correctly remove listeners', () => {
    const listener1 = (arg: string) => {};

    bus.on('event1', listener1);
    bus.off('event1', listener1);

    expect(bus.listeners.event1).to.deep.equal([]);
  });

  it('should throw an error if attempting to remove a non-existent listener', () => {
    const listener1 = (arg: string) => {};

    expect(() => bus.off('event1', listener1)).to.throw(/Нет события/);
  });
});
