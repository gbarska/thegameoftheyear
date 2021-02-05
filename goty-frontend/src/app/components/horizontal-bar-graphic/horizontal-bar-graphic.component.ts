import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal-bar-graphic',
  templateUrl: './horizontal-bar-graphic.component.html',
  styleUrls:  ['./horizontal-bar-graphic.component.scss' ]
})
export class HorizontalBarGraphicComponent {

  @Input() results: any[] = [];
 
  // options
  showXAxis  = true;
  showYAxis  = true;
  gradient   = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme = 'nightLights';

  constructor() { 
    // this.results = [
    //     {
    //       "name": "Juego 1",
    //       "value": 20
    //     },
    //     {
    //       "name": "Juego 2",
    //       "value": 25
    //     },
    //     {
    //       "name": "Juego 3",
    //       "value": 15
    //     },
    //     {
    //       "name": "Juego 4",
    //       "value": 30
    //     }
    //   ];
  }

  onSelect(event) {
    // console.log(event);
  }

  ngOnDestroy() { }

}