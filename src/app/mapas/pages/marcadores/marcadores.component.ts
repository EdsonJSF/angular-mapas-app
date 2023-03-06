import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

interface MarkerWithColor {
  color: string;
  marker: mapboxgl.Marker;
}
interface MarkerStorage {
  color: string;
  center: [number, number];
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

    this.readMarkers();

    /* Marcadores personalizados */
    // const markerHTML: HTMLElement = document.createElement('div');
    // markerHTML.innerHTML = 'Hola Mundo';
    // const marker = new mapboxgl.Marker({ element: markerHTML })

    // const marker = new mapboxgl.Marker().setLngLat(this.center).addTo(this.map);
  }

  createMarker(marker: MarkerStorage): mapboxgl.Marker {
    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color: marker.color,
    })
      .setLngLat(marker.center)
      .addTo(this.map);

    this.markers.push({ color: marker.color, marker: newMarker });

    newMarker.on('dragend', () => {
      this.saveMarker();
    });

    return newMarker;
  }

  addMarker() {
    /* Make a ramdon color */
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    this.createMarker({ color, center: this.center });

    this.map.flyTo({ center: this.center });

    this.saveMarker();
  }

  flyToMarker(marker: mapboxgl.Marker) {
    const center = marker.getLngLat();
    this.map.flyTo({ center });
  }

  saveMarker() {
    const lngLatArr: MarkerStorage[] = [];

    this.markers.forEach((mkr) => {
      const color = mkr.color;
      const { lng, lat } = mkr.marker.getLngLat();

      lngLatArr.push({
        color,
        center: [lng, lat],
      });
    });

    localStorage.setItem('markers', JSON.stringify(lngLatArr));
  }

  readMarkers() {
    const markers = localStorage.getItem('markers');

    if (markers) {
      const lngLatArr: MarkerStorage[] = JSON.parse(markers);
      lngLatArr.forEach((mkr) => {
        this.createMarker({ color: mkr.color, center: mkr.center });
      });
    }
  }

  deleteMarker(i: number) {
    this.markers[i].marker.remove();
    this.markers.splice(i, 1);
    this.saveMarker();
  }
}
