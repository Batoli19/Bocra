import { createContext, useState } from 'react'
export const LanguageContext = createContext(null)
const T = {
  en: { login:'Login', logout:'Logout', file_complaint:'File a Complaint', apply_licence:'Apply for Licence', my_dashboard:'My Dashboard' },
  tn: { login:'Tsena', logout:'Tswa', file_complaint:'Bega Ipelego', apply_licence:'Kopa Laesense', my_dashboard:'Phanele ya me' },
}
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = (key) => T[lang][key] || T.en[key] || key
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}
