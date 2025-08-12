import prisma from '../../lib/prisma.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Extract email and password from the request body
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    // Check if a user with this email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password for secure storage
    const hashed = await bcrypt.hash(password, 10);
    // Determine role: admin if matches configured admin email, otherwise user
    const adminEmail = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.toLowerCase() : '';
    const role = adminEmail === email.toLowerCase() ? 'admin' : 'user';

    // Create the new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        role,
      },
    });

    return res.status(201).json({ id: user.id, email: user.email, role: user.role });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error creating user' });
  }
}
