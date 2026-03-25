import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/shared/PageWrapper'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { CircleMarker, MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const shellStyle = {
  maxWidth: 1400,
  margin: '0 auto',
  padding: '0 40px',
}

const palette = {
  ink: '#111111',
  muted: '#6b7280',
  border: '#e5e7eb',
  navy: '#1A3A6B',
  hero: '#0a1628',
  green: '#16a34a',
  emerald: '#0F6E56',
  orange: '#f97316',
  blue: '#3b82f6',
  red: '#dc2626',
}

const tabs = ['Dashboard', 'Coverage Maps', 'ISP Reports']
const coverageTabs = [
  { label: '2G', value: '2g' },
  { label: '3G', value: '3g' },
  { label: '4G LTE', value: '4g' },
]

const lastUpdated = '24 Mar 2026, 14:32 CAT'

const heroStats = [
  { value: '32.4 Mbps', label: 'National avg download', trend: '+6.4% QoQ', trendColor: '#34d399' },
  { value: '98.2%', label: 'National uptime', trend: '+0.7 pts', trendColor: '#60a5fa' },
  { value: '147', label: 'Open complaints', trend: '-11 this week', trendColor: '#f59e0b' },
  { value: '48hrs', label: 'Avg resolution time', trend: '-6 hrs faster', trendColor: '#c084fc' },
]

const ispData = [
  { name: 'BTC Fibre', grade: 'A+', color: '#0F6E56', download: 95.2, upload: 48.1, latency: 12, uptime: 99.5, complaints: 4, resolution: 24, coverage4g: 78, coverage3g: 90, coverage2g: 95, districts: 10 },
  { name: 'Mascom Wireless', grade: 'A', color: '#1A3A6B', download: 32.1, upload: 15.4, latency: 28, uptime: 98.8, complaints: 11, resolution: 36, coverage4g: 88, coverage3g: 95, coverage2g: 99, districts: 16 },
  { name: 'Orange Botswana', grade: 'B+', color: '#f97316', download: 29.5, upload: 13.2, latency: 31, uptime: 97.9, complaints: 15, resolution: 48, coverage4g: 85, coverage3g: 93, coverage2g: 98, districts: 14 },
  { name: 'BeMobile', grade: 'B', color: '#3b82f6', download: 24.8, upload: 10.8, latency: 38, uptime: 97.1, complaints: 18, resolution: 52, coverage4g: 80, coverage3g: 88, coverage2g: 96, districts: 12 },
]

const trendLabels = ['Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026']

const lineData = {
  labels: trendLabels,
  datasets: [
    {
      label: 'BTC Fibre',
      data: [86.4, 88.1, 90.3, 92.4, 94.1, 95.2],
      borderColor: '#0F6E56',
      backgroundColor: 'rgba(15,110,86,0.08)',
      fill: true,
      tension: 0.36,
      pointRadius: 3,
      pointHoverRadius: 5,
    },
    {
      label: 'Mascom Wireless',
      data: [28.7, 29.5, 30.2, 31.1, 31.7, 32.1],
      borderColor: '#1A3A6B',
      backgroundColor: 'rgba(26,58,107,0.06)',
      fill: true,
      tension: 0.36,
      pointRadius: 3,
      pointHoverRadius: 5,
    },
    {
      label: 'Orange Botswana',
      data: [26.4, 27.1, 28.2, 28.9, 29.2, 29.5],
      borderColor: '#f97316',
      backgroundColor: 'rgba(249,115,22,0.06)',
      fill: true,
      tension: 0.36,
      pointRadius: 3,
      pointHoverRadius: 5,
    },
    {
      label: 'BeMobile',
      data: [21.7, 22.6, 23.5, 24.1, 24.5, 24.8],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.05)',
      fill: true,
      tension: 0.36,
      pointRadius: 3,
      pointHoverRadius: 5,
    },
  ],
}

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        boxHeight: 8,
        color: '#374151',
        padding: 18,
      },
    },
  },
  scales: {
    x: {
      border: { display: false },
      grid: { display: false },
      ticks: { color: '#6b7280' },
    },
    y: {
      border: { display: false },
      grid: { color: '#f1f5f9' },
      ticks: {
        color: '#6b7280',
        callback: (value) => `${value} Mbps`,
      },
    },
  },
}

