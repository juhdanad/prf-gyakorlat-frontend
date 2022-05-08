import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private elementsToCover = new Map<unknown, HTMLElement[]>();
  covers: { top: string; left: string; width: string; height: string }[] = [];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.refreshCovers();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    requestAnimationFrame(() => this.refreshCovers());
  }

  modifyElementsToCover(component: unknown, elements: HTMLElement[] | null) {
    if (elements !== null) {
      this.elementsToCover.set(component, elements);
    } else {
      this.elementsToCover.delete(component);
    }
    requestAnimationFrame(() => this.refreshCovers());
  }

  refreshCovers() {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const newCovers: typeof this.covers = [];
    for (const elems of this.elementsToCover.values()) {
      for (const elem of elems) {
        const rect = elem.getBoundingClientRect();
        newCovers.push({
          top: `${rect.top + scrollY}px`,
          left: `${rect.left + scrollX}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
        });
      }
    }
    this.covers = newCovers;
  }
}
