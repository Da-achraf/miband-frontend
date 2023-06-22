import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ClientRoutingModule } from './client-routing.module';
import { FormsModule } from '@angular/forms';
import { AddClientComponent } from './add-client/add-client.component';
import { HeartbeatComponent } from './heartbeat/heartbeat.component'
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartComponent } from './chart/chart.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [AddClientComponent, ClientListComponent, EditClientComponent, HeartbeatComponent, ChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    ClientRoutingModule,
    NgxPaginationModule,
    NgChartsModule
  ],
  exports: [ClientListComponent, EditClientComponent, AddClientComponent, HeartbeatComponent]
})
export class ClientModule { }
