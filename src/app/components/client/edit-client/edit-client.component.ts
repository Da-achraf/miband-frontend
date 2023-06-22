import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../models/client.model';
import { ClientService } from 'src/app/services/client.service';
// import { SweetAlertService } from 'ngx-sweetalert2';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent {
  client: Client = new Client();
  editedSuccessfully: boolean = false;
  clientNotValid: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private navigation: Router,
    private clientService: ClientService,
  ) {}

  ngOnInit(): void {
    if (window.history.state['client']) this.client = window.history.state['client']
    else this.navigation.navigate(['client/list']);

    if (this.client) {
      window.history.replaceState(null, '');
    }
  }

  submitForm(): void {
    if (this.clientService.isValidClient(this.client)) {
        this.clientService.updateClient(this.client).subscribe((resp: any) => {
          if (resp === `the client ${this.client.nom} is updated successfully `){
            this.editedSuccessfully = true;
            setTimeout(() => {
              this.navigation.navigate(['/client/list'])
              this.editedSuccessfully = false;
            }, 3000)
          }
        });
      }
      else {
        this.clientNotValid = true;
        setTimeout(() => {
          this.clientNotValid = false;
        }, 5000)
      }
  }
}
