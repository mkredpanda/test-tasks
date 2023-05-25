import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  store: {
    [p: string]: string,
  } = {};

  constructor() { }

  private get localStorageExists(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  get(key: string): string|null {
    if (this.localStorageExists) {
      return window.localStorage.getItem(key);
    } else {
      return this.store[key] || null;
    }
  }

  set(key: string, value: any): void {
    if (this.localStorageExists) {
      window.localStorage.setItem(key, value);
    } else {
      this.store[key] = JSON.stringify(value);
    }
  }

  remove(key: string): void {
    if (this.localStorageExists) {
      window.localStorage.removeItem(key);
    } else {
      delete this.store[key];
    }
  }
}
