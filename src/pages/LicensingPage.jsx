import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AlertCircle, ArrowRight, Building2, Check, CheckCircle, CheckCircle2, Globe, Landmark, Mail, Package, Radio, RefreshCw, Search, Shield, Signal, Tv, User, Wifi } from 'lucide-react'
import PageWrapper from '../components/shared/PageWrapper'
import { useAuth } from '../hooks/useAuth'
import { useApplications } from '../context/ApplicationContext'

const tabs = [
  { id: 'finder', label: 'Find My Licence' },
  { id: 'apply', label: 'Apply' },
  { id: 'track', label: 'Track Application' },
  { id: 'verify', label: 'Verify & Registry' },
]

const applicantOptions = [
  { value: 'individual', label: 'Individual / Sole Trader' },
  { value: 'company', label: 'Registered Company' },
  { value: 'government', label: 'Government / Parastatal' },
]

const applicantCardMeta = {
  individual: {
    icon: User,
    description:
      'A private citizen or sole proprietor applying for a personal or small business communications licence.',
  },
  company: {
    icon: Building2,
    description:
      'A registered Botswana company (CIPA) applying for a commercial telecoms, broadcasting, or postal licence.',
  },
  government: {
    icon: Landmark,
    description:
      'A government ministry, department, or state-owned enterprise requiring a communications authorisation.',
  },
}

const serviceOptions = [
  { value: 'telecom', label: 'Mobile/Telecom Network' },
  { value: 'isp', label: 'Internet Service Provider' },
  { value: 'radio', label: 'Radio Broadcasting' },
  { value: 'tv', label: 'TV Broadcasting' },
  { value: 'postal', label: 'Postal/Courier Service' },
  { value: 'device', label: 'Device Importing/Selling' },
]

const serviceCardMeta = {
  isp: {
    icon: Wifi,
    title: 'Internet Service Provider',
    description: 'Provide fixed or mobile internet services to consumers or businesses in Botswana.',
    fee: 'P 15,000',
  },
  radio: {
    icon: Radio,
    title: 'Broadcasting Licence',
    description: 'Operate a radio station, TV channel, or community broadcasting service.',
    fee: 'P 25,000',
  },
  postal: {
    icon: Mail,
    title: 'Postal / Courier Service',
    description: 'Operate a Class A or Class B postal or courier delivery service.',
    fee: 'P 12,000',
  },
  telecom: {
    icon: Globe,
    title: 'MVNO / Telecom Operator',
    description: 'Mobile Virtual Network Operator or full telecommunications service provider.',
    fee: 'P 50,000',
  },
  tv: {
    icon: Radio,
    title: 'Television Broadcasting',
    description: 'Operate a television, satellite, or specialist broadcast service in Botswana.',
    fee: 'P 25,000',
  },
  device: {
    icon: Shield,
    title: 'Type Approval Certificate',
    description: 'Import, distribute, or sell communications equipment requiring BOCRA compliance approval.',
    fee: 'P 2,500',
  },
}

const coverageOptions = [
  { value: 'local', label: 'Local (one district)' },
  { value: 'regional', label: 'Regional (multiple districts)' },
  { value: 'national', label: 'National' },
]

const licenceMap = {
  'company-telecom-national': {
    name: 'Class 1 Network Operator Licence',
    licenceClass: 'Class 1 Telecommunications Licence',
    fee: 'BWP 250,000',
    days: '90',
    docs: ['CIPA Certificate', 'PPRA Registration', 'Tax Clearance', 'Technical Network Plan', 'Financial Statements'],
  },
  'company-telecom-regional': {
    name: 'Class 2 Telecommunications Licence',
    licenceClass: 'Class 2 Telecommunications Licence',
    fee: 'BWP 75,000',
    days: '60',
    docs: ['CIPA Certificate', 'PPRA Registration', 'Tax Clearance', 'Technical Plan'],
  },
  'company-isp-national': {
    name: 'Internet Service Provider Licence',
    licenceClass: 'Internet Service Provider Authorisation',
    fee: 'BWP 50,000',
    days: '45',
    docs: ['CIPA Certificate', 'Tax Clearance', 'Technical Infrastructure Plan', 'Security Policy Document'],
  },
  'company-radio-national': {
    name: 'Commercial Radio Broadcasting Licence',
    licenceClass: 'Commercial Broadcasting Licence',
    fee: 'BWP 30,000',
    days: '60',
    docs: ['CIPA Certificate', 'Content Policy', 'Technical Frequency Plan', 'Editorial Policy'],
  },
  'company-tv-national': {
    name: 'Television Broadcasting Licence',
    licenceClass: 'National Television Broadcasting Licence',
    fee: 'BWP 85,000',
    days: '90',
    docs: ['CIPA Certificate', 'Content Policy', 'Technical Plan', 'Financial Capacity Proof'],
  },
  'company-postal-national': {
    name: 'Postal/Courier Operator Licence',
    licenceClass: 'National Postal Operator Licence',
    fee: 'BWP 12,000',
    days: '30',
    docs: ['CIPA Certificate', 'Tax Clearance', 'Operations Plan'],
  },
  'individual-device-local': {
    name: 'Type Approval Certificate',
    licenceClass: 'Type Approval / Device Compliance',
    fee: 'BWP 2,500',
    days: '21',
    docs: ['Omang Copy', 'Device Technical Specifications', 'Import Permit'],
  },
}

const defaultLicence = {
  name: 'Class 3 Service Licence',
  licenceClass: 'Class 3 Service Licence',
  fee: 'BWP 8,500',
  days: '30',
  docs: ['CIPA Certificate', 'Tax Clearance', 'Business Plan'],
}

const licenceFees = {
  'Internet Service Provider (ISP)': {
    application: 15000,
    processing: 1500,
    annual: 8000,
  },
  'Broadcasting - Radio': {
    application: 25000,
    processing: 2500,
    annual: 12000,
  },
  'Broadcasting - Television': {
    application: 45000,
    processing: 4500,
    annual: 20000,
  },
  'Postal / Courier - Class A': {
    application: 25000,
    processing: 2000,
    annual: 10000,
  },
  'Postal / Courier - Class B': {
    application: 12000,
    processing: 1200,
    annual: 5000,
  },
  'MVNO / Telecom Operator': {
    application: 50000,
    processing: 5000,
    annual: 25000,
  },
  'Citizen Band Radio': {
    application: 500,
    processing: 100,
    annual: 300,
  },
  'Amateur Radio': {
    application: 300,
    processing: 50,
    annual: 200,
  },
}

const licenceTypeTiles = [
  { icon: Wifi, title: 'Internet Service Provider (ISP)', feeHint: 'From BWP 15,000' },
  { icon: Radio, title: 'Broadcasting - Radio', feeHint: 'From BWP 25,000' },
  { icon: Tv, title: 'Broadcasting - Television', feeHint: 'From BWP 45,000' },
  { icon: Mail, title: 'Postal / Courier - Class A', feeHint: 'From BWP 25,000' },
  { icon: Package, title: 'Postal / Courier - Class B', feeHint: 'From BWP 12,000' },
  { icon: Globe, title: 'MVNO / Telecom Operator', feeHint: 'From BWP 50,000' },
  { icon: Radio, title: 'Citizen Band Radio', feeHint: 'From BWP 500' },
  { icon: Signal, title: 'Amateur Radio', feeHint: 'From BWP 300' },
]

