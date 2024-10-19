import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from '../../interface/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<Toast>();
  toastState = this.toastSubject.asObservable();

  constructor() {}

  show(
    message: string,
    type: 'success' | 'warning' | 'danger' | 'info' = 'info'
  ) {
    this.toastSubject.next({ message, type });
  }
}
