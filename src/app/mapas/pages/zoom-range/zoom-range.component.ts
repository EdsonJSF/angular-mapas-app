import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.scss'],
})
export class ZoomRangeComponent implements OnInit, AfterViewInit {
  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 10;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-72.2321145795547, 7.7681861430432875], // starting position [lng, lat]
      zoom: this.zoomLevel,
    });

    this.map.on('zoom', () => {
      this.zoomLevel = this.map.getZoom();
    });

    this.map.on('zoomend', () => {
      if (this.map.getZoom() > 18) {
        this.map.zoomTo(18);
      }
    });
  }

  zoomOut() {
    this.map.zoomOut();
  }

  zoomIn() {
    this.map.zoomIn();
  }

  zoomCambio(value: string) {
    this.map.zoomTo(Number(value));
  }
}
