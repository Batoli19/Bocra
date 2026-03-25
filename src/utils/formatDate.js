export const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-BW', { day:'numeric', month:'short', year:'numeric' }) : '—'
export const timeAgo = (d) => { const days = Math.floor((Date.now()-new Date(d))/86400000); return days===0?'Today':days===1?'Yesterday':days<7?`${days} days ago`:formatDate(d) }
