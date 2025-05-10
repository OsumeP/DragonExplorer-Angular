import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arrow',
  imports: [],
  templateUrl: './arrow.component.html',
  styleUrl: './arrow.component.css',
  animations: [
    trigger('jumpAnimation', [
      state('up', style({ transform: 'translateY(0)' })),
      state('down', style({ transform: 'translateY(0)' })),
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(0)' })),
      transition('* => up', [
        animate('0.3s ease', style({ transform: 'translateY(-10px)' })),
        animate('0.3s ease', style({ transform: 'translateY(0)' }))
      ]),
      transition('* => down', [
        animate('0.3s ease', style({ transform: 'translateY(10px)' })),
        animate('0.3s ease', style({ transform: 'translateY(0)' }))
      ]),
      transition('* => left', [
        animate('0.3s ease', style({ transform: 'translateX(-10px)' })),
        animate('0.3s ease', style({ transform: 'translateX(0)' }))
      ]),
      transition('* => right', [
        animate('0.3s ease', style({ transform: 'translateX(10px)' })),
        animate('0.3s ease', style({ transform: 'translateX(0)' }))
      ])
    ]),
    trigger('brightAnimation', [
      state('bright', style({filter: 'brightness(1)'})),
      transition('* => bright', [
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({filter: 'brightness(2)'})),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({filter: 'brightness(1)'})),
      ])
    ])
  ]
})
export class ArrowComponent {
  @Input() direction: 'up' | 'down' | 'left' | 'right' = 'right';

  jumpState: string = 'neutral';
  brightState: string = 'neutral';
  private animationInterval: any;

  ngOnInit() {
    this.startAnimation();
  }

  ngOnDestroy() {
    this.stopAnimation();
  }

  startAnimation() {
    this.stopAnimation();
    this.animationInterval = setInterval(() => {
      this.jumpState = 'neutral';
      this.brightState = 'neutral';
      
      setTimeout(() => {
        this.jumpState = this.direction;
        this.brightState = 'bright';
      }, 10);
    }, 2500);
  }

  stopAnimation() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }
}
