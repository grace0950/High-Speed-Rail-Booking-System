let express = require("express");
const passport = require("passport");
let router = express.Router();
require("./passport")(passport);
var kafka = require("../kafka/client");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/test", function (req, res, next) {
  res.send("This is a test!");
});

// when receive login msg
// payload = {    account: account,    password: password }
router.post("/login", function (req, res) {
  console.log(req.body);
  passport.authenticate("login", function (err, response) {
    console.log("response:");
    console.log(response);
    if (err) {
      console.log(err);
      res.status(400).send();
    }
    if (response.status === 200) {
      // req.session.previousTime = new Date().getTime();
      // req.session.pageTime = [];
      // req.session.pages = [];
      // req.session.lastPage = "UserHome";
      // req.session.flag = true;
      // req.session.username = response.username;
      // console.log("session initialized. :" + req.session.username);
      // res.status(response.status).send(req.session.username);
      res.status(response.status).send({ message: response.message });
    } else if (response.status === 400) {
      res.status(response.status).send({ message: response.message });
    } else {
      res.status(401).send({ message: "Login Failed" });
    }
  })(req, res);
});

// router.post("/logout", function (req, res) {
//   //console.log(req.session.username);

//   //console.log(req.session);

//   if (req.session.username !== null && req.session.username !== undefined) {
//     let nwTime = new Date().getTime();
//     let prvTime = req.session.previousTime;
//     let timeSpentOnPage = nwTime - prvTime;
//     // req.session.previousTime = nwTime; // user goes anonymous
//     req.session.pages.push(req.session.lastPage);
//     req.session.pageTime.push(timeSpentOnPage);

//     let UserHome = 0;
//     let SignIn = 0;
//     let SignUp = 0;

//     let i = 0;
//     req.session.pages.forEach((page) => {
//       switch (page) {
//         case "UserHome":
//           UserHome += req.session.pageTime[i];
//           i++;
//           break;
//         case "SignIn":
//           SignIn += req.session.pageTime[i];
//           i++;
//           break;
//         case "SignUp":
//           SignUp += req.session.pageTime[i];
//           i++;
//           break;
//         default:
//       }
//     });

//     let tree = {
//       tree: {
//         userId: req.session.username,
//         pages: req.session.pages,
//         pageTime: req.session.pageTime,
//       },
//     };

//     let payload = {
//       tree: {
//         userId: req.session.username,
//         pages: req.session.pages,
//         pageTime: req.session.pageTime,
//       },
//       timePerPage: {
//         userId: req.session.username,
//         UserHome: UserHome,
//         SignIn: SignIn,
//         SignUp: SignUp,
//       },
//     };

//     console.log(" -- Tree -- " + payload.tree);

//     console.log(" -- Time Per Page -- " + payload.timePerPage);

//     winston.info(tree);

//     try {
//       kafka.make_request(
//         "logUserTracingTree_topic",
//         payload,
//         function (err, results) {
//           console.log("in result");
//           console.log(results);

//           if (err) {
//             console.log(err);
//             throw err;
//           } else {
//             if (results.status === 200) {
//               console.log("Added Page array to mongoDB- " + results.data.pages);

//               console.log(
//                 "Added Time per page array to mongoDB- " + results.data.pageTime
//               );

//               req.session.destroy();

//               console.log("Session Destroyed");

//               res.status(200).send();
//               // res.status(results.status).send(results);
//             } else if (results.status === 400) {
//               // res.status(results.status).send({"message": "Fetch unsuccessful"});
//             }
//           }
//         }
//       );
//     } catch (err) {
//       console.log();
//     }
//   } else {
//     console.log("Session does not exist");
//     res.status(400).send();
//   }
// });

router.post("/signup", function (req, res, next) {
  try {
    console.log(req.body);
    kafka.make_request("signup_topic", req.body, function (err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log(err);
        throw err;
      } else {
        if (results.status === 200) {
          //req.session.username = results.username;
          console.log("Received username: " + results.username);
          console.log("Local username: " + req.body.username);
          res.status(results.status).send({ message: "Signup Successful" });
        } else if (results.status === 401) {
          res.status(results.status).send({ message: "User already Exist" });
        } else if (results.status === 400) {
          res.status(results.status).send({ message: "Signup Failed" });
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Signup Failed" });
  }
});

module.exports = router;
