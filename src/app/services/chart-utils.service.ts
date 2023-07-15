import { Injectable } from '@angular/core';
import { Heartbeat } from '../models/heartbeat.model';

@Injectable({
  providedIn: 'root',
})
export class ChartUtilsService {
  static MAX_CHART_WIDTH = 900;

  constructor() {}

  formatDate(date: Date): string {
    const inputDate = new Date(date);

    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear().toString().substr(-2);
    const hour = inputDate.getHours().toString().padStart(2, '0');
    const minute = inputDate.getMinutes().toString().padStart(2, '0');

    const formattedString = `${month}/${year} à ${hour}:${minute}`;

    return formattedString;
  }

  scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  chartSchemeInit(data: number[][], labels: string[]) {
    return {
      labels: labels,
      datasets: [
        {
          data: data[0],
          label: 'Heartbeats',
          backgroundColor: '#A78BFA',
          borderColor: '#A78BFA',
          pointBackgroundColor: '#A78BFA',
          pointHoverBorderColor: '#A78BFA',
        },
        {
          label: 'Température',
          data: data[1],
          backgroundColor: '#4ADE80',
          borderColor: '#4ADE80',
          pointBackgroundColor: '#4ADE80',
          pointHoverBorderColor: '#4ADE80',
        },
        {
          label: 'Oxymétrie',
          data: data[2],
          backgroundColor: '#38BDF8',
          borderColor: '#38BDF8',
          pointBackgroundColor: '#38BDF8',
          pointHoverBorderColor: '#38BDF8',
        },
        {
          label: 'Niveau de Stress',
          data: data[3],
          backgroundColor: '#FB923C',
          borderColor: '#FB923C',
          pointBackgroundColor: '#FB923C',
          pointHoverBorderColor: '#FB923C',
        },
      ],
    };
  }

  chartOptions(darkModeEnabled: boolean) {
    return {
      responsive: false,
      plugins: {
        legend: {
          labels: {
            color: darkModeEnabled ? '#DBE0E8' : 'black',
          },
        },
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Date',
            color: darkModeEnabled ? '#DBE0E8' : 'black',
          },
          ticks: {
            color: darkModeEnabled ? '#DBE0E8' : 'black',
          },
          grid: {
            display: true, //
            color: darkModeEnabled ? '#2C3E54' : '#DFDFE1',
            lineWidth: .7,
            drawBorder: false,
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Valeurs',
            color: darkModeEnabled ? '#DBE0E8' : '#DFDFE1',
          },
          grid: {
            display: true,
            color: darkModeEnabled ? '#2C3E54' : '#DFDFE1',
            lineWidth:  .8,
            drawBorder: false,
          },
          ticks: {
            color: darkModeEnabled ? '#DBE0E8' : 'black',
          },
        },
      },
    };
  }

  sortObjects(obj: any[]) {
    obj.sort((a, b) => {
      const dateA = new Date(a.date_prelevement);
      const dateB = new Date(b.date_prelevement);
      return dateA.getTime() - dateB.getTime();
    });
  }

  getMode() {
    let darkMode = localStorage.getItem('darkModeEnabled');
    return darkMode === '1' ? true : false;
  }

  // fill chart data and labels
  fillData(plainData: Heartbeat[]): [number[][], string[]] {
    let data: number[][] = [];
    let labels: string[] = [];
    plainData.forEach((heartbeat: Heartbeat) => {
      labels.push(this.formatDate(heartbeat.date_prelevement));
      for (let i = 1; i <= 4; i++) {
        const dataValue = parseInt((heartbeat as any)[`data${i}`]);

        if (!data[i - 1]) data[i - 1] = [];
        data[i - 1].push(dataValue);
      }
    });

    return [data, labels];
  }

  getChartWidth(): number {
    let screenWidth = window.innerWidth;
    if (screenWidth >= 640 && screenWidth <= 1190) return screenWidth - 286;
    else if (screenWidth < 640) return screenWidth - 20;
    else return ChartUtilsService.MAX_CHART_WIDTH;
  }
}
