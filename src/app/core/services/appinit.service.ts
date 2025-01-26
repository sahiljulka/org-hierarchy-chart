import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AppinitService {

  constructor(private localStorageService: LocalstorageService) {}

  initializeApp(): void {
    this.localStorageService.initializeLocalStorage();
  }
}
