import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';

import './rtc-network-trace.css';


export default ({ trace, totalOutlineSquares = 5, onSelection = () => {}}) => {  
  const [width, setWidth] = useState(0) 
  const ref = useRef(null);

  useEffect(() => {
    setWidth(ref.current ? ref.current.offsetWidth : 0)
  }, [ref.current]);

  const outlineMarkers = Math.ceil(trace.totalDuration / totalOutlineSquares);  
  const calculateWidth = useCallback((service, idx) => {
    const sm = service.duration / outlineMarkers

    return ((width / totalOutlineSquares + idx)) * sm;
  }, [width]);

  window.addEventListener('resize', () => setWidth(ref.current ? ref.current.offsetWidth : 0));
  
  return (
    <div className="network-trace">      
      <div className="network-trace-container" ref={ref}>
        {
          Array(totalOutlineSquares).fill(null).map((e, idx) => (
            <div className="trace-outline-square">
              <div className="trace-time-identifier">
                {
                  outlineMarkers * (idx + 1)
                } ms
            </div>
            </div >
          ))
        }
      </div>
        {
          trace.services.map((service, idx) => (
            <>
              <div
                onClick={() => onSelection(service)}
                style={{
                  left: idx >= 1 ? calculateWidth(trace.services[idx -1], idx - 1) : 0,
                  top: 40 * (idx + 1),
                  width: calculateWidth(service, idx),
                  backgroundColor: service.error ? 'rgba(226, 35, 76, 0.904)' : 'rgba(0, 140, 255, 0.904)'
                }}
                className="trace-marker"
              />
            </>
          ))
        }

    </div>
  )
}