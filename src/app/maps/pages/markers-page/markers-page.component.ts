import { JsonPipe, CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public currentLngLat?: LngLat = new LngLat(-3.603, 37.16718);

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no se ha encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    this.readFromLocalStorage();
  }

  addMarker(lnglat: LngLat, color: string = 'blue') {
    if (!this.map) return;

    const marker = new Marker({
      color,
      draggable: true,
    })
      .setLngLat(lnglat)
      .addTo(this.map);

    this.markers.push({ color, marker });
    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  }

  createMarker() {
    if (!this.map) return;
    const lngLat = this.map.getCenter();

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    this.addMarker(lngLat, color);
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
      essential: true,
    });
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(
      ({ color, marker }) => {
        return {
          color,
          lngLat: marker.getLngLat().toArray(),
        };
      }
    );

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkeresString = localStorage.getItem('plainMarkers') ?? '[]';

    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkeresString);

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;

      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color);
    });
  }
}
