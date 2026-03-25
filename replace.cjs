const fs = require('fs');

const path = 'c:\\Users\\user\\Documents\\BAC\\Bocra\\src\\pages\\QoSPage.jsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /\{activeTab === 'Dashboard' && \([\s\S]*?className="qos-section"[\s\S]*?className="qos-grid-2"[\s\S]*?<\/Line>[\s\S]*?<\/Doughnut>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\)\}/;

const replacement = `{activeTab === 'Dashboard' && (
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
                          y: { border: { display: false }, grid: { color: '#f1f5f9', borderDash: [4, 4] }, ticks: { color: '#94a3b8', font: { family: "'DM Sans', sans-serif", size: 11 }, callback: (v) => \`\${v} Mbps\` } } 
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
        )}`;

if (regex.test(content)) {
  fs.writeFileSync(path, content.replace(regex, replacement));
  console.log('REPLACEMENT SUCCESS');
} else {
  console.log('REGEX DID NOT MATCH:');
}
