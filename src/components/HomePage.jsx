import React from 'react'

const HomePage = () => {
  return (
    <div>
      <div style={{ backgroundColor: 'red', height: '60px', width: '100%', position: 'fixed', top: 0 }}>Red Box Header</div>
      
      <div>HomePage</div>



      <br/>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex' }}>

      {/* Mathmatics Button */}
      <button style={{ fontSize: '40px', backgroundColor: 'rgb(72, 174, 248)', color: 'black', marginRight: '30px' }}>Mathmatics</button>

      {/* Computer Science Button */}
      <button style={{ fontSize: '40px', backgroundColor: 'rgb(209, 203, 181)', color: 'black', marginRight: '30px' }}>Computer Science</button>

      {/* History Button */}
      <button style={{ fontSize: '40px', backgroundColor: 'rgb(220, 252, 130)', color: 'black', marginRight: '30px' }}>History</button>

      </div>
      </div>


      <br/><br/><br/>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex' }}>

      {/* Criminal Justice Button */}
      <button style={{ fontSize: '40px', backgroundColor: 'rgb(218, 75, 221)', color: 'black', marginRight: '30px' }}>Criminal Justice</button>

      </div>
      </div>


      <br></br>
      <button>Submit</button>

    </div>
  )
}

export default HomePage