import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { StaffService } from '../../services/staff.service';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

export interface Staff {
  name: string;
  email: number;
  
}

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class StaffComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email'];
  staffData: Staff[] = [];
  dataSource: Array<Staff> = [];
  filters: any;
  filterKeys: any;
  datalist: any = [];

  limit = 10;
  page = 1;
  totalDataCount: any ;
  reducer = (accumulator: boolean, currentValue: boolean) => accumulator && currentValue;
  @ViewChild(MatPaginatorModule) paginator: MatPaginatorModule | undefined;

  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(private _staffService: StaffService) { }

  ngOnInit(): void {
    this.loadStaffList();
  }

  loadStaffList(limit: any = this.limit, page: any = this.page, prevSize : any = 0) {
    this.limit = limit;
    this.page = page;
    let  param = {
      page : page,
      limit: limit,
    };
   
    this._staffService.getStaffList(param).subscribe(response => {
      if (response.success) {
        if (this.page > 1) {
          if (prevSize != 0) {
            this.datalist.length = prevSize;
          } else {
            this.datalist.length = this.limit * (this.page - 1) ;
          }
          this.datalist.push(...response.data);
        } else{
          this.datalist = response.data || [];
        }

        this.dataSource = this.datalist;
        this.filters = {};
      }
    },
    error => {
    });
  }

  applyFilter(column: string, filterValue: string) {
    if ( !this.filters[column]) {
      this.filters[column] = ""
    }
  }

  setupFilter() {
    return (d: any, filter: string) => {
      let conditions: any;
      conditions = [];
      this.filterKeys.forEach((filterKey: string) => {
        conditions.push(this.searchString(d[filterKey], this.filters[filterKey]))
      });

      return conditions.reduce(this.reducer);
    };
  }
  searchString(columnValue: string, filterVales: string) {
    const textToSearch = columnValue && columnValue.toLowerCase() || '';
    return textToSearch.indexOf(filterVales.toLowerCase() ) !== -1;
  }

  getCounter(i:any, paginator:any ){
    return (i +1 + (paginator.pageIndex * paginator.pageSize));
  }

  pageChanged(event:any){
    let pageIndex = event.pageIndex + 1;
    let limit = event.pageSize;

    let previousIndex = event.previousPageIndex;

    let previousSize = limit * event.pageIndex;

    this.loadStaffList( limit, pageIndex, previousSize);
  }
}