const dashboardComplaintData = {
  labels: ['Coverage', 'Slow speeds', 'Billing', 'Dropped service'],
  datasets: [
    {
      data: [42, 31, 16, 11],
      backgroundColor: ['#1A3A6B', '#0F6E56', '#f97316', '#3b82f6'],
      borderWidth: 0,
      hoverOffset: 6,
    },
  ],
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '72%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        boxHeight: 8,
        padding: 16,
        color: '#4b5563',
      },
    },
  },
}

const reportBarData = {
  labels: ispData.map((item) => item.name),
  datasets: [
    {
      label: 'Download speed',
      data: ispData.map((item) => item.download),
      backgroundColor: ispData.map((item) => item.color),
      borderRadius: 10,
      borderSkipped: false,
      barThickness: 24,
    },
  ],
}

const reportBarOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      border: { display: false },
      grid: { color: '#f1f5f9' },
      ticks: {
        color: '#6b7280',
        callback: (value) => `${value} Mbps`,
      },
    },
    y: {
      border: { display: false },
      grid: { display: false },
      ticks: { color: '#374151', font: { weight: 600 } },
    },
  },
}

const BOTSWANA_CENTER = [-22.3285, 24.6849]
const BOTSWANA_ZOOM = 6.3

const coverageMapData = [
  { name: 'Gaborone', lat: -24.6282, lng: 25.9231, mascom2g: 99, orange2g: 98, bemobile2g: 96, btc2g: 90, mascom3g: 99, orange3g: 98, bemobile3g: 95, btc3g: 90, mascom4g: 95, orange4g: 92, bemobile4g: 88, btc4g: 78 },
  { name: 'Francistown', lat: -21.1661, lng: 27.5131, mascom2g: 98, orange2g: 97, bemobile2g: 95, btc2g: 88, mascom3g: 95, orange3g: 93, bemobile3g: 88, btc3g: 75, mascom4g: 88, orange4g: 85, bemobile4g: 80, btc4g: 60 },
  { name: 'Maun', lat: -19.9833, lng: 23.4167, mascom2g: 96, orange2g: 95, bemobile2g: 90, btc2g: 74, mascom3g: 88, orange3g: 82, bemobile3g: 78, btc3g: 40, mascom4g: 75, orange4g: 70, bemobile4g: 65, btc4g: 20 },
  { name: 'Kasane', lat: -17.8, lng: 25.15, mascom2g: 94, orange2g: 92, bemobile2g: 86, btc2g: 68, mascom3g: 78, orange3g: 72, bemobile3g: 65, btc3g: 25, mascom4g: 60, orange4g: 55, bemobile4g: 45, btc4g: 10 },
  { name: 'Serowe', lat: -22.3833, lng: 26.7167, mascom2g: 98, orange2g: 96, bemobile2g: 92, btc2g: 80, mascom3g: 85, orange3g: 80, bemobile3g: 75, btc3g: 50, mascom4g: 72, orange4g: 68, bemobile4g: 60, btc4g: 30 },
  { name: 'Lobatse', lat: -25.2167, lng: 25.6833, mascom2g: 98, orange2g: 96, bemobile2g: 93, btc2g: 86, mascom3g: 92, orange3g: 88, bemobile3g: 84, btc3g: 70, mascom4g: 82, orange4g: 78, bemobile4g: 72, btc4g: 55 },
  { name: 'Molepolole', lat: -24.4067, lng: 25.495, mascom2g: 97, orange2g: 95, bemobile2g: 91, btc2g: 82, mascom3g: 90, orange3g: 86, bemobile3g: 82, btc3g: 60, mascom4g: 78, orange4g: 74, bemobile4g: 68, btc4g: 40 },
  { name: 'Palapye', lat: -22.55, lng: 27.1333, mascom2g: 96, orange2g: 94, bemobile2g: 90, btc2g: 76, mascom3g: 84, orange3g: 78, bemobile3g: 72, btc3g: 45, mascom4g: 70, orange4g: 65, bemobile4g: 58, btc4g: 25 },
  { name: 'Selebi-Phikwe', lat: -22, lng: 27.8333, mascom2g: 97, orange2g: 95, bemobile2g: 91, btc2g: 79, mascom3g: 88, orange3g: 84, bemobile3g: 78, btc3g: 55, mascom4g: 76, orange4g: 72, bemobile4g: 66, btc4g: 35 },
  { name: 'Kanye', lat: -24.9833, lng: 25.35, mascom2g: 96, orange2g: 94, bemobile2g: 90, btc2g: 73, mascom3g: 82, orange3g: 76, bemobile3g: 70, btc3g: 40, mascom4g: 68, orange4g: 63, bemobile4g: 55, btc4g: 20 },
  { name: 'Mochudi', lat: -24.4, lng: 26.15, mascom2g: 97, orange2g: 96, bemobile2g: 92, btc2g: 77, mascom3g: 87, orange3g: 82, bemobile3g: 76, btc3g: 52, mascom4g: 74, orange4g: 70, bemobile4g: 63, btc4g: 35 },
  { name: 'Ramotswa', lat: -24.8667, lng: 25.8833, mascom2g: 97, orange2g: 95, bemobile2g: 91, btc2g: 76, mascom3g: 84, orange3g: 79, bemobile3g: 73, btc3g: 47, mascom4g: 71, orange4g: 67, bemobile4g: 60, btc4g: 28 },
  { name: 'Jwaneng', lat: -24.6022, lng: 24.7286, mascom2g: 95, orange2g: 92, bemobile2g: 88, btc2g: 69, mascom3g: 80, orange3g: 74, bemobile3g: 68, btc3g: 35, mascom4g: 65, orange4g: 60, bemobile4g: 52, btc4g: 15 },
  { name: 'Orapa', lat: -21.3, lng: 25.3667, mascom2g: 95, orange2g: 91, bemobile2g: 86, btc2g: 66, mascom3g: 77, orange3g: 71, bemobile3g: 64, btc3g: 30, mascom4g: 62, orange4g: 57, bemobile4g: 48, btc4g: 12 },
  { name: 'Ghanzi', lat: -21.7, lng: 21.65, mascom2g: 90, orange2g: 86, bemobile2g: 79, btc2g: 55, mascom3g: 62, orange3g: 55, bemobile3g: 48, btc3g: 15, mascom4g: 40, orange4g: 35, bemobile4g: 28, btc4g: 5 },
  { name: 'Tsabong', lat: -26.0333, lng: 22.45, mascom2g: 88, orange2g: 84, bemobile2g: 76, btc2g: 48, mascom3g: 55, orange3g: 48, bemobile3g: 42, btc3g: 12, mascom4g: 35, orange4g: 30, bemobile4g: 22, btc4g: 5 },
]

