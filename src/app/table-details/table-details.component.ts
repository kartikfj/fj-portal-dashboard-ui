import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatabaseService } from '../servic/database.service';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrl: './table-details.component.css'
})
export class TableDetailsComponent implements OnChanges{
  @Input() tableName:string | null=null;
  columns:any[]=[];
  data:any[]=[];
  userId:string='';
  userData:any[]=[];
 // Pagination properties
 currentPage: number = 1;
 itemsPerPage: number = 10;
 paginatedData: any[] = [];
  constructor(private databaseService:DatabaseService){

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['tableName'] && this.tableName){
      this.loadColumns();
      this.loadData();
    }
  }
    loadColumns():void{
      if(this.tableName){
        this.databaseService.getTableColumns(this.tableName).subscribe(data=>{
          this.columns=data;
        })
      }
    }
    loadData():void{
      if(this.tableName){
        this.databaseService.getTableData(this.tableName).subscribe(data=>{
          this.data=data;
          this.updatePageData();
        })
      }
    }
    updatePageData(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.paginatedData = this.data.slice(startIndex, startIndex + this.itemsPerPage);
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
      return Math.ceil(this.data.length / this.itemsPerPage);
    }
  
    searchUserData():void{
      if(this.tableName && this.userId){
        this.databaseService.getUserData(this.tableName,this.userId).subscribe(data=>{
          this.userData=data;
        })
      }
    }
    
}
