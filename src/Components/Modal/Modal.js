import React from 'react'

import styles from './Modal.module.scss'
import Button from 'Components/Button/Button'

function Modal(props) {
  return (
    <div className={styles.modal}>
      <p>{props.children}</p>
      <div className={styles.btnContainer}>
        <Button className={styles.btnStyle} onClick={props.onSuccess} outlineButton >{props.success || "Okay"}</Button>
        <Button className={styles.btnStyle} onClick={props.onCancel} redButton outlineButton >{props.cancel || "Close"}</Button>
      </div>
    </div>
  )
}

export default Modal