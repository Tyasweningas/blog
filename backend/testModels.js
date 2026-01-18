// testModels.js
require('dotenv').config();               // memuat .env
const mongoose = require('mongoose');

// Import model‑model
const User = require('./src/models/user.model');
const Post = require('./src/models/post.model');
const Comment = require('./src/models/comment.model');

async function run() {
  try {
    // **Tanpa opsi usang** – Mongoose 7+ sudah meng‑enable mereka secara default
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1️⃣ Buat user contoh
    const user = await User.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'hashedPassword123', // nanti akan di‑hash dengan bcrypt
    });
    console.log('Created user:', user._id);

    // 2️⃣ Buat post contoh (pakai field description yang baru)
    const post = await Post.create({
      title: 'Contoh Post',
      description: 'Ringkasan singkat untuk home page',
      content: 'Isi lengkap postingan ini.',
      category: 'General',
      author: user._id,
    });
    console.log('Created post:', post._id);

    // 3️⃣ Buat komentar contoh
    const comment = await Comment.create({
      content: 'Komentar pertama!',
      post: post._id,
      author: user._id,
    });
    console.log('Created comment:', comment._id);

    // Tampilkan data dengan populate untuk cek relasi
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name email')
      .populate('comments');
    console.log('Populated post:', JSON.stringify(populatedPost, null, 2));

    // Bersihkan (optional) – hapus data yang dibuat
    await Comment.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});
    console.log('✅ Clean‑up done');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
  }
}

run();