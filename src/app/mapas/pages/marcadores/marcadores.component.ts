import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

interface MarkerWithColor {
  color: string;
  marker: mapboxgl.Marker;
}

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

  // Markers Array
  markers: MarkerWithColor[] = [];

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

    // const marker = new mapboxgl.Marker().setLngLat(this.center).addTo(this.map);
  }

  addMarker() {
    /* Make a ramdon color */
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const marker = new mapboxgl.Marker({ draggable: true, color })
      .setLngLat(this.center)
      .addTo(this.map);

    this.markers.push({ color, marker });

    this.map.flyTo({ center: this.center });
  }

  flyToMarker(marker: mapboxgl.Marker) {
    const center = marker.getLngLat();
    this.map.flyTo({ center });
  }

  saveMarker(marker: MarkerWithColor) {}

  readMarkers() {}
}
