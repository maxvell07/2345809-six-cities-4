
import React, { useEffect } from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {City} from '../../types/city';
import {Point} from '../../types/point';
import { Offer } from '../../types/offer';
import {activeMarker, defaultMarker} from '../../const';
import {useAppSelector} from '../../hooks';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offer[];
}

const activeCustomIcon = new Icon({
  iconUrl: activeMarker,
  iconSize: [33, 33],
});

const defaultCustomIcon = new Icon({
  iconUrl: defaultMarker,
  iconSize: [30, 30],
});

function Map(props: MapProps): JSX.Element {
  const {city, offers} = props;

  const mapRef = React.useRef(null);
  const map = useMap(mapRef, city);

  const selectedMarker: undefined | { point: Point } = useAppSelector(
    (state) => state.selectedMarker
  );
  useEffect(() => {
    if (map) {
      map.setView([city.lat, city.lng]);
    }
  }, [map, city]);

  useEffect(() => {
    if(map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.point.lat,
          lng: offer.point.lng
        });
        marker
          .setIcon(selectedMarker !== undefined && offer.point === selectedMarker.point ? activeCustomIcon : defaultCustomIcon)
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedMarker]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
