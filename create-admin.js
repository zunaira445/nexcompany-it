/**
 * One-time script to create (or update) an admin account directly in the database.
 *
 * HOW TO RUN:
 *   1. Make sure this file is saved at the ROOT of your project (same folder as package.json)
 *   2. Open a terminal in that folder
 *   3. Run:  node create-admin.js
 *   4. You should see "Admin account ready!" — then delete this file, it's not needed again.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

// Load .env manually so this script doesn't need the "dotenv" package installed
function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    value = value.replace(/^["']|["']$/g, ""); // strip surrounding quotes
    if (!process.env[key]) process.env[key] = value;
  }
}
loadEnv();

const ADMIN_EMAIL = "zunaira@gmail.com";
const ADMIN_PASSWORD = "123QWEqwe";
const ADMIN_NAME = "Zunaira Sahi";

const UserSchema = new mongoose.Schema(
  {
    fullName: String,
    email: { type: String, unique: true, lowercase: true, trim: true },
    phone: String,
    password: { type: String, select: false },
    avatar: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    googleId: String,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI not found in .env — make sure this script is in the project root.");
    process.exit(1);
  }

  console.log("Connecting to database...");
  await mongoose.connect(uri);
  console.log("Connected!");

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

  let user = await User.findOne({ email: ADMIN_EMAIL });

  if (user) {
    user.password = hashedPassword;
    user.role = "admin";
    user.isVerified = true;
    user.fullName = user.fullName || ADMIN_NAME;
    await user.save();
    console.log("✅ Existing account updated to admin:", ADMIN_EMAIL);
  } else {
    user = await User.create({
      fullName: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });
    console.log("✅ New admin account created:", ADMIN_EMAIL);
  }

  console.log("\nAdmin account ready!");
  console.log("Email:   ", ADMIN_EMAIL);
  console.log("Password:", ADMIN_PASSWORD);
  console.log("\nYou can now log in with these credentials, then go to /admin");

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Something went wrong:", err.message);
  process.exit(1);
});