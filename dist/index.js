"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/class-name-casing
var iQOS = /** @class */ (function () {
    /**
     * @name iQOS
     * @namespace page.0x77.iqos
     * @description iQOS Device Status Class
     * @param bluetooth Bluetooth for browser use `navigator.bluetooth`
     */
    function iQOS(bluetooth, onUpdate) {
        this.bluetooth = bluetooth;
        this.onUpdate = onUpdate;
    }
    /**
     * @name Start
     * @namespace page.0x77.iqos
     * @param requestDeviceOptions WebBluetooth RequestDeviceOptions
     */
    iQOS.prototype.start = function (requestDeviceOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.connect(requestDeviceOptions)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, this.bootstrapBattery()];
                    case 2:
                        _c.sent();
                        _b = this;
                        return [4 /*yield*/, ((_a = this.server) === null || _a === void 0 ? void 0 : _a.getPrimaryService("daebb240-b041-11e4-9e45-0002a5d5c51b"))];
                    case 3:
                        _b.UUID_RRP_SERVICE = _c.sent();
                        return [4 /*yield*/, this.bootstrapBattery()];
                    case 4:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    iQOS.prototype.connect = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.bluetooth.requestDevice(__assign({ filters: [{ services: ["daebb240-b041-11e4-9e45-0002a5d5c51b"] }] }, options))];
                    case 1:
                        _a.device = _c.sent();
                        if (!(this.device.gatt !== undefined)) return [3 /*break*/, 3];
                        _b = this;
                        return [4 /*yield*/, this.device.gatt.connect()];
                    case 2:
                        _b.server = _c.sent();
                        return [3 /*break*/, 4];
                    case 3: throw new Error("Cannot connect to GATT Server because device.gatt is undefined, maybe device is not connected.");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    iQOS.prototype.bootstrapBattery = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var batteryCharacteristic, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, ((_a = this.UUID_RRP_SERVICE) === null || _a === void 0 ? void 0 : _a.getCharacteristic("f8a54120-b041-11e4-9be7-0002a5d5c51b"))];
                    case 1:
                        batteryCharacteristic = _d.sent();
                        if (!(batteryCharacteristic !== undefined)) return [3 /*break*/, 4];
                        _b = this;
                        _c = this.processbatteryValue;
                        return [4 /*yield*/, (batteryCharacteristic === null || batteryCharacteristic === void 0 ? void 0 : batteryCharacteristic.readValue())];
                    case 2:
                        _b.batteryValue = _c.apply(this, [_d.sent()]);
                        return [4 /*yield*/, batteryCharacteristic.startNotifications()];
                    case 3:
                        _d.sent();
                        // @ts-ignore
                        batteryCharacteristic.addEventListener("characteristicvaluechanged", (function (ev) {
                            // @ts-ignore
                            _this.batteryValue = _this.processbatteryValue(ev.target.value);
                        }));
                        _d.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    iQOS.prototype.processbatteryValue = function (value) {
        this.triggerUpdate();
        var int8array = new Uint8Array(value.buffer);
        //@ts-ignore
        window.int8array = int8array;
        if (int8array.length === 7) {
            // @ts-ignore
            return { holderReady: (int8array[6] > 0 ? true : false), case: int8array[4 - 1] };
        }
        else {
            return { case: int8array[4 - 1] };
        }
    };
    iQOS.prototype.triggerUpdate = function () {
        if (this.onUpdate)
            this.onUpdate(this);
    };
    return iQOS;
}());
exports.iQOS = iQOS;
exports.default = iQOS;
