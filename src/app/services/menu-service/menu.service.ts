import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private isMenuOpenSubject = new BehaviorSubject<boolean>(false);
  isMenuOpen$ = this.isMenuOpenSubject.asObservable();
  
  private isBlurActiveSubject = new BehaviorSubject<boolean>(false);
  isBlurActive$ = this.isBlurActiveSubject.asObservable();
  
  constructor() { }

  toggleMenu() : void {
    this.isMenuOpenSubject.next(!this.isMenuOpenSubject.value);
    this.isBlurActiveSubject.next(!this.isBlurActiveSubject.value);
  }

  closeMenu() : void {
    this.isMenuOpenSubject.next(false);
    this.isBlurActiveSubject.next(false);
  }
}
