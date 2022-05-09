/**
 * @author      Tobias Krumrein
 * @description Diese HTML-Seite berechnet den Abstand zwischen dem gegebenen Punkt aus der Datei point.js und den
 *              Punkten aus poi.js, welche in einem GeoJSON-Format aufgeschrieben sind. Alternativ lässt sich auch der
 *              aktuelle Standort bestimmen, mit dem man dann auch den Abstand zu den Punkten poi.js berechnen kann.
 */

 "use strict";

// Titel ändern mit JavaScript
 document.title = "Aufgabe 2 Standorte und Points-of-interest";
// Eine leere Variabel, damit man die Distanzen zwischen den Punkten später ausgeben kann
var ausgabeAB = "";
// Einen GeoJSON Point erstellen für die Koordinaten
var aPosition = {
    "type": "Point",
    "coordinates": [0,0]
}

/**
 * @function    abstandBerechnenPunkt()
 * @description Diese Funktion berechnet den Abstand zwischen dem gegebenen Punkt aus der Datei point.js und den
 *              Punkten aus poi.js, welche in einem GeoJSON-Format aufgeschrieben sind. * 
 */
function abstandBerechnenPunkt() {
    // Der Punkt wird in aPosition eingeladen 
    aPosition.coordinates[0] = point[0];
    aPosition.coordinates[1] = point[1];

    // Punkt point als ersten Punkt für Formel speichern
    var lat1 = aPosition.coordinates[1];
    var lon1 = aPosition.coordinates[0];

    // poisDistance Array erstellen mit Länge von pois.js 
    var poisDistance = new Array(pois.features.length);

    // Berechnung der Abstände von Punkten(pois) zu Punkt mit for-Schleife 
    for(var i = 0; i < pois.features.length; i++) {
        // Punkte von pois-Array als zweiten Punkt speichern 
        var lat2 = pois.features[i].geometry.coordinates[1];
        var lon2 = pois.features[i].geometry.coordinates[0];
        
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        var d = Math.round(R * c * 10) / 10;  // auf eine Nachkommastelle gerundet
        

        // Mehrdimensionales Array erstellen, um in poisDistance die Entfernung und den Namen einzutragen
        poisDistance[i] = new Array(2);

        // In Array pois distance eintragen
        poisDistance[i][1] = d;
        poisDistance[i][0] = pois.features[i].properties.name;        
    }

    // Array poisDistance aufsteigend sortieren
    //Quelle: https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/array/sort
    poisDistance.sort(zweiteSpalteSortieren);
    // Funktion für zweite Spalte sortieren 
    // gibt entweder -1, 0 oder 1 zurück und sort() tauscht dann die beiden ausgewählten Spalten
    /* Arrow-Funktion:
       let zweiteSpalteSortieren = (a, b) => a[1] - b[1];
       Funktioniert leider nicht
    */
    function zweiteSpalteSortieren (a, b){
        return a[1] - b[1];
        }
        

    // Textausgabe von aufsteigend sortierten gegebenen Punkten als Text mit Zeilenumbruch (in HTML) eingefügen
    for(var i = 0; i < poisDistance.length; i++) {
    ausgabeAB = ausgabeAB + poisDistance[i][0]+ ": " + poisDistance[i][1] + "m" + "<br />";
    }
}

// Aufruf der Methode aufstandBerechnePunkt()
abstandBerechnenPunkt();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @function    abstandBerechnen()
 * @description Diese Funktion berechnet den Abstand zwischen dem aktuellen Punkt der vorher in aPosition reingeladen wurde und den
 *              Punkten aus poi.js, welche in einem GeoJSON-Format aufgeschrieben sind.
 */
function abstandBerechnen() {
    // Aktuellen Punkt als ersten Punkt für Formel speichern 
    var lat1 = aPosition.coordinates[1];
    var lon1 = aPosition.coordinates[0];

    // ausgabeAB leeren
    ausgabeAB = "";
    // poisDistance Array erstellen mit Länge von pois.js
    var poisDistance = new Array(pois.features.length);

    // Berechnung der Abstände von Punkten(pois) zu Punkt mit for-Schleife 
    for(var i = 0; i < pois.features.length; i++) {
        // Punkte von pois-Array als zweiten Punkt speichern 
        var lat2 = pois.features[i].geometry.coordinates[1];
        var lon2 = pois.features[i].geometry.coordinates[0];
        
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        var d = Math.round(R * c * 10) / 10; // auf eine Nachkommastelle gerundet

        // Mehrdimensionales Array erstellen
        poisDistance[i] = new Array(2);

        // In array pois distance eintragen
        poisDistance[i][1] = d;
        poisDistance[i][0] = pois.features[i].properties.name;

        
    }
    // Array poisDistance aufsteigend sortieren
    //Quelle: https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/array/sort
    poisDistance.sort(zweiteSpalteSortieren);
    // Funktion für zweite Spalte sortieren 
    //gibt entweder -1, 0 oder 1 zurück und sort() tauscht dann die beiden ausgewählten Spalten
    function zweiteSpalteSortieren (a, b){
    return a[1] - b[1];
    }

    // Textausgabe von aufsteigend sortierten gegebenen Punkten als Text mit Zeilenumbruch (in HTML) eingefügen
    for(var i = 0; i < poisDistance.length; i++) {
    ausgabeAB = ausgabeAB + poisDistance[i][0]+ ": " + poisDistance[i][1] + "m" + "<br />";
    }
    document.getElementById("ausgabe").innerHTML = ausgabeAB;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////               
/**
 * @function    getLocation()
 * @description Funktion für Ermittlung des Standorts
 */
 function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                document.getElementById("mPosition").innerHTML = "Geolocation is not supported by this browser.";
            }
        }
/**
 * @function showPosition()
 * @description Funktion ermittelt den aktuellen Standort und trägt ihn dann in das Eingabefeld mPosition ein
 * @param {*} position gibt die position an
 */
function showPosition(position) {
    // GeoJSON Point erstellen
    aPosition.coordinates[0] = position.coords.longitude;
    aPosition.coordinates[1] = position.coords.latitude;
    
    // mit Stringify GeoJSON in Eingabefeld eintragen
    document.getElementById("mPosition").innerHTML = JSON.stringify(aPosition);
}


