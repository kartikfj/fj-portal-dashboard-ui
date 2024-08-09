import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatabaseService } from '../servic/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.css'] // Corrected to styleUrls
})
export class TableDetailsComponent implements OnChanges {
  @Input() tableName: string | null = null;
  columns: any[] = [];
  data: any[] = [];
  userId: string = '';
  userData: any[] = [];
  filteredData: any[] = [];
  searchQuery: string = '';
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  paginatedData: any[] = [];

  constructor(private databaseService: DatabaseService,private router:Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableName'] && this.tableName) {
      this.loadColumns();
      this.loadData();
    }
  }
  goBack() {
    this.router.navigate(['']); // Adjust this path to your main page route
  }
  loadColumns(): void {
    if (this.tableName) {
      this.databaseService.getTableColumns(this.tableName).subscribe(data => {
        this.columns = data;
      });
    }
  }

  loadData(): void {
    if (this.tableName) {
      this.databaseService.getTableData(this.tableName).subscribe(data => {
        this.data = data;
        this.filterTableData(); // Filter and paginate after loading data
      });
    }
  }

  filterTableData(): void {
    if (this.searchQuery) {
      this.filteredData = this.data.filter(row => {
        return Object.values(row).some(value =>
          value != null && value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    } else {
      this.filteredData = [...this.data];
    }
    this.updatePageData(); // Update pagination after filtering
  }

  updatePageData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePageData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updatePageData();
    }
  }

  totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage); // Calculate based on filtered data
  }

  searchUserData(): void {
    if (this.tableName && this.userId) {
      this.databaseService.getUserData(this.tableName, this.userId).subscribe(data => {
        this.userData = data;
      });
    }
  }
}
