import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router:Router,
              private location:Location) {}

  routeToDashboardAdmin() {
    this.router.navigate(['dashboard/admin'])
    
  }
  routeToDashboardCustomer() {
    this.router.navigate(['dashboard/customer']);
  }
  routeToDashboardMarkTeam() {
    this.router.navigate(['dashboard/marketing-team']);
  }

  routeToLogin() {
    this.router.navigate(['login']);
  }

  routeToRegister() {
    this.router.navigate(['register'])
  }

  // routeToEditNoteView(noteId) {
  //   this.router.navigate(['/dashboard', {
  //     outlets: {
  //       noteEditOutlet: ['note', noteId, 'edit'],
  //     }
  //   }]);
  // }

  routeBack() {
    this.location.back();
  }

  // routeToNoteView() {
  //   this.router.navigate(['/dashboard/view/noteView']);
  // }

  // routeToListView() {
  //   this.router.navigate(['/dashboard/view/listView']);
  // }

  routeToAllPrograms(){
    this.router.navigate(['dashboard/customer/all'])

  }
  routeToEnrolledPrograms(){
    this.router.navigate(['dashboard/customer/enrolled'])
  }
  
}
