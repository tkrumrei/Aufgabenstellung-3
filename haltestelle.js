class Haltestelle {
    constructor(nr, lbez, richtung, coordinates) {
          this.nr = nr;
          this.lbez = lbez;
          this.richtung = richtung;
          this.coordinates = coordinates;
          this.aURL = `https://rest.busradar.conterra.de/prod/haltestellen/${nr}/abfahrten?sekunden=3000`;
    }

    
}