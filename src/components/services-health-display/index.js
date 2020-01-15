import React from 'react';

// todo: i have decided that I want a table here that shows status.
export default ({ servicesHealth }) => !!servicesHealth ? (
    <> 
      {
        servicesHealth.map(service => (
          <div className={service.isUp ? "service-up" : "service-down"}>

          </div>
        ))
      }
    </>
  )
 : (
   <>
    Loading..
   </>
 )