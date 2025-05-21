// MousePositionObserver.ts
type Callback = (x: number, y: number) => void;

export class MousePositionSubject {
  private observers: Callback[] = [];

  subscribe(observer: Callback) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Callback) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(x: number, y: number) {
    this.observers.forEach((observer) => observer(x, y));
  }
}

export const mouseSubject = new MousePositionSubject();
