import React, {useEffect, useState} from 'react'

import styles from './create-content-page.module.scss'

import {SelectStep, CreateStep } from './steps'

const createSteps = {
  selectToDo: SelectStep,
  create: CreateStep
}

const CreateStepComponent = ({ type, setStep }) => {
  let Component = createSteps[type]

  return <Component setStep={setStep} />
}


const CreateContentPage = () => {

  const [step, setStep] = useState('selectToDo')

  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <CreateStepComponent type={step} setStep={setStep}/>
      </div>
    </div>
  )
}

export default CreateContentPage