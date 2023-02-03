import { useEffect, useState } from 'react'
import loadingStore from './loadingStore';
import './style.css'

export default function Loading() {

  let [loading, setLoading] = useState(false);

  useEffect(() => {
    loadingStore.listen((value: boolean) => {
      setLoading(value);
    })
  }, []);

  if (!loading) return null;
  
  return (
    <div className="loading-wrapper">
      <div className="loading-bg">
        <svg viewBox="0 0 50 50" className="loading-svg">
          <circle cx="25" cy="25" r="20" fill="none" className="path"></circle>
        </svg>
      </div>
    </div>
  )
}
