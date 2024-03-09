import React from 'react'

import styles from './InputControl.module.scss'
import Button from 'Components/Button/Button'

export default function InputControl(props) {
  return (
    <div className={styles.container}>
      <input
      className={`${styles.inputField} ${props.className || ""}`}
      type={props.type || "text"}
      placeholder={props.placeholder || "Enter text"}
      >
      </input>
      <Button>Join Link</Button>
    </div>
  )
}
