import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SystemCpu } from '../model/SystemCpu';
import { SystemHealth } from '../model/SystemHealth';
import { DashboardService } from '../service/dashboard/dashboard.service';
import Chart from 'chart.js/auto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  public traceList: any[] = [];
  public selectedTrace: any;
  public systemHealth: SystemHealth;
  public systemCpu: SystemCpu;
  public processUpTime: string;
  public http200Traces: any[] = [];
  public http400Traces: any[] = [];
  public http404Traces: any[] = [];
  public http500Traces: any[] = [];
  public httpDefaultTraces: any[] = [];
  private timestamp: number;
  public pageSize = 10;
  public page = 1;

  constructor(private _dashboardService: DashboardService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    // this.http200Traces = [];
    // this.http400Traces = [];
    // this.http404Traces = [];
    // this.http500Traces = [];
    // this.httpDefaultTraces = [];
    this.getTraces();
    this.getCpuUsage();
    this.getSystemHealth();
  }




  public getTraces() {
    this._dashboardService.getHttpTraces().subscribe((response: any) => {
      console.log("response ", response.traces);
      this.seperateHttpTypes(response.traces);
      this.initializeBarChart();
      this.initializepolarAreaChart();
    }, (error: any) => {
      this.toastrService.error(error);
    })
  }

  seperateHttpTypes(traces: any) {
    this.traceList = traces;
    this.traceList.forEach(trace => {
      switch (trace.response.status) {
        case 200:
          this.http200Traces.push(trace);
          break;
        case 400:
          this.http400Traces.push(trace);
          break;
        case 404:
          this.http404Traces.push(trace);
          break;
        case 500:
          this.http500Traces.push(trace);
          break;
        default:
          this.httpDefaultTraces.push(trace);
      }
    });


  }


  public onSelectTrace(trace: any): void {
    console.log(trace)
    this.selectedTrace = trace;
    document.getElementById('trace-modal').click();
  }

  private getCpuUsage() {
    this._dashboardService.getSystemCpu().subscribe(
      (response: SystemCpu) => {
        console.log(response);
        this.systemCpu = response;
      },
      (error: HttpErrorResponse) => {
        this.toastrService.error(error.message);
      }
    );
  }


  private getSystemHealth() {
    this._dashboardService.getSystemHealth().subscribe(
      (response: SystemHealth) => {
        console.log("response ", response)
        this.systemHealth = response;
        this.systemHealth.components.diskSpace.details.free = this.formatBytes(this.systemHealth.components.diskSpace.details.free);
      },
      (error: HttpErrorResponse) => {
        this.systemHealth = error.error;
        this.systemHealth.components.diskSpace.details.free = this.formatBytes(this.systemHealth.components.diskSpace.details.free);
      }
    );
  }


  private formatBytes(bytes): string {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = 2 < 0 ? 0 : 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  private initializepolarAreaChart() {
    var element = document.getElementById('polarArea');
    // const elem = this.myChart.nativeElement
    return new Chart(element, {
      type: 'polarArea',
      data: {
        labels: ['200', '404', '400', '500'],
        datasets: [{
          data: [this.http200Traces.length, this.http404Traces.length, this.http400Traces.length, this.http500Traces.length],
          backgroundColor: ['rgb(75,192,192)', 'rgb(255,205,86)', 'rgb(201,203,207)', 'rgb(255,99,132)'],
          borderColor: ['rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(255,255,255)'],
          borderWidth: 1,
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(173, 53, 186, 0.1)",
        }]
      },
      options: {
        title: { display: true, text: [`Last 100 Requests as of ${this.formatDate(new Date())}`] },
        legend: { display: false },
        scales: {

          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


  private initializeBarChart() {
    var element = document.getElementById('barChart');
    // const elem = this.myChart.nativeElement
    return new Chart(element, {
      type: 'radar',
      data: {
        labels: ['200', '404', '400', '500'],
        datasets: [{
          data: [this.http200Traces.length, this.http404Traces.length, this.http400Traces.length, this.http500Traces.length],
          backgroundColor: ['rgb(75,192,192)', 'rgb(255,205,86)', 'rgb(201,203,207)', 'rgb(255,99,132)'],
          borderColor: ['rgb(75,192,192)', 'rgb(255,205,86)', 'rgb(201,203,207)', 'rgb(255,99,132)'],
          borderWidth: 1,
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(173, 53, 186, 0.1)",
        }]
      },
      options: {
        title: { display: true, text: [`Last 100 Requests as of ${this.formatDate(new Date())}`] },
        legend: { display: false },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


  private formatDate(date: Date): string {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const year = date.getFullYear();
    if (dd < 10) {
      const day = `0${dd}`;
    }
    if (mm < 10) {
      const month = `0${mm}`;
    }
    return `${mm}/${dd}/${year}`;
  }
}