const fieldsConfig = {
  'Internet Service Provider (ISP)': {
    title: 'Technical & Coverage Details',
    fields: [
      { id: 'serviceArea', label: 'Proposed Service Area', type: 'text', placeholder: 'e.g. Greater Gaborone, Francistown' },
      {
        id: 'infrastructure',
        label: 'Technical Infrastructure',
        type: 'textarea',
        placeholder: 'Describe your network infrastructure \u2014 fibre, wireless, satellite etc.',
      },
      { id: 'customers', label: 'Estimated Subscribers (Year 1)', type: 'number', placeholder: 'e.g. 500' },
      { id: 'coverageType', label: 'Coverage Type', type: 'select', options: ['Local', 'Regional', 'National'] },
      { id: 'spectrum', label: 'Will you use radio frequency spectrum?', type: 'yesno' },
      { id: 'minSpeed', label: 'Minimum Speed Offered (Mbps)', type: 'number', placeholder: 'e.g. 10' },
      { id: 'localOffice', label: 'Physical Office Address in Botswana', type: 'text', placeholder: 'Full street address' },
    ],
  },
  'Broadcasting - Radio': {
    title: 'Station & Technical Details',
    fields: [
      { id: 'stationName', label: 'Station Name', type: 'text', placeholder: 'e.g. Yarona FM' },
      { id: 'stationType', label: 'Station Type', type: 'select', options: ['Commercial', 'Community', 'Public', 'Campus'] },
      { id: 'transmitterLocation', label: 'Transmitter Location / Site Name', type: 'text', placeholder: 'e.g. Kgale Hill, Gaborone' },
      { id: 'latitude', label: 'Site Latitude', type: 'text', placeholder: 'e.g. -24.6541' },
      { id: 'longitude', label: 'Site Longitude', type: 'text', placeholder: 'e.g. 25.9087' },
      { id: 'siteAltitude', label: 'Site Altitude (metres)', type: 'number', placeholder: 'e.g. 1010' },
      {
        id: 'preferredFrequency',
        label: 'Preferred Frequency Band',
        type: 'select',
        options: ['FM (87.5\u2013108 MHz)', 'AM (535\u20131605 kHz)', 'SW (3\u201330 MHz)'],
      },
      { id: 'outputPower', label: 'Transmitter Output Power (Watts)', type: 'number', placeholder: 'e.g. 1000' },
      { id: 'antennaHeight', label: 'Antenna Height (metres)', type: 'number', placeholder: 'e.g. 50' },
      { id: 'coverageRadius', label: 'Intended Coverage Radius (km)', type: 'number', placeholder: 'e.g. 75' },
      { id: 'contentLanguage', label: 'Primary Broadcast Language', type: 'select', options: ['English', 'Setswana', 'Both', 'Other'] },
    ],
  },
  'Broadcasting - Television': {
    title: 'Station & Technical Details',
    fields: [
      { id: 'stationName', label: 'Station / Channel Name', type: 'text', placeholder: 'e.g. Botswana TV2' },
      { id: 'broadcastType', label: 'Broadcast Type', type: 'select', options: ['Terrestrial', 'Satellite', 'Cable', 'IPTV'] },
      { id: 'transmitterLocation', label: 'Main Transmitter Location', type: 'text', placeholder: 'e.g. Lentswe la Oodi' },
      { id: 'latitude', label: 'Site Latitude', type: 'text', placeholder: 'e.g. -24.4841' },
      { id: 'longitude', label: 'Site Longitude', type: 'text', placeholder: 'e.g. 26.0187' },
      { id: 'outputPower', label: 'Output Power (kW)', type: 'number', placeholder: 'e.g. 10' },
      { id: 'coverageArea', label: 'Intended Coverage Districts', type: 'text', placeholder: 'e.g. South East, Kgatleng, Kweneng' },
      {
        id: 'contentType',
        label: 'Primary Content Type',
        type: 'select',
        options: ['Entertainment', 'News', 'Educational', 'Religious', 'Mixed'],
      },
    ],
  },
  'Postal / Courier - Class A': {
    title: 'Service & Operations Details',
    fields: [
      { id: 'serviceArea', label: 'Service Coverage Area', type: 'text', placeholder: 'e.g. Nationwide or specific districts' },
      { id: 'headOffice', label: 'Head Office Physical Address', type: 'text', placeholder: 'Full street address' },
      { id: 'fleetSize', label: 'Number of Delivery Vehicles', type: 'number', placeholder: 'e.g. 25' },
      { id: 'branches', label: 'Number of Branch Offices / Service Points', type: 'number', placeholder: 'e.g. 5' },
      {
        id: 'itemTypes',
        label: 'Types of Items to be Handled',
        type: 'select',
        options: ['Letters & Documents', 'Parcels', 'Freight', 'All of the above'],
      },
      {
        id: 'deliveryTime',
        label: 'Standard Delivery Time Commitment',
        type: 'select',
        options: ['Same Day', 'Next Day', '2\u20133 Days', '4\u20137 Days'],
      },
    ],
  },
  'Postal / Courier - Class B': {
    title: 'Service & Operations Details',
    fields: [
      { id: 'serviceArea', label: 'Service Coverage Area', type: 'text', placeholder: 'e.g. Gaborone only' },
      { id: 'headOffice', label: 'Business Physical Address', type: 'text', placeholder: 'Full street address' },
      { id: 'fleetSize', label: 'Number of Delivery Vehicles', type: 'number', placeholder: 'e.g. 3' },
      { id: 'itemTypes', label: 'Types of Items Handled', type: 'select', options: ['Documents only', 'Small parcels', 'Both'] },
    ],
  },
  'MVNO / Telecom Operator': {
    title: 'Technical & Network Details',
    fields: [
      { id: 'hostOperator', label: 'Host Network Operator (if MVNO)', type: 'text', placeholder: 'e.g. Mascom Wireless' },
      {
        id: 'serviceType',
        label: 'Service Type',
        type: 'select',
        options: ['Full MVNO', 'Light MVNO', 'Reseller', 'Full Telecom Operator'],
      },
      { id: 'serviceArea', label: 'Intended Service Area', type: 'select', options: ['National', 'Regional', 'Urban Only'] },
      { id: 'targetMarket', label: 'Target Market Segment', type: 'text', placeholder: 'e.g. Corporate clients, rural communities' },
      { id: 'spectrum', label: 'Will you require spectrum allocation?', type: 'yesno' },
      { id: 'roaming', label: 'Will you offer international roaming?', type: 'yesno' },
      {
        id: 'infrastructure',
        label: 'Core Network Infrastructure',
        type: 'textarea',
        placeholder: 'Describe your technical infrastructure plans',
      },
    ],
  },
  'Citizen Band Radio': {
    title: 'Station & Equipment Details',
    fields: [
      { id: 'stationName', label: 'Station / Call Name', type: 'text', placeholder: 'e.g. Kalahari Base' },
      { id: 'stationType', label: 'Station Type', type: 'select', options: ['Fixed/Base', 'Mobile', 'Portable'] },
      { id: 'streetAddress', label: 'Station Street Address', type: 'text', placeholder: 'Plot No. and Street' },
      { id: 'ward', label: 'Ward / Village', type: 'text', placeholder: 'e.g. Block 7' },
      { id: 'city', label: 'City / Town', type: 'text', placeholder: 'e.g. Gaborone' },
      { id: 'latitude', label: 'Site Latitude', type: 'text', placeholder: 'e.g. -24.6541' },
      { id: 'longitude', label: 'Site Longitude', type: 'text', placeholder: 'e.g. 25.9087' },
      { id: 'altitude', label: 'Site Altitude (metres)', type: 'number', placeholder: 'e.g. 1010' },
      { id: 'equipmentMake', label: 'Equipment Make / Manufacturer', type: 'text', placeholder: 'e.g. Kenwood, Icom' },
      { id: 'equipmentModel', label: 'Equipment Model', type: 'text', placeholder: 'e.g. TK-7180' },
      { id: 'serialNumber', label: 'Serial Number', type: 'text', placeholder: 'e.g. A1234567' },
      { id: 'approvalNumber', label: 'BOCRA Type Approval Number', type: 'text', placeholder: 'e.g. BW-TA-2024-0891' },
      { id: 'frequencyBand', label: 'Frequency Range / Band (MHz)', type: 'text', placeholder: 'e.g. 26.965\u201327.405 MHz' },
      { id: 'outputPower', label: 'Output Power (Watts)', type: 'number', placeholder: 'e.g. 4' },
      {
        id: 'antennaType',
        label: 'Antenna Type',
        type: 'select',
        options: ['Omnidirectional', 'Directional/Yagi', 'Whip', 'Magnetic Mount'],
      },
      { id: 'antennaHeight', label: 'Antenna Height (metres)', type: 'number', placeholder: 'e.g. 5' },
      { id: 'purpose', label: 'Purpose / Intended Use', type: 'textarea', placeholder: 'What will this station be used for?' },
    ],
  },
  'Amateur Radio': {
    title: 'Amateur Radio Details',
    fields: [
      { id: 'callsign', label: 'Existing Callsign (if renewal)', type: 'text', placeholder: 'e.g. A25XY or leave blank if new' },
      {
        id: 'licenceClass',
        label: 'Licence Class Applying For',
        type: 'select',
        options: ['Foundation', 'Intermediate', 'Full/Advanced'],
      },
      { id: 'examPassed', label: 'Have you passed the BOCRA Amateur Radio Exam?', type: 'yesno' },
      { id: 'equipmentMake', label: 'Primary Equipment Make', type: 'text', placeholder: 'e.g. Yaesu, Kenwood, Icom' },
      { id: 'equipmentModel', label: 'Equipment Model', type: 'text', placeholder: 'e.g. FT-991A' },
      { id: 'frequencyBands', label: 'Frequency Bands Requested', type: 'text', placeholder: 'e.g. HF, VHF, UHF' },
      { id: 'outputPower', label: 'Maximum Output Power (Watts)', type: 'number', placeholder: 'e.g. 100' },
      { id: 'antennaType', label: 'Antenna Type', type: 'select', options: ['Dipole', 'Yagi', 'Vertical', 'Loop', 'Other'] },
      { id: 'stationAddress', label: 'Station Physical Address', type: 'text', placeholder: 'Where the equipment will be operated' },
    ],
  },
}

