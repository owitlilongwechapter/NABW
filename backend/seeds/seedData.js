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

const partnerSeedData = [
  { name: 'Urgent Africa Fund', type: 'partner', isPublished: true },
  { name: 'Christian Aid Malawi', type: 'partner', isPublished: true },
  { name: 'NGO Gender Coordination Network', type: 'partner', isPublished: true },
  { name: 'World University Service of Canada - WUSC', type: 'partner', isPublished: true },
  { name: 'Hivos Peoples Unlimited', type: 'partner', isPublished: true },
  { name: "Graca' Machel Trust - GMT", type: 'partner', isPublished: true },
  { name: 'National Economic Empowerment Fund', type: 'partner', isPublished: true },
  { name: 'British Council', type: 'partner', isPublished: true },
  { name: 'GIZ Malawi', type: 'partner', isPublished: true },
  { name: 'CIC Insurance Limited', type: 'partner', isPublished: true },
  { name: 'Dreams Microfinance', type: 'partner', isPublished: true },
  { name: 'First Capital Bank', type: 'partner', isPublished: true },
  { name: 'Fines Project - Reserve Bank of Malawi', type: 'partner', isPublished: true },
  { name: 'Micro-loan Foundation', type: 'partner', isPublished: true },
  { name: 'For Equality', type: 'partner', isPublished: true },
  { name: 'Mbawemi', type: 'partner', isPublished: true },
  { name: 'Cross Boarder Traders Association', type: 'partner', isPublished: true },
  { name: 'Malawi Union of SMEs', type: 'partner', isPublished: true },
  { name: 'SMEDI', type: 'partner', isPublished: true },
  { name: 'CISONECC', type: 'partner', isPublished: true },
  { name: 'Line Ministries (Trade, Gender, Energy, Agriculture)', type: 'partner', isPublished: true },
  { name: 'Malawi Bureau of Standard', type: 'partner', isPublished: true },
];

const deprecatedPartnerNames = [
  'WUSC',
  'Graca’ Machel Trust',
  'Fines Project / Reserve Bank of Malawi',
  'Cross Border Traders Association',
  'Ministry of Trade',
  'Ministry of Gender',
  'Ministry of Energy',
  'Ministry of Agriculture',
  'Malawi Bureau of Standards',
];

