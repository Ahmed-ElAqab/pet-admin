import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemCpu } from 'src/app/model/SystemCpu';
import { SystemHealth } from 'src/app/model/SystemHealth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private SERVER_URL = environment.apiUrl;


  constructor(private _http: HttpClient) { }

  public getHttpTraces(): Observable<any> {
    return this._http.get<any>(`${this.SERVER_URL}actuator/httptrace`);
  }

  public getSystemHealth(): Observable<SystemHealth> {
    return this._http.get<SystemHealth>(`${this.SERVER_URL}actuator/health`);
  }

  public getSystemCpu(): Observable<SystemCpu> {
    return this._http.get<SystemCpu>(`${this.SERVER_URL}actuator/metrics/system.cpu.count`);
  }

  public getProcessUptime(): Observable<any> {
    return this._http.get<any>(`${this.SERVER_URL}actuator/metrics/process.uptime`);
  }
}
