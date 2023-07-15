import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  sidebarItems: any;
  selectedItem: any;

  collapse : boolean = false;

  @Output() darkModeToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  darkModeEnabled = false;

  constructor(private router: Router, private activatedRoute:ActivatedRoute, private clientService: ClientService){
    this.sidebarItems = [
      // { title: 'Dashbord', icon: 'fa-house', link: '/client/list', isActiveLight: true, isActiveDark: false },
      { title: 'Clients', icon: 'fa-hospital-user', link: '/client/list', isActiveLight: true, isActiveDark: false },
      { title: 'Heartbeats', icon: 'fa-chart-line', link: '/client/heartbeat', isActiveLight: false, isActiveDark: false },
    ];
    localStorage.setItem('sideBarItems', JSON.stringify(this.sidebarItems));
  }

  ngOnInit(): void {
    const storedArray = localStorage.getItem('sideBarItems');
    console.log(storedArray);

    if (storedArray) {
      console.log('hey');

      this.sidebarItems = JSON.parse(storedArray);

      console.log('Array retrieved:', this.sidebarItems);

      this.selectedItem = this.sidebarItems.find((item: any) => {
        return (item.isActiveDark || item.isActiveLight);
      })

    } else {
      console.log('No array found in local storage.');
    }
  }

  hide() : void {
    this.collapse = this.collapse;
  }


  toggleDarkMode() {
    localStorage.removeItem('darkModeEnabled');
    let inedx = this.sidebarItems.findIndex((item: any) => {
      return item.title == this.selectedItem.title;
    });

    this.sidebarItems[inedx].isActiveDark = !this.sidebarItems[inedx].isActiveDark;
    this.sidebarItems[inedx].isActiveLight = !this.sidebarItems[inedx].isActiveLight;

    this.darkModeEnabled = !this.darkModeEnabled;
    this.darkModeToggled.emit(this.darkModeEnabled);

    this.clientService.toggleMode();

    localStorage.setItem('darkModeEnabled', this.darkModeEnabled ? '1' : '0');
  }


  setActiveItem(item: any): void {
    this.selectedItem = item;
    let inedx = this.sidebarItems.findIndex((item: any) => {
      return item.title == this.selectedItem.title;
    });

    this.sidebarItems[inedx].isActiveDark = !this.sidebarItems[inedx].isActiveDark;
    this.sidebarItems[inedx].isActiveLight = !this.sidebarItems[inedx].isActiveLight;
    this.sidebarItems.forEach((sidebarItem: any) => {
      sidebarItem.isActiveLight = (sidebarItem === item && !this.darkModeEnabled);
      sidebarItem.isActiveDark = (sidebarItem === item && this.darkModeEnabled);
    });

    localStorage.setItem('sideBarItems', JSON.stringify(this.sidebarItems));

  }

  doIt(): void {
    this.setActiveItem(this.sidebarItems[0]);
  }

}
