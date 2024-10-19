import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  show = false;
  message: string = '';
  toastType: 'success' | 'warning' | 'danger' | 'info' = 'info';
  private toastSubscription!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastSubscription = this.toastService.toastState.subscribe(({message, type}) => {
      this.message = message;
      this.toastType = type;
      this.show = true;

      setTimeout(() => {
        this.show = false;
      }, 3000);
    });
  }

  hideToast() {
    this.show = false;
  }

  ngOnDestroy() {
    this.toastSubscription.unsubscribe();
  }
}
