import BatteryValue from "./interfaces/BatteryValue";

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class iQOS {
    bluetooth: Bluetooth;
    device: BluetoothDevice | undefined;
    server: BluetoothRemoteGATTServer | undefined;
    UUID_RRP_SERVICE: BluetoothRemoteGATTService | undefined;
    onUpdate: Function | undefined;
    batteryValue: BatteryValue | undefined;

    /**
     * @name iQOS
     * @namespace page.0x77.iqos
     * @description iQOS Device Status Class
     * @param bluetooth Bluetooth for browser use `navigator.bluetooth`
     */
    constructor(bluetooth: Bluetooth, onUpdate?: Function) {
        this.bluetooth = bluetooth;
        this.onUpdate = onUpdate;
    }

    /**
     * @name Start
     * @namespace page.0x77.iqos
     * @param requestDeviceOptions WebBluetooth RequestDeviceOptions
     */
    public async start(requestDeviceOptions?: RequestDeviceOptions) {
        await this.connect(requestDeviceOptions);
        await this.bootstrapBattery();
        this.UUID_RRP_SERVICE = await this.server?.getPrimaryService("daebb240-b041-11e4-9e45-0002a5d5c51b");
        await this.bootstrapBattery();
    }


    private async connect(options?: RequestDeviceOptions) {
        this.device = await this.bluetooth.requestDevice({
            filters: [{ services: ["daebb240-b041-11e4-9e45-0002a5d5c51b"] }],
            ...options
        });

        if (this.device.gatt !== undefined) this.server = await this.device.gatt.connect();
        else throw new Error("Cannot connect to GATT Server because device.gatt is undefined, maybe device is not connected.");
    }

    private async bootstrapBattery() {
        const batteryCharacteristic = await this.UUID_RRP_SERVICE?.getCharacteristic("f8a54120-b041-11e4-9be7-0002a5d5c51b");
        if (batteryCharacteristic !== undefined) {
            this.batteryValue = this.processbatteryValue(await batteryCharacteristic?.readValue());
            await batteryCharacteristic.startNotifications();
            // @ts-ignore
            batteryCharacteristic.addEventListener("characteristicvaluechanged", ((ev) => {
                // @ts-ignore
                this.batteryValue = this.processbatteryValue(ev.target.value);
            }));
        }
    }

    private processbatteryValue(value: DataView): BatteryValue {
        this.triggerUpdate();
        const int8array = new Uint8Array(value.buffer);
        //@ts-ignore
        window.int8array = int8array;
        if (int8array.length === 7) {
            // @ts-ignore
            return { holderReady: (int8array[6] > 0 ? true : false), case: int8array[4 - 1] };
        } else {
            return { case: int8array[4 - 1] };
        }
    }

    private triggerUpdate() {
        if (this.onUpdate) this.onUpdate(this);
    }

}

export default iQOS;
