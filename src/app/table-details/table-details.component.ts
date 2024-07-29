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
        })
      }
    }
    searchUserData():void{
      if(this.tableName && this.userId){
        this.databaseService.getUserData(this.tableName,this.userId).subscribe(data=>{
          this.userData=data;
        })
      }
    }
    
}
