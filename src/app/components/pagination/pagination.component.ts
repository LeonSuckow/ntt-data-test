import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Pagination } from '../../../interface/pagination.interface';
import { PaginationService } from '../../service/pagination.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Output() pageChange = new EventEmitter<number>();
  @Input() pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
  };
  totalPages: number = 0; 
  visiblePages: number[] = [];

  constructor(private paginationService: PaginationService) {}

  ngOnInit() {
    this.updateTotalPages(); 
    this.updateVisiblePages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pagination']) {
      console.log(changes['pagination'].currentValue);
      this.updateTotalPages(); 
      this.updateVisiblePages(); 
    }
  }

  updateTotalPages() {
    this.totalPages = this.pagination.totalResults
      ? Math.ceil(this.pagination.totalResults / this.pagination.itemsPerPage)
      : 0;
  }


  // Função para calcular as páginas visíveis com base na página atual
  updateVisiblePages() {
    const totalPages = this.totalPages;
    const currentPage = this.pagination.currentPage;

    const maxVisiblePages = 5;
    const halfRange = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
      this.visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage <= halfRange) {
      this.visiblePages = Array.from(
        { length: maxVisiblePages },
        (_, i) => i + 1
      );
    } else if (currentPage + halfRange >= totalPages) {
      this.visiblePages = Array.from(
        { length: maxVisiblePages },
        (_, i) => totalPages - maxVisiblePages + 1 + i
      );
    } else {
      this.visiblePages = Array.from(
        { length: maxVisiblePages },
        (_, i) => currentPage - halfRange + i
      );
    }

    this.visiblePages = this.visiblePages.map((page) => Math.floor(page));
  }

  goToPage(page: number) {
    if (page === this.pagination.currentPage) return;
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
    this.updateVisiblePages();
  }

  nextPage() {
    if (this.pagination.currentPage < this.totalPages) {
      this.goToPage(this.pagination.currentPage + 1);
    }
  }

  prevPage() {
    if (this.pagination.currentPage > 1) {
      this.goToPage(this.pagination.currentPage - 1);
    }
  }
}
