const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const {
  body,
  validationResult,
  query,
  param,
  check,
} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Employer = require("./models/Employer");
const Job = require("./models/Job");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("MongoDB connected");
  app.listen(4000, () => {
    console.log("Server is running");
  });
});
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", async (req, res) => {
  const { email, role } = req.query;

  try {
    let query = {};
    if (email) {
      query.email = email.toLowerCase();
    }
    if (role) {
      query.role = role;
    }

    const users = await User.find(query);

    if (users.length === 0) {
      return res
        .status(404)
        .send({ message: "No users found matching the criteria" });
    }

    return res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/users", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .send({ message: "Name, email, password, and role are required" });
  }

  const userExists = await User.findOne({ email: email.toLowerCase() });

  if (userExists) {
    return res.status(400).send({ message: "User already exists" });
  }

  const newUser = new User({ name, email, password, role });

  try {
    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    console.log("User added successfully:", userWithoutPassword);

    return res.status(201).send(userWithoutPassword);
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).send({ message: "Error creating user" });
  }
});



app.patch("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send(user);
  } catch (error) {
    console.error("Error replacing user:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(204).send("user deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.get(
  "/employers",
  [
    query("email").optional().isEmail().withMessage("Must be a valid email"),
    query("role").optional().isString().withMessage("Role must be a string"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { email, role } = req.query;

    try {
      const filter = {
        ...(email && { email: email.toLowerCase() }),
        ...(role && { role }),
      };

      const employers = await Employer.find(filter);

      if (employers.length === 0) {
        return res
          .status(404)
          .send({ message: "No employers found matching the criteria" });
      }

      return res.status(200).send(employers);
    } catch (error) {
      console.error("Error fetching employers:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
);

app.post(
  "/employers",
  [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("companyName")
      .isString()
      .notEmpty()
      .withMessage("Company Name is required"),
    body("companyDetails").isString().optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { name, email, password, companyName, companyDetails } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployer = new Employer({
      name,
      email,
      password: hashedPassword,
      companyName,
      companyDetails,
      createdAt: new Date(),
    });

    try {
      await newEmployer.save();
      return res.status(201).send(newEmployer);
    } catch (error) {
      console.error("Error creating employer:", error);
      return res.status(400).send({ message: "Error creating employer" });
    }
  }
);

app.patch(
  "/employers/:id",
  [
    param("id").isMongoId().withMessage("Invalid employer ID"),
    body("name")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Name must be a string"),
    body("email").optional().isEmail().withMessage("Must be a valid email"),
    body("companyName")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Company Name must be a string"),
    body("companyDetails").optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const employerId = req.params.id;
    const updates = req.body;

    try {
      const employer = await Employer.findByIdAndUpdate(employerId, updates, {
        new: true,
        runValidators: true,
      });

      if (!employer) {
        return res.status(404).send({ message: "Employer not found" });
      }

      return res.status(200).send(employer);
    } catch (error) {
      console.error("Error updating employer:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
);

app.put(
  "/employers/:id",
  [
    param("id").isMongoId().withMessage("Invalid employer ID"),
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password")
      .isLength({ min: 6 })
      .optional()
      .withMessage("Password must be at least 6 characters long"),
    body("companyName")
      .isString()
      .notEmpty()
      .withMessage("Company Name is required"),
    body("companyDetails").isString().optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const employerId = req.params.id;
    const updatedEmployer = req.body;

    if (updatedEmployer.password) {
      updatedEmployer.password = await bcrypt.hash(
        updatedEmployer.password,
        10
      );
    }

    try {
      const employer = await Employer.findByIdAndUpdate(
        employerId,
        updatedEmployer,
        { new: true, runValidators: true }
      );

      if (!employer) {
        return res.status(404).send({ message: "Employer not found" });
      }

      return res.status(200).send(employer);
    } catch (error) {
      console.error("Error replacing employer:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
);

app.delete(
  "/employers/:id",
  [param("id").isMongoId().withMessage("Invalid employer ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const employerId = req.params.id;

    try {
      const employer = await Employer.findByIdAndDelete(employerId);

      if (!employer) {
        return res.status(404).send({ message: "Employer not found" });
      }

      return res.status(204).send("employer deleted successfully");
    } catch (error) {
      console.error("Error deleting employer:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
);

app.get("/jobs", async (req, res) => {
  try {
    const { location, type } = req.query;

    const filter = {};
    if (location) {
      filter.location = location;
    }
    if (type) {
      filter.type = type;
    }

    const jobs = await Job.find(filter).populate("employer");
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// POST - Create a new job
app.post(
  "/jobs",
  [
    check("title").notEmpty().withMessage("Job title is required"),
    check("description").notEmpty().withMessage("Job description is required"),
    check("location").notEmpty().withMessage("Location is required"),
    check("salary").isNumeric().withMessage("Salary must be a number"),
    check("type").notEmpty().withMessage("Job type is required"),
    check("employer")
      .isMongoId()
      .withMessage("Employer ID must be a valid MongoDB ID"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, location, salary, type, employer } = req.body;
      const job = new Job({
        title,
        description,
        location,
        salary,
        type,
        employer,
      });
      await job.save();
      res.status(201).json(job);
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err });
    }
  }
);

app.patch("/jobs/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// PUT - Update an entire job
app.put(
  "/jobs/:id",
  [
    check("title").notEmpty().withMessage("Job title is required"),
    check("description").notEmpty().withMessage("Job description is required"),
    check("location").notEmpty().withMessage("Location is required"),
    check("salary").isNumeric().withMessage("Salary must be a number"),
    check("type").notEmpty().withMessage("Job type is required"),
    check("employer")
      .isMongoId()
      .withMessage("Employer ID must be a valid MongoDB ID"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, location, salary, type, employer } = req.body;
      const updatedJob = await Job.findByIdAndUpdate(
        req.params.id,
        { title, description, location, salary, type, employer },
        { new: true }
      );
      if (!updatedJob) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.status(200).json(updatedJob);
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err });
    }
  }
);

// DELETE - Delete a specific job by ID
app.delete(
  "/jobs/:id",
  [check("id").isMongoId().withMessage("Invalid job ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const job = await Job.findByIdAndDelete(req.params.id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.status(200).json({ message: "Job deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err });
    }
  }
);

// POST - Apply for a job
app.post("/jobs/:id/apply", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { applicants: userId } },
      { new: true, runValidators: true }
    ).populate("applicants");

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

app.post('/user/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err); // Add logging for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login Route
app.post('/user/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT Token
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err); // Add logging for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});




//employer register and login

app.post('/employer/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployer = new Employer({ username, password: hashedPassword });
    await newEmployer.save();
    
    res.status(201).json({ message: 'Employer registered successfully' });
  } catch (err) {
    console.error(err); // Add logging for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login Route
app.post('/employer/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Employer.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT Token
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err); // Add logging for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401).json("no token,authorization denied");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    next();
  });
}

app.post("/dashboard", authenticateToken, (req, res) => {
  res.send(`Welcome, ${req.body.name}!`);
});
