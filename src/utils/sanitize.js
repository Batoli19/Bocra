export const sanitize = (input) => {
  if (typeof input !== 'string') return input
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

export const validateOmang = (omang) => /^\d{9}$/.test(omang.replace(/\s/g, ''))
export const validatePhone = (phone) => /^[0-9]{7,8}$/.test(phone.replace(/\s/g, ''))
export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
