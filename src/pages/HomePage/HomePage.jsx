import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'Components/Button/Button'
import InputControl from 'Components/InputControl/InputControl'

import styles from './HomePage.module.scss'

function HomePage() {

  const navigate = useNavigate()

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <h1>Hey! lets Connect 💬</h1>
        <div className={styles.btnBox}>
          <InputControl placeholder={"Enter or Paste the link"} />
          <Button
            className={styles.longButton}
            outlineButton
            onClick={() => navigate("/meeting")}
            >
            New Meeting
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage