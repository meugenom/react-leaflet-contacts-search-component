/**
 * @param host you can use 'http://192.168.0.1/data'
 * if you test code in you home environment, it's very possible, that you  have some problems with
 * CORS. In this case you need add to package.json "proxy":"your-dev-server"
 * and in the @param host your call without name of this host, for example /getData or /data
 */

const Config = {
    host: 'https://eugenem.dev/getData',
    dataType: 'json'
}

export default Config;