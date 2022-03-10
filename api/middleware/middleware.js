const User = require('../users/users-model')

function logger(req, res, next) {
  const timeStamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timeStamp}] ${method} to ${url}`)
  next()
}
async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try{
    const user = await User.getById(req.params.id)
    if(!user){
      next({ status: 400, message: 'user not found'})
    }else{
      req.user = user
      next()
    }
  }catch (err){
    res.status(500).json({
      message: 'problem finding user',
    })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  try{
    const user = await User.getById(req.params.id)
    if(!user){
      next({ status: 400, message: 'missing required text field'})
    }else{
      req.user = user
      next()
    }
  }catch (err){
    res.status(500).json({
      message: 'problem finding user',
    })
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if(!text || !text.trim()){
    res.status(400).json({
      message:'missing required text field',

    })
  } else {
    req.text = text.trim()
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports={
  validatePost,
  validateUser,
  validateUserId,
  logger,
}