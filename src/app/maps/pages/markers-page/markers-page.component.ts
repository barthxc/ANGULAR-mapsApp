import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;
  public currentLngLat?: LngLat = new LngLat(-3.603, 37.16718);

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no se ha encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 17, // starting zoom
    });

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    new Marker({
      color,
    })
      .setLngLat(this.currentLngLat!)
      .addTo(this.map);
  }
}
