import { Heartbeat } from "src/app/models/heartbeat.model";
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Chart } from "chart.js";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
})
export class ChartComponent implements OnChanges {
  @ViewChild("myChart") myChart!: ElementRef;

  chartInstance: Chart | null = null;

  @Input() info!: string;
  id: number = 0;

  heartbeat: Heartbeat[] = [];


  labels: string[] = [];
  heartbeats: number[] = []
  temperature: number[] = []
  oxymetry: number[] = []
  stress: number[] = []


  noHeartBeats: boolean = false;
  showHeartBeats: boolean = false;


  constructor(private api: ClientService) {}

  ngOnInit(): void {
    this.getIdFromParent(this.info);
    this.getheartbeats(this.id,);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getIdFromParent(this.info);
    this.getheartbeats(this.id,);
  }


  getheartbeats(id: number) {

    this.api.getHeartBeat(id).subscribe((res: Heartbeat[]) => {
      this.heartbeats = [];
      this.temperature = [];
      this.oxymetry = [];
      this.stress = [];
      this.labels = []
      if (res.length != 0) {
        this.showHeartBeats = true;
        this.noHeartBeats = false;
        this.heartbeat = res;
      }
      else{
        this.noHeartBeats = true;
        this.showHeartBeats = false;
        console.log("No heartbeat");
        return;
      }

      this.heartbeat.sort((a, b) => {
        const dateA = new Date(a.date_prelevement);
        const dateB = new Date(b.date_prelevement);
        return dateA.getTime() - dateB.getTime();
      });


      let max = 0;
      for (const heartbeat of this.heartbeat){
          this.labels[max] = this.formatDate(heartbeat.date_prelevement);
          this.heartbeats[max] = parseInt(heartbeat.data1);
          this.temperature[max] = parseInt(heartbeat.data2);
          this.oxymetry[max] = parseInt(heartbeat.data3);
          this.stress[max] = parseInt(heartbeat.data4);
          ++max;
      }

      this.createChart();

      console.log(this.heartbeats);
      console.log(this.labels);
    });

  }

  createChart(): void {
    const chartCtx = this.myChart.nativeElement.getContext("2d");

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }


    this.chartInstance = new Chart(chartCtx, {
      type: "line",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "Heartbeats",
            data: this.heartbeats,
            backgroundColor: '#A78BFA',
            borderColor: '#A78BFA',
            pointBackgroundColor: '#A78BFA',
            pointHoverBorderColor: '#A78BFA',
          },
          {
            label: "Température",
            data: this.temperature,
            backgroundColor: "#4ADE80",
            borderColor: '#4ADE80',
            pointBackgroundColor: '#4ADE80',
            pointHoverBorderColor: '#4ADE80'
          },
          {
            label: "Oxymétrie",
            data: this.oxymetry,
            backgroundColor: "#38BDF8",
            borderColor: '#38BDF8',
            pointBackgroundColor: '#38BDF8',
            pointHoverBorderColor: '#38BDF8',
          },
          {
            label: "Niveau de Stress",
            data: this.stress,
            backgroundColor: "#FB923C",
            borderColor: '#FB923C',
            pointBackgroundColor: '#FB923C',
            pointHoverBorderColor: '#FB923C',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  getIdFromParent(info: string): void {
    const knownWord = "id";
    const startIndex = info.indexOf(knownWord);
    const cutString = info.substring(startIndex + knownWord.length).trim();
    console.log(`cut string: ${cutString}`);
    this.id = parseInt(cutString);
    console.log(this.id);
  }

  formatDate(date: Date): string {
    const inputDate = new Date(date);

    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear().toString().substr(-2);
    const hour = inputDate.getHours().toString().padStart(2, '0');
    const minute = inputDate.getMinutes().toString().padStart(2, '0');

    const formattedString = `${month}/${year} ${hour}:${minute}`;

    return formattedString;
  }
}
