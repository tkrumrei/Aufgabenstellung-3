function getHaltestellen() {
    let haltestellen = new XMLHttpRequest

    haltestellen.open('Get', 'https://rest.busradar.conterra.de/prod/haltestellen',true)
    haltestellen.responseType = 'json'
    haltestellen.onload = () => {
        pointcloud = haltestellen.response
        main(point,pointcloud)
    }
    haltestellen.send()
}