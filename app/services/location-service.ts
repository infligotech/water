import { Geolocation } from '@nativescript/geolocation';
import { CoreTypes } from '@nativescript/core';

export class LocationService {
  static async getCurrentLocation() {
    console.log('Requesting location permission...');
    const hasPermission = await Geolocation.enableLocationRequest(true);
    
    if (!hasPermission) {
      console.error('Location permission denied');
      throw new Error('Location permission denied');
    }

    console.log('Getting current location...');
    return await Geolocation.getCurrentLocation({
      desiredAccuracy: CoreTypes.Accuracy.high,
      maximumAge: 5000,
      timeout: 20000
    });
  }
}