import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

export interface DeviseTypeTransferObjectInterface {
  deviceTypeOs: string;
  deviceBrand: string;
}

@Injectable()
export class DeviceService {
  public deviceOs = '';
  public deviceIosOs = false;
  public deviceAndroidOs = false;
  public deviceBrand = '';

  private static _defaultDeviceCheck(): DeviseTypeTransferObjectInterface {
    const _userAgent = navigator.userAgent || navigator.vendor || (<any>window).opera;

    return {
      deviceTypeOs: (/iPhone|iPad|iPod/i.test(_userAgent)) ? 'iOS' : (/Android/i.test(_userAgent)) ? 'Android' : '',
      deviceBrand: (/iPhone|iPad|iPod/i.test(_userAgent)) ? 'iOS' : (/(HUAWEI|LIO-AL00|VOG-L29|ELE-L29)/i.test(_userAgent)) ? 'Huawei' : (/Android/i.test(_userAgent)) ? 'Android' : '',
    };
  }

  constructor(
    @Inject(PLATFORM_ID) private _platformId: {},
  ) {
    const deviseTypeTransferObject = DeviceService._defaultDeviceCheck();

    this.deviceBrand = deviseTypeTransferObject.deviceBrand;

    // Визначаємо операційну систему пристрою
    if (deviseTypeTransferObject.deviceTypeOs) {
      this.deviceOs = deviseTypeTransferObject.deviceTypeOs;
      this._checkDeviceOs(deviseTypeTransferObject.deviceTypeOs);
    }
  }

  /**
   * Преобразуем 'deviceOs' строки в boolean
   *
   * @param {string} deviceOs
   * @private
   */
  private _checkDeviceOs(deviceOs: string): void {
    switch (deviceOs) {
      case 'iOS':
      case 'Mac':
        this.deviceIosOs = true;
        break;
      case 'Android':
      case 'AndroidOS':
        this.deviceAndroidOs = true;
    }
  }
}
