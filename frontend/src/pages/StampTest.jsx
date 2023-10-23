import React, { useState, useEffect } from 'react'
import StampTestOptions from '../components/stampTest/StampTestOptions'
import StampTestStart from '../components/stampTest/StampTestStart'
import StampTestLoading from '../components/stampTest/StampTestLoading'

function StampTest() {
  const [testMode, setTestMode] = useState('start')
  const [result, setResult] = useState('')

  const onTestModeHanlder = (e) => {
    setTestMode('test')
  }

  return (
    <div>
      {(function() {
        if (testMode === 'start') { 
          return (<StampTestStart onTestModeHanlder={onTestModeHanlder}/>)
        } else if (testMode === 'test') {
          return (<StampTestOptions setTestMode={setTestMode} setResult={setResult}/>)
        } else {
          return (<StampTestLoading result={result} />)
        }
      })()}

    </div>
  )
}

export default StampTest
