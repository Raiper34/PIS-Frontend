import {Component, EventEmitter, Input, Output} from '@angular/core';

export const pageSize = 10;

/*
 * Pagination Component
 * Reusable component that represents paginator for tables
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
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

  /**
   * Item Length
   * Seting items length property
   * @param {number} value
   */
  @Input()
  set itemsLength(value: number) {
    this.itemsLengthValue = value;
    this.pages = Array(Math.ceil(this.itemsLengthValue / pageSize)).fill(1).map((x, y) => x + y);
  }

  /**
   * Show Pagination
   * Determines if paginator is visible or not
   * @returns {boolean}
   */
  get showPaggination(): boolean {
    return this.pages.length > 1;
  }

  /**
   * Show Left Arrow
   * Determines if eft arrow is visible or not
   * @returns {boolean}
   */
  get showLeftArrow(): boolean {
    return this.currentPage !== 0;
  }

  /**
   * Show Right Arrow
   * Determines if right arrow is visible or not
   * @returns {boolean}
   */
  get showRightArrow(): boolean {
    return this.currentPage !== this.pages.length - 1 && this.pages.length > 0;
  }

  /**
   * Change Page
   * Change page on click
   * @param {number} pageNumber
   */
  changePage(pageNumber: number): void {
    this.currentPageChange.emit(pageNumber);
  }

}