const applicationSteps = [
  { number: 1, label: 'Business Details' },
  { number: 2, label: 'Technical & Coverage' },
  { number: 3, label: 'Review & Fee' },
]

const finderSteps = [
  { number: 1, label: 'Who are you?' },
  { number: 2, label: 'Licence type' },
  { number: 3, label: 'Requirements' },
]

const licenceOverviewItems = [
  {
    icon: Wifi,
    title: 'Internet & Telecoms',
    description: 'ISP, MVNO, and telecoms operator licences',
    to: '/licensing',
  },
  {
    icon: Radio,
    title: 'Broadcasting',
    description: 'Radio, TV, community and satellite broadcasting',
    to: '/licensing',
  },
  {
    icon: Mail,
    title: 'Postal Services',
    description: 'Class A and Class B courier and postal operators',
    to: '/licensing',
  },
  {
    icon: Shield,
    title: 'Special Authorisations',
    description: 'Amateur radio, type approval, spectrum licences',
    to: '/documents',
  },
]

const trackingSteps = [
  'Application Received',
  'Document Verification',
  'Technical Assessment',
  'Fee Invoice Sent',
  'Licence Issued',
]

const mockApplications = [
  {
    ref: 'APP-BOCRA-2026-0042',
    company: 'Kgosi Tech Solutions',
    type: 'Internet Service Provider Licence',
    status: 'Technical Assessment',
    date: '2026-03-01',
    officer: 'Officer Mpho K.',
  },
  {
    ref: 'APP-BOCRA-2026-0078',
    company: 'Motswana Broadcasting Co',
    type: 'Commercial Radio Licence',
    status: 'Document Verification',
    date: '2026-03-15',
    officer: 'Officer Thato M.',
  },
]

const registry = [
  { operator: 'Mascom Wireless', type: 'Telecommunications', class: 'Class 1', coverage: 'National', issued: '2018-04-01', expires: '2028-03-31', status: 'Active' },
  { operator: 'Orange Botswana', type: 'Telecommunications', class: 'Class 1', coverage: 'National', issued: '2018-04-01', expires: '2028-03-31', status: 'Active' },
  { operator: 'BeMobile', type: 'Telecommunications', class: 'Class 2', coverage: 'National', issued: '2019-06-15', expires: '2027-06-14', status: 'Active' },
  { operator: 'BTC', type: 'Telecommunications', class: 'Class 1', coverage: 'National', issued: '2013-04-01', expires: '2026-03-31', status: 'Renewal Pending' },
  { operator: 'Botswana Television', type: 'Broadcasting', class: 'TV', coverage: 'National', issued: '2015-01-01', expires: '2027-12-31', status: 'Active' },
  { operator: 'Yarona FM', type: 'Broadcasting', class: 'Radio', coverage: 'National', issued: '2016-03-15', expires: '2026-03-14', status: 'Renewal Pending' },
  { operator: 'DStv Botswana', type: 'Broadcasting', class: 'Cable TV', coverage: 'National', issued: '2014-07-01', expires: '2027-06-30', status: 'Active' },
  { operator: 'InfoCom', type: 'Internet Service Provider', class: 'ISP', coverage: 'National', issued: '2020-09-01', expires: '2025-08-31', status: 'Expired' },
  { operator: 'Botswana Post', type: 'Postal Services', class: 'National Postal', coverage: 'National', issued: '2013-04-01', expires: '2028-03-31', status: 'Active' },
  { operator: 'FedEx Botswana', type: 'Postal Services', class: 'Courier', coverage: 'National', issued: '2017-11-01', expires: '2027-10-31', status: 'Active' },
]

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  border: '1px solid #d1d5db',
  borderRadius: 14,
  fontSize: 15,
  color: '#111827',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif',
  background: '#ffffff',
}

const labelStyle = {
  display: 'block',
  marginBottom: 8,
  color: '#111827',
  fontSize: 14,
  fontWeight: 600,
  fontFamily: 'Inter, sans-serif',
}

const primaryButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  border: 'none',
  borderRadius: 999,
  padding: '14px 22px',
  background: '#1A3A6B',
  color: '#ffffff',
  fontSize: 15,
  fontWeight: 700,
  cursor: 'pointer',
  textDecoration: 'none',
  fontFamily: 'Inter, sans-serif',
}

const secondaryButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  border: '1px solid #d1d5db',
  borderRadius: 999,
  padding: '14px 22px',
  background: '#ffffff',
  color: '#111827',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  textDecoration: 'none',
  fontFamily: 'Inter, sans-serif',
}

const typeFilterOptions = ['All', 'Telecommunications', 'Broadcasting', 'Postal', 'ISP']

const statusBadgeStyles = {
  Active: { background: '#dcfce7', color: '#166534', border: '#bbf7d0' },
  'Renewal Pending': { background: '#fef3c7', color: '#b45309', border: '#fcd34d' },
  Expired: { background: '#fee2e2', color: '#b91c1c', border: '#fecaca' },
  'Application Received': { background: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe' },
  'Document Verification': { background: '#fef3c7', color: '#92400e', border: '#fde68a' },
  'Technical Assessment': { background: '#ede9fe', color: '#6d28d9', border: '#ddd6fe' },
  'Fee Invoice Sent': { background: '#cffafe', color: '#0f766e', border: '#99f6e4' },
  'Licence Issued': { background: '#dcfce7', color: '#166534', border: '#bbf7d0' },
}

function TileButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: selected ? '2px solid #1A3A6B' : '1px solid #e5e7eb',
        background: selected ? '#f0f7ff' : '#ffffff',
        color: '#111827',
        borderRadius: 20,
        padding: '22px 18px',
        minHeight: 96,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: selected ? '0 12px 32px rgba(26,58,107,0.08)' : 'none',
        transition: 'all 0.2s ease',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {label}
    </button>
  )
}

function ChoiceCard({ title, description, icon: Icon, selected, onClick, fee }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`licensing-choice-card${selected ? ' is-selected' : ''}`}
      style={{ minHeight: fee ? 228 : 216 }}
    >
      {selected && (
        <span className="licensing-choice-badge">
          <Check size={12} />
        </span>
      )}
      <span className="licensing-choice-icon-box">
        <Icon size={22} />
      </span>
      <span className="licensing-choice-title">{title}</span>
      <span className="licensing-choice-description">{description}</span>
      {fee && <span className="licensing-choice-fee">{fee}</span>}
    </button>
  )
}

function LicenceTypeTile({ icon: Icon, title, feeHint, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`application-licence-tile${selected ? ' is-selected' : ''}`}
    >
      <span className="application-licence-icon-box">
        <Icon size={18} />
      </span>
      <span>
        <span className="application-licence-title">{title}</span>
        <span className="application-licence-fee-hint">{feeHint}</span>
      </span>
    </button>
  )
}

