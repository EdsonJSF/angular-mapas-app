import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.scss'],
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-72.2321145795547, 7.7681861430432875];

  constructor() {}

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel,
    });

    // const markerHTML: HTMLElement = document.createElement('div');
    // markerHTML.innerHTML = 'Hola Mundo';
    // const marker = new mapboxgl.Marker({ element: markerHTML })

    const marker = new mapboxgl.Marker().setLngLat(this.center).addTo(this.map);
  }
}
