import React, { useState } from 'react'

import styles from './InputControl.module.scss'
import Button from 'Components/Button/Button'

export default function InputControl(props) {

  const [roomId, setRoomId] = useState("")

  const handleInputField = (event) => {
    event.preventDefault();
    setRoomId(event.target.value)
  }

  return (
    <div className={styles.container}>
      <input
      className={`${styles.inputField} ${props.className || ""}`}
      type={props.type || "text"}
      placeholder={props.placeholder || "Enter text"}
      onChange={handleInputField}
      >
      </input>
      <Button onClick={() => props.onclick(roomId)}>Join Link</Button>
    </div>
  )
}
