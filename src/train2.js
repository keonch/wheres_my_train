export default class Train {
  constructor(feed) {
    this.feed = feed;

    this.symbol = this.createSymbol();
  }

  createSymbol() {
    const lineSymbol = {
      path: 'M64 8 Q64 0 56 0 L8 0 Q0 0 0 8 L0 24 Q0 32 6 32 L56 32 Q64 32 64 24 Z',
      scale: .5,
      strokeColor: '#43464B',
      strokeWeight: 1,
      fillOpacity: 1,
    };

    return lineSymbol;
  }
}
