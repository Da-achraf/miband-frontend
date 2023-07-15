import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent {
  isModalOpen = false;
  selectedClient: Client | undefined;
  clients: Client[] = [];
  client: Client = new Client();
  deletedSuccessfully: boolean = false;
  showTable: boolean = false;

  page: number = 1;
  count: number = 0;
  tableSize: number = 4;

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
      if (this.clients.length != 0) this.showTable = true;
      this.count = this.clients.length;
    });
  }

  getClientById(id: number) {
    this.clientService.getOneClient(id).subscribe((res) => {
      this.client = res;
      this.isModalOpen = true;
      this.selectedClient = res;
    });
  }

  deleteClient(id: number): void {
    this.closeModal();

    this.client = this.clients.find((cli: Client) => {
      return cli.id === id;
    }) as Client;

    this.clients = this.clients.filter((cli: Client) => {
      return cli.id != id;
    });

    this.count = this.clients.length;

    const totalPages = Math.ceil(this.count / this.tableSize);

    if (this.page > totalPages && totalPages > 0) {
      this.page = totalPages;
    }

    this.clientService.deleteClient(id).subscribe((resp: any) => {
      if (resp == `the client ${this.client.nom} is deleted successfully `) {
        this.deletedSuccessfully = true;
        setTimeout(() => {
          this.deletedSuccessfully = false;
        }, 5000);
      }
    });
  }

  editClient(id: number): void {
    this.client = this.clients.find((cli: Client) => {
      return cli.id === id;
    }) as Client;

    if (this.client) {
      this.router.navigateByUrl('/client/edit', {
        state: { client: this.client },
      });
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getClients();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getClients();
  }
}
