import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { Heartbeat } from '../models/heartbeat.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private url = 'http://16.171.143.229:8080';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.url}/listClients`);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.url}/getClientById/${id}`);
  }


  postClient(client: Client): Observable<any> {
    return this.http.post(`${this.url}/saveClient`, client, {
      responseType: 'text',
    });
  }

  updateClient(client: Client): Observable<any> {
    const ID = client.id;
    const { id, ...body } = client;
    console.log(`body ${body}`);

    return this.http.put(`${this.url}/updateClient/${ID}`, body, {
      responseType: 'text',
    });
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.url}/deleteClient/${id}`, {
      responseType: 'text',
    });
  }

  isValidClient(client: Client): boolean {
    if (
      client.mac &&
      client.nom &&
      client.prenom &&
      client.tel &&
      client.mail &&
      client.adresse
    )
      return true;
    else return false;
  }

  getHeartBeat(id: number): Observable<Heartbeat[]>{
    return this.http.get<Heartbeat[]>(`${this.url}/getHeartbeatsByClient/${id}`)

  }

  getOneClient(id: number) {
    return this.http.get<Client>(`${this.url}/getClientById/${id}`);
  }

  isDarkMode: boolean = false;
  modeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.modeChanged.emit(this.isDarkMode);
  }

  private selectedClientSubject = new BehaviorSubject<number>(0);
  selectedClient$ = this.selectedClientSubject.asObservable();

  setSelectedClient(id: number): void {
    this.selectedClientSubject.next(id);
  }

}
