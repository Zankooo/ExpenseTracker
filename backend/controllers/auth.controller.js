import { AuthService } from "../services/auth.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";

const authRouter = Router();

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}

authRouter.post("/register", async function register(request, response) {
  //Destructuring
  // to je isto kot bi napisal:
  // const username = req.body.username
  // const password = req.body.password
  // ...
  const { username, email, password } = request.body;

  // ce vseh parametrov nimamo potem
  if (!username | !email | !password) {
    response.status(400).json({
      message: "Nekaj manjka!",
    });
    return;
  }

  const existingUser = await AuthService.findOneByEmail(email);

  if (existingUser) {
    response.status(400).json({
      message: "Uporabnik že obstaja",
    });
    return;
  }

  const hashedPassword = hashPassword(password);
  const user = await AuthService.createUser(username, email, hashedPassword);
  const token = generateToken(user.id);

  response.status(200).json({
    message: "Registracija uspešna!",
    user: { ...user, token },
  });
});

authRouter.post("/login", async function login(request, response) {
  const { email, password } = request.body;

  // ce vseh parametrov nimamo potem
  if (!email | !password) {
    response.status(400).json({
      message: "Nekaj manjka!",
    });
    return;
  }
  const existingUser = await AuthService.findOneByEmail(email);

  //ali je ta spremenljivka undefined ali null
  if (!existingUser) {
    response.status(400).json({
      message: "Uporabnik s tem emailom ne obstaja!",
    });
    return;
  }

  const isCorrectPassword = await bcrypt.compare(
    password,
    existingUser.password
  );
  console.log("izpisemo; ", isCorrectPassword);
  if (!isCorrectPassword) {
    response.status(400).json({
      message: "Napačno geslo!",
    });
    return;
  }

  const token = generateToken(existingUser.id);

  response.status(200).json({
    message: "Prijava uspešna!",
    user: { ...existingUser, token },
  });
});

authRouter.get("/me", authMiddleWare, async function me(request, response) {
  const id = request.user;
  console.log(id);

  const user = await AuthService.findOneById(id);

  response.status(200).json({
    user: user,
  });
});

export default authRouter;
