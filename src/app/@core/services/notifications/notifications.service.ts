import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly DISPLAY_SUCCESS_TIME = 3000;
  private readonly DISPLAY_ERROR_TIME = 12000;

  showSuccess(message: string, displayTime?: number) {
    alert(message);
    // notify(message, 'success', displayTime || this.DISPLAY_SUCCESS_TIME);
  }

  showInfo(message: string, displayTime?: number) {
    alert(message);
    // notify(message, 'info', displayTime || this.DISPLAY_SUCCESS_TIME);
  }

  showWarning(message: string, displayTime?: number) {
    alert(message);
    // notify(message, 'warning', displayTime || this.DISPLAY_SUCCESS_TIME);
  }

  showError(message: string, displayTime?: number) {
    alert(message);
    // notify(message, 'error', displayTime || this.DISPLAY_ERROR_TIME);
  }
}
