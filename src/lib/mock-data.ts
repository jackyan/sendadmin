
export const MOCK_CONTACTS = Array.from({ length: 50 }).map((_, i) => ({
    id: `c${i + 1}`,
    name: `User ${i + 1}`,
    phone: `+1555000${i.toString().padStart(4, '0')}`,
    email: `user${i + 1}@example.com`,
    tags: i % 3 === 0 ? ['VIP'] : ['Lead'],
    createdAt: new Date().toISOString(),
    status: 'active'
}));

export const MOCK_CHANNELS = [
    { id: 'ch1', type: 'whatsapp', name: 'WhatsApp Business API', status: 'connected', identifier: '+1 234 567 890' },
    { id: 'ch2', type: 'telegram', name: 'Telegram Bot', status: 'connected', identifier: '@DemoBot' },
    { id: 'ch3', type: 'instagram', name: 'Instagram Direct', status: 'disconnected', identifier: '' },
];

export const MOCK_TEMPLATES = [
    { id: 't1', name: 'welcome_offer_v2', channel: 'whatsapp', content: 'Hello {{1}}, welcome to our exclusive community! Here is a 20% discount code for your first purchase: {{2}}. Link: http://example.com/claim', status: 'approved', language: 'en_US', category: 'MARKETING', quality: 'HIGH' },
    { id: 't2', name: 'survey_request_q1', channel: 'whatsapp', content: 'Hello {{1}}, we value your feedback. Please fill this short survey to help us improve. Link: http://example.com/survey', status: 'approved', language: 'en_US', category: 'UTILITY', quality: 'HIGH' },
    { id: 't3', name: 'promo_flash_sale', channel: 'telegram', content: '⚡ Flash Sale Alert! 50% OFF on all electronics. Ends in 24 hours. Link: http://example.com/shop', status: 'rejected', language: 'zh_CN', category: 'MARKETING', quality: 'LOW' },
    { id: 't4', name: 'order_update_shipping', channel: 'whatsapp', content: 'Your order {{1}} has been shipped. Track it here: {{2}}', status: 'pending', language: 'en_US', category: 'UTILITY', quality: 'PENDING' },
];

export const MOCK_CAMPAIGNS = [
    { id: 'cp1', name: 'Q1 Webinar Invite', status: 'processing', sent: 450, total: 1000, channel: 'whatsapp', createdAt: '2023-01-15' },
    { id: 'cp2', name: 'Survey Blast', status: 'completed', sent: 200, total: 200, channel: 'telegram', createdAt: '2023-01-10' },
    { id: 'cp3', name: 'New Feature Announce', status: 'draft', sent: 0, total: 0, channel: 'whatsapp', createdAt: '2023-01-20' },
];

export const MOCK_LINKS = [
    { id: 'l1', title: 'Q1 Survey', target: 'Question Set A', clicks: 124, created: '2023-01-10' },
    { id: 'l2', title: 'Product Demo', target: 'Question Set B', clicks: 45, created: '2023-01-15' }
]

export const QUESTIONS_SET = [
    { id: 'q1', text: 'How satisfied are you with our service?', options: ['Very', 'Somewhat', 'Not at all'] },
    { id: 'q2', text: 'Would you recommend us?', options: ['Yes', 'No'] }
]
