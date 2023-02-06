import _ from 'lodash';
import { ReplaySubject } from 'rxjs';
import { AlertColor } from '@mui/material/Alert';

export enum ALERT_SEVERITY {
    error = 'error',
    warning = 'warning',
    info = 'info',
    success = 'success',
}

export interface AlertMessage {
    message: string;
    severity: AlertColor;
    date: Date;
    duration: number | null;
}

export class AlertMessageService {
    private static readonly DEFAULT_DURATION_TIME = 3000;
    private static readonly DO_NOT_AUTO_HIDE_TIME = null;
    private messageQueue: Array<AlertMessage> = [];
    private _queueEvent = new ReplaySubject();
    public queueEvent$ = this._queueEvent.asObservable();
    private currentAlertMessage?: AlertMessage = undefined;

    public addAlertMessage(message: string, severity: AlertColor, duration?: number | null) {
        const messageObj: AlertMessage = {
            message: message,
            severity: severity,
            date: new Date(),
            duration: duration || AlertMessageService.getDefaultDurationTime(severity),
        };

        this.messageQueue.push(messageObj);
        this._queueEvent.next('push');
    }

    private static getDefaultDurationTime(severity: AlertColor): number|null {
        switch (severity) {
            case ALERT_SEVERITY.error:
            case ALERT_SEVERITY.warning:
                return this.DO_NOT_AUTO_HIDE_TIME;
            case ALERT_SEVERITY.success:
            case ALERT_SEVERITY.info:
                return this.DEFAULT_DURATION_TIME;
            default:
                return null;
        }
    }

    public pullAlertMessage(): AlertMessage | undefined {
        if (this.messageQueue.length < 0) {
            return undefined;
        }
        this.currentAlertMessage = _.pullAt(this.messageQueue, 0)[0];
        return this.currentAlertMessage;
    }

    public getCurrentAlertMessage() {
        return this.currentAlertMessage;
    }

    public isMessageQueueEmpty() {
        return this.messageQueue.length === 0;
    }

    public queueLength() {
        return this.messageQueue.length;
    }
}

export default new AlertMessageService();
