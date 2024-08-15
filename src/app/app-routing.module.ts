import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableListComponent } from './table-list/table-list.component';
import { TableDetailsComponent } from './table-details/table-details.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tables', component: TableListComponent },
  { path: 'tables/:tableName', component: TableDetailsComponent },
  { path: 'user', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
