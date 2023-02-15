const Todo = require("../models/Todo");
const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


var obj={}
  exports.register = async (req, res) => {
   const userData = {
        name : req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password,
        address:req.body.address

    }
    obj.role=req.body.role;
    console.log(obj.role)
        Users.findOne({
            email: req.body.email
        })
        .then(user => {
            if(!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash;
                    Users.create(userData)
                    .then(user => {
                          obj.role=user.role;
                           console.log("inside db",obj.role)

                        res.json({status: user.email + ' added'})
                    })
                    .catch(err=> {
                        res.send('error: ' + err)
                    })
                })
            } else {
                 res.json({error: 'email already exist'})
            }
        })
        .catch(res => {
            res.send('error: ' + err)
        })
  };
  console.log("object",obj.role)

  exports.login= async (req, res) => {
     Users.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    password: user.password,
                    email: user.email
                }
            
                let token = jwt.sign(payload, process.env.JWT_KEY+"", {
                    expiresIn: 1440
                })
                res.send("user token: "+token)
            } else {
                res.json({error: "User dose not exist"})
            }
        } else {
            res.json({error: "User dose not exist"})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
  };





////********** */
// const { registerValid, loginValid } = require("../utils/errorHandler");
exports.getTodoById = (req, res, next, todoId) => {
  // we will get todoId from the router.param
  // we will use .findById() method to find the todo which has id==todoId
  Todo.findById(todoId).exec((err, todo) => {
    if (err || !todo) {
      return res.status(400).json({
        error: "404 todo not found",
      });
    }
    // we will store that todo in req.todo
    req.todo = todo;
    // Because this is a middleware we have to call the next()
    next();
  });
};

exports.getAllTodos = (req, res) => {
  console.log("test",obj.role)
  if(obj.role==="biker"){
  // simply use .find() method and it will return all the todos
  Todo.find()
    .sort("-createdAt")
    .exec((err, todos) => {
      // error checking
      if (err || !todos) {
        return res.status(400).json({
          error: "Something went wrong in finding all todos",
        });
      }
      // return all the todos in json format
      res.json(todos);

    });
  }//if
  else{res.json("only bikers can see list of parcels")}
};

exports.getTodo = (req, res) => {
  // this is pretty simple because we've already defined a middleware
  // to get a todo from the URL id
  // this req.todo is coming from that middleware
  return res.json(req.todo);
};

exports.createTodo = (req, res) => {
  // we will get json data from the frontend i.e. req.body
  const todo = new Todo(req.body);
if(obj.role==="sender"){
  // create a todo instance by passing 'parcel' field from 'req.body'
  todo.save((err, parcel) => {
    if (err || !parcel) {
      return res.status(400).json({
        error: "something went wrong",
      });
    }
    // todo is created
    // send the created todo as a json response
    res.json({ parcel });
  });
}//if 
else{
  res.json("only sender role can create parcel")
}
};

exports.updateTodo = (req, res) => {
  // take req.todo from getTodoById() middleware and
  // fetch the todo that user wants to update
  const todo = req.todo;
  // simply change the parcel of the todo that user want to update by
  // the task that user has sent in req.body.parcel
  todo.statuse = req.body.statuse;
if(obj.role==="biker"){
  // simply save that updated todo
  todo.save((err, t) => {
    if (err || !t) {
      return res.status(400).json({
        error: "something went wrong while updating",
      });
    }
    // send the updated todo as a json response
    res.json(t);
  });
}//if
else{
  res.json("only biker role can update status of parcel")
}
};

exports.deleteTodo = (req, res) => {
  // take req.todo from getTodoById() middleware and
  // fetch the todo that user wants to delete
  const todo = req.todo;
  // call .remove() method to delete it
  todo.remove((err, task) => {
    if (err || !task) {
      return res.status(400).json({
        error: "something went wrong while deleting the category",
      });
    }
    // send deleted todo and success message as a json response
    res.json({
      task_deleted: task,
      message: "Todo deleted successfully!",
    });
  });
};

