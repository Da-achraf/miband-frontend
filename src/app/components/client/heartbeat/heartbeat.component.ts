import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ClientListComponent } from '../client-list/client-list.component';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';
import { Heartbeat } from 'src/app/models/heartbeat.model';
import { ChartUtilsService } from 'src/app/services/chart-utils.service';
import { ChartComponent } from '../chart/chart.component';
@Component({
  selector: 'app-heartbeat',
  templateUrl: './heartbeat.component.html',
  styleUrls: ['./heartbeat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeartbeatComponent {

  @ViewChild(ChartComponent, { static: false }) chartComponent!: ChartComponent;

  show: boolean;
  heartBeatState: boolean;

  responsive: boolean = true;

  isClicked: boolean = false;

  id: number = 0;

  clients: Client[] = [];
  heartbeat: Heartbeat[] = [];


  darkModeEnabled: boolean = false;

  page: number = 1;
  count: number = 0;
  tableSize: number = 3;

  selectedRowIndex: number | null = null;

  constructor(private api: ClientService, private utils:ChartUtilsService) {
    this.heartBeatState = false;
    this.show = false;
    this.darkModeEnabled = this.utils.getMode();
  }

  ngOnInit(): void {
    this.getclient();
  }

  ngAfterViewInit(): void {
    this.api.modeChanged.subscribe((isDarkMode: boolean) => {
      this.darkModeEnabled = isDarkMode;
    });
  }

  emitScrollToBottom(){
    if(this.chartComponent) this.chartComponent.scrollToBottom();
  }

  getclient() {
    this.api.getClients().subscribe((res) => {
      this.clients = res;
    });
  }

  showHeartBeat(id: number): void {
    this.id = id;
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

  selectRow(client: Client): void {
    this.clients.forEach((cli: Client) => {
      cli.selected = false;
    });

    this.selectedRowIndex = client.id;

    client.selected = true;
  }

  scrollToBottom(){
    this.utils.scrollToBottom();
  }

  handleHeartBeatState(heartBeatState: boolean){
    console.log(heartBeatState);
    this.heartBeatState = heartBeatState;
  }
}
