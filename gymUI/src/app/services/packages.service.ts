import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Packages } from '../models/packages';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })

export class PackageService {

  packagesList : Packages[] = [];
  subject : BehaviorSubject<Packages[]> = new BehaviorSubject(this.packagesList);

  constructor(private http:HttpClient) {
    
  }

  ngOnInit():void{
    this.fetchFromServer();
  }

  fetchFromServer() {
    return this.http.get<Packages[]>("http://localhost:8020/packageinfos",{})
    .subscribe(notes=>{
      this.packagesList = notes;
      this.subject.next(this.packagesList);
    }, (err: any) => {
      this.subject.error(err);
    });
  }

  getPackage(): BehaviorSubject<Array<Packages>> {
    return this.subject;
  }

  addPackage(pck: Packages): Observable<Packages> {
    return this.http.post<Packages>("http://localhost:8020/packageinfos",pck,{})
    .pipe(
      tap(pck => {
      console.log(pck);
      this.packagesList.push(pck);
      this.subject.next(this.packagesList)
    }));
    
  }

  // editPackage(pck: Packages): Observable<Packages> {
  //   return this.http.put<Packages>("http://localhost:3000/api/v1/notes/${note.id}",pck,{
  //   })
  //   .pipe(
  //     tap(editedPck => {
  //     // console.log(note);
  //     // this.notesList.push(note);
  //     const existingPck = this.packagesList.find(pckValue => pckValue.packageid === editedPck.packageid);
  //     Object.assign(existingPck, editedPck);
  //     this.subject.next(this.packagesList)
  //   }));

  // }

  // getById(pckID:number): Packages {
  //   const c = this.packagesList.find(program=>program.packageid==pckID);
  //   return Object.assign({},c);
  // }
}
