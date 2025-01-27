import { Component } from '@angular/core';
import { AppinitService } from './core/services/appinit.service';
import { select, Store } from '@ngrx/store';
import { selectError } from './feature/store/selectors/employee.selectors';
import { clearError } from './feature/store/actions/employee.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  errMsg=""
  showError=false
  title="Hierarchical Organization Chart"

  constructor(private appInitService: AppinitService, private store: Store) { }

  ngOnInit(): void {
    this.appInitService.initializeApp();
    this.store.pipe(select(selectError)).subscribe((errMsg) => {
      if (errMsg){
        this.showError=true
        this.errMsg=errMsg;
        this.store.dispatch(clearError())
      }
    })
  }

  onClose(){
    this.showError=false
  }
}
