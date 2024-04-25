import { StateKeys } from '../../types/enums';
import {
  MessageData,
  MessageDeletePayload,
  MessageDeliveredPayload,
  MessageEditResponsePayload,
  MessageReadPayload,
  UserCredentials,
  UserStatus,
} from '../../types/types';

type ObservedValuesTypes =
  | string
  | UserCredentials
  | UserStatus[]
  | MessageData
  | MessageData[]
  | MessageDeliveredPayload
  | MessageReadPayload
  | MessageDeletePayload
  | MessageEditResponsePayload
  | null
  | undefined;

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

  triggerEvent(key: StateKeys): void {
    console.log(`event ${key} triggered`);

    this.notify(key);
  }

  subscribe(key: StateKeys, callback: NotifyCallback): void {
    console.log(`SUBSCIBED TO EVENT ${key}`);

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

  private notify(key: StateKeys, value?: ObservedValuesTypes): void {
    const callbacks = this.notifyCallbacks.get(key);

    console.log(`notifying about ${key} event`, callbacks);

    if (callbacks) {
      callbacks.forEach((cb) => cb(value));
    }
  }
}
