class Haltestellen {
    constructor() {
        this.haltestellen = new XMLHttpRequest   
    }

    getHaltestellen() {
        
        this.haltestellen.open('Get', 'https://rest.busradar.conterra.de/prod/haltestellen',true)
        this.haltestellen.responseType = 'json'
        this.haltestellen.onload = () => {
            pointcloud = haltestellen.response
            main(point,pointcloud)
        }
        this.haltestellen.send()
    }
}