import React, { useState } from 'react'
import axios from "../config/axios";

function Test() {

  const [response, setResponse] = useState("")

  async function handleClick(){
      const response = await axios.get("/")
      const message = response.data.message;
      setResponse(message)
      console.log(response)
  }


  return (
    <>
    <button onClick={handleClick}>Send request</button>
    <div>{response}</div>

    </>

  )
}

export default Test