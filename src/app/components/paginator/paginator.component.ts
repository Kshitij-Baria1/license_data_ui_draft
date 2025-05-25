import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  imports: [FormsModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input() page = 0;
  private _size = 10;

  @Input() set size(val: number) {
    this._size = val;
  }
  get size(): number {
    return this._size;
  }

  @Input() totalPages = 0;
  @Input() totalElements = 0;
  @Input() pageSizeOptions = [5, 10, 25, 50];

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  goToFirstPage() {
    if (this.page > 0) {
      this.pageChange.emit(0);
    }
  }

  goToPreviousPage() {
    if (this.page > 0) {
      this.pageChange.emit(this.page - 1);
    }
  }

  goToNextPage() {
    if (this.page + 1 < this.totalPages) {
      this.pageChange.emit(this.page + 1);
    }
  }

  goToLastPage() {
    if (this.page < this.totalPages - 1) {
      this.pageChange.emit(this.totalPages - 1);
    }
  }

  onPageSizeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const size = parseInt(selectElement.value, 10);
    this.pageSizeChange.emit(size);
  }
}
