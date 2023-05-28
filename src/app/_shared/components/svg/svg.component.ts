import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.svg',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent {
  @Input() icon: string = '';
  @Input() icon_color: string = '#A6A9AE';

  public firstColor: string = '#313bfc';
  public secondColor: string = '#aea9a6';
  public thirdColor: string = '#1b739a';

  public additionalColor: string = '#fffff';

  constructor(
  ) {
  }
}
