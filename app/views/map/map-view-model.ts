import { Observable } from '@nativescript/core';
import { LocationService } from '../../services/location-service';
import { Frame } from '@nativescript/core';
import { GoogleMaps, Marker } from '@nativescript/google-maps';

export class MapViewModel extends Observable {
  private _userLatitude = 0;
  private _userLongitude = 0;
  private _zoom = 15;
  private _fountainMarkers = [];
  private _mapView: GoogleMaps | null = null;

  constructor() {
    super();
    console.log('MapViewModel initialized');
    this.initializeLocation();
  }

  get userLatitude(): number {
    return this._userLatitude;
  }

  set userLatitude(value: number) {
    if (this._userLatitude !== value) {
      this._userLatitude = value;
      this.notifyPropertyChange('userLatitude', value);
    }
  }

  get userLongitude(): number {
    return this._userLongitude;
  }

  set userLongitude(value: number) {
    if (this._userLongitude !== value) {
      this._userLongitude = value;
      this.notifyPropertyChange('userLongitude', value);
    }
  }

  get fountainMarkers(): any[] {
    return this._fountainMarkers;
  }

  set fountainMarkers(value: any[]) {
    if (this._fountainMarkers !== value) {
      this._fountainMarkers = value;
      this.notifyPropertyChange('fountainMarkers', value);
    }
  }

  get zoom(): number {
    return this._zoom;
  }

  set zoom(value: number) {
    if (this._zoom !== value) {
      this._zoom = value;
      this.notifyPropertyChange('zoom', value);
    }
  }

  onMapReady(args: any) {
    try {
      console.log('Map ready event triggered');
      this._mapView = args.object;
      console.log('Map view initialized');
      
      // Center map on user's location once we have it
      if (this.userLatitude !== 0 && this.userLongitude !== 0) {
        console.log('Centering map on user location');
        this.loadFountains();
      }
    } catch (error) {
      console.error('Error in onMapReady:', error);
      console.error('Stack trace:', error.stack);
    }
  }

  private async loadFountains() {
    try {
      console.log('Loading fountains...');
      if (!this._mapView) {
        console.error('Map view not initialized');
        return;
      }

      // Mock data for testing
      const mockFountains = [
        {
          id: '1',
          latitude: this.userLatitude + 0.001,
          longitude: this.userLongitude + 0.001,
          rating: 4
        },
        {
          id: '2',
          latitude: this.userLatitude - 0.001,
          longitude: this.userLongitude - 0.001,
          rating: 5
        }
      ];

      mockFountains.forEach(fountain => {
        try {
          const marker = new Marker();
          marker.latitude = fountain.latitude;
          marker.longitude = fountain.longitude;
          marker.title = `Fountain #${fountain.id}`;
          marker.snippet = `Rating: ${fountain.rating}/5`;
          marker.userData = { fountainId: fountain.id };

          this._mapView?.addMarker(marker);
          console.log(`Added marker for fountain ${fountain.id}`);
        } catch (error) {
          console.error(`Error adding marker for fountain ${fountain.id}:`, error);
        }
      });
    } catch (error) {
      console.error('Error loading fountains:', error);
      console.error('Stack trace:', error.stack);
    }
  }

  onMarkerSelect(args: any) {
    try {
      console.log('Marker selected:', args.marker?.userData);
      // TODO: Navigate to fountain details
    } catch (error) {
      console.error('Error in marker select:', error);
      console.error('Stack trace:', error.stack);
    }
  }

  async initializeLocation() {
    try {
      console.log('Initializing location...');
      const location = await LocationService.getCurrentLocation();
      
      if (!location) {
        console.error('No location data received');
        return;
      }
      
      console.log('Location received:', { latitude: location.latitude, longitude: location.longitude });
      this.userLatitude = location.latitude;
      this.userLongitude = location.longitude;
      
      // If map is ready, load fountains
      if (this._mapView) {
        this.loadFountains();
      }
    } catch (error) {
      console.error('Error getting location:', error);
      console.error('Stack trace:', error.stack);
    }
  }

  onAddTap() {
    try {
      Frame.topmost().navigate({
        moduleName: 'views/add-fountain/add-fountain-page'
      });
    } catch (error) {
      console.error('Error navigating to add fountain page:', error);
      console.error('Stack trace:', error.stack);
    }
  }

}