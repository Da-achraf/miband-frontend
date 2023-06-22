import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {

  client: Client = new Client();
  addedSuccessfully: boolean = false;
  clientNotValid: boolean = false;

  constructor(private clientService: ClientService,
              private navigation: Router) {}
  ngOnInit(): void {
  }

  submit(client: Client) {
    if (this.clientService.isValidClient(client)){
      this.clientService.postClient(client).subscribe((resp: any) => {
        if (resp === `the client ${client.nom} is added successfully `){
          this.addedSuccessfully = true;
          setTimeout(() => {
            this.addedSuccessfully = false;
          }, 5000)
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
  // redirect() {
  //   // console.log(this.client);

  //   // this.navigation.navigate(['client/list']);
  //   // window.location.href = 'http://localhost:4200/clients';
  // }
  // // getclient() {
  // //   this.clientService.getclient().subscribe((res) => {
  // //     this.client = res;
  // //   });
  // // }

}