const coverageMeta = {
  '2g': {
    label: '2G',
    stats: ['Population covered: 85%', '1,241 base stations', 'All 16 districts'],
  },
  '3g': {
    label: '3G',
    stats: ['Population covered: 74%', '1,670 base stations', '14 districts'],
  },
  '4g': {
    label: '4G LTE',
    stats: ['Population covered: 62%', '1,333 base stations', '8 districts'],
  },
}

function labelStyle() {
  return {
    margin: 0,
    color: '#9ca3af',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
  }
}

function metricTrackStyle() {
  return {
    height: 6,
    borderRadius: 999,
    background: '#eef2f7',
    overflow: 'hidden',
  }
}

function getCoverageColor(value) {
  if (value >= 80) return '#16a34a'
  if (value >= 60) return '#eab308'
  if (value >= 40) return '#f97316'
  return '#ef4444'
}

function getCoverageAverage(point, networkType) {
  const keys = [`mascom${networkType}`, `orange${networkType}`, `bemobile${networkType}`, `btc${networkType}`]
  const total = keys.reduce((sum, key) => sum + point[key], 0)
  return Math.round(total / keys.length)
}

function MetricBar({ label, value, suffix = '', max = 100, color = palette.navy, lowerIsBetter = false }) {
  const normalized = Math.max(4, Math.min((value / max) * 100, 100))
  const width = lowerIsBetter ? Math.max(4, 100 - normalized + 6) : normalized

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
        <span style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>{label}</span>
        <span style={{ color: '#111111', fontSize: 13, fontWeight: 700 }}>
          {value}
          {suffix}
        </span>
      </div>
      <div style={metricTrackStyle()}>
        <div style={{ width: `${width}%`, height: '100%', borderRadius: 999, background: color }} />
      </div>
    </div>
  )
}

