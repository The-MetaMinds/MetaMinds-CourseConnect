import React from 'react'

const HomePage = () => {
  return (
    <div>
      <div style={{ backgroundColor: 'red', height: '50px', width: '100%', position: 'fixed', top: 0 }}>Red Box Header</div>
      
      <div>HomePage</div>



      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

      {/* Mathmatics Button */}
      <br></br> <br></br>
      <button style={{ fontSize: '29px', backgroundColor: 'rgb(72, 174, 248)', color: 'black' }}>Mathmatics</button>

      {/* Computer Science Button */}
      <br></br> <br></br>
      <button style={{ fontSize: '29px', backgroundColor: 'rgb(209, 203, 181)', color: 'black' }}>Computer Science</button>

      {/* History Button */}
      <br></br> <br></br>
      <button style={{ fontSize: '29px', backgroundColor: 'rgb(220, 252, 130)', color: 'black' }}>History</button>

      </div>



      {/* Criminal Justice Button */}
      <br></br> <br></br>
      <button style={{ fontSize: '29px', backgroundColor: 'rgb(218, 75, 221)', color: 'black' }}>Criminal Justice</button>


      <br></br>
      <button>Submit</button>

    </div>
  )
}

export default HomePage