import { Observable } from '@nativescript/core';
import { LocationService } from '../../services/location-service';

export class AddFountainViewModel extends Observable {
  private _overallRating = 0;
  private _temperature = 0;
  private _taste = 0;
  private _pressure = 0;
  private _hasBottleRefiller = false;

  constructor() {
    super();
  }

  // Overall Rating
  get overallRating(): number {
    return this._overallRating;
  }

  set overallRating(value: number) {
    if (this._overallRating !== value) {
      this._overallRating = value;
      this.notifyPropertyChange('overallRating', value);
      // Notify all icons to update
      for (let i = 1; i <= 5; i++) {
        this.notifyPropertyChange(`getOverallRatingIcon(${i})`, this.getOverallRatingIcon(i));
      }
    }
  }

  getOverallRatingIcon(position: number): string {
    return position <= this._overallRating ? '●' : '○';
  }

  // Temperature
  get temperature(): number {
    return this._temperature;
  }

  set temperature(value: number) {
    if (this._temperature !== value) {
      this._temperature = value;
      this.notifyPropertyChange('temperature', value);
      // Notify all icons to update
      for (let i = 1; i <= 5; i++) {
        this.notifyPropertyChange(`getTemperatureIcon(${i})`, this.getTemperatureIcon(i));
      }
    }
  }

  getTemperatureIcon(position: number): string {
    return position <= this._temperature ? '●' : '○';
  }

  // Taste
  get taste(): number {
    return this._taste;
  }

  set taste(value: number) {
    if (this._taste !== value) {
      this._taste = value;
      this.notifyPropertyChange('taste', value);
      // Notify all icons to update
      for (let i = 1; i <= 5; i++) {
        this.notifyPropertyChange(`getTasteIcon(${i})`, this.getTasteIcon(i));
      }
    }
  }

  getTasteIcon(position: number): string {
    return position <= this._taste ? '●' : '○';
  }

  // Pressure
  get pressure(): number {
    return this._pressure;
  }

  set pressure(value: number) {
    if (this._pressure !== value) {
      this._pressure = value;
      this.notifyPropertyChange('pressure', value);
      // Notify all icons to update
      for (let i = 1; i <= 5; i++) {
        this.notifyPropertyChange(`getPressureIcon(${i})`, this.getPressureIcon(i));
      }
    }
  }

  getPressureIcon(position: number): string {
    return position <= this._pressure ? '●' : '○';
  }

  get hasBottleRefiller(): boolean {
    return this._hasBottleRefiller;
  }

  set hasBottleRefiller(value: boolean) {
    if (this._hasBottleRefiller !== value) {
      this._hasBottleRefiller = value;
      this.notifyPropertyChange('hasBottleRefiller', value);
    }
  }

  setOverallRating(args) {
    this.overallRating = parseInt(args.object.get('data-rating'), 10);
  }

  setTemperature(args) {
    this.temperature = parseInt(args.object.get('data-rating'), 10);
  }

  setTaste(args) {
    this.taste = parseInt(args.object.get('data-rating'), 10);
  }

  setPressure(args) {
    this.pressure = parseInt(args.object.get('data-rating'), 10);
  }

  async onSaveTap() {
    try {
      const location = await LocationService.getCurrentLocation();
      // TODO: Save fountain data to backend
      console.log('Fountain saved:', {
        latitude: location.latitude,
        longitude: location.longitude,
        overallRating: this.overallRating,
        temperature: this.temperature,
        taste: this.taste,
        pressure: this.pressure,
        hasBottleRefiller: this.hasBottleRefiller
      });
    } catch (error) {
      console.error('Error saving fountain:', error);
    }
  }
}