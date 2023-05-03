import {Component, ViewChild, Input} from '@angular/core';
import {MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import {ReportInterface} from "../../types/ReportInterface";
import {MatTableDataSource} from "@angular/material/table";
import {ReportsService} from "../../services/reports.service";
import {saveAs} from "file-saver";
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent {
  public displayedColumns: string[] = ['createdAt', 'from', 'until', 'devices', 'status', 'action'];
  @Input() data: ReportInterface[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private reportsService: ReportsService, private translate: TranslateService, private matPaginatorIntl: MatPaginatorIntl) {
  }
  ngOnInit(): void {
    this.translate.get('itemsPerPage').subscribe((res: string) => {
      this.matPaginatorIntl.itemsPerPageLabel = res;
    });
    this.getReports(0);
  }

  getReports(pageNumber: number) {
    this.reportsService.getAllReports(pageNumber).subscribe({
      next: (elements:any) => {
        this.dataSource = new MatTableDataSource(elements.content);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert('Error while fetching reports');
      },
    });
  }
  onPaginateChange(event: PageEvent) {
    const pageNumber = event.pageIndex;
    this.getReports(pageNumber);
  }
  downloadReport(id: number, format: 'CSV' | 'KML') {
    this.reportsService.downloadReport(id).subscribe((buffer) => {
      const data: Blob = new Blob([buffer], {
        type: "text/csv;charset=utf-8"
      });
      if (format === 'CSV') {
       return  saveAs(data, "report-" + id + ".csv");
      }
      return saveAs(data, "report-" + id + ".kml");
    });
  }
}  

