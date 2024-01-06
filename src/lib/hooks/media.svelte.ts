export class Media {
  #width = $state(0);

  constructor() {}

  get isMobile() {
    // xs
    return this.#width < 640;
  }

  get isTablet() {
    // sm, md, lg
    return this.#width >= 640 && this.#width < 1280;
  }

  get isDesktop() {
    // xl
    return this.#width >= 1280;
  }

  get width() {
    return this.#width;
  }

  set width(w: number) {
    this.#width = w;
  }
}
