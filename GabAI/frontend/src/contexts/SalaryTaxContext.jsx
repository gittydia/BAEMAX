

import {createContext, useEffect, useState} from 'react'

export const SalaryTaxContext = createContext();

function SalaryTaxProvider({children}) {
  const [sssDeductionAmt, setSssDeductionAmt] = useState('');
  const [gsisDeductionAmt, setGsisDeductionAmt] = useState('');
  const [philHealthDeductionAmt, setPhilHealthDeductionAmt] = useState('');

  return (
    <SalaryTaxContext.Provider value={{sssDeductionAmt, setSssDeductionAmt, gsisDeductionAmt, setGsisDeductionAmt, philHealthDeductionAmt, setPhilHealthDeductionAmt}}>
      {children}
    </SalaryTaxContext.Provider>
  )
}

export default SalaryTaxProvider
