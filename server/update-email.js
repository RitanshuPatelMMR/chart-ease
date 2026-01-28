require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  
  // Update first user
  const result = await mongoose.connection.db.collection('users').updateOne(
    { clerkUserId: 'user_38hIzRbtH2fEqoXJz74F1TZocqh' },
    { $set: { email: 'ritanshupatel88@gmail.com' } }
  );

  console.log('✅ User updated:', result.modifiedCount, 'document(s)');

  // Show updated user
  const user = await mongoose.connection.db.collection('users').findOne(
    { clerkUserId: 'user_38hIzRbtH2fEqoXJz74F1TZocqh' }
  );
  
  console.log('User now:', user.email, '- Role:', user.role);

  process.exit(0);
});
