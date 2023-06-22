import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { Heartbeat } from '../models/heartbeat.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private url = 'http://154.49.137.28:8080';

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

  getHeartBeat(id: number){
    return this.http.get<Heartbeat[]>("http://154.49.137.28:8080/getHeartbeatsByClient/"+id)

  }

  getOneClient(client: Client) {
    return this.http.get<Client>("http://154.49.137.28:8080/getClientById/"+client.id);
  }

}
