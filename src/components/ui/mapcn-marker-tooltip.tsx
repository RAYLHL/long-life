"use client";

import * as MapLibreGL from "maplibre-gl";
import type { MarkerOptions, PopupOptions } from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import "maplibre-gl/dist/maplibre-gl.css";
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const darkStyle = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
// Vite must emit the MapLibre worker as an asset and provide its final URL.
// Without this, MapLibre may try to resolve a non-existent worker URL and
// leave only the style background rendered.
MapLibreGL.setWorkerUrl(maplibreWorkerUrl);
const MapContext = createContext<MapLibreGL.Map | null>(null);
const MarkerContext = createContext<MapLibreGL.Marker | null>(null);

export function Map({ children, className = "", ...options }: Omit<MapLibreGL.MapOptions, "container"> & { children?: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreGL.Map | null>(null);
  const [map, setMap] = useState<MapLibreGL.Map | null>(null);
  const { style = darkStyle, ...mapOptions } = options;
  useEffect(() => {
    if (!ref.current) return;
    const map = new MapLibreGL.Map({
      container: ref.current,
      style,
      renderWorldCopies: false,
      attributionControl: { compact: true },
      ...mapOptions,
    });
    mapRef.current = map;
    setMap(map);

    // The map lives inside a responsive card. MapLibre measures the container
    // when it is created, so keep it in sync when the card becomes visible or
    // changes size (for example after the reveal animation).
    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(ref.current);
    const resizeAfterLayout = () => map.resize();
    requestAnimationFrame(resizeAfterLayout);
    map.once("load", resizeAfterLayout);

    // Keep resource failures visible during development instead of silently
    // leaving only the style's background layer on screen.
    map.on("error", (event) => {
      console.error("MapLibre map error", event.error);
    });

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
      setMap(null);
    };
  }, []);
  return <MapContext.Provider value={map}><div ref={ref} className={`long-life-map ${className}`}>{map && children}</div></MapContext.Provider>;
}

export function useMap() { return useContext(MapContext); }

export function MapMarker({ longitude, latitude, children, draggable = false, ...options }: { longitude: number; latitude: number; children: ReactNode; draggable?: boolean } & Omit<MarkerOptions, "element">) {
  const map = useMap();
  const marker = useMemo(() => new MapLibreGL.Marker({ ...options, draggable, element: document.createElement("div") }).setLngLat([longitude, latitude]), []);
  useEffect(() => { if (!map) return; marker.addTo(map); return () => { marker.remove(); }; }, [map, marker]);
  useEffect(() => { marker.setLngLat([longitude, latitude]); }, [marker, longitude, latitude]);
  return <MarkerContext.Provider value={marker}>{children}</MarkerContext.Provider>;
}

export function MarkerContent({ children, className = "" }: { children?: ReactNode; className?: string }) {
  const marker = useContext(MarkerContext);
  if (!marker) return null;
  return createPortal(<div className={`long-life-marker ${className}`}>{children ?? <div className="long-life-marker-dot" />}</div>, marker.getElement());
}

export function MarkerTooltip({ children, className = "", ...options }: { children: ReactNode; className?: string } & Omit<PopupOptions, "closeButton" | "closeOnClick" | "className">) {
  const marker = useContext(MarkerContext);
  const map = useMap();
  const container = useMemo(() => document.createElement("div"), []);
  const popup = useMemo(() => new MapLibreGL.Popup({ offset: 18, closeButton: false, closeOnClick: true, ...options }), []);
  useEffect(() => {
    if (!marker || !map) return;
    popup.setDOMContent(container);
    const enter = () => popup.setLngLat(marker.getLngLat()).addTo(map);
    const leave = () => popup.remove();
    marker.getElement()?.addEventListener("mouseenter", enter);
    marker.getElement()?.addEventListener("mouseleave", leave);
    return () => { marker.getElement()?.removeEventListener("mouseenter", enter); marker.getElement()?.removeEventListener("mouseleave", leave); popup.remove(); };
  }, [container, map, marker, popup]);
  return createPortal(<div className={`long-life-tooltip ${className}`}>{children}</div>, container);
}

export function MarkerLabel({ children }: { children: ReactNode }) { return <span className="long-life-marker-label">{children}</span>; }
