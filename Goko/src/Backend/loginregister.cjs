require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = 3001;
const jwt = require("jsonwebtoken");
app.listen(port, () => {
  console.log("START SERVER");
});

app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.post("/qeydiyyat-register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const date = req.body.date;
  const gender = req.body.gender;

  const chars = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


  if (!username || !email || !password || !date || !gender) {
    res.send({ message: "empty" });
  }  else if (!chars.test(email)) {
    res.send({ message: "required" });
  } 
  
  else {
    const enteredControl = (username, email) => {
      return new Promise((resolve, reject) => {
        const sql =
          "SELECT * FROM goko_users WHERE istifadeci_adi = ? OR email = ?";
        const values = [username, email];
        db.query(sql, values, (error, result) => {
          if (error) {
            reject(error);
            res.send({ message: "errControl" });
          } else {
            if (result.length > 0) {
              resolve(true);
              res.send({ message: "errControl" });
            } else {
              const registerUser = (username,email,password,date,gender) => {
                return new Promise((resolve, reject) => {
            const sql =
              "INSERT INTO goko_users (istifadeci_adi, email, sifre, dogum_tarixi, cinsiyyet) VALUES (?, ?, ?, ?, ?)";
            const values = [username, email, password, date, gender];
//database query from nodejs on mysql 
            db.query(sql, values, (error, result) => {
              if (error) {
                console.log(error);
                reject(error);
                res.send({ message: "tryagain", });
              } else {
                console.log(result);
                resolve(result);
                res.send({ message: "success", email });
              }
            });
          });
        };
       registerUser(username, email, password, date, gender);
      }
     }
   });
  });
 };
    
    enteredControl(username, email);
  }
});

//LOGIN PROCESS
app.post("/daxil-ol-login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.send({ message: "messageWrong" });
  } else {
    try {
      const controlLogin = (username, password) => {
        return new Promise((resolve, reject) => {
          const sql =
            "SELECT * FROM goko_users WHERE istifadeci_adi = ? AND sifre = ?";
          const values = [username, password];
          db.query(sql, values, (error, result) => {
            if (error) {
              reject(error);
            } else {
              if (result.length > 0) {
                resolve(true);
              } else {
                resolve(false);
              }
            }
          });
        });
      };
      
      const isAuthenticated = await controlLogin(username, password);
      
      if (isAuthenticated) {
        const payload = {username: username, password: password};
        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign (payload, secretKey, {expiresIn: '12h'});
        const userHelloMsg = payload.username;

        res.send({ message: "success", token: token, userHelloMsg});
      } else {
        res.send({ message: "wrongpass" });
      }
    } catch (error) {
      console.log(error);
    }
  }
});

app.get('/profile', (req, res) => {
  const token = req.headers.authorization;
  jwt.verify (token, process.env.SECRET_KEY, (error, decoded) => {
    if (error){
      res.send ('error')
    } else if(decoded) {
      res.send ('success')
    }
  })
})

//UPDATE USERNAME
app.put("/profile", (req, res) => {
  const newUsername = req.body.newUsername;
  const sql = "UPDATE `goko_users` SET `istifadeci_adi` = ? WHERE id";
  const values = [newUsername];
  db.query(sql, values, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send({ message: "success" });
    }
  });
});




