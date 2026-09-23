import { PrismaClient } from '@prisma/client';
import { randomBytes, scryptSync } from 'node:crypto';

const prisma = new PrismaClient();

const indianNames = [
  'Aarav Sharma', 'Vivaan Patel', 'Aditya Singh', 'Vihaan Kumar', 'Arjun Mehta',
  'Sai Verma', 'Reyansh Reddy', 'Ayaan Sharma', 'Krishna Yadav', 'Ishaan Gupta',
  'Shaurya Singh', 'Atharv Kumar', 'Advik Sharma', 'Pranav Patel', 'Aarush Reddy',
  'Veer Sharma', 'Kabir Kumar', 'Rudra Singh', 'Ivaan Patel', 'Saanvi Sharma',
  'Anya Singh', 'Aadhya Kumar', 'Pari Sharma', 'Diya Patel', 'Ananya Reddy',
  'Aarohi Singh', 'Meera Kumar', 'Riya Sharma', 'Ishita Patel', 'Kavya Singh',
  'Sanya Kumar', 'Myra Sharma', 'Anika Patel', 'Presha Singh', 'Vanya Kumar',
  'Zara Sharma', 'Inaya Patel', 'Alia Singh', 'Sana Kumar', 'Hana Sharma'
];

const colleges = [
  'University of Delhi', 'Hindu College', 'Hansraj College', 'Miranda House', 
  'Sri Venkateswara College', 'Shri Ram College of Commerce', 'Lady Shri Ram College for Women',
  'Ramjas College', 'St. Stephen\'s College', 'Kirori Mal College', 'Gargi College',
  'Amity University Noida', 'Jaypee Institute of Information Technology', 'Noida International University',
  'Bennett University', 'Shiv Nadar University Delhi NCR', 'Sharda University',
  'Galgotias University', 'Gautam Buddha University', 'Galgotias College of Engineering and Technology'
];

const localities = ['South Delhi', 'North Delhi', 'Centre Delhi', 'Noida', 'Greater Noida'];

const taskCategories = ['Assignments', 'Presentations', 'Teaching', 'Others'];
const taskFormats = ['In-person', 'Online', 'Either'];

