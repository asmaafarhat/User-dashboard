import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core'
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input() totalItems: number | undefined;
  @Input() pageSize: number | undefined;
  @Output() pageChanged = new EventEmitter<PageEvent>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  onPageChange(event: PageEvent) {
    this.pageChanged.emit(event);
  }
}