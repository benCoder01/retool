import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {MasterRecordModule} from './master-record/master-record.module';
import {MasterRecordListComponent} from './master-record/master-record-list/master-record-list.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {PileViewComponent} from './invoice/pile-view/pile-view.component';
import {InvoiceModule} from './invoice/invoice.module';
import {InvoiceListComponent} from './invoice/invoice-list/invoice-list.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'master-records', component: MasterRecordListComponent},
  {path: 'piles', component: PileViewComponent, pathMatch: 'full'},
  {path: 'pile/:id', component: InvoiceListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterModule.forRoot(routes),
    MasterRecordModule,
    MatIconModule,
    MatButtonModule,
    InvoiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
