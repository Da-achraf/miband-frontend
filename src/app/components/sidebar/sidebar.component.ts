import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  collapse : boolean = true;

  hide() : void {
    this.collapse = this.collapse;
  }


  @Output() darkModeToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  darkModeEnabled = false;

  toggleDarkMode() {
    this.darkModeEnabled = !this.darkModeEnabled;
    this.darkModeToggled.emit(this.darkModeEnabled);
  }



}