const seedData = async () => {
  try {
    await Partner.deleteMany({ name: { $in: deprecatedPartnerNames } });
    await Partner.bulkWrite(
      partnerSeedData.map((partner) => ({
        updateOne: {
          filter: { name: partner.name },
          update: { $set: { ...partner, updatedAt: new Date() } },
          upsert: true,
        },
      }))
    );

    const [projectCount, aboutCount, partnerCount, impactCount, strategicPlanCount] = await Promise.all([
      Project.countDocuments(),
      About.countDocuments(),
      Partner.countDocuments(),
      ImpactStat.countDocuments(),
      StrategicPlan.countDocuments(),
    ]);

    console.log('Ensuring official NABW content is present in the database...');

    // --- About ---
    const about = await About.findOneAndUpdate(
      { organizationName: 'National Association of Business Women (NABW)' },
      {
        organizationName: 'National Association of Business Women (NABW)',
        mission: 'To empower and uplift the lives of women economically and socially through entrepreneurship development, skills training, market access, information dissemination, access to finance and advocacy among urban and rural women.',
        vision: 'To have liberated, socially empowered and economically active women of Malawi who contribute significantly to the political and economic development of Malawi.',
        objectives: [
          'Promote women’s entrepreneurship and sustainable business growth',
          'Build women’s leadership and decision-making capacity',
          'Advocate for women’s rights and inclusion in economic policy',
          'Improve access to finance, markets and information for business women',
          'Support climate resilience and inclusive energy access for women entrepreneurs',
        ],
        history: 'NABW is a women-founded and women-led non-profit and non-governmental organisation dedicated to empowering women in business and leadership roles. Founded in 1990 as an NGO under the Trusteeship Act of 1962 of the Laws of Malawi, NABW works across three key thematic areas: Economic Empowerment, Social Advocacy, and Climate Action & Renewable Energy.',
        coreValues: [
          {
            title: 'Legitimacy',
            description: 'We always strive to be the legitimate voice for all women, not only our members, doing various businesses in Malawi.',
            icon: 'legitimacy',
          },
          {
            title: 'Resourceful',
            description: 'We always strive to be resourceful in order to generate all the needed expertise to help women in their business activities and help entities in Malawi create environments where women businesses can prosper.',
            icon: 'resourceful',
          },
          {
            title: 'Membership-led',
            description: 'We are a membership-led organization, and therefore, our members always inform what we do. Our members inform our direction and the strategies we take.',
            icon: 'membership-led',
          },
          {
            title: 'Honesty',
            description: 'We always strive to be honest in all our undertakings within ourselves as a membership-led organization, as well as with all partners and duty bearers we work with.',
            icon: 'honesty',
          },
        ],
        leadership: [
          {
            name: 'Barbara Banda',
            position: 'Executive Director',
            bio: 'Barbara Banda is NABW’s Executive Director and has over 30 years of experience in development management in the sub-Saharan Africa region. She has served in various leadership positions, including as Chairperson of the NGO Gender Coordination Network and as a former board member of the National Economic Empowerment Fund. She holds an MSc in Development Management.',
            image: 'https://images.unsplash.com/photo-1573496359048-32893a1a425f?w=400&h=400&fit=crop&auto=format',
          },
        ],
        governance: 'NABW has a Board of Directors consisting of seven credible, professionally respected, trusted and experienced business women who are elected at the Annual General Assembly to govern the organisation. The Board recruits the Executive Director to manage daily operations, while the organisation is supported by professional and volunteer staff.',
        strategicPriorities: [
          'Economic Empowerment',
          'Social Advocacy',
          'Climate Action & Renewable Energy',
        ],
        isPublished: true,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (projectCount > 0 && aboutCount > 0 && partnerCount > 0 && impactCount > 0 && strategicPlanCount > 0) {
      console.log('Official NABW data already present; refreshed About and partner content only.');
      return;
    }

    // --- Partners ---
    const partners = await Partner.deleteMany({});
    const partnerList = await Partner.create(partnerSeedData);

    // --- Projects ---
    const projectSeedData = [
      {
        title: 'Building Back Better After Climate Related Events',
        slug: 'building-back-better-after-climate-related-events',
        shortDescription: 'Technical assistance to help women-owned businesses recover and build resilience after climate-related events and other external shocks.',
        fullDescription: 'This initiative involved technical assistance from the Investment Climate Reform (ICR) Facility to support women-owned businesses to recover and build resilience after climate-related events and other external shocks. The initiative included a technical study, training manual and associated training, as well as a policy brief and gender climate checklist.',
        objectives: ['Support resilience for women-owned businesses after climate shocks', 'Generate evidence and practical tools for adaptation'],
        activities: ['Technical study and training manual', 'Capacity building workshops', 'Gender climate checklist and policy brief'],
        beneficiaries: ['Women entrepreneurs affected by climate shocks', 'Women-led SMEs'],
        expectedResults: ['Improved resilience planning for women-owned businesses', 'Practical climate adaptation tools for SMEs'],
        achievedResults: ['Technical assistance delivered to affected women entrepreneurs', 'Climate resilience awareness increased in target communities'],
        location: 'Malawi',
        startDate: new Date('2023-01-01'),
        endDate: new Date('2024-12-31'),
        duration: '12 months',
        status: 'ongoing',
        featuredImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3d3c39d?w=800&h=500&fit=crop&auto=format',
        gallery: ['https://images.unsplash.com/photo-1517486808906-6ca8b3d3c39d?w=800&h=500&fit=crop&auto=format'],
        partners: [partnerList[0]._id, partnerList[9]._id],
        isFeatured: true,
        isPublished: true,
      },
      {
        title: 'Promoting Insurance Coverage among Women-owned Businesses',
        slug: 'promoting-insurance-coverage-among-women-owned-businesses',
        shortDescription: 'A climate-risk mitigation initiative focused on increasing insurance awareness and coverage for women-owned SMEs.',
        fullDescription: 'Developed following Cyclone Freddy to help women-owned SMEs mitigate climate-related risks through insurance. NABW conducted a survey of insurance providers and, in partnership with CIC-Africa Cooperative Insurance Limited, conducted awareness campaigns in the 10 districts affected by Cyclone Freddy.',
        objectives: ['Increase insurance awareness among women-owned businesses', 'Strengthen climate-risk response among SMEs'],
        activities: ['Insurance provider survey', 'Awareness campaigns', 'Partnership with CIC-Africa Cooperative Insurance'],
        beneficiaries: ['Women-owned SMEs in affected districts'],
        expectedResults: ['Greater insurance knowledge and coverage', 'Improved climate risk preparedness'],
        achievedResults: ['Awareness campaigns completed across affected districts'],
        location: '10 districts affected by Cyclone Freddy',
        startDate: new Date('2023-03-01'),
        endDate: new Date('2024-06-30'),
        duration: '12 months',
        status: 'completed',
        featuredImage: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=500&fit=crop&auto=format',
        gallery: ['https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=500&fit=crop&auto=format'],
        partners: [partnerList[9]._id],
        isFeatured: false,
        isPublished: true,
      },
      {
        title: 'SheActs4Feminomics',
        slug: 'sheacts4feminomics',
        shortDescription: 'A six-month project strengthening policy and regulatory frameworks addressing women-owned SMEs and economic justice.',
        fullDescription: 'A six-month project implemented by NABW in 2022 with financial support from Urgent Action Fund and in partnership with a consortium of civil society organisations. The project focused on macro-level policies affecting women’s economic justice and rights and strengthening policy and regulatory frameworks addressing challenges faced by women-owned SMEs.',
        objectives: ['Strengthen policy frameworks for women’s economic justice', 'Increase attention to women-owned SMEs challenges'],
        activities: ['Policy engagement', 'Advocacy and coordination', 'Stakeholder consultations'],
        beneficiaries: ['Women entrepreneurs', 'Civil society partners'],
        expectedResults: ['Stronger policy awareness and regulatory engagement'],
        achievedResults: ['Policy coordination and advocacy strengthened across stakeholders'],
        location: 'Malawi',
        startDate: new Date('2022-01-01'),
        endDate: new Date('2022-06-30'),
        duration: '6 months',
        status: 'completed',
        featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop&auto=format',
        gallery: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop&auto=format'],
        partners: [partnerList[0]._id],
        isFeatured: false,
        isPublished: true,
      },
      {
        title: 'Green & Inclusive Energy (GIE)',
        slug: 'green-inclusive-energy-gie',
        shortDescription: 'A programme focused on reducing energy poverty and increasing women’s participation in inclusive energy systems.',
        fullDescription: 'Supported by Hivos from 2016–2020, GIE focused on reducing energy poverty in Southern Africa through lobbying and advocacy for greener and more inclusive energy systems. In Malawi, NABW contributed to evidence-based advocacy, stakeholder capacity building and the establishment of a Gender and Energy Platform, while supporting women and youth to participate in the energy supply chain and access energy investment opportunities.',
        objectives: ['Reduce energy poverty', 'Increase women’s participation in energy value chains'],
        activities: ['Advocacy and lobbying', 'Stakeholder capacity building', 'Gender and Energy Platform support'],
        beneficiaries: ['Women and youth in the energy sector'],
        expectedResults: ['Greater energy inclusion and climate-smart participation'],
        achievedResults: ['Gender and energy platform established and stakeholder capacity enhanced'],
        location: 'Malawi',
        startDate: new Date('2016-01-01'),
        endDate: new Date('2020-12-31'),
        duration: '5 years',
        status: 'completed',
        featuredImage: 'https://images.unsplash.com/photo-1497435334941-8c89f7db5f91?w=800&h=500&fit=crop&auto=format',
        gallery: ['https://images.unsplash.com/photo-1497435334941-8c89f7db5f91?w=800&h=500&fit=crop&auto=format'],
        partners: [partnerList[3]._id, partnerList[4]._id],
        isFeatured: false,
        isPublished: true,
      },
      {
        title: 'Financial Inclusion and Gender Responsive Procurement Advocacy',
        slug: 'financial-inclusion-and-gender-responsive-procurement-advocacy',
        shortDescription: 'Advocacy campaign that brought together government, banks and business development partners to improve financial inclusion.',
        fullDescription: 'The 2020 Financial Inclusion and Gender Responsive Procurement Advocacy campaign brought together government, private sector participants, banks and business development consultants and contributed to the development of a Financial Inclusion Index for monitoring financial institutions.',
        objectives: ['Advance financial inclusion', 'Promote gender-responsive procurement'],
        activities: ['Policy advocacy', 'Multi-stakeholder dialogue', 'Monitoring framework development'],
        beneficiaries: ['Women entrepreneurs', 'Financial institutions'],
        expectedResults: ['Improved financial inclusion monitoring frameworks'],
        achievedResults: ['Financial inclusion index contributed to monitoring and advocacy'],
        location: 'Lilongwe, Malawi',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2020-12-31'),
        duration: '12 months',
        status: 'completed',
        featuredImage: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&h=500&fit=crop&auto=format',
        gallery: ['https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&h=500&fit=crop&auto=format'],
        partners: [partnerList[6]._id],
        isFeatured: false,
        isPublished: true,
      },
    ];

    const projects = await Project.deleteMany({});
    const createdProjects = await Project.create(projectSeedData);

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
    const impactStats = await ImpactStat.deleteMany({});
    const impactStatRecords = await ImpactStat.create([
      {
        title: 'Women-led MSMEs',
        value: '7,000',
        description: 'Members across Malawi representing women-led micro, small and medium enterprises.',
        icon: 'business',
        category: 'Membership',
        isPublished: true,
      },
      {
        title: 'Southern Region',
        value: '40%',
        description: 'Of NABW membership is based in the southern region.',
        icon: 'location',
        category: 'Membership',
        isPublished: true,
      },
      {
        title: 'Central Region',
        value: '35%',
        description: 'Of NABW membership is based in the central region.',
        icon: 'location',
        category: 'Membership',
        isPublished: true,
      },
      {
        title: 'Northern Region',
        value: '25%',
        description: 'Of NABW membership is based in the northern region.',
        icon: 'location',
        category: 'Membership',
        isPublished: true,
      },
      {
        title: 'Youth Members',
        value: '35%',
        description: 'Of the membership base is made up of youth members.',
        icon: 'youth',
        category: 'Membership',
        isPublished: true,
      },
      {
        title: 'Women Members',
        value: '65%',
        description: 'Of the membership base is made up of women members.',
        icon: 'women',
        category: 'Membership',
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
    const strategicPlan = await StrategicPlan.findOneAndUpdate(
      { title: { $regex: 'NABW Strategic Plan', $options: 'i' } },
      {
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
            description: 'Advocate for and achieve at least five policy changes that support women\'s economic participation by 2026.',
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
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

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
