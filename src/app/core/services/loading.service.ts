import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  setLoading(value: boolean): void {
    this.loadingSub.next(value);
  }
  
}
