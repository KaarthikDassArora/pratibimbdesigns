import { PrismaClient } from '@prisma/client';

async function testReview() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testing Review model...');
    console.log('Review model exists:', !!prisma.review);
    
    if (prisma.review) {
      console.log('Review model properties:', Object.keys(prisma.review));
      
      // Try to count reviews
      const count = await prisma.review.count();
      console.log('Total reviews:', count);
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testReview(); 