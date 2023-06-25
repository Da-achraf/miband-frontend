import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  sidebarItems = [
    { title: 'Dashbord', icon: 'fa-house', link: '/client/list', isActiveLight: true, isActiveDark: false },
    { title: 'Clients', icon: 'fa-hospital-user', link: '/client/list', isActiveLight: false, isActiveDark: false },
    { title: 'Heartbeats', icon: 'fa-chart-line', link: '/client/heartbeat', isActiveLight: false, isActiveDark: false },
  ];

  selectedItem: any;

  collapse : boolean = false;

  @Output() darkModeToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  darkModeEnabled = false;

  constructor(private router: Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    const storedArray = localStorage.getItem('sideBarItems');
    const storedVar = localStorage.getItem('darkModeEnabled');
    console.log(storedArray);

    if (storedArray && storedVar) {
      console.log('hey');

      this.sidebarItems = JSON.parse(storedArray);
      this.darkModeEnabled = JSON.parse(storedVar);
      console.log('Array retrieved:', this.sidebarItems);

      this.selectedItem = this.sidebarItems.find(item => {
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
    let inedx = this.sidebarItems.findIndex(item => {
      return item.title == this.selectedItem.title;
    });

    this.sidebarItems[inedx].isActiveDark = !this.sidebarItems[inedx].isActiveDark;
    this.sidebarItems[inedx].isActiveLight = !this.sidebarItems[inedx].isActiveLight;

    this.darkModeEnabled = !this.darkModeEnabled;
    this.darkModeToggled.emit(this.darkModeEnabled);
  }


  setActiveItem(item: any): void {
    this.selectedItem = item;
    let inedx = this.sidebarItems.findIndex(item => {
      return item.title == this.selectedItem.title;
    });

    this.sidebarItems[inedx].isActiveDark = !this.sidebarItems[inedx].isActiveDark;
    this.sidebarItems[inedx].isActiveLight = !this.sidebarItems[inedx].isActiveLight;
    this.sidebarItems.forEach((sidebarItem) => {
      sidebarItem.isActiveLight = (sidebarItem === item && !this.darkModeEnabled);
      sidebarItem.isActiveDark = (sidebarItem === item && this.darkModeEnabled);
    });

    localStorage.setItem('sideBarItems', JSON.stringify(this.sidebarItems));
    localStorage.setItem('darkModeEnabled', JSON.stringify(this.darkModeEnabled));

  }

  ngOnDestroy(): void {
    console.log('destroy');
  }

}
