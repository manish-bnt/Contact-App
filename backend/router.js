const { log } = require('console')
let express = require('express')
let router = express.Router()
let fs = require('fs')
let path = require('path')
let PATH_FILE = path.join(__dirname, 'users.json')
if (!fs.existsSync(PATH_FILE)) fs.writeFileSync(PATH_FILE, "[]")

function readFile() {
  try {
    return JSON.parse(fs.readFileSync(PATH_FILE, 'utf8'))
  } catch (error) {
    console.error("failed to read file", error)
  }
}

function writeFile(signupObj) {
  try {
    fs.writeFileSync(PATH_FILE, JSON.stringify(signupObj))
  } catch (error) {
    console.error(error)
  }
}
router.get('/', (req, res) => {
    res.send(JSON.stringify({ msg: "server is running" }))
})
router.post('/signup', (req, res) => {
  let fileRead = readFile() // [] 
  let duplicateEmail = fileRead.filter((user) => {
    return user.email === req.body.email
  })
  if (duplicateEmail.length > 0) {
    res.send({ msg: "Email has already used!" })
  } else {
    fileRead.push(req.body) // [{req.body},{req.body},{req.body}]
    writeFile(fileRead)
    res.send(JSON.stringify({ msg: "successfully signup", data: req.body }))
  }
})

router.post('/signin', (req, res) => {
  let readData = readFile()
  let loggedUser = readData.filter((user) => {
    return user.username === req.body.username && user.password === req.body.password
  })
  if (loggedUser.length > 0) {
    res.send(JSON.stringify({ msg: "Successfully logged!", logged: loggedUser[0] }))
  }
  else {
    res.status(401).send(JSON.stringify({ msg: "Invalid credentials" }))
  }
})

router.put('/update', (req, res) => {
  let { oldData, newData } = req.body
  let fileRead = readFile()
  let matchedUser = fileRead.filter((user) => {
    return user.email === oldData.email
  })
  // console.log("status ", fileRead[0] === matchedUser[0])
  let matchIndex = fileRead.indexOf(matchedUser[0])
  fileRead.splice(matchIndex, 1, newData)
  writeFile(fileRead)
  let updatedData = fileRead.filter((user) => {
    return user.email === newData.email
  })
  res.send(JSON.stringify({ msg: 'successfully updated', alterData: updatedData[0] }))
  console.log("index ", matchIndex);
})

router.delete('/delete-profile', (req, res) => {
  console.log(req.body)
  let fileRead = readFile()
  let matchedRefObj = fileRead.filter((user) => {
    return user.email === req.body.email
  })
  let getIndex = fileRead.indexOf(matchedRefObj[0])
  let deleted = fileRead.toSpliced(getIndex, 1)
  writeFile(deleted)
  res.send(JSON.stringify({ msg: "Account deleted successfully" }))
})

router.post('/addform', (req, res) => {
  let { loguser, contact } = req.body
  let fileRead = readFile()
  let matchLoguser = fileRead.filter((user, index) => {
    return user.email === loguser.email
  })
  let loguserIdx = fileRead.indexOf(matchLoguser[0]) //index for replacing to old one and put new one
  if (!Array.isArray(matchLoguser[0].contacts)) {
    matchLoguser[0].contacts = [];
  }
  let duplicateContact = matchLoguser[0].contacts.some((c, i) => {
    return c.email === contact.email || c.mobile === contact.mobile
  })
  // let duplicateContact = fileRead.filter((user, i) => {
  //   return user.contacts.some((c, i) => {
  //     return c.email === contact.email || c.mobile === contact.mobile
  //   })
  // })
  if (duplicateContact) {
    res.status(401).send(JSON.stringify({ msg: "Contact already existed!" }))
  } else {
    matchLoguser[0].contacts.push(contact)
    fileRead.splice(loguserIdx, 1, matchLoguser[0])
    writeFile(fileRead)
    console.log("contacts ", matchLoguser[0]);

    res.send(JSON.stringify({ msg: "Contact added successfully", newData: matchLoguser[0] }))
  }
})

router.delete('/delete-contact', (req, res) => {
  const { loguser, reqDelete } = req.body
  console.log("client requesting deleting ", req.body)
  let fileRead = readFile()
  let matchedLoguser = fileRead.filter((user, index) => {
    return user.email === loguser.email
  })
  matchedLoguser[0].contacts.splice(reqDelete, 1)
  const loguserIdx = fileRead.indexOf(matchedLoguser[0])
  fileRead.splice(loguserIdx, 1, matchedLoguser[0])
  writeFile(fileRead)
  res.send(JSON.stringify({ msg: "Deleted Succesfully", newData: matchedLoguser[0] }))
})


module.exports = router

