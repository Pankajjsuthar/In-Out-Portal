const express = require('express');
const router = express.Router();
const path = require("path");
const User = require('../models/user.js');
const Ticket = require('../models/ticket.js');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req,res,cb){
        cb(null, "uploads/");
    },
    filename: function (req,file,cb) {
        cb(null, req.body.entryNo + ".png");
    },
});

let upload = multer({storage: storage});

router.post('/register-new-user', upload.single("file"), async (req, res) => {
  const p1 = req.body.password;
  const p2 = req.body.confirmPassword;

  const fileName = req.file.filename;
  const fileURL = path.join(fileName);
  
  // console.log(req.body);
  
  const user = {
    name: req.body.name,
    email: req.body.email,
    entryNo: req.body.entryNo,
    phoneNo: req.body.phoneNo,
    roomNo: req.body.roomNo,
    hostelName: req.body.hostelName,
    password: p1,
    confirmPassword: p2,
    avatar: fileURL
  };
  console.log(user)


  const newUser = new User(user);


  if (p1 != p2) {
    console.log("password error");
    res.status(400).json({ error: "Password do not match" });
  }
  
    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(400).json({error: err.message });
    }
  
});



router.get('/test', (req, res) => res.send('user route testing!'));

async function getUserEmail(id) {
  let user = await User.findById(id);
  return user.email;
}


router.get('/details/:id', (req, res) => {
  User.findById(req.params.id).select("-password")
  .then((resp) => {
    res.status(200).json(resp);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

router.get('/details/:id/history', (req, res) => {
  getUserEmail(req.params.id).then((email) => {
    Ticket.find({email: email}).select("-password")
      .then((resp) => {
        res.status(200).json(resp);
      })
      .catch((err) => {
        res.status(500).send(err);
      })
  });
})


router.post('/post_new_out_ticket', async (req, res) => {
  let body = req.body;
  body.date = new Date().toLocaleDateString();
  body.time = new Date().toLocaleTimeString();
  const new_ticket = new Ticket(body);  
  try {
    const savedTicket = await new_ticket.save();
    console.log(savedTicket._id);
    res.status(200).json(savedTicket);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.post('/post_new_in_ticket', async (req, res) => {
  let body = req.body;
  body.date = new Date().toLocaleDateString();
  body.time = new Date().toLocaleTimeString();
  body.entryType = 'in';
  const new_ticket = new Ticket(body);  
  try {
    const savedTicket = await new_ticket.save();
    console.log(savedTicket._id);
    res.status(200).json(savedTicket);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then((result) => {
      const p2 = result.password;
      if (p2 != req.body.password) {
        res.status(500).send('incorrect password');
      }
      else {
        res.status(200).json(result);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    })

})
router.get('/get_all_tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/user_tickets/:id', async (req, res) => {
  try {
    const tickets = await Ticket.find({email: req.params.id});
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/approve/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status: 'approved' });
    if (!ticket) {
      return res.status(404).send('Ticket not found');
    }
    return res.status(200).json(ticket);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

// reject ticket endpoint 
router.put('/reject/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    if (!ticket) {
      return res.status(404).send('Ticket not found');
    }
    return res.status(200).json(ticket);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

module.exports = router;