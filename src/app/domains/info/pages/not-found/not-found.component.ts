import { Component, Renderer2 } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLinkWithHref],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  constructor(private renderer: Renderer2){}

  ngOnInit(){
    this.renderer.addClass(document.body, 'no_global_styles');
  }
  ngOnDestroy(){
    this.renderer.removeClass(document.body, 'no_global_styles');
  }
}
