import { ConsultationOption, BlogPost } from '../types';

export const CONSULTATIONS: ConsultationOption[] = [
  {
    id: 'fitness-zumba-masterclass',
    title: 'Fitness & Zumba Masterclass',
    duration: '1 Hour',
    price: '150 USD',
    tagline: 'Empowering movement and functional fitness to ignite energy and mobility.',
    description: '1 Hour Consultation conducted via Zoom or Google Meet with personalized guidance and tailored habit building.',
    keyIncludes: [
      '1 Hour Consultation via Zoom or Google Meet',
      'Optional: 4-week tailored workout schedule with guidance',
      'Optional: Nutritional habit tracking template with review'
    ]
  },
  {
    id: 'corporate-wellness-activation',
    title: 'Corporate Wellness Activation',
    duration: '1 Hour',
    price: '150 USD',
    tagline: 'Energizing team movement, physical habit roadmaps, and workplace vitality.',
    description: '1 Hour Consultation conducted via Zoom or Google Meet tailored for team health, resilience, and energy.',
    keyIncludes: [
      '1 Hour Consultation via Zoom or Google Meet',
      'Optional: Team energy assessment report with follow up',
      'Optional: Group physical habit challenge roadmap'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'body-positive-fitness-revolution',
    title: 'Empowering Your Journey: Inside the Body-Positive Fitness Revolution',
    category: 'Movement & Mindset',
    readTime: '5 min read',
    date: 'July 28, 2026',
    excerpt: 'How functional strength, realistic habits, and body acceptance redefine personal physical transformation.',
    content: [
      'Physical transformation begins with understanding your body’s unique power. In a world saturated with quick fixes and extreme restrictions, body-positive fitness focuses on sustainable longevity.',
      'Strength training and functional movement allow women to navigate physical stagnation with confidence. When we shift from superficial scales to internal resilience, movement becomes a celebration of what our bodies can achieve.'
    ]
  },
  {
    id: 'mindful-motion-5-movements',
    title: 'Mindful Motion: 5 Daily Movements to Instantly Boost Your Energy',
    category: 'Functional Strength',
    readTime: '4 min read',
    date: 'July 20, 2026',
    excerpt: 'Simple, high-impact functional mobility exercises to overcome morning stiffness and fatigue.',
    content: [
      'Low energy and morning stiffness often stem from stagnant physical patterns and lack of mobility. By incorporating five intentional functional movements into your daily routine, you stimulate joint circulation and wake up key muscle groups.',
      'Consistency trumps intensity every single time. Small, realistic habit changes create compounding energy improvements that last throughout the day.'
    ]
  },
  {
    id: 'beyond-the-scale-strength-training',
    title: 'Beyond the Scale: Why Strength Training Matters Most for Aging Well',
    category: 'Longevity',
    readTime: '6 min read',
    date: 'July 12, 2026',
    excerpt: 'Unlocking longevity, bone density, and metabolic resilience through progressive movement.',
    content: [
      'As women navigate physical transitions, maintaining muscle mass and joint mobility becomes vital for long-term independence and vitality.',
      'Functional strength training protects bone density, balances energy, and instills deep confidence. Sandra Osaigbovo’s coaching framework integrates movement, nutrition, and mindset for sustainable longevity.'
    ]
  }
];

export const FOUNDER_BIO = {
  name: 'Sandra Osaigbovo',
  tagline: 'Health & Wellness Consultancy specializing in functional strength & movement.',
  aboutParagraphs: [
    'Sandra Osaigbovo supports women navigating physical stagnation, low energy, and mobility challenges, alongside internal struggles like fading consistency or self-image concerns.',
    'Our movement-informed coaching helps you understand your body’s unique power, manage lifestyle changes through realistic habits like strength training and nutrition, and build resilience to navigate your fitness journey with confidence.'
  ]
};

