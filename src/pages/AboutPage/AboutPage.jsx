import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import styles from './about-page.module.scss'

import bg from './assets/bg.png'

import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { Modal } from '@consta/uikit/Modal'
import { IconClose } from '@consta/uikit/IconClose'

import { useAppContext } from '../../context'

import { InputWrapper } from '../../components'

const AboutPage = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = () => {}

  return (
    <div className={styles.main}>
      <img className={styles.bg} src={bg} alt="" />
      <div className={styles.top}>
        <div className={styles.title}>
          <h3>About</h3>
          <h2>Lit Gateway</h2>
        </div>
      </div>
      <p className={styles.subtitle}>
        Lit Gateway is your portal for connecting blockchain wallets to the rest
        of the internet.
      </p>
      <div className={styles.textBlock}>
        <p>
          Apps let you create resources that are exclusive to your crypto
          community, for example, google drive files that are only accessible to
          members of your DAO or owners of a given NFT. The list of supported
          apps is growing all the time, so if there’s a specific app you’d like
          to see, please get in touch! (contact us).
        </p>
      </div>
      <div className={styles.textBlock}>
        <p>
          Offers are rewards, discounts, NFTs, and airdrops that you can only
          access if your wallet meets certain criteria, like owning a given
          token. Once you connect your wallet, you’ll see the offers that are
          available to you.
        </p>
      </div>
      <p className={styles.secondaryText}>
        Don’t forget to drop your email address in so we can notify you when new
        offers that apply to you become available!
      </p>
      <div className={styles.form}>
        <InputWrapper
          value={email}
          className={styles.input}
          placeholder="Email address"
          id="email"
          size="l"
          handleChange={(value) => setEmail(value)}
        />
        <Button
          className={styles.btn}
          label="Get Updates"
          size="l"
          onClick={handleSubmit}
        />
      </div>
      <p className={styles.secondaryText}>
        If you’d like to create an offer for your project, please get in touch!
      </p>

      <Button
        className={styles.btn}
        label="Contact Us"
        size="l"
        view="secondary"
        onClick={handleSubmit}
      />
    </div>
  )
}

export default AboutPage
