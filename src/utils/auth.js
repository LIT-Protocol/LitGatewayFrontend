import Gun from 'gun/gun'
import 'gun/sea'
import uint8arrayToString from 'uint8arrays/to-string'
import LitJsSdk from 'lit-js-sdk'

export const loginToDb = function ({ accessControlConditions, cb }) {
  // log the user into the db
  const gun = Gun();
  const user = gun.user();

  // const randomBytes = new Uint8Array(32);
  // window.crypto.getRandomValues(randomBytes);
  // const password = uint8arrayToString(randomBytes, 'base16')
  const password = "8755e0052d65c407cc0b072bdbc616aea71639560f6ddf76e617f546749a8995"
  // // // console.log('password: ', password)
  LitJsSdk.hashAccessControlConditions(accessControlConditions)
    .then(hashedUserId => {
      const userId = uint8arrayToString(new Uint8Array(hashedUserId), 'base16')
      console.log('userId', userId)
      console.log('attempting to create user')
      user.create(userId, password, function (ack) {
        const { err } = ack
        if (!err || err == "User already created!") {
          user.auth(userId, password, function (authAck) {
            console.log('authed user')
            const { err } = authAck
            if (err) {
              cb({ err })
              return
            }
            cb({ user })
          })
          return
        }
        cb({ err })
        return
      })
    })
}