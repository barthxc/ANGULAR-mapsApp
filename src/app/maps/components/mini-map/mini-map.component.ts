import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css'],
})
export class MiniMapComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  @Input() lngLat?: [number, number];

  public map?: Map;

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no se ha encontrado';
    if (!this.lngLat) throw 'LngLat cant be null';

    // Creación del Mapa
    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 15,
      interactive: false,
    });
    // Creación del Market
    const marker = new Marker().setLngLat(this.lngLat!).addTo(this.map);
  }
}
