export default class CustomerCreatedEvent {
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}