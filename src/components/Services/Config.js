/**
 * @param host you can use 'http://192.168.0.1/data'
 * @param instance by default data about persons in  file persons.json
 */

const Config = {
    
    /**
        host: 'api/data', when we use nginx or appache:
        for route   ^~ / was set localhost:3000 with our started frontend
        for route ^~ /api/ was set localhost:8081 with our backend server (call for data is '/data')
        here in the @param host need to write '/api/data'
     */
    
    
    host: '/api/data',
    dataType: 'json'
}

export default Config;


