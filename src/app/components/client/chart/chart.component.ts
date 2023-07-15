import { Heartbeat } from 'src/app/models/heartbeat.model';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { Chart, ChartConfiguration, ChartDataset, ChartOptions } from 'chart.js';
import { ClientService } from 'src/app/services/client.service';
import { ChartUtilsService } from 'src/app/services/chart-utils.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnChanges, OnInit, AfterViewInit  {
  @Input() updateData: number = 0;
  @Output() HeartBeatState = new EventEmitter<boolean>(false);

  showChart: boolean = false;

  static MAX_CHART_WIDTH = 850;

  public lineChartData: ChartConfiguration<'line'>['data'];
  data: number[][] = [];
  labels: string[] = [];

  public lineChartOptions: ChartOptions<'line'>;
  public lineChartLegend = true;

  heartbeats: number = 0;
  temperature: number = 0;
  oxymetry: number = 0;
  stress: number = 0;

  width: number = 400;
  height: number = 400;

  noHeartBeats: boolean = false;
  showHeartBeats: boolean = false;
  darkModeEnabled: boolean = false;

  screenWidth: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = this.utils.getChartWidth()
    this.getDataSet();
  }

  constructor(private api: ClientService, private utils: ChartUtilsService) {
    this.width = this.utils.getChartWidth();
    this.lineChartData = {
      labels: [],
      datasets: []
    }
    this.lineChartOptions = {}
    this.darkModeEnabled = this.utils.getMode();
  }

  ngOnInit(): void {
    this.lineChartOptions = this.utils.chartOptions(this.utils.getMode());
    this.getDataSet();
    setTimeout(()=> {
      console.log();
      this.utils.scrollToBottom();
    }, 500)
    this.showChart = true;
  }

  ngAfterViewInit(): void {
    this.api.modeChanged.subscribe((isDarkMode: boolean) => {
      this.darkModeEnabled = isDarkMode;
      this.updateChartInputs();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['updateData'].firstChange){
      this.getDataSet();
    }
  }

  getDataSet() {
    this.showChart = false;
    this.data = [];
    this.labels = [];
    this.api.getHeartBeat(this.updateData).subscribe((res: Heartbeat[]) => {
      let numberOfObjects = 0;
      if ((numberOfObjects = res.length) === 0) {
        this.noHeartBeats = true;
        this.HeartBeatState.emit(this.noHeartBeats);
        this.showHeartBeats = false;
        return;
      }

      this.noHeartBeats = false;
      this.HeartBeatState.emit(this.noHeartBeats);

      // Chronological order
      this.utils.sortObjects(res);

      // Max 4 objects to show in chart
      res = (numberOfObjects > 4 ? res.slice(-4) : res);

      // fill labels and data arrays
      [this.data, this.labels] = this.utils.fillData(res);

      this.updateChart();
    });
  }

  updateChartInputs(){
    this.lineChartOptions = this.utils.chartOptions(this.darkModeEnabled);
    this.lineChartData = this.utils.chartSchemeInit(this.data, this.labels);
  }

  updateChart(){
    setTimeout(()=> {
      this.updateChartInputs();
      this.showHeartBeats = true;
      this.heartbeats = this.data[0][this.data[0].length - 1];
      this.temperature = this.data[1][this.data[1].length - 1];
      this.oxymetry = this.data[2][this.data[2].length - 1];
      this.stress = this.data[3][this.data[3].length - 1];
    }, 150);


    setTimeout(()=> {
      this.showChart = true;
      this.utils.scrollToBottom();
    }, 600);
  }

  refresh(){
    this.getDataSet();
  }

  scrollToTop(){
    this.utils.scrollToTop();
  }

  scrollToBottom(){
    this.utils.scrollToBottom();
  }
}
