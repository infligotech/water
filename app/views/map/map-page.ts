import { EventData, Page } from '@nativescript/core';
import { MapViewModel } from './map-view-model';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new MapViewModel();
}