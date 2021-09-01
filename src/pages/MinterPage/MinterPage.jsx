import React, { useState } from 'react'

import styles from './minter-page.module.scss'

import { SelectStep, CreateStep } from './steps'

const createSteps = {
  selectToDo: SelectStep,
  create: CreateStep,
}

const CreateStepComponent = ({ type, setStep }) => {
  let Component = createSteps[type]

  return <Component setStep={setStep} />
}

const MinterPage = () => {
  const [step, setStep] = useState('selectToDo')

  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <CreateStepComponent type={step} setStep={setStep} />
      </div>
    </div>
  )
}

export default MinterPage
