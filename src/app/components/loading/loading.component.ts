import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports: [CommonModule],
})
export class LoadingComponent {
  loading = true;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.isLoading.subscribe((loading) => {
      this.loading = loading;
    });
  }
}
