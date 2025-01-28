import { EventData, Page } from '@nativescript/core';
import { AddFountainViewModel } from './add-fountain-view-model';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new AddFountainViewModel();
}