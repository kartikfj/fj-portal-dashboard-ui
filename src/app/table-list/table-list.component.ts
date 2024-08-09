import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../servic/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.css'
})
export class TableListComponent implements OnInit{
tables:string[]=[];
selectedTable:string | null=null;
searchTerm: string = '';
constructor(private databaseService:DatabaseService,private router:Router){

}
ngOnInit(): void {
  this.loadTables();
}

// loadTables():void{
//   this.databaseService.getTableNames().subscribe(data=>{
//     this.tables=data;
//   })
// }
goBack() {
  this.router.navigate(['']); // Adjust this path to your main page route
}
loadTables(): void {
  this.databaseService.getTables(this.searchTerm).subscribe(tables => {
    this.tables = tables;
  });
}
onSearchChange(): void {
  this.loadTables();
}
onSelectTable(tableName:string):void{
  this.selectedTable=tableName;
}



}
