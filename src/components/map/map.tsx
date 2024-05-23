
import React, { useEffect } from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {City} from '../../types/city';
import {Points } from '../../types/offer';
import {activeMarker, defaultMarker} from '../../const';
import {useAppSelector} from '../../hooks';
import 'leaflet/dist/leaflet.css';
import { getSelectedMarker } from '../../store/offers-process/selectors';

type MapProps = {
  city: City;
  points: Points[];
  singularCase: string | undefined;
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
  const {city, points, singularCase} = props;

  const mapRef = React.useRef(null);
  const map = useMap(mapRef, city);

  const selectedMarker: null | { id: string } = useAppSelector(getSelectedMarker);
  useEffect(() => {
    if (map && city) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [city, map]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        if (singularCase === undefined){
          marker
            .setIcon(selectedMarker !== null && point.id === selectedMarker?.id ? activeCustomIcon : defaultCustomIcon)
            .addTo(markerLayer);
        } else {
          const isSingularlCase = singularCase && point.id === singularCase;
          marker
            .setIcon(isSingularlCase ? activeCustomIcon : defaultCustomIcon)
            .addTo(markerLayer);
        }
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedMarker, singularCase]);

  useEffect(() => {
    if (map && city) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
