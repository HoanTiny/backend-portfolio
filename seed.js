require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Category = require('./models/Category');
const Post = require('./models/Post');
const Profile = require('./models/Profile');
const Skill = require('./models/Skill');
const Service = require('./models/Service');
const Experience = require('./models/Experience');
const Project = require('./models/Project');
const Stat = require('./models/Stat');
const Research = require('./models/Research');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      User.deleteMany({}), Category.deleteMany({}), Post.deleteMany({}),
      Profile.deleteMany({}), Skill.deleteMany({}), Service.deleteMany({}),
      Experience.deleteMany({}), Project.deleteMany({}), Stat.deleteMany({}),
      Research.deleteMany({}),
    ]);

    // ─── Users ─────────────────────────────
    console.log('👤 Creating users...');
    const adminPwd = process.env.SEED_ADMIN_PASSWORD || 'changeme';
    const editorPwd = process.env.SEED_EDITOR_PASSWORD || 'changeme';
    const admin = await User.create({ username: 'admin', email: 'admin@portfolio.com', password: adminPwd, role: 'admin' });
    const editor = await User.create({ username: 'editor', email: 'editor@portfolio.com', password: editorPwd, role: 'editor' });

    // ─── Profile ───────────────────────────
    console.log('🧑 Creating profile...');
    await Profile.create({
      name: 'Hoàn',
      title: 'Junior FullStack Web & App Developer',
      description: 'Tôi xây dựng các ứng dụng web đẹp và chức năng',
      avatar: '',
      cvLink: '#',
      email: 'hoantiny01@gmail.com',
      phone: '+84-968-652-789',
      skype: 'Tiny.dev',
      socialLinks: { github: 'https://github.com', linkedin: 'https://linkedin.com', facebook: 'https://facebook.com', twitter: 'https://twitter.com' },
    });

    // ─── Stats ─────────────────────────────
    console.log('📊 Creating stats...');
    await Stat.create([
      { label: 'Year Experience', value: '2+', icon: 'experience', order: 1 },
      { label: 'Projects Completed', value: '10+', icon: 'projects', order: 2 },
      { label: 'Tech Stacks', value: '8+', icon: 'tech', order: 3 },
      { label: 'GitHub Commits', value: '500+', icon: 'commits', order: 4 },
    ]);

    // ─── Skills ────────────────────────────
    console.log('🛠️  Creating skills...');
    await Skill.create([
      { name: 'React', group: 'Frontend Frameworks', order: 1 },
      { name: 'Next.js', group: 'Frontend Frameworks', order: 2 },
      { name: 'Vue.js', group: 'Frontend Frameworks', order: 3 },
      { name: 'TypeScript', group: 'Frontend Frameworks', order: 4 },
      { name: 'JavaScript', group: 'Frontend Frameworks', order: 5 },
      { name: 'Tailwind CSS', group: 'Styling & UI', order: 1 },
      { name: 'CSS3/SASS', group: 'Styling & UI', order: 2 },
      { name: 'Styled Components', group: 'Styling & UI', order: 3 },
      { name: 'Framer Motion', group: 'Styling & UI', order: 4 },
      { name: 'Git', group: 'Tools & Other', order: 1 },
      { name: 'Webpack', group: 'Tools & Other', order: 2 },
      { name: 'Vite', group: 'Tools & Other', order: 3 },
      { name: 'Figma', group: 'Tools & Other', order: 4 },
      { name: 'Redux', group: 'Tools & Other', order: 5 },
    ]);

    // ─── Services ──────────────────────────
    console.log('💼 Creating services...');
    await Service.create([
      { title: 'Web Development', description: 'Building modern web applications with React, Next.js, TypeScript, and Tailwind CSS to deliver fast, interactive user experiences.', icon: 'code', order: 1 },
      { title: 'UI/UX Implementation', description: 'Translating Figma and design mockups into pixel-perfect, accessible code with clean component architecture and design systems.', icon: 'design', order: 2 },
      { title: 'Responsive Design', description: 'Creating mobile-first, fully responsive layouts that look great on every screen size and work seamlessly across all modern browsers.', icon: 'responsive', order: 3 },
      { title: 'Animation & Interaction', description: 'Crafting smooth animations and micro-interactions using Framer Motion and CSS to enhance user engagement and delight.', icon: 'animation', order: 4 },
    ]);

    // ─── Experience ────────────────────────
    console.log('💼 Creating experiences...');
    await Experience.create([
      { type: 'work', title: 'Frontend Developer', organization: 'FPT Software', location: 'Hanoi, Vietnam', startDate: '2023', endDate: 'Present', description: 'Developing web applications using React and Next.js', order: 1 },
      { type: 'work', title: 'Intern Developer', organization: 'Tech Startup', location: 'Hanoi, Vietnam', startDate: '2022', endDate: '2023', description: 'Built UI components and integrated REST APIs', order: 2 },
      { type: 'education', title: 'Information Technology', organization: 'HAUI', location: 'Hanoi, Vietnam', startDate: '2019', endDate: '2023', description: 'Bachelor of Information Technology', order: 3 },
    ]);

    // ─── Projects ──────────────────────────
    console.log('🚀 Creating projects...');
    await Project.create([
      { name: 'my-portfolio', description: 'Personal portfolio website built with Next.js', techStack: ['Next.js', 'TailwindCSS', 'Framer Motion'], githubUrl: 'https://github.com', date: '04 Feb', featured: true, order: 1 },
      { name: 'npm-tracking', description: 'NPM package download tracker', techStack: ['React', 'Chart.js', 'Node.js'], githubUrl: 'https://github.com', date: '19 Jan', order: 2 },
      { name: 'base-fe', description: 'Frontend boilerplate template', techStack: ['React', 'TypeScript', 'Vite'], githubUrl: 'https://github.com', date: '24 Jun', order: 3 },
      { name: 'Expense-management', description: 'Personal expense tracking app', techStack: ['React', 'Node.js', 'MongoDB'], githubUrl: 'https://github.com', date: '09 Apr', order: 4 },
      { name: 'Quan-ly-chi-tieu', description: 'Vietnamese expense management app', techStack: ['React Native', 'Firebase'], githubUrl: 'https://github.com', date: '04 Apr', order: 5 },
    ]);

    // ─── Research ──────────────────────────
    console.log('🔬 Creating research topics...');
    await Research.create([
      { title: 'Real-Time Video Streaming', description: 'Research on WebRTC and real-time video streaming technologies', date: '2024', order: 1 },
      { title: 'Smart TV App Development', description: 'Exploring Smart TV application development with web technologies', date: '2024', order: 2 },
    ]);

    // ─── Categories & Posts ────────────────
    console.log('📂 Creating categories...');
    const categories = await Category.create([
      { name: 'Technology', description: 'Latest technology trends and tutorials' },
      { name: 'Web Development', description: 'Frontend and backend development articles' },
      { name: 'Design', description: 'UI/UX design principles and tips' },
      { name: 'DevOps', description: 'CI/CD, Docker, Kubernetes and cloud technologies' },
      { name: 'Mobile', description: 'Mobile app development with React Native, Flutter' },
    ]);

    console.log('📝 Creating posts...');
    const posts = await Post.create([
      { title: 'Getting Started with React.js', content: 'React fundamentals including JSX, components, props, state, and hooks.', category: categories[1]._id, tags: ['react', 'javascript'], author: admin._id, status: 'published' },
      { title: 'Building RESTful APIs with Node.js', content: 'MVC architecture, JWT auth, and file uploads with multer.', category: categories[1]._id, tags: ['nodejs', 'express'], author: admin._id, status: 'published' },
      { title: 'Introduction to MongoDB', content: 'NoSQL database with Mongoose ODM for schema-based modeling.', category: categories[0]._id, tags: ['mongodb', 'database'], author: editor._id, status: 'published' },
      { title: 'Modern CSS Grid & Flexbox', content: 'Powerful layout systems for responsive designs.', category: categories[2]._id, tags: ['css', 'design'], author: admin._id, status: 'published' },
      { title: 'Docker for Beginners', content: 'Docker basics: images, containers, Dockerfile, docker-compose.', category: categories[3]._id, tags: ['docker', 'devops'], author: editor._id, status: 'draft' },
      { title: 'React Native Mobile Apps', content: 'Build native mobile apps with React and JavaScript.', category: categories[4]._id, tags: ['react-native', 'mobile'], author: admin._id, status: 'published' },
      { title: 'TypeScript Best Practices', content: 'Interfaces, generics, utility types for better code.', category: categories[0]._id, tags: ['typescript'], author: admin._id, status: 'draft' },
      { title: 'Next.js Full-Stack Framework', content: 'SSR, SSG, API routes, and built-in CSS support.', category: categories[1]._id, tags: ['nextjs', 'react'], author: editor._id, status: 'published' },
    ]);

    console.log('');
    console.log('╔════════════════════════════════════════════════════╗');
    console.log('║             ✅ Seed Data Created!                  ║');
    console.log('╠════════════════════════════════════════════════════╣');
    console.log(`║  Users:        2    │  Profile:      1            ║`);
    console.log(`║  Skills:       14   │  Services:     4            ║`);
    console.log(`║  Experiences:  3    │  Projects:     5            ║`);
    console.log(`║  Stats:        4    │  Research:     2            ║`);
    console.log(`║  Categories:   5    │  Posts:        8            ║`);
    console.log('╠════════════════════════════════════════════════════╣');
    console.log('║  Admin:  admin@portfolio.com / admin123           ║');
    console.log('║  Editor: editor@portfolio.com / editor123         ║');
    console.log('╚════════════════════════════════════════════════════╝');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed Error:', error.message);
    process.exit(1);
  }
};

seedData();
