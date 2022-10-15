function DPOS(users) { // users in an array of users in the system
  let threshold = 25
  let delegates = []

  users.forEach(user => {
    if(user.val >= threshold) {
      delegates.push(user.id)
    }
  })
  
  return delegates
}

module.exports = {
  DPOS
}