function generatePassword() {
  const salt = randomBytes(16).toString('hex');
  const password = 'password123'; // Default password for mock users
  const passwordHash = `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
  return passwordHash;
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  console.log('Starting seed...');

  // Clean existing data
  await prisma.rating.deleteMany();
  await prisma.message.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.withdrawal.deleteMany();
  await prisma.walletEntry.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data');

  // Create mock users
  const users = [];
  for (let i = 0; i < 35; i++) {
    const name = indianNames[i];
    const username = `@${name.toLowerCase().replace(' ', '.')}`;
    const email = `${name.toLowerCase().replace(' ', '.')}@example.com`;
    const college = getRandomItem(colleges);
    const locality = getRandomItem(localities);
    
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: generatePassword(),
        college,
        locality,
        bio: `I am a student at ${college} interested in helping others with their academic work.`,
        rating: getRandomNumber(30, 50) / 10, // 3.0 to 5.0
        completedTasks: getRandomNumber(0, 15),
        role: i === 0 ? 'ADMIN' : 'STUDENT',
        createdAt: getRandomDate(new Date('2024-01-01'), new Date())
      }
    });
    users.push(user);
    console.log(`Created user: ${username}`);
  }

  console.log(`Created ${users.length} users`);

  // Create mock tasks
  const tasks = [];
  for (let i = 0; i < 25; i++) {
    const requester = getRandomItem(users);
    const provider = getRandomItem(users.filter(u => u.id !== requester.id));
    const statusOptions = ['OPEN', 'OFFER_RECEIVED', 'ACTIVE', 'AWAITING_CONFIRMATION', 'COMPLETED'];
    const status = getRandomItem(statusOptions);
    
    const deadline = getRandomDate(new Date(), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
    
    const task = await prisma.task.create({
      data: {
        title: `Help with ${getRandomItem(['assignment', 'project', 'presentation', 'research'])} for ${getRandomItem(['Mathematics', 'Physics', 'Computer Science', 'Economics', 'English'])}`,
        category: getRandomItem(taskCategories),
        description: `I need assistance with a ${getRandomItem(['semester project', 'weekly assignment', 'final presentation', 'research paper'])}. The task requires ${getRandomItem(['research', 'writing', 'coding', 'analysis'])} skills and should be completed by the deadline.`,
        locality: requester.locality || 'Noida',
        college: requester.college || undefined,
        deadline,
        budget: getRandomNumber(500, 5000),
        format: getRandomItem(taskFormats),
        status: status as any,
        requesterId: requester.id,
        providerId: status !== 'OPEN' ? provider.id : null,
        completedAt: status === 'COMPLETED' ? getRandomDate(new Date(), new Date()) : null
      }
    });
    tasks.push(task);
    console.log(`Created task: ${task.title.substring(0, 30)}...`);
  }

  console.log(`Created ${tasks.length} tasks`);

  // Create transactions for tasks that are not OPEN
  for (const task of tasks) {
    if (task.status !== 'OPEN') {
      await prisma.transaction.create({
        data: {
          taskId: task.id,
          amount: task.budget,
          status: task.status === 'COMPLETED' ? 'COMPLETED' : 'PAYMENT_CONFIRMED'
        }
      });
    }
  }

  // Create offers for OPEN tasks
  for (const task of tasks.filter(t => t.status === 'OPEN')) {
    const providers = users.filter(u => u.id !== task.requesterId).slice(0, 3);
    for (const provider of providers) {
      await prisma.offer.create({
        data: {
          taskId: task.id,
          providerId: provider.id,
          amount: getRandomNumber(task.budget - 500, task.budget + 500),
          eta: `${getRandomNumber(1, 7)} days`,
          message: `I can help you with this task. I have experience in this area and can deliver quality work within the timeframe.`
        }
      });
    }
  }

  // Create messages for active tasks
  for (const task of tasks.filter(t => t.status === 'ACTIVE' || t.status === 'AWAITING_CONFIRMATION')) {
    const messages = [
      'Hi, I have started working on your task. Let me know if you have any specific requirements.',
      'Thanks for assigning me this task. I will update you on the progress regularly.',
      'I have completed the initial research and will start working on the main content now.',
      'Could you please provide some additional details about the requirements?',
      'I am making good progress and expect to complete it before the deadline.'
    ];
    
    for (let i = 0; i < getRandomNumber(2, 5); i++) {
      const sender = i % 2 === 0 ? task.providerId : task.requesterId;
      if (sender) {
        await prisma.message.create({
          data: {
            taskId: task.id,
            senderId: sender,
            body: messages[i % messages.length]
          }
        });
      }
    }
  }

  // Create wallet entries for completed tasks
  for (const task of tasks.filter(t => t.status === 'COMPLETED' && t.providerId)) {
    await prisma.walletEntry.create({
      data: {
        userId: task.providerId!,
        amount: task.budget,
        status: 'AVAILABLE',
        reason: `Completed task ${task.id}`
      }
    });
  }

  // Create some withdrawals
  for (const user of users.slice(0, 10)) {
    const walletEntries = await prisma.walletEntry.findMany({
      where: { userId: user.id, amount: { gt: 0 } }
    });
    
    if (walletEntries.length > 0) {
      const totalBalance = walletEntries.reduce((sum, entry) => sum + entry.amount, 0);
      if (totalBalance >= 1000) {
        const withdrawalAmount = getRandomNumber(500, Math.min(totalBalance, 2000));
        await prisma.withdrawal.create({
          data: {
            userId: user.id,
            amount: withdrawalAmount,
            method: getRandomItem(['UPI', 'Bank account']),
            destination: getRandomItem(['user@upi', 'user@bank', 'account@details']),
            status: getRandomItem(['PENDING', 'PAID', 'PAID']) as any
          }
        });
      }
    }
  }

  // Create ratings for completed tasks
  for (const task of tasks.filter(t => t.status === 'COMPLETED' && t.providerId && t.requesterId)) {
    await prisma.rating.create({
      data: {
        taskId: task.id,
        authorId: task.requesterId,
        recipientId: task.providerId!,
        score: getRandomNumber(4, 5),
        review: getRandomItem([
          'Excellent work! Delivered on time and exceeded expectations.',
          'Great quality and communication. Would work with again.',
          'Very professional and knowledgeable. Highly recommended.',
          'Good work overall. Minor revisions needed but satisfied.',
          'Outstanding effort and attention to detail.'
        ]) || undefined
      }
    });
  }

  // Create notifications
  for (const user of users) {
    const notificationTypes = [
      { title: 'New task posted', body: 'A new task matching your interests has been posted.', category: 'Task' },
      { title: 'Offer received', body: 'Someone has sent an offer for your task.', category: 'Task' },
      { title: 'Task completed', body: 'Your task has been marked as completed.', category: 'Task' },
      { title: 'Payment received', body: 'You have received payment for a completed task.', category: 'Wallet' },
      { title: 'New rating', body: 'You received a new rating from a task.', category: 'Rating' }
    ];
    
    for (let i = 0; i < getRandomNumber(2, 5); i++) {
      const notification = getRandomItem(notificationTypes);
      await prisma.notification.create({
        data: {
          userId: user.id,
          ...notification,
          unread: Math.random() > 0.5
        }
      });
    }
  }

  // Create some discount codes
  await prisma.discountCode.createMany({
    data: [
      { code: 'CAMPUS10', discountPercent: 10, maxUses: 100, currentUses: 15, isActive: true },
      { code: 'WELCOME20', discountPercent: 20, maxUses: 50, currentUses: 8, isActive: true },
      { code: 'STUDENT15', discountPercent: 15, maxUses: 75, currentUses: 22, isActive: true },
      { code: 'FLASH25', discountPercent: 25, maxUses: 30, currentUses: 5, isActive: true }
    ]
  });

  console.log('Seed completed successfully!');
  console.log('Created:');
  console.log(`- ${users.length} users`);
  console.log(`- ${tasks.length} tasks`);
  console.log('- Discount codes');
  console.log('- Messages, ratings, notifications, wallet entries, and withdrawals');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });