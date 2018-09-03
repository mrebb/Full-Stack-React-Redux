'use strict'

import {Router} from 'express'
import User from '../model/user.js'
import parserBody from './parser-body.js'
import {basicAuth} from './parser-auth.js'
import {log, daysToMilliseconds} from '../lib/util.js'

export default new Router()
.post('/signup', parserBody, (req, res, next) => {
  console.log('__ROUTE__ POST /signup')
  new User.create(req.body)
  .then(user => user.tokenCreate())
  .then(token => {
    res.cookie('X-Sluggram-Token', token, {maxAge: 900000})
    res.send(token)
  })
  .catch(next)
})
.get('/usernames/:username', (req, res, next) => {
  User.findOne({username: req.params.username})
  .then(user => {
    if(!user){
      return res.sendStatus(200)
    }
    else{
      return res.send(user.username)
    }
    
  })
  .catch(next)
})
.get('/users', (req, res, next) => {
  User.find({})
  .then(users => {
   
      //console.log('users',users)
      return res.send(users)
    
    
  })
  .catch(next)
})
.get('/login', basicAuth, (req, res, next) => {
  log('__ROUTE__ GET /login')
  req.user.tokenCreate()
  .then((token) => {
    let cookieOptions = {maxAge: daysToMilliseconds(7)}
    res.cookie('X-Sluggram-Token', token, cookieOptions)
    console.log(typeof(token))
    res.json(token)
  })
  .catch(next)
})
.delete('/users', (req, res, next) => {
  User.find().remove()
  .then(() => res.sendStatus(204))
  .catch(next)
})
