import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;
  public currentLngLat?: LngLat = new LngLat(-3.603, 37.16718);

  constructor(private http: HttpClient) {}

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

    //?? Creando ruta test
    //! Ruta
    // Generar destino aleatorio
    const destination = new LngLat(
      this.currentLngLat!.lng + (Math.random() - 0.5) * 0.02,
      this.currentLngLat!.lat + (Math.random() - 0.5) * 0.02
    );

    // Agregar marcador de destino
    new Marker({ color: 'blue' }).setLngLat(destination).addTo(this.map);

    // Dibujar una línea simple entre inicio y destino
    // this.map.on('load', () => {
    //   this.map?.addSource('route', {
    //     type: 'geojson',
    //     data: {
    //       type: 'Feature',
    //       properties: {},
    //       geometry: {
    //         type: 'LineString',
    //         coordinates: [
    //           [this.currentLngLat!.lng, this.currentLngLat!.lat],
    //           [destination.lng, destination.lat],
    //         ],
    //       },
    //     },
    //   });

    //   this.map?.addLayer({
    //     id: 'route',
    //     type: 'line',
    //     source: 'route',
    //     layout: {
    //       'line-join': 'round',
    //       'line-cap': 'round',
    //     },
    //     paint: {
    //       'line-color': '#007AFF',
    //       'line-width': 4,
    //     },
    //   });
    // });

    //Crear ruta con pathfinding
    // this.createRoute();
  }

  // private createRoute(): void {
  //   // Generar destino aleatorio
  //   const destination = new LngLat(
  //     this.currentLngLat!.lng + (Math.random() - 0.5) * 0.04,
  //     this.currentLngLat!.lat + (Math.random() - 0.5) * 0.04
  //   );

  //   // URL de la Directions API
  //   const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/cycling/${
  //     this.currentLngLat!.lng
  //   },${this.currentLngLat!.lat};${destination.lng},${
  //     destination.lat
  //   }?geometries=geojson&access_token=pk.eyJ1IjoiYmFydGh4YyIsImEiOiJjbTV5MXdmeDUwOW1kMm1zZ3A0bjhuNWlyIn0.R-d1G4Y2Qe1R_GKJGmTADw`;

  //   // Hacer la solicitud HTTP
  //   this.http.get<any>(directionsUrl).subscribe((data) => {
  //     const route = data.routes[0]?.geometry?.coordinates;

  //     if (!route) return;

  //     // Añadir marcador de destino
  //     new Marker({ color: 'blue' }).setLngLat(destination).addTo(this.map!);

  //     // Dibujar la ruta en el mapa
  //     this.map?.addSource('route', {
  //       type: 'geojson',
  //       data: {
  //         type: 'Feature',
  //         properties: {},
  //         geometry: {
  //           type: 'LineString',
  //           coordinates: route,
  //         },
  //       },
  //     });

  //     this.map?.addLayer({
  //       id: 'route',
  //       type: 'line',
  //       source: 'route',
  //       layout: {
  //         'line-join': 'round',
  //         'line-cap': 'round',
  //       },
  //       paint: {
  //         'line-color': '#007AFF',
  //         'line-width': 4,
  //       },
  //     });
  //   });
  // }
}
