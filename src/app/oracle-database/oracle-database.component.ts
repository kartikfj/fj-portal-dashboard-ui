import { Component, OnInit } from '@angular/core';
import { OracleDatabaseService } from '../servic/oracle-database.service';

@Component({
  selector: 'app-oracle-database',
  templateUrl: './oracle-database.component.html',
  styleUrl: './oracle-database.component.css'
})
export class OracleDatabaseComponent implements OnInit{

  tables: string[] = [];
  columns: string[] = [];
  tableData: any[] = [];
  tableColumns: any[] = [];
  searchTerm: string = '';
  selectedTable: string = '';

  ngOnInit(): void {
    this.fetchTables();
   // throw new Error('Method not implemented.');
  }

  constructor(private oracleService: OracleDatabaseService) { }



  // Fetch tables with optional search term
  fetchTables(): void {
    this.oracleService.getTables(this.searchTerm).subscribe(
      (data) => {
        this.tables = data;
      },
      (error) => {
        console.error('Error fetching tables:', error);
      }
    );
  }

  // Fetch columns of a specific table
  fetchColumns(): void {
    if (this.selectedTable) {
      this.oracleService.getColumns(this.selectedTable).subscribe(
        (data) => {
          this.columns = data;
        },
        (error) => {
          console.error('Error fetching columns:', error);
        }
      );
    }
  }

  // Fetch data of a specific table
  fetchTableData(): void {
    if (this.selectedTable) {
      this.oracleService.getTableData(this.selectedTable).subscribe(
        (data) => {
          this.tableData = data;
        },
        (error) => {
          console.error('Error fetching table data:', error);
        }
      );
    }
  }

  // Fetch column information of a specific table
  fetchTableColumns(): void {
    if (this.selectedTable) {
      this.oracleService.getTableColumns(this.selectedTable).subscribe(
        (data) => {
          this.tableColumns = data;
        },
        (error) => {
          console.error('Error fetching table columns:', error);
        }
      );
    }
  }
}
