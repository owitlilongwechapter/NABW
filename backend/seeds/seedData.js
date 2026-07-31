const mongoose = require('mongoose');
const Project = require('../models/Project');
const Event = require('../models/Event');
const Testimonial = require('../models/Testimonial');
const ImpactStat = require('../models/ImpactStat');
const News = require('../models/News');
const Partner = require('../models/Partner');
const FAQ = require('../models/FAQ');
const StrategicPlan = require('../models/StrategicPlan');
const About = require('../models/About');

const seedData = async () => {
  try {
    // Check if data already exists
    const projectCount = await Project.countDocuments();
    if (projectCount > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }

    console.log('Seeding database with sample data...');

    // --- About ---
    const about = await About.create({
      organizationName: 'National Association of Business Women (NABW)',
      mission: 'To empower and support business women across the nation through advocacy, networking, mentorship, and capacity-building initiatives that foster economic growth and social transformation.',
      vision: 'A nation where every business woman has equal access to opportunities, resources, and networks to thrive and lead sustainable enterprises.',
      objectives: [
        'Provide mentorship and leadership development programs for women entrepreneurs',
        'Advocate for policies that support women-owned businesses',
        'Create networking opportunities and business partnerships',
        'Offer training in financial literacy, digital marketing, and business management',
        'Support women in accessing funding and investment opportunities',
      ],
      history: 'Founded in 2010, the National Association of Business Women (NABW) has grown from a small grassroots initiative to a leading national organization with chapters in over 20 cities. Over the past decade, we have empowered thousands of women entrepreneurs through our comprehensive programs and unwavering advocacy for gender-inclusive economic policies.',
      coreValues: [
        {
          title: 'Empowerment',
          description: 'We empower women to become confident leaders and successful entrepreneurs.',
          icon: 'empowerment',
        },
        {
          title: 'Integrity',
          description: 'We operate with transparency, honesty, and ethical standards in all our endeavors.',
          icon: 'integrity',
        },
        {
          title: 'Inclusivity',
          description: 'We welcome and support women from all backgrounds and communities.',
          icon: 'inclusivity',
        },
        {
          title: 'Collaboration',
          description: 'We believe in the power of collective action and strategic partnerships.',
          icon: 'collaboration',
        },
        {
          title: 'Sustainability',
          description: 'We promote sustainable business practices and long-term community impact.',
          icon: 'sustainability',
        },
      ],
      leadership: [
        {
          name: 'Dr. Sarah Mwale',
          position: 'National President',
          bio: 'Dr. Mwale is a seasoned entrepreneur and business consultant with over 15 years of experience in business development and women\'s empowerment. She holds a PhD in Business Administration and has led NABW since 2018.',
          image: 'https://images.unsplash.com/photo-1573496359048-32893a1a425f?w=400&h=400&fit=crop&auto=format',
        },
        {
          name: 'Linda Banda',
          position: 'Vice President',
          bio: 'Linda is a successful tech entrepreneur and founder of two startups. She brings expertise in digital innovation and has been instrumental in launching NABW\'s digital transformation initiatives.',
          image: 'https://images.unsplash.com/photo-1580894895372-3c1f7c89c002?w=400&h=400&fit=crop&auto=format',
        },
        {
          name: 'Grace Chikwawa',
          position: 'Treasurer',
          bio: 'Grace is a certified accountant with extensive experience in financial management for non-profits. She oversees NABW\'s financial operations and fundraising efforts.',
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&auto=format',
        },
      ],
      governance: 'NABW operates under a democratic governance structure with a National Executive Committee elected every three years. The organization is governed by a Constitution that ensures transparency, accountability, and inclusive representation across all regions and sectors.',
      strategicPriorities: [
        'Economic Empowerment and Financial Inclusion',
        'Leadership Development and Mentorship',
        'Policy Advocacy and Gender Equality',
        'Digital Innovation and Technology Access',
        'Sustainable Development and Climate Resilience',
      ],
      isPublished: true,
    });

    // --- Partners ---
    const partners = await Partner.create([
      {
        name: 'UN Women',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/UN_Women_logo.svg/200px-UN_Women_logo.svg.png',
        website: 'https://www.unwomen.org',
        description: 'UN Women is the United Nations entity dedicated to gender equality and the empowerment of women.',
        type: 'partner',
        isPublished: true,
      },
      {
        name: 'World Bank',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_black_camera_icon_with_transparent_background.svg/200px-A_black_camera_icon_with_transparent_background.svg.png',
        website: 'https://www.worldbank.org',
        description: 'The World Bank Group is an international financial institution that provides loans and grants to developing countries.',
        type: 'partner',
        isPublished: true,
      },
      {
        name: 'Google',
        logo: 'https://www.google.com/favicon.ico',
        website: 'https://www.google.com',
        description: 'Google\'s commitment to supporting women entrepreneurs through technology and resources.',
        type: 'sponsor',
        isPublished: true,
      },
      {
        name: 'Mastercard Foundation',
        logo: 'https://mastercardfdn.org/favicon.ico',
        website: 'https://mastercardfdn.org',
        description: 'The Mastercard Foundation works to advance youth learning and financial inclusion across Africa.',
        type: 'partner',
        isPublished: true,
      },
      {
        name: 'African Development Bank',
        logo: '://www.afdb.org/favicon.ico',
        website: 'https://www.afdb.org',
        description: 'The African Development Bank Group is a multilateral development bank that supports economic development and social progress in Africa.',
        type: 'collaborator',
        isPublished: true,
      },
    ]);

    // --- Projects ---
    const projects = await Project.create([
      {
        title: 'Women in Tech Initiative',
        slug: 'women-in-tech-initiative',
        shortDescription: 'Empowering women in technology through coding bootcamps, mentorship, and career placement programs.',
        fullDescription: 'The Women in Tech Initiative is a comprehensive program designed to bridge the gender gap in the technology sector. Through intensive coding bootcamps, one-on-one mentorship with industry professionals, and direct career placement support, this initiative has helped over 500 women launch successful careers in tech. The program covers full-stack web development, mobile app development, data science, and cybersecurity fundamentals.',
        objectives: [
          'Train 500 women in coding and software development',
          'Achieve 80% job placement rate within 6 months of graduation',
          'Partner with 50+ tech companies for internships and jobs',
          'Create a sustainable alumni network for ongoing support',
        ],
        activities: [
          '12-week intensive coding bootcamp',
          'Weekly mentorship sessions with tech professionals',
          'Career fairs and networking events',
          'Portfolio development workshops',
          'Interview preparation and resume building',
        ],
        beneficiaries: [
          'Women aged 18-35 with basic computer literacy',
          'University students in STEM fields',
          'Career changers seeking tech opportunities',
        ],
        expectedResults: [
          '500+ women trained in technology skills',
          '400+ job placements in tech companies',
          '50+ tech company partnerships established',
          '20+ alumni-led startups launched',
        ],
        achievedResults: [
          '350 women trained in the first cohort',
          '280 job placements achieved',
          '35 tech company partnerships secured',
          '12 alumni-led startups launched',
        ],
        location: 'Lilongwe, Malawi',
        startDate: new Date('2023-01-15'),
        endDate: new Date('2024-12-31'),
        duration: '24 months',
        status: 'ongoing',
        featuredImage: 'https://images.unsplash.com/photo-1571019613454-1cb2d99b2d8a?w=800&h=500&fit=crop&auto=format',
        gallery: [
          'https://images.unsplash.com/photo-1571019613454-1cb2d99b2d8a?w=800&h=500&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1581091012184-9c9c4c5b3b3b?w=800&h=500&fit=crop&auto=format',
        ],
        partners: [partners[0]._id, partners[2]._id],
        isFeatured: true,
        isPublished: true,
      },
      {
        title: 'Rural Women Agricultural Empowerment',
        slug: 'rural-women-agricultural-empowerment',
        shortDescription: 'Supporting rural women farmers with modern agricultural techniques, market access, and financial services.',
        fullDescription: 'This project focuses on empowering rural women farmers by providing them with modern agricultural techniques, access to quality seeds and fertilizers, and direct market linkages. Through partnerships with agricultural cooperatives and financial institutions, we have helped over 2,000 women increase their yields by 40% and access premium markets for their produce.',
        objectives: [
          'Train 2,000 rural women in modern farming techniques',
          'Increase average yield by 40% within 18 months',
          'Establish 15 farmer cooperatives for collective marketing',
          'Provide access to microfinance for agricultural inputs',
        ],
        activities: [
          'Monthly agricultural training workshops',
          'Distribution of improved seed varieties',
          'Formation of farmer cooperatives',
          'Market linkage facilitation',
          'Financial literacy training',
        ],
        beneficiaries: [
          'Rural women smallholder farmers',
          'Women-led agricultural cooperatives',
          'Local agricultural communities',
        ],
        expectedResults: [
          '2,000 women trained in modern agriculture',
          '40% increase in average yield',
          '15 cooperatives established for collective marketing',
          '500 women accessing microfinance',
        ],
        achievedResults: [
          '1,800 women trained so far',
          '38% average yield increase achieved',
          '12 cooperatives established',
          '450 women accessing microfinance',
        ],
        location: 'Mzimba, Malawi',
        startDate: new Date('2023-03-01'),
        endDate: new Date('2025-02-28'),
        duration: '24 months',
        status: 'ongoing',
        featuredImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop&auto=format',
        gallery: [
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1562686737-42e99a7c3e6e?w=800&h=500&fit=crop&auto=format',
        ],
        partners: [partners[0]._id, partners[1]._id, partners[3]._id],
        isFeatured: true,
        isPublished: true,
      },
      {
        title: 'Financial Literacy for Women Entrepreneurs',
        slug: 'financial-literacy-for-women-entrepreneurs',
        shortDescription: 'Comprehensive financial literacy training covering budgeting, savings, credit, and investment strategies for women entrepreneurs.',
        fullDescription: 'This project provides comprehensive financial literacy training to women entrepreneurs, covering essential topics such as budgeting, savings strategies, credit management, investment basics, and financial planning. Through interactive workshops and one-on-one financial counseling, participants gain the knowledge and confidence to manage their business finances effectively and make informed investment decisions.',
        objectives: [
          'Train 1,000 women entrepreneurs in financial literacy',
          'Achieve 70% improvement in participants\' financial management skills',
          'Facilitate access to $500,000 in business loans and grants',
          'Establish 10 savings groups with collective savings of $100,000',
        ],
        activities: [
          'Monthly financial literacy workshops',
          'One-on-one financial counseling sessions',
          'Savings group formation and management',
          'Credit and loan application assistance',
          'Investment and wealth building seminars',
        ],
        beneficiaries: [
          'Women entrepreneurs in urban and peri-urban areas',
          'Small business owners seeking financial management skills',
          'Women-led micro-enterprises',
        ],
        expectedResults: [
          '1,000 women trained in financial literacy',
          '70% improvement in financial management skills',
          '$500,000 in business loans and grants accessed',
          '10 savings groups with $100,000 collective savings',
        ],
        achievedResults: [
          '800 women trained so far',
          '65% improvement in financial management skills',
          '$350,000 in business loans and grants accessed',
          '8 savings groups with $80,000 collective savings',
        ],
        location: 'Blantyre, Malawi',
        startDate: new Date('2023-06-01'),
        endDate: new Date('2024-12-31'),
        duration: '18 months',
        status: 'ongoing',
        featuredImage: 'https://images.unsplash.com/photo-1579621209328-ebe7bd6d0b8b?w=800&h=500&fit=crop&auto=format',
        gallery: [
          'https://images.unsplash.com/photo-1579621209328-ebe7bd6d0b8b?w=800&h=500&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1579621209328-ebe7bd6d0b8b?w=800&h=500&fit=crop&auto=format',
        ],
        partners: [partners[3]._id, partners[4]._id],
        isFeatured: false,
        isPublished: true,
      },
      {
        title: 'Women\'s Leadership Development Program',
        slug: 'womens-leadership-development-program',
        shortDescription: 'A comprehensive leadership development program designed to build leadership skills and confidence in women across all sectors.',
        fullDescription: 'This program is designed to build leadership skills and confidence in women across all sectors. Through a combination of workshops, coaching, peer learning circles, and practical leadership experiences, participants develop the skills and mindset needed to lead effectively in their organizations and communities. The program covers topics such as emotional intelligence, strategic thinking, public speaking, conflict resolution, and change management.',
        objectives: [
          'Train 500 women in leadership development',
          'Achieve 90% participant satisfaction rate',
          'Place 100 women in leadership positions within 12 months',
          'Create a network of 500 certified women leaders',
        ],
        activities: [
          '6-month leadership development curriculum',
          'Monthly leadership workshops',
          'One-on-one executive coaching sessions',
          'Peer learning circles',
          'Leadership practicum projects',
        ],
        beneficiaries: [
          'Women in mid to senior-level positions',
          'Emerging women leaders in various sectors',
          'Women seeking career advancement',
        ],
        expectedResults: [
          '500 women trained in leadership development',
          '90% participant satisfaction rate',
          '100 women placed in leadership positions',
          'Network of 500 certified women leaders',
        ],
        achievedResults: [
          '400 women trained so far',
          '88% participant satisfaction rate',
          '85 women placed in leadership positions',
          '350 certified women leaders in network',
        ],
        location: 'Lilongwe, Malawi',
        startDate: new Date('2023-09-01'),
        endDate: new Date('2025-03-31'),
        duration: '18 months',
        status: 'ongoing',
        featuredImage: 'https://images.unsplash.com/photo-1551836022-d5ca385ac2e6?w=800&h=500&fit=crop&auto=format',
        gallery: [
          'https://images.unsplash.com/photo-1551836022-d5ca385ac2e6?w=800&h=500&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1551836022-d5ca385ac2e6?w=800&h=500&fit=crop&auto=format',
        ],
        partners: [partners[0]._id, partners[4]._id],
        isFeatured: true,
        isPublished: true,
      },
    ]);

    // --- Events ---
    const events = await Event.create([
      {
        title: 'Annual Women\'s Business Summit 2024',
        slug: 'annual-womens-business-summit-2024',
        description: 'Join us for the premier business summit for women entrepreneurs in Malawi. This year\'s theme is "Breaking Barriers: Women Leading Change". The summit features keynote speakers, panel discussions, networking sessions, and workshops on business growth, leadership, and innovation.',
        shortDescription: 'The premier business summit for women entrepreneurs featuring keynotes, panels, and networking.',
        date: new Date('2024-11-15T09:00:00'),
        endDate: new Date('2024-11-16T17:00:00'),
        time: '09:00 AM - 05:00 PM',
        venue: 'Bingu International Convention Centre',
        address: 'Lilongwe, Malawi',
        featuredImage: 'https://images.unsplash.com/photo-1540575465191-1a4f56c63104?w=800&h=500&fit=crop&auto=format',
        gallery: [
          'https://images.unsplash.com/photo-1540575465191-1a4f56c63104?w=800&h=500&fit=crop&auto=format',
        ],
        registrationLink: 'https://nabw.org/summit-2024/register',
        registrationOpen: true,
        capacity: 500,
        isPast: false,
        isPublished: true,
        summary: 'The Annual Women\'s Business Summit brings together over 500 women entrepreneurs, business leaders, and policymakers for two days of inspiring talks, practical workshops, and valuable networking opportunities.',
      },
      {
        title: 'Digital Marketing Masterclass',
        slug: 'digital-marketing-masterclass',
        description: 'A hands-on masterclass on digital marketing strategies for women entrepreneurs. Learn about social media marketing, content creation, SEO, email marketing, and e-commerce strategies from industry experts. This interactive workshop includes practical exercises and a take-home marketing plan template.',
        shortDescription: 'Hands-on masterclass on digital marketing strategies for women entrepreneurs.',
        date: new Date('2024-10-05T10:00:00'),
        endDate: new Date('2024-10-05T16:00:00'),
        time: '10:00 AM - 04:00 PM',
        venue: 'NABW Training Center',
        address: 'Area 3, Lilongwe, Malawi',
        featuredImage: 'https://images.unsplash.com/photo-1551288040-b9141107ba97?w=800&h=500&fit=crop&auto=format',
        gallery: [
          'https://images.unsplash.com/photo-1551288040-b9141107ba97?w=800&h=500&fit=crop&auto=format',
        ],
        registrationLink: 'https://nabw.org/digital-marketing/register',
        registrationOpen: true,
        capacity: 80,
        isPast: false,
        isPublished: true,
        summary: 'Learn essential digital marketing skills from industry experts in this interactive one-day workshop.',
      },
      {
        title: 'Financial Literacy Workshop',
        slug: 'financial-literacy-workshop',
        description: 'A comprehensive workshop on financial literacy for women entrepreneurs. Topics include budgeting, savings strategies, credit management, investment basics, and accessing business funding. Led by certified financial advisors with experience in women\'s economic empowerment.',
        shortDescription: 'Comprehensive financial literacy workshop covering budgeting, savings, and investment basics.',
        date: new Date('2024-09-20T09:00:00'),
        endDate: new Date('2024-09-20T15:00:00'),
        time: '09:00 AM - 03:00 PM',
        venue: 'Blantyre Cultural Centre',
        address: 'Blantyre, Malawi',
        featuredImage: 'https://images.unsplash.com/photo-1579621209328-ebe7bd6d0b8b?w=800&h=500&fit=crop&auto=format',
        gallery: [
          'https://images.unsplash.com/photo-1579621209328-ebe7bd6d0b8b?w=800&h=500&fit=crop&auto=format',
        ],
        registrationLink: 'https://nabw.org/financial-literacy/register',
        registrationOpen: false,
        capacity: 100,
        isPast: true,
        isPublished: true,
        summary: 'A comprehensive one-day workshop on financial literacy for women entrepreneurs.',
      },
    ]);

    // --- Testimonials ---
    const testimonials = await Testimonial.create([
      {
        name: 'Chisomo Mwale',
        title: 'Founder, Tech Solutions Ltd',
        organization: 'Tech Solutions Ltd',
        content: 'NABW\'s Women in Tech Initiative completely transformed my career. Before joining the program, I was working in a clerical job with no technical skills. After the 12-week bootcamp and mentorship program, I was able to secure a position as a junior developer at a leading tech company. My salary tripled, and I now have the confidence to pursue my dream of starting my own tech company.',
        image: 'https://images.unsplash.com/photo-1573496359048-32893a1a425f?w=400&h=400&fit=crop&auto=format',
        rating: 5,
        isPublished: true,
      },
      {
        name: 'Esther Banda',
        title: 'Owner, Banda Farms',
        organization: 'Banda Farms',
        content: 'The Rural Women Agricultural Empowerment project taught me modern farming techniques that increased my maize yield by 50%. Through the cooperative they helped establish, I now have direct access to markets and can sell my produce at better prices. My income has doubled, and I can now send my children to school and invest in my farm.',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&auto=format',
        rating: 5,
        isPublished: true,
      },
      {
        name: 'Linda Phiri',
        title: 'CEO, Phiri Enterprises',
        organization: 'Phiri Enterprises',
        content: 'The Financial Literacy for Women Entrepreneurs program gave me the tools and knowledge to manage my business finances properly. I learned how to create a budget, track expenses, and access funding. Within a year of completing the program, I was able to expand my business from a small shop to a chain of three stores. I highly recommend NABW to any woman entrepreneur.',
        image: 'https://images.unsplash.com/photo-1580894895372-3c1f7c89c002?w=400&h=400&fit=crop&auto=format',
        rating: 5,
        isPublished: true,
      },
      {
        name: 'Grace Moyo',
        title: 'Program Manager',
        organization: 'Community Development NGO',
        content: 'As a participant in the Women\'s Leadership Development Program, I gained the confidence and skills to take on leadership roles in my community. The coaching sessions and peer learning circles were invaluable. I was recently promoted to Program Manager at my organization, and I credit much of my success to the training I received from NABW.',
        image: 'https://images.unsplash.com/photo-1551836022-d5ca385ac2e6?w=400&h=400&fit=crop&auto=format',
        rating: 4,
        isPublished: true,
      },
    ]);

    // --- Impact Stats ---
    const impactStats = await ImpactStat.create([
      {
        title: 'Women Empowered',
        value: '5,000+',
        description: 'Women trained and empowered through our programs across all sectors',
        icon: 'empowerment',
        category: 'Community Impact',
        isPublished: true,
      },
      {
        title: 'Businesses Supported',
        value: '1,200+',
        description: 'Women-owned businesses supported with resources, training, and mentorship',
        icon: 'business',
        category: 'Economic Impact',
        isPublished: true,
      },
      {
        title: 'Jobs Created',
        value: '3,500+',
        description: 'Direct and indirect jobs created through our economic empowerment programs',
        icon: 'jobs',
        category: 'Economic Impact',
        isPublished: true,
      },
      {
        title: 'Training Hours',
        value: '50,000+',
        description: 'Hours of training delivered in business, technology, and leadership skills',
        icon: 'training',
        category: 'Education',
        isPublished: true,
      },
      {
        title: 'Chapters',
        value: '20+',
        description: 'Active chapters across the nation fostering local community engagement',
        icon: 'chapters',
        category: 'Organization',
        isPublished: true,
      },
      {
        title: 'Partners',
        value: '50+',
        description: 'Strategic partnerships with organizations advancing women\'s economic empowerment',
        icon: 'partners',
        category: 'Organization',
        isPublished: true,
      },
    ]);

    // --- News ---
    const news = await News.create([
      {
        title: 'NABW Launches Women in Tech Initiative with $2M Grant from Google',
        slug: 'nabw-launches-women-in-tech-initiative',
        excerpt: 'The National Association of Business Women has partnered with Google to launch a comprehensive technology training program for women entrepreneurs.',
        content: 'Lilongwe, Malawi - The National Association of Business Women (NABW) today announced the launch of its Women in Tech Initiative, a comprehensive program designed to bridge the gender gap in the technology sector. The program is made possible through a $2 million grant from Google.\n\nThe initiative will provide intensive coding bootcamps, mentorship programs, and career placement support to women across the country. The first cohort of 100 participants will begin training in January 2024.\n\n"We are thrilled to partner with Google on this transformative initiative," said Dr. Sarah Mwale, National President of NABW. "Technology is the future, and we want to ensure women are not left behind in this digital revolution."\n\nThe program covers full-stack web development, mobile app development, data science, and cybersecurity fundamentals. Participants will receive hands-on training, one-on-one mentorship with industry professionals, and direct career placement support.\n\nGoogle\'s commitment to supporting women in technology aligns with NABW\'s mission to empower business women across all sectors. The partnership represents a significant step forward in addressing the gender gap in Malawi\'s growing tech industry.',
        featuredImage: 'https://images.unsplash.com/photo-1571019613454-1cb2d99b2d8a?w=800&h=500&fit=crop&auto=format',
        author: 'NABW Communications',
        category: 'Announcements',
        tags: ['technology', 'partnership', 'women in tech', 'grant'],
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date('2024-01-15'),
      },
      {
        title: 'NABW Hosts Successful Financial Literacy Workshop for 100 Women Entrepreneurs',
        slug: 'nabw-financial-literacy-workshop-success',
        excerpt: 'Over 100 women entrepreneurs attended NABW\'s comprehensive financial literacy workshop, gaining essential skills in budgeting, savings, and investment.',
        content: 'Lilongwe, Malawi - The National Association of Business Women successfully hosted its Financial Literacy Workshop yesterday, with over 100 women entrepreneurs in attendance. The one-day event covered essential topics including budgeting, savings strategies, credit management, and investment basics.\n\nParticipants engaged in interactive sessions led by certified financial advisors and left with practical tools and resources to improve their financial management skills. Post-workshop surveys showed a 95% satisfaction rate, with participants reporting increased confidence in managing their business finances.\n\n"This workshop exceeded my expectations," said Linda Banda, a participant and owner of a local catering business. "I now have a clear budget plan for my business and know how to track my expenses effectively."\n\nNABW plans to host similar workshops in other cities throughout the year as part of its ongoing Financial Literacy for Women Entrepreneurs program.',
        featuredImage: 'https://images.unsplash.com/photo-1579621209328-ebe7bd6d0b8b?w=800&h=500&fit=crop&auto=format',
        author: 'NABW Communications',
        category: 'Events',
        tags: ['financial literacy', 'workshop', 'training'],
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date('2024-09-20'),
      },
      {
        title: 'NABW Strategic Plan 2024-2026: Charting the Path Forward for Women\'s Economic Empowerment',
        slug: 'nabw-strategic-plan-2024-2026',
        excerpt: 'NABW unveils its new strategic plan focusing on five key pillars to accelerate women\'s economic empowerment across the nation.',
        content: 'Lilongwe, Malawi - The National Association of Business Women has unveiled its Strategic Plan for 2024-2026, outlining a comprehensive roadmap for advancing women\'s economic empowerment in Malawi.\n\nThe new strategic plan focuses on five key pillars: Economic Empowerment and Financial Inclusion, Leadership Development and Mentorship, Policy Advocacy and Gender Equality, Digital Innovation and Technology Access, and Sustainable Development and Climate Resilience.\n\n"This strategic plan represents our commitment to creating lasting change for women entrepreneurs across the country," said Dr. Sarah Mwale, National President of NABW. "We have set ambitious goals and have the strategies in place to achieve them."\n\nThe plan includes specific targets such as training 10,000 women in business and technology skills, supporting 3,000 women-owned businesses, and advocating for policy changes that support women\'s economic participation.\n\nThe full strategic plan is available for download on the NABW website.',
        featuredImage: 'https://images.unsplash.com/photo-1551836022-d5ca385ac2e6?w=800&h=500&fit=crop&auto=format',
        author: 'Dr. Sarah Mwale',
        category: 'Strategic Plan',
        tags: ['strategic plan', 'leadership', 'policy'],
        isPublished: true,
        isFeatured: false,
        publishedAt: new Date('2024-03-01'),
      },
    ]);

    // --- Strategic Plan ---
    const strategicPlan = await StrategicPlan.create({
      title: 'NABW Strategic Plan 2024-2026: Charting the Path Forward for Women\'s Economic Empowerment',
      description: 'This strategic plan outlines NABW\'s vision, mission, and strategic priorities for the 2024-2026 period. It serves as a roadmap for accelerating women\'s economic empowerment through targeted programs, strategic partnerships, and policy advocacy.',
      longTermGoals: [
        {
          title: 'Train 10,000 Women',
          description: 'Provide business, technology, and leadership training to 10,000 women across all regions by 2026.',
        },
        {
          title: 'Support 3,000 Women-Owned Businesses',
          description: 'Provide direct support to 3,000 women-owned businesses through mentorship, funding access, and market linkages.',
        },
        {
          title: 'Advocate for Policy Change',
          description: 'Advocate for and achieve at least 5 policy changes that support women\'s economic participation by 2026.',
        },
        {
          title: 'Establish 25 New Chapters',
          description: 'Expand NABW\'s reach by establishing 25 new chapters in underserved regions.',
        },
      ],
      strategicPillars: [
        {
          title: 'Economic Empowerment and Financial Inclusion',
          description: 'Provide comprehensive financial literacy training, facilitate access to funding and credit, and create market linkages for women entrepreneurs.',
          icon: 'economic',
        },
        {
          title: 'Leadership Development and Mentorship',
          description: 'Build leadership capacity through structured programs, coaching, and peer learning circles to prepare women for leadership roles.',
          icon: 'leadership',
        },
        {
          title: 'Policy Advocacy and Gender Equality',
          description: 'Advocate for policy reforms that support women\'s economic participation and challenge systemic barriers to gender equality.',
          icon: 'advocacy',
        },
        {
          title: 'Digital Innovation and Technology Access',
          description: 'Bridge the digital gender divide by providing technology training, digital tools, and online platforms for women entrepreneurs.',
          icon: 'digital',
        },
        {
          title: 'Sustainable Development and Climate Resilience',
          description: 'Promote sustainable business practices and build resilience to climate change impacts among women-led enterprises.',
          icon: 'sustainability',
        },
      ],
      implementationFramework: 'The strategic plan will be implemented through a phased approach over three years. Year 1 focuses on foundation building, program expansion, and partnership development. Year 2 emphasizes scaling successful programs and deepening impact. Year 3 concentrates on sustainability, evaluation, and planning for the next strategic cycle. Progress will be monitored through quarterly reviews, annual impact assessments, and stakeholder feedback mechanisms.',
      timeline: {
        startYear: 2024,
        endYear: 2026,
      },
      documents: [
        {
          title: 'NABW Strategic Plan 2024-2026 (PDF)',
          url: '/documents/nabw-strategic-plan-2024-2026.pdf',
          type: 'pdf',
        },
        {
          title: 'Implementation Timeline',
          url: '/documents/nabw-implementation-timeline.xlsx',
          type: 'xls',
        },
      ],
      isPublished: true,
    });

    // --- FAQs ---
    const faqs = await FAQ.create([
      {
        question: 'How do I become a member of NABW?',
        answer: 'Membership is open to all women entrepreneurs and business professionals. You can apply online through our membership portal, attend one of our events, or visit our office. Membership fees vary by tier: Student ($25/year), Individual ($50/year), Business ($100/year), and Corporate ($500/year). All members receive access to our network, events, resources, and mentorship programs.',
        category: 'Membership',
        order: 1,
        isPublished: true,
      },
      {
        question: 'What programs and services does NABW offer?',
        answer: 'NABW offers a wide range of programs including: Women in Tech training, Financial Literacy workshops, Leadership Development programs, Agricultural Empowerment initiatives, networking events, mentorship programs, business training workshops, market access facilitation, and policy advocacy. We also provide resources such as business templates, funding guides, and online courses.',
        category: 'Programs',
        order: 2,
        isPublished: true,
      },
      {
        question: 'Are NABW events open to non-members?',
        answer: 'Many of our events are open to both members and non-members, though members often receive discounted rates or priority registration. Some exclusive member events are only available to NABW members. We encourage non-members to attend our public events to learn more about our work and meet our community.',
        category: 'Events',
        order: 3,
        isPublished: true,
      },
      {
        question: 'How can I volunteer with NABW?',
        answer: 'We welcome volunteers who are passionate about women\'s economic empowerment. Volunteer opportunities include event support, mentoring program participants, contributing professional skills (marketing, IT, finance), serving on committees, and helping with community outreach. To volunteer, please fill out our volunteer interest form on our website or contact us directly.',
        category: 'Volunteering',
        order: 4,
        isPublished: true,
      },
      {
        question: 'How can my organization partner with NABW?',
        answer: 'We welcome partnerships with organizations that share our mission of women\'s economic empowerment. Partnership opportunities include: sponsoring events or programs, providing training or expertise, collaborating on advocacy initiatives, offering internships or job opportunities, and contributing resources or funding. Contact our Partnerships team to discuss collaboration opportunities.',
        category: 'Partnerships',
        order: 5,
        isPublished: true,
      },
      {
        question: 'Does NABW provide funding or grants to individual entrepreneurs?',
        answer: 'NABW does not directly provide grants to individual entrepreneurs, but we facilitate access to funding through our partnerships with financial institutions and development organizations. We also provide training on grant writing and funding applications. Additionally, we connect women entrepreneurs with angel investors, venture capital firms, and microfinance institutions through our network.',
        category: 'Funding',
        order: 6,
        isPublished: true,
      },
      {
        question: 'How can I stay updated on NABW news and events?',
        answer: 'You can stay updated by subscribing to our newsletter, following us on social media (Facebook, Twitter, Instagram, LinkedIn), checking our website regularly, or joining our WhatsApp groups for different regions. We also send SMS updates to members about important events and opportunities.',
        category: 'Communication',
        order: 7,
        isPublished: true,
      },
      {
        question: 'What is NABW\'s refund policy for events and memberships?',
        answer: 'Membership fees are non-refundable. For events, refunds are available if requested at least 48 hours before the event date. No refunds are issued for no-shows or late cancellations. In cases of event cancellation by NABW, full refunds will be provided. Please contact us for special circumstances or extenuating situations.',
        category: 'Policies',
        order: 8,
        isPublished: true,
      },
    ]);

    console.log('Database seeded successfully!');
    console.log(`  - About: 1 document`);
    console.log(`  - Partners: ${partners.length} documents`);
    console.log(`  - Projects: ${projects.length} documents`);
    console.log(`  - Events: ${events.length} documents`);
    console.log(`  - Testimonials: ${testimonials.length} documents`);
    console.log(`  - Impact Stats: ${impactStats.length} documents`);
    console.log(`  - News: ${news.length} documents`);
    console.log(`  - Strategic Plan: 1 document`);
    console.log(`  - FAQs: ${faqs.length} documents`);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    throw error;
  }
};

module.exports = seedData;
