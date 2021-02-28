import L from 'leaflet';
import Utilits from './Utilits'

describe('Testing Utilits.js and methode subscribe() custom marker element on Eventhandler', () => {
    it('Testing custom element to subscribe on new eventhandler "click"', () => {
        const latlng = [8.6820917, 50.1106444];

        const marker = L.marker(latlng);
        marker.bindPopup(`test passed `)

        const mockCallBack = jest.fn();

        function func() {
            return mockCallBack
        }
        const utils = new Utilits();
        utils.Subscribe('click', marker, func);

        expect(marker._events.click.length).toBe(2);
    });
});