function CoverageQoSMap({ networkType }) {
  const meta = coverageMeta[networkType]
  const circles = coverageMapData.map((point) => {
    const coverage = getCoverageAverage(point, networkType)
    return {
      ...point,
      coverage,
      color: getCoverageColor(coverage),
      radius: Math.max(10, coverage / 4.5),
    }
  })

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <div className="qos-coverage-map" style={{ height: 500, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: '#050816', boxShadow: '0 28px 60px rgba(2,6,23,0.28)' }}>
        <MapContainer center={BOTSWANA_CENTER} zoom={BOTSWANA_ZOOM} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap &copy; CARTO"
          />
          {circles.map((point) => (
            <Fragment key={`${networkType}-${point.name}`}>
              <CircleMarker
                center={[point.lat, point.lng]}
                radius={point.radius + 8}
                pathOptions={{
                  color: point.color,
                  fillColor: point.color,
                  fillOpacity: 0.16,
                  stroke: false,
                  weight: 0,
                }}
              />
              <CircleMarker
                center={[point.lat, point.lng]}
                radius={point.radius}
                pathOptions={{
                  color: point.color,
                  fillColor: point.color,
                  fillOpacity: 0.6,
                  stroke: false,
                  weight: 0,
                }}
              />
            </Fragment>
          ))}
        </MapContainer>
      </div>

      <div className="qos-map-stats">
        {meta.stats.map((stat) => (
          <span key={`${meta.label}-${stat}`} className="qos-map-pill">
            {stat}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function QoSPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [coverageTab, setCoverageTab] = useState('4g')

  return (
    <PageWrapper fullWidth>
      <style>{`
        .qos-page { width: 100%; background: #ffffff; }
        .qos-hero {
          position: relative;
          overflow: hidden;
          padding: 120px 0 56px;
          background:
            linear-gradient(135deg, rgba(4, 10, 20, 0.58) 0%, rgba(4, 10, 20, 0.34) 34%, rgba(4, 10, 20, 0.74) 100%),
            radial-gradient(circle at top left, rgba(52, 211, 153, 0.18), transparent 28%),
            url('/bocra-hero-tech.png') center center / cover no-repeat;
        }
        .qos-hero-copy { max-width: 760px; }
        .qos-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px; }
        .qos-hero-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 18px; }
        .qos-hero-pill { display: inline-flex; align-items: center; padding: 8px 12px; border-radius: 999px; background: rgba(3,7,18,0.62); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.88); font-size: 12px; font-weight: 600; letter-spacing: 0.01em; font-family: Inter, sans-serif; backdrop-filter: blur(10px); }
        .qos-hero-btn { padding: 10px 18px; border-radius: 999px; font-size: 12px; font-weight: 600; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); color: #ffffff; cursor: pointer; transition: transform 0.15s ease, background 0.2s ease; font-family: 'DM Sans', sans-serif; }
        .qos-hero-btn--primary { background: #0ea5e9; border-color: #0ea5e9; }
        .qos-hero-btn:hover { transform: translateY(-1px); background: rgba(255,255,255,0.12); }
        .qos-hero-btn--primary:hover { background: #0284c7; }
        .qos-hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 48px; }
        .qos-hero-stat { background: rgba(3,7,18,0.52); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 20px; backdrop-filter: blur(12px); }
        .qos-tabs { display: flex; gap: 6px; margin-top: 40px; }
        .qos-tab { padding: 10px 22px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: rgba(255,255,255,0.5); font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
        .qos-tab--active { background: #ffffff; color: ${palette.hero}; border-color: #ffffff; }
        .qos-section { padding: 64px 0; }
        .qos-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .qos-card { background: #ffffff; border: 1px solid ${palette.border}; border-radius: 16px; padding: 28px; }
        .qos-isp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 40px; }
        .qos-coverage-tabs { display: flex; gap: 6px; margin-bottom: 24px; }
        .qos-coverage-tab { padding: 8px 20px; border-radius: 999px; border: 1px solid ${palette.border}; background: transparent; color: ${palette.muted}; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: Inter, sans-serif; }
        .qos-coverage-tab--active { background: #111111; color: #ffffff; border-color: #111111; }
        .qos-map-stats { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
        .qos-map-pill { background: #0f172a; color: rgba(255,255,255,0.78); padding: 6px 14px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.08); font-size: 12px; font-weight: 500; font-family: Inter, sans-serif; }
        .qos-coverage-map .leaflet-container { background: #050816; font-family: 'Inter', sans-serif; }
        .qos-coverage-map .leaflet-control-attribution { background: rgba(15,20,40,0.74); color: rgba(255,255,255,0.72); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; backdrop-filter: blur(14px); margin: 0 14px 14px 0; padding: 6px 10px; }
        .qos-coverage-map .leaflet-control-attribution a { color: #dbeafe; }
        @media (max-width: 960px) {
          .qos-hero-stats, .qos-grid-2, .qos-isp-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .qos-hero-stats { grid-template-columns: repeat(2, 1fr); }
          .qos-tabs, .qos-coverage-tabs { flex-wrap: wrap; }
        }
      `}</style>

        <div className="qos-page">
          <div className="qos-hero">
            <div style={shellStyle}>
              <div className="qos-hero-copy">
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.58)', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Quality of Service</p>
                <h1 style={{ margin: '14px 0 0', color: '#ffffff', fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.08, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: "'Space Grotesk', sans-serif" }}>
                  Network Performance<br />Dashboard
                </h1>
                <p style={{ margin: '16px 0 0', color: 'rgba(255,255,255,0.72)', fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
                  Last updated: {lastUpdated}
                </p>
                <div className="qos-hero-actions">
                  <button
                    type="button"
                    className="qos-hero-btn qos-hero-btn--primary"
                    onClick={() => navigate('/portal/complaint/new')}
                  >
                    Report an issue
                  </button>
                  <button
                    type="button"
                    className="qos-hero-btn"
                    onClick={() => navigate('/map')}
                  >
                    View coverage map
                  </button>
                </div>
                <div className="qos-hero-pills">
                  {['Live network oversight', 'QoS intelligence'].map((pill) => (
                    <span key={pill} className="qos-hero-pill">{pill}</span>
                  ))}
                </div>
              </div>

              <div className="qos-hero-stats">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="qos-hero-stat">
                    <p style={{ margin: 0, color: '#ffffff', fontSize: 28, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>{stat.value}</p>
                    <p style={{ margin: '6px 0 0', color: 'rgba(255,255,255,0.72)', fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</p>
                    <span style={{ display: 'inline-block', marginTop: 8, padding: '3px 10px', borderRadius: 999, background: `${stat.trendColor}18`, color: stat.trendColor, fontSize: 11, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{stat.trend}</span>
                  </div>
                ))}
              </div>

              <div className="qos-tabs">
                {tabs.map((tab) => (
                  <button key={tab} type="button" className={`qos-tab ${activeTab === tab ? 'qos-tab--active' : ''}`} onClick={() => setActiveTab(tab)}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

        {activeTab === 'Dashboard' && (
          <div className="qos-section" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 1000, height: 400, background: 'radial-gradient(ellipse at top, rgba(15,110,86,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
            
            <div style={{ ...shellStyle, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 12px #10b981' }} />
                    <p style={{ margin: 0, color: '#10b981', fontSize: 12, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>Live Telemetry</p>
                  </div>
                  <h2 style={{ margin: 0, color: palette.ink, fontSize: 36, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>
                    Network Performance
                  </h2>
                </div>
                <div style={{ padding: '8px 16px', borderRadius: 999, background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#475569', fontFamily: "'DM Sans', sans-serif" }}>Trailing 6 Months Analysis</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, marginTop: 40 }}>
                {/* Line Chart Card */}
                <div style={{ 
                  flex: '3 1 600px', 
                  background: '#ffffff', 
                  borderRadius: 24, 
                  padding: 32, 
                  border: '1px solid rgba(226, 232, 240, 0.8)', 
                  boxShadow: '0 24px 48px -12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <p style={{ margin: 0, color: palette.ink, fontSize: 18, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.01em' }}>
                      Download Speed Trend
                    </p>
                    <button style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 700, color: '#475569', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif" }}>Export Report</button>
                  </div>
                  <div style={{ height: 320 }}>
                    <Line 
                      data={lineData} 
                      options={{ 
                        ...lineOptions, 
                        plugins: { 
                          ...lineOptions.plugins, 
                          legend: { position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 6, boxHeight: 6, padding: 20, color: '#64748b', font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 } } } 
                        }, 
                        scales: { 
                          x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { family: "'DM Sans', sans-serif", size: 11 } } }, 
                          y: { border: { display: false }, grid: { color: '#f1f5f9', borderDash: [4, 4] }, ticks: { color: '#94a3b8', font: { family: "'DM Sans', sans-serif", size: 11 }, callback: (v) => `${v} Mbps` } } 
                        } 
                      }} 
                    />
                  </div>
                </div>

                {/* Doughnut Chart Card */}
                <div style={{ 
                  flex: '2 1 350px',
                  background: 'linear-gradient(145deg, #ffffff 0%, #fafcff 100%)', 
                  borderRadius: 24, 
                  padding: 32, 
                  border: '1px solid rgba(226, 232, 240, 0.8)', 
                  boxShadow: '0 24px 48px -12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)',
                  display: 'flex', 
                  flexDirection: 'column'
                }}>
                  <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ margin: 0, color: palette.ink, fontSize: 18, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.01em' }}>
                        Issue Distribution
                      </p>
                      <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>30-day aggregate</p>
                    </div>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, rgba(15,110,86,0.06) 0%, transparent 70%)', zIndex: 0 }} />
                    <div style={{ width: '100%', maxWidth: 260, height: 260, position: 'relative', zIndex: 1, padding: 10 }}>
                      <Doughnut 
                        data={dashboardComplaintData} 
                        options={{
                          ...doughnutOptions, 
                          cutout: '74%', 
                          plugins: { 
                            legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 6, boxHeight: 6, padding: 16, color: '#64748b', font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 } } },
                            tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', titleFont: { family: "'Space Grotesk', sans-serif" }, bodyFont: { family: "'DM Sans', sans-serif" }, padding: 12, cornerRadius: 8, boxPadding: 6 }
                          } 
                        }} 
                      />
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 26, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                        <span style={{ fontSize: 36, fontWeight: 800, color: palette.ink, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em', lineHeight: 1 }}>100</span>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: '#94a3b8', fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>TOTAL ISSUES</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Micro-metrics */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 28 }}>
                {[
                  { value: '99.9%', label: 'BTC Core Availability', trend: '+0.1%', isPos: true },
                  { value: '18ms', label: 'Average Urban Latency', trend: '-2ms', isPos: true },
                  { value: '42%', label: 'Coverage Issue Spike', trend: '+5%', isPos: false },
                ].map((m, i) => (
                  <div key={i} style={{ flex: '1 1 280px', padding: '24px', borderRadius: 20, background: '#ffffff', border: '1px solid rgba(226, 232, 240, 0.8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.02), 0 0 0 1px rgba(0,0,0,0.01)' }}>
                    <div>
                      <p style={{ margin: 0, color: palette.ink, fontSize: 24, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>{m.value}</p>
                      <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{m.label}</p>
                    </div>
                    <span style={{ padding: '6px 10px', borderRadius: 8, background: m.isPos ? '#ecfdf5' : '#fef2f2', color: m.isPos ? '#059669' : '#dc2626', fontSize: 12, fontWeight: 800, fontFamily: "'DM Sans', sans-serif" }}>
                      {m.trend}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {activeTab === 'Coverage Maps' && (
          <div className="qos-section">
            <div style={shellStyle}>
              <p style={labelStyle()}>Network Coverage</p>
              <h2 style={{ margin: '12px 0 0', color: palette.ink, fontSize: 28, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>Coverage by Technology</h2>
              <div className="qos-coverage-tabs" style={{ marginTop: 24 }}>
                {coverageTabs.map((ct) => (
                  <button key={ct.value} type="button" className={`qos-coverage-tab ${coverageTab === ct.value ? 'qos-coverage-tab--active' : ''}`} onClick={() => setCoverageTab(ct.value)}>
                    {ct.label}
                  </button>
                ))}
              </div>
              <CoverageQoSMap networkType={coverageTab} />
            </div>
          </div>
        )}

        {activeTab === 'ISP Reports' && (() => {
          const premiumBarData = {
            labels: ispData.map(item => item.name),
            datasets: [
              {
                label: 'Download Speed',
                data: ispData.map(item => item.download),
                backgroundColor: ispData.map(item => item.color),
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.75,
                categoryPercentage: 0.85
              },
              {
                label: 'Upload Speed',
                data: ispData.map(item => item.upload),
                backgroundColor: ispData.map(item => item.color + '33'),
                borderColor: ispData.map(item => item.color),
                borderWidth: 1.5,
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.75,
                categoryPercentage: 0.85
              }
            ]
          };

          const premiumBarOptions = {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { left: 0, right: 32, top: 16, bottom: 0 } },
            plugins: {
              legend: { 
                position: 'top', 
                align: 'end', 
                labels: { usePointStyle: true, boxWidth: 8, boxHeight: 8, padding: 24, color: '#64748b', font: { family: "'DM Sans', sans-serif", size: 13, weight: 600 } } 
              },
              tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                titleFont: { family: "'Space Grotesk', sans-serif", size: 15 },
                bodyFont: { family: "'DM Sans', sans-serif", size: 13 },
                padding: 16,
                cornerRadius: 12,
                boxPadding: 8,
                usePointStyle: true,
              }
            },
            scales: {
              x: {
                grid: { color: '#f1f5f9', borderDash: [6, 4], drawBorder: false },
                ticks: { color: '#94a3b8', font: { family: "'DM Sans', sans-serif", size: 12 }, stepSize: 20 }
              },
              y: {
                grid: { display: false, drawBorder: false },
                ticks: { color: '#334155', font: { family: "'Space Grotesk', sans-serif", size: 14, weight: 700 } }
              }
            }
          };

          return (
          <div className="qos-section" style={{ background: '#fafcff', position: 'relative' }}>
            <div style={{ ...shellStyle, position: 'relative' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 40 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 12px rgba(59,130,246,0.8)' }} />
                    <p style={{ margin: 0, color: '#3b82f6', fontSize: 12, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>Operator Comparison</p>
                  </div>
                  <h2 style={{ margin: 0, color: palette.ink, fontSize: 36, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>
                    ISP Performance Scorecards
                  </h2>
                </div>
              </div>

              {/* Ultra-Premium Comparison Bar Chart */}
              <div style={{ 
                  background: '#ffffff', 
                  borderRadius: 24, 
                  padding: 40, 
                  border: '1px solid rgba(226, 232, 240, 0.8)', 
                  boxShadow: '0 24px 48px -12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)',
                  marginBottom: 40
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                  <div>
                    <h3 style={{ margin: 0, color: palette.ink, fontSize: 20, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.01em' }}>Network Speed Benchmarks</h3>
                    <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>Comparative analysis of Download vs Upload bandwidth (Mbps)</p>
                  </div>
                </div>
                <div style={{ height: 420 }}>
                  <Bar data={premiumBarData} options={premiumBarOptions} />
                </div>
              </div>

              {/* ISP Cards - Upgraded */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
                {ispData.map((isp) => (
                  <div key={isp.name} style={{
                    background: 'linear-gradient(160deg, #ffffff 0%, #fefefe 100%)',
                    borderRadius: 24, padding: 36,
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                    boxShadow: '0 20px 40px -12px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.01)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Top color accent line */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 6, background: isp.color }} />
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                      <div>
                        <h4 style={{ margin: 0, color: palette.ink, fontSize: 24, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>{isp.name}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                          <span style={{ color: '#64748b', fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{isp.districts} districts covered</span>
                        </div>
                      </div>
                      <div style={{ 
                        background: `${isp.color}12`, 
                        color: isp.color, 
                        width: 56, height: 56, 
                        borderRadius: 18, 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        fontSize: 20, fontWeight: 800, 
                        fontFamily: "'Space Grotesk', sans-serif", 
                        border: `1px solid ${isp.color}20` 
                      }}>
                        {isp.grade}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gap: 24 }}>
                      <MetricBar label="Download" value={isp.download} suffix=" Mbps" max={100} color={isp.color} />
                      <MetricBar label="Upload" value={isp.upload} suffix=" Mbps" max={50} color={isp.color} />
                      <MetricBar label="Latency" value={isp.latency} suffix=" ms" max={80} color={isp.color} lowerIsBetter />
                      <MetricBar label="Uptime" value={isp.uptime} suffix="%" max={100} color={isp.color} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          );
        })()}


        <div style={{ background: '#f8f9fa', padding: '56px 0', textAlign: 'center' }}>
          <div style={shellStyle}>
            <p style={{ margin: 0, color: palette.muted, fontSize: 15, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
              Have an issue with your network? File a complaint and BOCRA will follow up.
            </p>
            <button type="button" onClick={() => navigate('/portal/complaint/new')} style={{ marginTop: 20, padding: '14px 32px', borderRadius: 999, border: 'none', background: palette.navy, color: '#ffffff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              File a Complaint
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

