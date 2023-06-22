import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { AddClientComponent } from './add-client/add-client.component';
import { HeartbeatComponent } from './heartbeat/heartbeat.component';

const routes: Routes = [
  {
    path: 'list',
    component: ClientListComponent,
  },
  {
    path: 'edit',
    component: EditClientComponent,
  },
  {
    path: 'add',
    component: AddClientComponent,
  },
  {
    path: 'heartbeat',
    component: HeartbeatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
