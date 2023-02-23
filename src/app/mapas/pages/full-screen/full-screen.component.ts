import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss'],
})
export class FullScreenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}
