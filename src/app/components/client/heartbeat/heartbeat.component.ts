import { Component } from '@angular/core';
import { ClientListComponent } from '../client-list/client-list.component';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';
import { Heartbeat } from 'src/app/models/heartbeat.model';
@Component({
  selector: 'app-heartbeat',
  templateUrl: './heartbeat.component.html',
  styleUrls: ['./heartbeat.component.css']
})
export class HeartbeatComponent {

  chart = [];

  show: boolean = false;

  isClicked: boolean = false;

  info: string = '';

  clients: Client[] = [];
  heartbeat: Heartbeat[] = [];

  page: number = 1;
  count: number = 0;
  tableSize: number = 3;

  selectedRowIndex: number | null = null;

  constructor(private api:ClientService){
  }
  ngOnInit():void {
    this.getclient();
  }

  getclient(){
    this.api.getClients().subscribe( res =>{
      this.clients = res;
    })
  }

  showHeartBeat(id: number): void {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;

    let info = `clicked${randomNumber}id${id}`;
    this.info = info;
    this.show = true;
    this.isClicked = true;
  }


  onTableDataChange(event: any) {
    this.page = event;
    this.getclient();
    }

    onTableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.getclient();
    }


    selectRow(client: Client): void{
      this.clients.forEach((cli: Client) => {
        cli.selected = false;
      });

      this.selectedRowIndex = client.id;

      client.selected = true;
    }
}

