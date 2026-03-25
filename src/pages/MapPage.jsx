import { Fragment, useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { divIcon } from 'leaflet'
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import PageWrapper from '../components/shared/PageWrapper'

const BOTSWANA_CENTER = [-22.3285, 24.6849]
const BOTSWANA_ZOOM = 6.5

const coverageData = [
  { name: 'Gaborone', lat: -24.6282, lng: 25.9231, mascom4g: 95, orange4g: 92, bemobile4g: 88, btc4g: 78, mascom3g: 99, orange3g: 98, bemobile3g: 95, btc3g: 90 },
  { name: 'Francistown', lat: -21.1661, lng: 27.5131, mascom4g: 88, orange4g: 85, bemobile4g: 80, btc4g: 60, mascom3g: 95, orange3g: 93, bemobile3g: 88, btc3g: 75 },
  { name: 'Maun', lat: -19.9833, lng: 23.4167, mascom4g: 75, orange4g: 70, bemobile4g: 65, btc4g: 20, mascom3g: 88, orange3g: 82, bemobile3g: 78, btc3g: 40 },
  { name: 'Kasane', lat: -17.8, lng: 25.15, mascom4g: 60, orange4g: 55, bemobile4g: 45, btc4g: 10, mascom3g: 78, orange3g: 72, bemobile3g: 65, btc3g: 25 },
  { name: 'Serowe', lat: -22.3833, lng: 26.7167, mascom4g: 72, orange4g: 68, bemobile4g: 60, btc4g: 30, mascom3g: 85, orange3g: 80, bemobile3g: 75, btc3g: 50 },
  { name: 'Lobatse', lat: -25.2167, lng: 25.6833, mascom4g: 82, orange4g: 78, bemobile4g: 72, btc4g: 55, mascom3g: 92, orange3g: 88, bemobile3g: 84, btc3g: 70 },
  { name: 'Molepolole', lat: -24.4067, lng: 25.495, mascom4g: 78, orange4g: 74, bemobile4g: 68, btc4g: 40, mascom3g: 90, orange3g: 86, bemobile3g: 82, btc3g: 60 },
  { name: 'Palapye', lat: -22.55, lng: 27.1333, mascom4g: 70, orange4g: 65, bemobile4g: 58, btc4g: 25, mascom3g: 84, orange3g: 78, bemobile3g: 72, btc3g: 45 },
  { name: 'Selebi-Phikwe', lat: -22, lng: 27.8333, mascom4g: 76, orange4g: 72, bemobile4g: 66, btc4g: 35, mascom3g: 88, orange3g: 84, bemobile3g: 78, btc3g: 55 },
  { name: 'Kanye', lat: -24.9833, lng: 25.35, mascom4g: 68, orange4g: 63, bemobile4g: 55, btc4g: 20, mascom3g: 82, orange3g: 76, bemobile3g: 70, btc3g: 40 },
  { name: 'Mochudi', lat: -24.4, lng: 26.15, mascom4g: 74, orange4g: 70, bemobile4g: 63, btc4g: 35, mascom3g: 87, orange3g: 82, bemobile3g: 76, btc3g: 52 },
  { name: 'Ramotswa', lat: -24.8667, lng: 25.8833, mascom4g: 71, orange4g: 67, bemobile4g: 60, btc4g: 28, mascom3g: 84, orange3g: 79, bemobile3g: 73, btc3g: 47 },
  { name: 'Jwaneng', lat: -24.6022, lng: 24.7286, mascom4g: 65, orange4g: 60, bemobile4g: 52, btc4g: 15, mascom3g: 80, orange3g: 74, bemobile3g: 68, btc3g: 35 },
  { name: 'Orapa', lat: -21.3, lng: 25.3667, mascom4g: 62, orange4g: 57, bemobile4g: 48, btc4g: 12, mascom3g: 77, orange3g: 71, bemobile3g: 64, btc3g: 30 },
  { name: 'Ghanzi', lat: -21.7, lng: 21.65, mascom4g: 40, orange4g: 35, bemobile4g: 28, btc4g: 5, mascom3g: 62, orange3g: 55, bemobile3g: 48, btc3g: 15 },
  { name: 'Tsabong', lat: -26.0333, lng: 22.45, mascom4g: 35, orange4g: 30, bemobile4g: 22, btc4g: 5, mascom3g: 55, orange3g: 48, bemobile3g: 42, btc3g: 12 },
]

const networkOptions = [
  { label: '4G LTE', value: '4g lte', color: '#1A3A6B' },
  { label: '3G', value: '3g', color: '#0F6E56' },
  { label: '2G', value: '2g', color: '#BA7517' },
  { label: 'ALL', value: 'all', color: '#1A3A6B' },
]

const providerOptions = [
  { label: 'All', value: 'all' },
  { label: 'Mascom', value: 'Mascom Wireless' },
  { label: 'Orange', value: 'Orange Botswana' },
  { label: 'BeMobile', value: 'BeMobile' },
  { label: 'BTC', value: 'BTC Fibre' },
]

const legendItems = [
  { label: 'Excellent 80%+', color: '#22c55e' },
  { label: 'Good 50-80%', color: '#eab308' },
  { label: 'Fair 20-50%', color: '#f97316' },
  { label: 'Limited <20%', color: '#ef4444' },
]

const majorCityNames = new Set(['Gaborone', 'Francistown', 'Maun', 'Lobatse', 'Molepolole'])

function getColor(pct) {
  if (pct >= 80) return '#22c55e'
  if (pct >= 50) return '#eab308'
  if (pct >= 20) return '#f97316'
  return '#ef4444'
}

function createPulseIcon(color, size) {
  return divIcon({
    className: '',
    html: `<span class="major-city-pulse" style="--pulse-color:${color};--pulse-size:${size}px;"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function MapViewportController({ match }) {
  const map = useMap()

  useEffect(() => {
    if (match) {
      map.flyTo([match.lat, match.lng], 8.2, { animate: true, duration: 1.2 })
      return
    }

    map.flyTo(BOTSWANA_CENTER, BOTSWANA_ZOOM, { animate: true, duration: 1.1 })
  }, [map, match])

  return null
}

function FloatingPill({ active, color = '#1A3A6B', children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: active ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.16)',
        background: active ? color : 'rgba(255,255,255,0.1)',
        color: '#ffffff',
        borderRadius: 999,
        padding: '10px 16px',
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '0.01em',
        cursor: 'pointer',
        backdropFilter: 'blur(14px)',
        boxShadow: active ? '0 18px 30px rgba(26,58,107,0.45)' : 'none',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  )
}

export default function MapPage() {
  const [selectedNetwork, setSelectedNetwork] = useState('all')
  const [selectedISP, setSelectedISP] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTown, setSelectedTown] = useState(null)

  const getCoverage = (town) => {
    const ispKey =
      selectedISP === 'all'
        ? 'mascom'
        : selectedISP
            .toLowerCase()
            .replace(/\s+/g, '')
            .replace('botswana', '')
            .replace('wireless', '')
            .replace('fibre', '')

    const netKey = selectedNetwork === 'all' ? '4g' : selectedNetwork.replace(' lte', '')
    const key = `${ispKey}${netKey}`

    return town[key] ?? town[`${ispKey}3g`] ?? town.mascom4g
  }

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const matchedTown = normalizedQuery
    ? coverageData.find((town) => town.name.toLowerCase().includes(normalizedQuery))
    : null
  const visibleTowns = normalizedQuery
    ? coverageData.filter((town) => town.name.toLowerCase().includes(normalizedQuery))
    : coverageData

  return (
    <PageWrapper fullWidth={true} hideChat={true} wrapperStyle={{ background: '#050816', overflow: 'hidden' }}>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(2.5); opacity: 0; }
          }

          .premium-map-page .leaflet-container {
            background: #050816;
            font-family: 'Inter', sans-serif;
          }

          .premium-map-page .leaflet-control-attribution {
            background: rgba(15,20,40,0.74);
            color: rgba(255,255,255,0.72);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            backdrop-filter: blur(14px);
            margin: 0 14px 14px 0;
            padding: 6px 10px;
          }

          .premium-map-page .leaflet-control-attribution a {
            color: #dbeafe;
          }

          .premium-map-page .premium-map-popup .leaflet-popup-content-wrapper {
            background: transparent;
            box-shadow: none;
            padding: 0;
          }

          .premium-map-page .premium-map-popup .leaflet-popup-content {
            margin: 0;
          }

          .premium-map-page .premium-map-popup .leaflet-popup-tip {
            background: #0f1428;
            box-shadow: none;
          }

          .premium-map-page .premium-map-popup .leaflet-popup-close-button {
            color: rgba(255,255,255,0.72);
            padding: 10px 12px 0 0;
          }

          .premium-map-page .premium-map-popup .leaflet-popup-close-button:hover {
            color: #ffffff;
          }

          .premium-map-page .map-overlay-panel {
            box-shadow: 0 28px 70px rgba(0,0,0,0.38);
          }

          .premium-map-page .major-city-pulse {
            position: relative;
            display: block;
            width: var(--pulse-size);
            height: var(--pulse-size);
            pointer-events: none;
          }

          .premium-map-page .major-city-pulse::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 999px;
            border: 2px solid var(--pulse-color);
            background: color-mix(in srgb, var(--pulse-color) 16%, transparent);
            animation: pulse 2.4s ease-out infinite;
            box-shadow: 0 0 28px color-mix(in srgb, var(--pulse-color) 45%, transparent);
          }

          .premium-map-page .major-city-pulse::after {
            content: '';
            position: absolute;
            inset: 32%;
            border-radius: 999px;
            background: var(--pulse-color);
            box-shadow: 0 0 20px color-mix(in srgb, var(--pulse-color) 65%, transparent);
          }

          @media (max-width: 900px) {
            .premium-map-page .map-topbar {
              width: calc(100% - 32px);
              min-width: 0 !important;
              padding: 10px 14px !important;
            }

            .premium-map-page .map-filter-panel {
              width: calc(100% - 32px);
            }
          }

          @media (max-width: 720px) {
            .premium-map-page .map-stats-card,
            .premium-map-page .map-legend-card {
              bottom: 18px !important;
              min-width: 0 !important;
            }

            .premium-map-page .map-stats-card {
              left: 16px !important;
              right: 16px;
            }

            .premium-map-page .map-legend-card {
              display: none;
            }
          }
        `}
      </style>

      <div
        className="premium-map-page"
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: 'calc(100vh - 80px)',
          width: '100%',
          background:
            'radial-gradient(circle at 15% 10%, rgba(59,130,246,0.22), transparent 24%), radial-gradient(circle at 82% 88%, rgba(34,197,94,0.18), transparent 28%), #050816',
        }}
      >
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
          <MapContainer
            center={BOTSWANA_CENTER}
            zoom={BOTSWANA_ZOOM}
            zoomControl={false}
            scrollWheelZoom={true}
            style={{ position: 'relative', height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution="&copy; OpenStreetMap &copy; CARTO"
            />
            <MapViewportController match={matchedTown} />

            {visibleTowns.map((town) => {
              const pct = getCoverage(town)
              const color = getColor(pct)
              const radius = Math.max(pct / 5, 12)
              const coverageLabel = selectedNetwork === 'all' ? '4G Coverage' : `${selectedNetwork.toUpperCase()} Coverage`

              return (
                <Fragment key={town.name}>
                  <CircleMarker
                    center={[town.lat, town.lng]}
                    radius={radius + 8}
                    fillColor={color}
                    fillOpacity={0.16}
                    stroke={false}
                    weight={0}
                    eventHandlers={{ click: () => setSelectedTown(town) }}
                  />
                  <CircleMarker
                    center={[town.lat, town.lng]}
                    radius={radius}
                    fillColor={color}
                    fillOpacity={0.6}
                    stroke={false}
                    weight={0}
                    eventHandlers={{ click: () => setSelectedTown(town) }}
                  />

                  {majorCityNames.has(town.name) && (
                    <Marker
                      position={[town.lat, town.lng]}
                      icon={createPulseIcon(color, Math.max(radius * 2.6, 42))}
                      interactive={false}
                    />
                  )}
                </Fragment>
              )
            })}
          </MapContainer>

          {selectedTown && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'white',
              borderRadius: '20px 20px 0 0',
              boxShadow: '0 -8px 32px rgba(0,0,0,0.2)',
              padding: '20px 32px 24px',
              zIndex: 2000,
              maxHeight: '45%',
              overflowY: 'auto'
            }}>
              <div style={{ width:40, height:4, background:'#e5e7eb', borderRadius:4, margin:'0 auto 16px' }}/>
              
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                <div>
                  <h3 style={{ fontSize:18, fontWeight:700, color:'#111', margin:0 }}>{selectedTown.name}</h3>
                  <p style={{ fontSize:12, color:'#6b7280', margin:'2px 0 0' }}>4G Coverage by provider</p>
                </div>
                <button onClick={() => setSelectedTown(null)}
                  style={{ background:'#f1f5f9', border:'none', borderRadius:8, padding:'6px 12px', cursor:'pointer', fontSize:14, color:'#666', flexShrink:0 }}>✕</button>
              </div>

              {[
                { name:'Mascom Wireless', key:'mascom', color:'#e74c3c' },
                { name:'Orange Botswana', key:'orange', color:'#f97316' },
                { name:'BeMobile',        key:'bemobile', color:'#3b82f6' },
                { name:'BTC Fibre',       key:'btc',    color:'#8b5cf6' },
              ].map(({ name, key, color }) => {
                const pct = selectedTown[`${key}4g`] ?? 0
                const bar = pct>=80?'#22c55e':pct>=50?'#eab308':pct>=20?'#f97316':'#ef4444'
                const grade = pct>=90?'A+':pct>=80?'A':pct>=70?'B+':pct>=60?'B':'C+'
                return (
                  <div key={key} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:color, flexShrink:0 }}/>
                    <span style={{ width:140, fontSize:13, fontWeight:500, color:'#374151', flexShrink:0 }}>{name}</span>
                    <div style={{ flex:1, background:'#f1f5f9', borderRadius:4, height:6 }}>
                      <div style={{ width:`${pct}%`, background:bar, height:'100%', borderRadius:4 }}/>
                    </div>
                    <span style={{ width:36, fontSize:13, fontWeight:700, color:'#111', textAlign:'right', flexShrink:0 }}>{pct}%</span>
                    <span style={{ width:24, fontSize:11, fontWeight:700, color:bar, flexShrink:0 }}>{grade}</span>
                  </div>
                )
              })}

              <div style={{ marginTop:14, paddingTop:14, borderTop:'1px solid #f1f5f9' }}>
                <a href="/portal/complaint/new"
                  style={{ background:'#1A3A6B', color:'white', textDecoration:'none', borderRadius:50, padding:'9px 18px', fontSize:13, fontWeight:600, display:'inline-block' }}>
                  Report Poor Coverage in {selectedTown.name} →
                </a>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(3,7,18,0.15) 0%, rgba(3,7,18,0.02) 26%, rgba(3,7,18,0.22) 100%)',
            pointerEvents: 'none',
            zIndex: 350,
          }}
        />

        <div
          className="map-overlay-panel map-topbar"
          style={{
            position: 'absolute',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 50,
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            zIndex: 1000,
            minWidth: 500,
            maxWidth: 'calc(100% - 32px)',
            width: 'min(560px, calc(100% - 32px))',
          }}
        >
          <Search size={18} color="#e5e7eb" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search a location in Botswana..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: 14,
            }}
          />
        </div>

        <div
          className="map-overlay-panel map-filter-panel"
          style={{
            position: 'absolute',
            top: 84,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            alignItems: 'center',
            width: 'min(920px, calc(100% - 32px))',
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 24,
            padding: '14px 16px',
          }}
        >
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {networkOptions.map((option) => (
              <FloatingPill
                key={option.value}
                active={selectedNetwork === option.value}
                color={option.color}
                onClick={() => setSelectedNetwork(option.value)}
              >
                {option.label}
              </FloatingPill>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {providerOptions.map((option) => (
              <FloatingPill
                key={option.value}
                active={selectedISP === option.value}
                onClick={() => setSelectedISP(option.value)}
              >
                {option.label}
              </FloatingPill>
            ))}
          </div>
        </div>

        <div
          className="map-overlay-panel map-stats-card"
          style={{
            position: 'absolute',
            bottom: 32,
            left: 24,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.8)',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            padding: '16px 20px',
            zIndex: 1000,
            color: '#111',
            minWidth: 220,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 14, color: '#111' }}>Botswana Coverage</div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, gap: 12 }}>
              <span style={{ color: '#6b7280', fontSize: 13 }}>Population covered</span>
              <span style={{ color: '#1A3A6B', fontWeight: 700 }}>74%</span>
            </div>
            <div style={{ height: 7, background: 'rgba(0,0,0,0.06)', borderRadius: 999 }}>
              <div
                style={{
                  width: '74%',
                  height: '100%',
                  borderRadius: 999,
                  background: 'linear-gradient(90deg, #16a34a 0%, #4ade80 100%)',
                  boxShadow: '0 0 20px rgba(34,197,94,0.38)',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ color: '#6b7280', fontSize: 13 }}>Districts monitored</span>
              <span style={{ color: '#1A3A6B', fontWeight: 700 }}>16</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ color: '#6b7280', fontSize: 13 }}>Active towers</span>
              <span style={{ color: '#1A3A6B', fontWeight: 700 }}>1,247</span>
            </div>
          </div>
        </div>

        <div
          className="map-overlay-panel map-legend-card"
          style={{
            position: 'absolute',
            bottom: 32,
            right: 24,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.8)',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            padding: '16px 18px',
            zIndex: 1000,
            color: '#111',
            minWidth: 220,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 12, color: '#111' }}>Coverage Legend</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {legendItems.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: item.color,
                    boxShadow: `0 0 16px ${item.color}`,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 13, color: '#6b7280' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