function Stepper({ currentStep, steps = applicationSteps }) {
  return (
    <div style={{ marginBottom: 42 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {steps.map((item, index) => {
          const isActive = currentStep === item.number
          const isCompleted = typeof currentStep === 'number' && currentStep > item.number
          const fill = isCompleted ? '#0F6E56' : isActive ? '#1A3A6B' : '#d1d5db'

          return (
            <div key={item.number} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'grid', justifyItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: fill,
                    color: '#ffffff',
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {isCompleted ? <Check size={16} /> : item.number}
                </div>
                <span
                  style={{
                    color: isActive || isCompleted ? '#111827' : '#9ca3af',
                    fontSize: 12,
                    fontWeight: 600,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {item.label}
                </span>
              </div>
              {index < applicationSteps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    margin: '0 12px 28px',
                    background: typeof currentStep === 'number' && currentStep > item.number ? '#0F6E56' : '#e5e7eb',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FormField({ label, children }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

function TrackingTimelineStep({ label, description, done, current, isLast }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: done ? '#16a34a' : current ? '#1A3A6B' : '#ffffff',
            border: done ? '1px solid #16a34a' : current ? '1px solid #1A3A6B' : '2px solid #d1d5db',
            marginTop: 4,
            boxSizing: 'border-box',
          }}
        />
        {!isLast && (
          <div
            style={{
              width: 2,
              flex: 1,
              minHeight: 44,
              marginTop: 8,
              background: done ? '#16a34a' : 'transparent',
              borderLeft: done ? 'none' : '2px dashed #d1d5db',
            }}
          />
        )}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 22 }}>
        <div style={{ color: '#111827', fontSize: 15, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{label}</div>
        <div style={{ marginTop: 4, color: '#6b7280', fontSize: 13, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
          {description}
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const style = statusBadgeStyles[status] || { background: '#f3f4f6', color: '#374151', border: '#e5e7eb' }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        padding: '7px 12px',
        border: `1px solid ${style.border}`,
        background: style.background,
        color: style.color,
        fontSize: 12,
        fontWeight: 700,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {status}
    </span>
  )
}

function getTrackingIndex(status) {
  const index = trackingSteps.indexOf(status)
  return index === -1 ? 0 : index
}

function resolveTypeFilter(entry, filterType) {
  if (filterType === 'All') {
    return true
  }

  if (filterType === 'Postal') {
    return entry.type === 'Postal Services'
  }

  if (filterType === 'ISP') {
    return entry.type === 'Internet Service Provider'
  }

  return entry.type === filterType
}

function formatBwp(value) {
  return `BWP ${Number(value || 0).toLocaleString()}`
}

export default function LicensingPage() {
  const navigate = useNavigate()
  const { requireAuth } = useAuth()
  const { applications, addApplication, refresh } = useApplications()
  
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'finder'
  const [refreshing, setRefreshing] = useState(false)

  const setActiveTab = (tab) => {
    setSearchParams({ tab })
  }

  useEffect(() => {
    if (activeTab === 'apply') {
      const isAuth = requireAuth('/licensing?tab=apply')
      if (!isAuth) {
        setSearchParams({ tab: 'finder' }, { replace: true })
      }
    }
  }, [activeTab, requireAuth, setSearchParams])

  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
  const [q3, setQ3] = useState('')
  const [result, setResult] = useState(null)
  const [appStep, setAppStep] = useState(1)
  const [appConsent, setAppConsent] = useState(false)
  const [submittedReference, setSubmittedReference] = useState('')
  const [licenceType, setLicenceType] = useState('')
  const [technicalData, setTechnicalData] = useState({})
  const [appData, setAppData] = useState({
    legalBusinessName: '',
    registrationNumber: '',
    ppraNumber: '',
    taxClearanceNumber: '',
    physicalAddress: '',
    contactPersonName: '',
    contactPhone: '',
    contactEmail: '',
  })
  const [error, setError] = useState('')
  const [trackQuery, setTrackQuery] = useState('')
  const [trackedApplication, setTrackedApplication] = useState(null)
  const [trackNotFound, setTrackNotFound] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [registryChecked, setRegistryChecked] = useState(false)

  const fieldStyle = (value) => ({
    width: '100%',
    padding: '13px 16px',
    border: `1px solid ${value === '' || value === undefined ? '#fca5a5' : '#d1d5db'}`,
    borderRadius: 14,
    fontSize: 15,
    color: '#111827',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'Inter, sans-serif',
    background: '#ffffff'
  })

  useEffect(() => {
    if (!q1 || !q2 || !q3) {
      setResult(null)
      return
    }

    const key = `${q1}-${q2}-${q3}`
    setResult(licenceMap[key] || defaultLicence)
  }, [q1, q2, q3])

  const allApplications = applications
  const normalizedRegistryQuery = searchQuery.trim().toLowerCase()
  const registryRows = registry.filter((entry) => {
    const matchesSearch = normalizedRegistryQuery ? entry.operator.toLowerCase().includes(normalizedRegistryQuery) : true
    return matchesSearch && resolveTypeFilter(entry, filterType)
  })
  const verifyMatches = normalizedRegistryQuery
    ? registryRows.some((entry) => entry.status === 'Active' || entry.status === 'Renewal Pending')
    : true

  const updateAppField = (field, value) => {
    setAppData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setError('')
  }

  const handleLicenceTypeChange = (value) => {
    setLicenceType(value)
    setTechnicalData({})
    setError('')
  }

  const handleStartApplication = () => {
    setActiveTab('apply')
  }

  const handleStep1Continue = () => {
    if (!appData.legalBusinessName?.trim()) { setError('Please enter your business name'); return }
    if (!appData.registrationNumber?.trim()) { setError('Please enter your CIPA registration number'); return }
    if (!appData.contactPhone?.trim()) { setError('Please enter a contact phone number'); return }
    if (!licenceType) { setError('Please select the licence type you are applying for'); return }
    setError('')
    setAppStep(2)
  }

  const handleStep2Continue = () => {
    const isServiceAreaReq = selectedTechnicalConfig?.fields?.some((f) => f.id === 'serviceArea')
    if (isServiceAreaReq && !technicalData.serviceArea?.trim()) { setError('Please describe your proposed service area'); return }
    
    const isCoverageReq = selectedTechnicalConfig?.fields?.some((f) => f.id === 'coverageType')
    if (isCoverageReq && !technicalData.coverageType) { setError('Please select your coverage type'); return }

    setError('')
    setAppStep(3)
  }

  const handleTrackSearch = (nextRef) => {
    const candidate = (nextRef ?? trackQuery).trim().toUpperCase()

    if (!candidate) {
      setTrackQuery('')
      setTrackedApplication(null)
      setTrackNotFound(false)
      return
    }

    setTrackQuery(candidate)
    const match = allApplications.find((application) => application.ref.toUpperCase() === candidate)
    setTrackedApplication(match || null)
    setTrackNotFound(!match)
  }

  const handleVerifySearch = () => {
    setRegistryChecked(Boolean(normalizedRegistryQuery))
  }

  const handleSubmitApplication = () => {
    if (!appConsent) {
      setError('You must confirm payment and agree to terms before submitting')
      return
    }
    setError('')

    const applicationRecord = {
      applicant: appData.legalBusinessName || 'New Applicant',
      type: licenceType || 'Class 3 Service Licence',
      ...appData,
      licenceType,
      technicalData,
    }

    const { ref: reference, application: submittedApplication } = addApplication(applicationRecord)

    setSubmittedReference(reference)
    setTrackedApplication(submittedApplication)
    setTrackQuery(reference)
    setTrackNotFound(false)
    setAppStep('success')
  }

  const trackingIndex = trackedApplication ? getTrackingIndex(trackedApplication.status) : -1
  const selectedApplicant = applicantOptions.find((option) => option.value === q1)
  const selectedService = serviceOptions.find((option) => option.value === q2)
  const finderStep = !q1 ? 1 : !result ? 2 : 3
  const selectedTechnicalConfig = fieldsConfig[licenceType]
  const selectedFeeDetails = licenceFees[licenceType]
  const totalDue = selectedFeeDetails
    ? selectedFeeDetails.application + selectedFeeDetails.processing + selectedFeeDetails.annual
    : null
  const technicalReviewRows = selectedTechnicalConfig
    ? selectedTechnicalConfig.fields.map((field) => {
        const rawValue = technicalData[field.id]
        const value = rawValue === '' || rawValue == null ? 'Not provided' : rawValue

        return {
          id: field.id,
          label: field.label,
          value,
          muted: value === 'Not provided',
        }
      })
    : []

  return (
    <PageWrapper fullWidth wrapperStyle={{ background: '#ffffff' }}>
      <>
        <section
          style={{
            background:
              "linear-gradient(rgba(10,22,40,0.26), rgba(10,22,40,0.38)), url('/hero-complaints.webp') center/cover no-repeat",
            padding: '80px 0 0',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <p
              style={{
                margin: 0,
                color: 'rgba(255,255,255,0.35)',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              LICENSING
            </p>
            <h1
              style={{
                margin: '16px 0 0',
                maxWidth: 780,
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Apply, track, and verify BOCRA licences in one place.
            </h1>
            <p
              style={{
                margin: '16px 0 0',
                maxWidth: 600,
                color: 'rgba(255,255,255,0.55)',
                fontSize: 17,
                lineHeight: 1.7,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Use the licence explorer to find the right authorisation, complete your application in guided steps, track progress, and verify active operators in Botswana&apos;s communications sector.
            </p>

            <div
              style={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                gap: 4,
                padding: 6,
                marginTop: 48,
                marginBottom: -32,
                background: '#ffffff',
                borderRadius: 50,
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id)
                    }}
                    className={`licensing-hero-tab${isActive ? ' is-active' : ''}`}
                    style={{
                      border: 'none',
                      borderRadius: 50,
                      padding: '10px 22px',
                      background: isActive ? '#1A3A6B' : 'transparent',
                      color: isActive ? '#ffffff' : '#6b7280',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '72px 24px 88px' }}>

        {activeTab === 'finder' && (
          <section style={{ padding: '64px 0 80px' }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <Stepper currentStep={finderStep} steps={finderSteps} />

              <h2
                style={{
                  margin: 0,
                  color: '#111111',
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                What licence do you need?
              </h2>
              <p
                style={{
                  margin: '8px 0 32px',
                  color: '#6b7280',
                  fontSize: 16,
                  lineHeight: 1.7,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Answer 3 quick questions and we&apos;ll tell you exactly which BOCRA licence applies to you.
              </p>

              <div style={{ display: 'grid', gap: 36 }}>
                <div>
                  <h3
                    style={{
                      margin: '0 0 8px',
                      color: '#111111',
                      fontSize: 28,
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    Who are you?
                  </h3>
                  <p style={{ margin: '0 0 32px', color: '#6b7280', fontSize: 16, fontFamily: 'Inter, sans-serif' }}>
                    Select the applicant type that best matches your request.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                    {applicantOptions.map((option) => (
                      <ChoiceCard
                        key={option.value}
                        title={option.label}
                        description={applicantCardMeta[option.value].description}
                        icon={applicantCardMeta[option.value].icon}
                        selected={q1 === option.value}
                        onClick={() => {
                          setQ1(option.value)
                          setQ2('')
                          setQ3('')
                          setResult(null)
                        }}
                      />
                    ))}
                  </div>
                </div>

                {q1 && (
                  <div>
                    <h3
                      style={{
                        margin: '0 0 8px',
                        color: '#111111',
                        fontSize: 28,
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      Licence type
                    </h3>
                    <p style={{ margin: '0 0 32px', color: '#6b7280', fontSize: 16, fontFamily: 'Inter, sans-serif' }}>
                      Choose the service area you want to license under BOCRA.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                      {serviceOptions.map((option) => {
                        const meta = serviceCardMeta[option.value]
                        return (
                          <ChoiceCard
                            key={option.value}
                            title={meta?.title || option.label}
                            description={meta?.description || option.label}
                            icon={meta?.icon || Globe}
                            fee={meta?.fee}
                            selected={q2 === option.value}
                            onClick={() => {
                              setQ2(option.value)
                              setQ3('')
                              setResult(null)
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>
                )}

                {q2 && (
                  <div>
                    <h3
                      style={{
                        margin: '0 0 8px',
                        color: '#111111',
                        fontSize: 28,
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      Intended coverage
                    </h3>
                    <p style={{ margin: '0 0 24px', color: '#6b7280', fontSize: 16, fontFamily: 'Inter, sans-serif' }}>
                      Tell us how wide your planned service footprint will be.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                      {coverageOptions.map((option) => (
                        <TileButton key={option.value} label={option.label} selected={q3 === option.value} onClick={() => setQ3(option.value)} />
                      ))}
                    </div>
                  </div>
                )}

                {result && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, alignItems: 'start' }}>
                    <div>
                      <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                        Recommended licence
                      </p>
                      <h3 style={{ margin: '12px 0 8px', color: '#111111', fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {result.name}
                      </h3>
                      <p style={{ margin: 0, color: '#6b7280', fontSize: 16, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                        {result.licenceClass}
                      </p>

                      <div style={{ marginTop: 32 }}>
                        <div style={{ color: '#111111', fontSize: 22, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          What you&apos;ll need
                        </div>
                        <div style={{ marginTop: 18 }}>
                          {result.docs.map((doc) => (
                            <div key={doc} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #e5e7eb', color: '#111111', fontSize: 15, fontFamily: 'Inter, sans-serif' }}>
                              <CheckCircle2 size={16} color="#0F6E56" />
                              <span>{doc}</span>
                            </div>
                          ))}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #e5e7eb', color: '#111111', fontSize: 15, fontFamily: 'Inter, sans-serif' }}>
                            <CheckCircle2 size={16} color="#0F6E56" />
                            <span>Application fee: {result.fee.replace('BWP', 'P')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <aside style={{ background: '#f8f9fa', borderRadius: 16, padding: 28, border: '1px solid #e5e7eb' }}>
                      <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                        Your Selection
                      </p>
                      <div style={{ marginTop: 18, display: 'grid', gap: 14 }}>
                        <div>
                          <div style={{ color: '#6b7280', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>Entity type</div>
                          <div style={{ marginTop: 4, color: '#111111', fontSize: 16, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{selectedApplicant?.label}</div>
                        </div>
                        <div>
                          <div style={{ color: '#6b7280', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>Licence type</div>
                          <div style={{ marginTop: 4, color: '#111111', fontSize: 16, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{serviceCardMeta[q2]?.title || selectedService?.label}</div>
                        </div>
                      </div>

                      <div style={{ marginTop: 24, color: '#1A3A6B', fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {result.fee.replace('BWP', 'P')}
                      </div>

                      <button type="button" onClick={handleStartApplication} style={{ width: '100%', marginTop: 24, border: 'none', borderRadius: 8, padding: 14, background: '#1A3A6B', color: '#ffffff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                        {'Proceed to Application ->'}
                      </button>
                      <p style={{ margin: '14px 0 0', color: '#9ca3af', fontSize: 12, lineHeight: 1.6, textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
                        You&apos;ll need a BOCRA Connect account to submit your application.
                      </p>
                    </aside>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'apply' && (
          <section style={{ marginTop: 34 }}>
            <div style={{ maxWidth: 860 }}>
              {appStep !== 'success' && <Stepper currentStep={appStep} />}

              {appStep === 1 && (
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 24, padding: '30px clamp(20px, 4vw, 34px)', background: '#ffffff' }}>
                  {error && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: '#dc2626', fontSize: 18 }}>⚠</span>
                      <p style={{ color: '#dc2626', fontSize: 14, fontWeight: 500, margin: 0 }}>{error}</p>
                    </div>
                  )}
                  <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                    Step 1 of 3
                  </p>
                  <h2 style={{ margin: '12px 0 28px', color: '#111111', fontSize: 30, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Business Details
                  </h2>

                  <div style={{ marginBottom: 24 }}>
                    <div style={{ marginBottom: 16, color: '#111111', fontSize: 15, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      What type of licence are you applying for?
                    </div>
                    <div className="application-licence-grid">
                      {licenceTypeTiles.map((option) => (
                        <LicenceTypeTile
                          key={option.title}
                          icon={option.icon}
                          title={option.title}
                          feeHint={option.feeHint}
                          selected={licenceType === option.title}
                          onClick={() => handleLicenceTypeChange(option.title)}
                        />
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
                    <FormField label="Legal Business Name">
                      <input value={appData.legalBusinessName} onChange={(event) => updateAppField('legalBusinessName', event.target.value)} style={fieldStyle(appData.legalBusinessName)} />
                    </FormField>
                    <FormField label="Registration Number (CIPA)">
                      <input value={appData.registrationNumber} onChange={(event) => updateAppField('registrationNumber', event.target.value)} style={fieldStyle(appData.registrationNumber)} />
                    </FormField>
                    <FormField label="PPRA Number">
                      <input value={appData.ppraNumber} onChange={(event) => updateAppField('ppraNumber', event.target.value)} style={inputStyle} />
                    </FormField>
                    <FormField label="Tax Clearance Number">
                      <input value={appData.taxClearanceNumber} onChange={(event) => updateAppField('taxClearanceNumber', event.target.value)} style={inputStyle} />
                    </FormField>
                    <FormField label="Physical Address">
                      <input value={appData.physicalAddress} onChange={(event) => updateAppField('physicalAddress', event.target.value)} style={inputStyle} />
                    </FormField>
                    <FormField label="Contact Person Name">
                      <input value={appData.contactPersonName} onChange={(event) => updateAppField('contactPersonName', event.target.value)} style={inputStyle} />
                    </FormField>
                    <FormField label="Contact Phone">
                      <input value={appData.contactPhone} onChange={(event) => updateAppField('contactPhone', event.target.value)} style={fieldStyle(appData.contactPhone)} />
                    </FormField>
                    <FormField label="Contact Email">
                      <input type="email" value={appData.contactEmail} onChange={(event) => updateAppField('contactEmail', event.target.value)} style={inputStyle} />
                    </FormField>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 28 }}>
                    <button type="button" onClick={handleStep1Continue} style={primaryButtonStyle}>
                      {'Continue ->'}
                    </button>
                  </div>
                </div>
              )}

              {appStep === 2 && (
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 24, padding: '30px clamp(20px, 4vw, 34px)', background: '#ffffff' }}>
                  {error && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: '#dc2626', fontSize: 18 }}>⚠</span>
                      <p style={{ color: '#dc2626', fontSize: 14, fontWeight: 500, margin: 0 }}>{error}</p>
                    </div>
                  )}
                  <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                    Step 2 of 3
                  </p>
                  <h2 style={{ margin: '12px 0 28px', color: '#111111', fontSize: 30, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {selectedTechnicalConfig?.title || 'Technical & Coverage'}
                  </h2>

                  {!licenceType && (
                    <div
                      style={{
                        minHeight: 280,
                        display: 'grid',
                        placeItems: 'center',
                        textAlign: 'center',
                        border: '1px dashed #e5e7eb',
                        borderRadius: 18,
                        padding: 28,
                      }}
                    >
                      <div>
                        <AlertCircle size={32} color="#e5e7eb" style={{ marginBottom: 14 }} />
                        <div style={{ color: '#9ca3af', fontSize: 16, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          Please select a licence type in Step 1 first
                        </div>
                        <button
                          type="button"
                          onClick={() => setAppStep(1)}
                          style={{
                            marginTop: 12,
                            border: 'none',
                            background: 'transparent',
                            color: '#1A3A6B',
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          {'Go back to Step 1 \u2192'}
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedTechnicalConfig && (
                    <div className="application-technical-grid">
                      {selectedTechnicalConfig.fields.map((field) => {
                        const value = technicalData[field.id] ?? ''
                        const isWideField = field.type === 'textarea' || field.type === 'yesno'

                        return (
                          <div key={field.id} style={isWideField ? { gridColumn: '1 / -1' } : undefined}>
                            <label style={labelStyle}>{field.label}</label>

                            {(field.type === 'text' || field.type === 'number') && (
                              <input
                                type={field.type}
                                value={value}
                                placeholder={field.placeholder}
                                onChange={(event) => setTechnicalData((prev) => ({ ...prev, [field.id]: event.target.value }))}
                                style={inputStyle}
                              />
                            )}

                            {field.type === 'textarea' && (
                              <textarea
                                rows={4}
                                value={value}
                                placeholder={field.placeholder}
                                onChange={(event) => setTechnicalData((prev) => ({ ...prev, [field.id]: event.target.value }))}
                                style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                              />
                            )}

                            {field.type === 'select' && (
                              <select
                                value={value}
                                onChange={(event) => setTechnicalData((prev) => ({ ...prev, [field.id]: event.target.value }))}
                                style={inputStyle}
                              >
                                <option value="">Select an option</option>
                                {field.options.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            )}

                            {field.type === 'yesno' && (
                              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                {['Yes', 'No'].map((choice) => {
                                  const selected = value === choice
                                  return (
                                    <button
                                      key={choice}
                                      type="button"
                                      onClick={() => setTechnicalData((prev) => ({ ...prev, [field.id]: choice }))}
                                      style={{
                                        border: selected ? '1px solid #1A3A6B' : '1px solid #e5e7eb',
                                        borderRadius: 999,
                                        padding: '10px 18px',
                                        background: selected ? '#1A3A6B' : '#ffffff',
                                        color: selected ? '#ffffff' : '#6b7280',
                                        fontSize: 14,
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        fontFamily: 'Inter, sans-serif',
                                      }}
                                    >
                                      {choice}
                                    </button>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 28 }}>
                    <button type="button" onClick={() => setAppStep(1)} style={secondaryButtonStyle}>
                      &lt;- Back
                    </button>
                    <button type="button" onClick={handleStep2Continue} style={primaryButtonStyle}>
                      {'Continue ->'}
                    </button>
                  </div>
                </div>
              )}

              {appStep === 3 && (
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 24, padding: '30px clamp(20px, 4vw, 34px)', background: '#ffffff' }}>
                  {error && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: '#dc2626', fontSize: 18 }}>⚠</span>
                      <p style={{ color: '#dc2626', fontSize: 14, fontWeight: 500, margin: 0 }}>{error}</p>
                    </div>
                  )}
                  <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                    Step 3 of 3
                  </p>
                  <h2 style={{ margin: '12px 0 10px', color: '#111111', fontSize: 30, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Review &amp; Fee
                  </h2>
                  <p style={{ margin: '0 0 24px', color: '#6b7280', fontSize: 15, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                    Confirm your details before BOCRA issues the application reference.
                  </p>

                  <div style={{ border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
                    <div style={{ color: '#111111', fontSize: 18, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Business Details
                    </div>
                    <div style={{ marginTop: 18 }}>
                      {[
                        ['Legal Business Name', appData.legalBusinessName || 'Not provided'],
                        ['Registration Number (CIPA)', appData.registrationNumber || 'Not provided'],
                        ['PPRA Number', appData.ppraNumber || 'Not provided'],
                        ['Tax Clearance Number', appData.taxClearanceNumber || 'Not provided'],
                        ['Physical Address', appData.physicalAddress || 'Not provided'],
                        ['Contact Person Name', appData.contactPersonName || 'Not provided'],
                        ['Contact Phone', appData.contactPhone || 'Not provided'],
                        ['Contact Email', appData.contactEmail || 'Not provided'],
                      ].map(([label, value], index, items) => (
                        <div key={label}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start' }}>
                            <span style={{ color: '#6b7280', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{label}</span>
                            <span
                              style={{
                                color: value === 'Not provided' ? '#9ca3af' : '#111111',
                                fontSize: 14,
                                fontWeight: 700,
                                textAlign: 'right',
                                whiteSpace: 'pre-wrap',
                                fontFamily: 'Inter, sans-serif',
                              }}
                            >
                              {value}
                            </span>
                          </div>
                          {index < items.length - 1 && <div style={{ height: 1, background: '#e5e7eb', margin: '14px 0' }} />}
                        </div>
                      ))}
                    </div>

                    <div style={{ height: 1, background: '#e5e7eb', margin: '20px 0' }} />

                    <div style={{ color: '#111111', fontSize: 18, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Licence Details
                    </div>
                    <div style={{ marginTop: 18 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ color: '#6b7280', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>Licence Type</span>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            borderRadius: 999,
                            padding: '8px 14px',
                            background: licenceType ? '#f8fbff' : '#f8fafc',
                            border: `1px solid ${licenceType ? '#bfdbfe' : '#e5e7eb'}`,
                            color: licenceType ? '#1A3A6B' : '#9ca3af',
                            fontSize: 13,
                            fontWeight: 700,
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          {licenceType || 'Not selected'}
                        </span>
                      </div>
                    </div>

                    {technicalReviewRows.length > 0 && <div style={{ height: 1, background: '#e5e7eb', margin: '14px 0' }} />}

                    {technicalReviewRows.map(({ id, label, value, muted }, index) => (
                      <div key={id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start' }}>
                          <span style={{ color: '#6b7280', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{label}</span>
                          <span
                            style={{
                              color: muted ? '#9ca3af' : '#111111',
                              fontSize: 14,
                              fontWeight: 700,
                              textAlign: 'right',
                              whiteSpace: 'pre-wrap',
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            {value}
                          </span>
                        </div>
                        {index < technicalReviewRows.length - 1 && <div style={{ height: 1, background: '#e5e7eb', margin: '14px 0' }} />}
                      </div>
                    ))}
                  </div>

                  <div style={{ background: '#f0f7ff', border: '1px solid #bfdbfe', borderRadius: 16, padding: 24, marginTop: 24 }}>
                    <div style={{ marginBottom: 18, color: '#111111', fontSize: 18, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Fees
                    </div>
                    <div style={{ display: 'grid', gap: 10, color: '#1f2937', fontSize: 15, fontFamily: 'Inter, sans-serif' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18 }}>
                        <span>Application Fee:</span>
                        <strong>{selectedFeeDetails ? formatBwp(selectedFeeDetails.application) : '\u2014'}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18 }}>
                        <span>Processing Fee:</span>
                        <strong>{selectedFeeDetails ? formatBwp(selectedFeeDetails.processing) : '\u2014'}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18 }}>
                        <span>Annual Licence Fee:</span>
                        <strong>{selectedFeeDetails ? formatBwp(selectedFeeDetails.annual) : '\u2014'}</strong>
                      </div>
                    </div>
                    <div style={{ height: 1, background: '#93c5fd', margin: '18px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, color: '#1A3A6B', fontSize: 20, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      <span>Total Due:</span>
                      {selectedFeeDetails ? (
                        <span>{formatBwp(totalDue)}</span>
                      ) : (
                        <span style={{ color: '#9ca3af', fontSize: 14, fontStyle: 'italic', fontWeight: 400, fontFamily: 'Inter, sans-serif' }}>
                          Select a licence type to see fees
                        </span>
                      )}
                    </div>
                    <p style={{ margin: '14px 0 0', color: '#1e3a8a', fontSize: 14, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                      Payment will be collected upon approval. You will receive an invoice via email.
                    </p>
                  </div>

                  <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginTop: 24, color: '#374151', fontSize: 14, lineHeight: 1.7, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
                    <input type="checkbox" checked={appConsent} onChange={(event) => setAppConsent(event.target.checked)} style={{ marginTop: 3 }} />
                    <span>I confirm the information supplied is accurate and I authorise BOCRA to process this licensing application.</span>
                  </label>

                  <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 24 }}>
                    <button type="button" onClick={() => setAppStep(2)} style={secondaryButtonStyle}>
                      &lt;- Edit
                    </button>
                    <button type="button" onClick={handleSubmitApplication} style={primaryButtonStyle}>
                      {'Submit Application ->'}
                    </button>
                  </div>
                </div>
              )}

              {appStep === 'success' && (
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 24, padding: '42px clamp(20px, 4vw, 34px)', background: '#ffffff', textAlign: 'center' }}>
                  <div style={{ width: 80, height: 80, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                    <CheckCircle size={42} color="#16a34a" />
                  </div>
                  <h2 style={{ margin: '24px 0 10px', color: '#111111', fontSize: 34, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Application Submitted
                  </h2>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: 15, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                    Your licensing request has been received. BOCRA will review your submission and contact you if additional documents are required.
                  </p>

                  <div style={{ background: '#f8fafc', borderRadius: 16, padding: 22, marginTop: 24 }}>
                    <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                      APPLICATION REFERENCE
                    </p>
                    <p style={{ margin: '10px 0 8px', color: '#1A3A6B', fontSize: 30, fontWeight: 800, letterSpacing: '1px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {submittedReference}
                    </p>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
                      Use this number to track your application status.
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('track')
                        handleTrackSearch(submittedReference)
                      }}
                      style={primaryButtonStyle}
                    >
                      {'Track Your Application ->'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === 'track' && (
          <section style={{ marginTop: 34 }}>
            <div style={{ maxWidth: 760 }}>
              <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                APPLICATION TRACKER
              </p>
              <h2 style={{ margin: '12px 0 10px', fontSize: 36, fontWeight: 800, color: '#111111', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Track Application
              </h2>
              <p style={{ margin: 0, color: '#6b7280', fontSize: 15, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                Enter your BOCRA application reference to see the latest licensing status.
              </p>

              <div style={{ display: 'flex', gap: 12, marginTop: 30, marginBottom: 12, flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
                  <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    value={trackQuery}
                    onChange={(event) => setTrackQuery(event.target.value)}
                    placeholder="e.g. APP-BOCRA-2026-0042"
                    style={{ ...inputStyle, borderRadius: 999, paddingLeft: 46 }}
                    onKeyDown={(event) => event.key === 'Enter' && handleTrackSearch()}
                  />
                </div>
                <button type="button" onClick={() => handleTrackSearch()} style={primaryButtonStyle}>
                  Track
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRefreshing(true)
                    refresh()
                    if (trackQuery) handleTrackSearch()
                    setTimeout(() => setRefreshing(false), 600)
                  }}
                  title="Refresh tracking data"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    border: '1px solid #d1d5db',
                    borderRadius: 999,
                    padding: '12px 20px',
                    background: '#ffffff',
                    color: '#475569',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <RefreshCw size={15} style={{ transition: 'transform 0.6s ease', transform: refreshing ? 'rotate(360deg)' : 'rotate(0deg)' }} />
                  Refresh
                </button>
              </div>

              <p style={{ margin: '0 0 34px', color: '#9ca3af', fontSize: 13, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                Try: APP-BOCRA-2026-0042 · APP-BOCRA-2026-0078
              </p>

              {trackNotFound && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 14, padding: 20, color: '#b91c1c', fontSize: 14, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                  No application found with this reference number. Please check the reference and try again.
                </div>
              )}

              {trackedApplication && (
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 20, overflow: 'hidden', background: '#ffffff' }}>
                  <div style={{ background: '#1A3A6B', padding: '22px 28px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>Application</div>
                      <div style={{ marginTop: 6, fontSize: 24, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{trackedApplication.ref}</div>
                    </div>
                    <StatusBadge status={trackedApplication.status} />
                  </div>

                  <div style={{ padding: 28 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18 }}>
                      {[
                        ['Applicant', trackedApplication.company],
                        ['Licence Type', trackedApplication.type],
                        ['Submitted', trackedApplication.date],
                        ['Assigned Officer', trackedApplication.officer],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <div style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                            {label}
                          </div>
                          <div style={{ marginTop: 8, color: '#111827', fontSize: 15, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{value}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: 32 }}>
                      <div style={{ color: '#111827', fontSize: 18, fontWeight: 800, marginBottom: 18, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Application Journey
                      </div>
                      {trackingSteps.map((step, index) => (
                        <TrackingTimelineStep
                          key={step}
                          label={step}
                          description={
                            step === 'Application Received'
                              ? 'BOCRA has logged your application and reference number.'
                              : step === 'Document Verification'
                                ? 'Submitted documents are being checked for completeness.'
                                : step === 'Technical Assessment'
                                  ? 'Technical and regulatory review is underway.'
                                  : step === 'Fee Invoice Sent'
                                    ? 'An invoice has been prepared and issued to the applicant.'
                                    : 'Your licence certificate is ready for issuance.'
                          }
                          done={index <= trackingIndex}
                          current={index === trackingIndex}
                          isLast={index === trackingSteps.length - 1}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === 'verify' && (
          <section style={{ marginTop: 34 }}>
            <div style={{ display: 'grid', gap: 26 }}>
              <div style={{ border: '1px solid #e5e7eb', borderRadius: 24, padding: '30px clamp(20px, 4vw, 34px)', background: '#ffffff' }}>
                <h2 style={{ margin: 0, color: '#111111', fontSize: 32, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Is this operator licensed?
                </h2>
                <p style={{ margin: '10px 0 0', color: '#6b7280', fontSize: 16, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                  Enter an operator name or licence number to verify their registration.
                </p>

                <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
                    <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      value={searchQuery}
                      onChange={(event) => {
                        setSearchQuery(event.target.value)
                        setRegistryChecked(false)
                      }}
                      placeholder="Search operator name"
                      style={{ ...inputStyle, borderRadius: 999, paddingLeft: 46 }}
                      onKeyDown={(event) => event.key === 'Enter' && handleVerifySearch()}
                    />
                  </div>
                  <button type="button" onClick={handleVerifySearch} style={primaryButtonStyle}>
                    Verify
                  </button>
                </div>

                {!verifyMatches && registryChecked && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 14, padding: 18, marginTop: 18, color: '#b91c1c', fontSize: 14, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                    No active licence found for this operator. <Link to="/portal/complaint/new" style={{ color: '#b91c1c', fontWeight: 700 }}>Report an unlicensed operator -&gt;</Link>
                  </div>
                )}
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 18 }}>
                  <div>
                    <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                      ACTIVE LICENCE REGISTRY
                    </p>
                    <p style={{ margin: '10px 0 0', color: '#6b7280', fontSize: 15, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                      All licensed operators in Botswana&apos;s communications sector
                    </p>
                  </div>

                  <div style={{ minWidth: 220 }}>
                    <label style={{ ...labelStyle, marginBottom: 6 }}>Filter by type</label>
                    <select value={filterType} onChange={(event) => setFilterType(event.target.value)} style={inputStyle}>
                      {typeFilterOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ border: '1px solid #e5e7eb', borderRadius: 16, overflow: 'hidden', background: '#ffffff' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 960 }}>
                      <thead>
                        <tr style={{ background: '#f8fafc' }}>
                          {['Operator', 'Licence Type', 'Class', 'Coverage', 'Issued', 'Expires', 'Status'].map((heading) => (
                            <th
                              key={heading}
                              style={{
                                textAlign: 'left',
                                padding: '16px 18px',
                                borderBottom: '1px solid #e5e7eb',
                                color: '#374151',
                                fontSize: 13,
                                fontWeight: 700,
                                fontFamily: 'Inter, sans-serif',
                              }}
                            >
                              {heading}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {registryRows.map((entry) => {
                          const isHighlighted = registryChecked && normalizedRegistryQuery && entry.operator.toLowerCase().includes(normalizedRegistryQuery)

                          return (
                            <tr key={`${entry.operator}-${entry.expires}`} style={{ background: isHighlighted ? '#eff6ff' : '#ffffff' }}>
                              <td style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', color: '#111827', fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{entry.operator}</td>
                              <td style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', color: '#374151', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{entry.type}</td>
                              <td style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', color: '#374151', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{entry.class}</td>
                              <td style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', color: '#374151', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{entry.coverage}</td>
                              <td style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', color: '#374151', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{entry.issued}</td>
                              <td style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', color: '#374151', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{entry.expires}</td>
                              <td style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9' }}>
                                <StatusBadge status={entry.status} />
                              </td>
                            </tr>
                          )
                        })}

                        {registryRows.length === 0 && (
                          <tr>
                            <td colSpan={7} style={{ padding: '28px 18px', textAlign: 'center', color: '#6b7280', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
                              No registry entries match the current search and filter.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        </div>

        {activeTab === 'finder' && (
          <section style={{ background: '#f8f9fa', padding: '80px 0' }}>
            <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
              <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                ALL LICENCE CATEGORIES
              </p>
              <h2 style={{ margin: '12px 0 0', color: '#111111', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                What Does BOCRA License?
              </h2>

              <div style={{ marginTop: 40 }}>
                {licenceOverviewItems.map(({ icon: Icon, title, description, to }) => (
                  <Link key={title} to={to} className="licensing-overview-row">
                    <div className="licensing-overview-icon">
                      <Icon size={20} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div className="licensing-overview-title">{title}</div>
                      <div className="licensing-overview-description">{description}</div>
                    </div>
                    <ArrowRight className="licensing-overview-arrow" size={18} />
                  </Link>
                ))}
              </div>

              <div style={{ marginTop: 48, background: '#1A3A6B', borderRadius: 28, padding: 'clamp(28px, 5vw, 64px)', color: '#ffffff' }}>
                <h3 style={{ margin: 0, fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Ready to Apply?
                </h3>
                <p style={{ margin: '14px 0 0', maxWidth: 620, color: 'rgba(255,255,255,0.76)', fontSize: 16, lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>
                  Start your application online or contact BOCRA&apos;s licensing team for guidance.
                </p>

                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
                  <button
                    type="button"
                    onClick={handleStartApplication}
                    style={{
                      border: 'none',
                      borderRadius: 999,
                      padding: '14px 24px',
                      background: '#ffffff',
                      color: '#111111',
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {'Start Application ->'}
                  </button>
                  <Link
                    to="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 999,
                      padding: '14px 24px',
                      border: '1px solid rgba(255,255,255,0.35)',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Contact Licensing Team
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <style>{`
          .licensing-hero-tab:hover:not(.is-active) {
            color: #111111 !important;
            background: rgba(0,0,0,0.04) !important;
          }

          .licensing-choice-card {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
            width: 100%;
            padding: 28px 24px;
            border-radius: 16px;
            border: 1.5px solid #e5e7eb;
            background: #ffffff;
            cursor: pointer;
            transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
            text-align: left;
          }

          .licensing-choice-card:hover {
            border-color: #1A3A6B;
            transform: translateY(-2px);
          }

          .licensing-choice-card.is-selected {
            border: 2px solid #1A3A6B;
            background: #f8fbff;
          }

          .licensing-choice-badge {
            position: absolute;
            top: 14px;
            right: 14px;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #1A3A6B;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .licensing-choice-icon-box {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: #D6E4F7;
            color: #1A3A6B;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease, color 0.2s ease;
          }

          .licensing-choice-card:hover .licensing-choice-icon-box,
          .licensing-choice-card.is-selected .licensing-choice-icon-box {
            background: #1A3A6B;
            color: #ffffff;
          }

          .licensing-choice-title {
            color: #111111;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 16px;
            font-weight: 700;
            line-height: 1.3;
          }

          .licensing-choice-description {
            color: #6b7280;
            font-family: 'Inter', sans-serif;
            font-size: 13px;
            line-height: 1.55;
          }

          .licensing-choice-fee {
            margin-top: auto;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 6px 10px;
            border-radius: 999px;
            background: #f8f9fa;
            color: #6b7280;
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            font-weight: 500;
          }

          .licensing-overview-row {
            display: flex;
            align-items: center;
            gap: 18px;
            padding: 24px 0;
            color: inherit;
            text-decoration: none;
            border-bottom: 1px solid #e5e7eb;
            transition: color 0.2s ease, transform 0.2s ease;
          }

          .licensing-overview-row:hover {
            color: #1A3A6B;
            transform: translateX(2px);
          }

          .licensing-overview-icon {
            width: 46px;
            height: 46px;
            min-width: 46px;
            border-radius: 12px;
            background: #ffffff;
            color: #1A3A6B;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .licensing-overview-title {
            color: #111111;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 18px;
            font-weight: 700;
          }

          .licensing-overview-description {
            margin-top: 4px;
            color: #6b7280;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            line-height: 1.6;
          }

          .licensing-overview-arrow {
            margin-left: auto;
            color: #9ca3af;
            transition: transform 0.2s ease, color 0.2s ease;
          }

          .licensing-overview-row:hover .licensing-overview-arrow {
            transform: translateX(4px);
            color: #1A3A6B;
          }

          .application-licence-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .application-licence-tile {
            width: 100%;
            border: 1.5px solid #e5e7eb;
            border-radius: 12px;
            padding: 16px 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 14px;
            transition: all 0.15s ease;
            background: #ffffff;
            text-align: left;
          }

          .application-licence-tile.is-selected {
            border: 2px solid #1A3A6B;
            background: #f8fbff;
          }

          .application-licence-icon-box {
            width: 38px;
            height: 38px;
            min-width: 38px;
            background: #f8f9fa;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1A3A6B;
          }

          .application-licence-title {
            display: block;
            color: #111111;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 600;
          }

          .application-licence-fee-hint {
            display: block;
            margin-top: 2px;
            color: #9ca3af;
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            font-weight: 400;
          }

          .application-technical-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 18px;
          }

          @media (max-width: 900px) {
            .licensing-overview-row {
              align-items: flex-start;
            }
          }

          @media (max-width: 720px) {
            .application-licence-grid {
              grid-template-columns: 1fr;
            }

            .licensing-overview-row {
              gap: 14px;
            }
          }
        `}</style>
      </>
    </PageWrapper>
  )
}
