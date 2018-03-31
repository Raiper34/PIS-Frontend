import {Component, EventEmitter, Input, Output} from '@angular/core';

export const pageSize = 10;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() currentPage = 0;
  itemsLengthValue = 0;
  @Output() currentPageChange = new EventEmitter<number>();
  pages = [];

  @Input()
  set itemsLength(value: number) {
    this.itemsLengthValue = value;
    this.pages = Array(Math.ceil(this.itemsLengthValue / pageSize)).fill(1).map((x, y) => x + y);
  }

  get showPaggination(): boolean {
    return this.pages.length > 1;
  }

  get showLeftArrow(): boolean {
    return this.currentPage !== 0;
  }

  get showRightArrow(): boolean {
    return this.currentPage !== this.pages.length - 1 && this.pages.length > 0;
  }

  changePage(pageNumber: number): void {
    this.currentPageChange.emit(pageNumber);
  }

}
