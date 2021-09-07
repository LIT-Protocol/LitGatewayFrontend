import React from 'react'

import styles from './single-guide-page.module.scss'

import { Badge } from '@consta/uikit/Badge'
import { useParams } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../../utils/index'
import { content } from '../content'

const SingleGuidePage = () => {
  const { title } = useParams()
  const { body } = content[title]
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Guide - {capitalizeFirstLetter(title)}</h1>
      <div className={styles.body}>
        {body}
        {/* <p>
          Requirements are the conditions a blockchain address must meet in
          order to access content, experiences, or a service.
        </p>
        <p>
          As a basic example, let’s say someone wants to host a chat and only
          allow people who own more than 10 ETH to see and join.
        </p>
        <p>In this case, the requirement looks like this:</p>
        <h3>REQUIREMENT</h3>
        <h4>
          >10 <Badge label="ETH" />
        </h4>
        <p>
          This means that Lit, a decentralized access control protocol, will
          grant the access keys to the any address that requests permission to
          join the chat and meets the condition of having more than 10 ETH in
          their wallet.
        </p>
        <p>
          Requirements can get more sophiscialed than just owning over a certain
          amount of a given token, for example multiple access control
          conditions and authorization granted by a smart contract. Let’s
          explore these examples with chat.
        </p>
        <p>
          In the case where there are multiple conditions, the requirement looks
          like this:
        </p>
        <h3>REQUIREMENT</h3>
        <h4>Multiple</h4>
        <p>
          When you see this on a page, scroll down to “Requirement Details” to
          see all the conditions that must be meet in order to access the
          content, experiences, or service, and in this example, the private
          chat thread.
        </p>
        <p>
          Multiple conditions may also be “OR” instead of “AND” and in this
          case, partipants would only need to meet one condition to access the
          chat.
        </p>
        <p>
          Moving on to a more advanced example, let’s say you wanted to give a
          DAO control over who could access a chat. In this example, the
          requirement looks like this:
        </p>
        <h3>REQUIREMENT</h3>
        <h4>
          Smart Contract <br />
          Authorization
        </h4>
        <p>
          In this example, only addresses authorized by a DAO’s multi-sig
          address would be able to access the chat. There are other smart
          control based access control conditions, and you'll find thes in the
          “Requirment Details” section that you’ll see on the page when you see
          this requirement.
        </p> */}
      </div>
    </div>
  )
}

export default SingleGuidePage
