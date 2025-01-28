import { Component } from '@angular/core';
import { AppinitService } from './core/services/appinit.service';
import { select, Store } from '@ngrx/store';
import { selectError, selectSuccessAction } from './feature/store/selectors/employee.selectors';
import { clearError } from './feature/store/actions/employee.actions';
import { Unsubscriber } from './core/utilties/unsubscriber';
import { ActionTypes } from './feature/store/actions/actions.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Unsubscriber {
  msg = ""
  showNotification = false
  clrAlertType=''
  title = "Hierarchical Organization Chart"

  constructor(private appInitService: AppinitService, private store: Store) {
    super()
  }

  ngOnInit(): void {
    this.appInitService.initializeApp();
    this.handleAppWideNotifications();
  }

  handleAppWideNotifications() {
    this.subs = this.store.pipe(select(selectError)).subscribe((errMsg) => {
      if (errMsg) {
        this.showNotification = true
        this.msg = errMsg;
        this.clrAlertType="danger"
        this.store.dispatch(clearError())
        this.hideNotificationAfterTimeout()
      }
    })
    
    this.subs = this.store.pipe(select(selectSuccessAction)).subscribe((action) => {
      if (action) {
        switch(action){
          case ActionTypes.AddReportee:
            this.msg="Reportee added successfully";
            break;
          case ActionTypes.DeleteEmployee:
              this.msg="Employee Deleted successfully";
              break;
          case ActionTypes.ChangeReportingLine:
            this.msg="Reporting Changed successfully for the Employee";
            break;
          default:
            return;
        }
        this.showNotification = true
        this.clrAlertType="success"
        this.hideNotificationAfterTimeout()
      }
    })
  }

  private hideNotificationAfterTimeout() {
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}
