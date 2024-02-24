import React from 'react'

const HomePage = () => {
  return (
    <div>
      <div style={{ backgroundColor: 'red', height: '50px', width: '100%', position: 'fixed', top: 0 }}>Red Box Header</div>
      
      <div>HomePage</div>

      {/* Mathmatics Button */}
      <br></br>
      <button style={{ fontSize: '22px', backgroundColor: 'blue', color: 'black' }}>Mathmatics</button>

      {/* Computer Science Button */}
      <br></br>
      <button style={{ fontSize: '22px', backgroundColor: 'grey', color: 'black' }}>Computer Science</button>
      
      <input type="text" placeholder="Type your response here" />

      <button>Submit</button>

    </div>
  )
}

export default HomePage