import { StateKeys } from '../../../types/enums';
import { UserCredentials } from '../../../types/types';

type ObservedValuesTypes = string | UserCredentials | null | undefined;

type NotifyCallback = {
  (value: ObservedValuesTypes): void;
};

export default class StateManagementService {
  private static readonly instance = new StateManagementService();

  private observedValues = new Map<StateKeys, ObservedValuesTypes>();

  private notifyCallbacks = new Map<StateKeys, Set<NotifyCallback>>();

  private constructor() {}

  static getInstance(): StateManagementService {
    return this.instance;
  }

  getValue(key: StateKeys): ObservedValuesTypes {
    if (this.observedValues.has(key)) {
      return this.observedValues.get(key);
    }

    return null;
  }

  setValue(key: StateKeys, value: ObservedValuesTypes): void {
    this.observedValues.set(key, value);
    this.notify(key, value);
  }

  subscribe(key: StateKeys, callback: NotifyCallback): void {
    let callbacks = this.notifyCallbacks.get(key);

    if (!callbacks) {
      callbacks = new Set<NotifyCallback>();
      this.notifyCallbacks.set(key, callbacks);
    }

    callbacks.add(callback);
  }

  unsubscribe(key: StateKeys, callback: NotifyCallback): void {
    const callbacks = this.notifyCallbacks.get(key);

    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  private notify(key: StateKeys, value: ObservedValuesTypes): void {
    const callbacks = this.notifyCallbacks.get(key);

    if (callbacks) {
      callbacks.forEach((cb) => cb(value));
    }
  }
}
