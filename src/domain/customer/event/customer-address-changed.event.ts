export default class CustomerAddressChangedEvent {
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}