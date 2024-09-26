import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import privateKeys from '../../../../privateKeys';

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '400px',
  position: 'relative',
};

mapboxgl.accessToken = privateKeys.mapboxAccessToken;

interface ResortMapProps {
  longitude: number;
  latitude: number;
}

const ResortMap: React.FC<ResortMapProps> = ({ longitude, latitude }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const bearingRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const timeRef = useRef<number>(0);

  const stopRotation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };
  const startRotation = () => {
    if (animationRef.current || isDraggingRef.current) return;

    const rotateCamera = (timestamp: number) => {
      if (isDraggingRef.current) {
        stopRotation();
        return;
      }

      // Calculate time difference
      const deltaTime = timestamp - timeRef.current;
      timeRef.current = timestamp;

      // Update bearing
      bearingRef.current = (bearingRef.current + 0.01 * deltaTime) % 360;

      // Calculate oscillating pitch
      const basePitch = 60;
      const pitchAmplitude = 5; // Adjust this value to increase or decrease the pitch range
      const pitchPeriod = 10000; // Time in milliseconds for a complete oscillation
      const newPitch = basePitch + Math.sin(timestamp * (
        (2 * Math.PI) / pitchPeriod)) * pitchAmplitude;

      if (mapRef.current) {
        mapRef.current.setBearing(bearingRef.current);
        mapRef.current.setPitch(newPitch);
      }

      animationRef.current = requestAnimationFrame(rotateCamera);
    };

    animationRef.current = requestAnimationFrame(rotateCamera);
  };

  useEffect(() => {
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: privateKeys.mapboxStyle,
        center: [longitude, latitude],
        zoom: 13,
        pitch: 60,
        bearing: bearingRef.current,
        antialias: true,
      });

      mapRef.current.on('load', () => {
        mapRef.current?.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
        startRotation();
      });

      mapRef.current.on('mousedown', () => {
        isDraggingRef.current = true;
        stopRotation();
      });

      mapRef.current.on('mouseup', () => {
        isDraggingRef.current = false;
        setTimeout(startRotation, 1500); // Delay restart of rotation
      });

      mapRef.current.on('dragend', () => {
        isDraggingRef.current = false;
        setTimeout(startRotation, 1500); // Delay restart of rotation
      });

      return () => {
        stopRotation();
        if (mapRef.current) {
          mapRef.current.remove();
        }
      };
    }
  }, [longitude, latitude]);

  return (
    <div style={containerStyle}>
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '0.5rem',
        }}
      />
    </div>
  );
};

export default ResortMap;
