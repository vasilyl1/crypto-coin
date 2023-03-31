const db = require('./connection');
const getFormattedDate = require('../utils/dataFormat')
const {User, News, Source} = require('../models');

const date = getFormattedDate()

db.once('open', async () => {
  await Source.deleteMany();

  const sources = await Source.insertMany([
    { title: 'cryptonews', http: 'https://cryptonews.com/news/ethereum-core-developers-announce-date-for-long-awaited-shapella-upgrade-heres-what-you-need-to-know.htm'},
    { title: 'cointdesk', http: 'https://www.coindesk.com/business/2023/03/29/coinbase-aims-to-stay-in-canada-while-binance-looks-poised-to-exit-amid-regulatory-shakeup/'},
    { title: 'cointelegraph', http: 'https://cointelegraph.com/news/indonesian-government-looks-to-nfts-to-preserve-cultural-heritage'},
    { title: 'cryptopotato', http: 'https://cryptopotato.com/denmark-to-start-taxing-bitcoin-profits-rules-the-supreme-court/'},
    { title: 'yahoo', http: 'https://finance.yahoo.com/news/100-000-blockchain-gaming-esports-145120539.html'},
    { title: 'beincrypto', http: 'https://beincrypto.com/cryptocurrencies-metaverse-revolution/'},
    { title: 'crypto-news-flash', http: 'https://www.crypto-news-flash.com/cores-revolutionary-satoshi-plus-consensus-marries-decentralization-security-and-scalability/'},
    { title: 'binance', http: 'https://www.binance.com/en/news/flash/7480760'},
    { title: 'cnbc', http: 'https://www.cnbc.com/video/2023/03/29/bitcoin-fdic-deadline-signature-crypto-clients-cnbc-crypto-world.html'},
    { title: 'cryptoknowmics', http: 'https://www.cryptoknowmics.com/news/coinbase-survey-says-americans-frustrated-by-financial-systems-inequality'}
]);

  console.log('sources seeded');

  await News.deleteMany();

  const news = await News.insertMany([
    {
        textContent: "Ethereum Core Developers Announce Date for Long-Awaited Shapella Upgrade – Here's What You Need to Know", 
        date: date, 
        source: sources[0]._id,
        subscription: 'free'
    },
    {
        textContent: 'Coinbase Aims to Stay in Canada; Binance Could Be Poised to Exit Amid Regulatory Shakeup', 
        date: date, 
        source: sources[1]._id,
        subscription: 'free'
    },
    {
        textContent: 'Indonesian government looks to NFTs to preserve cultural heritage', 
        date: date, 
        source: sources[2]._id,
        subscription: 'free'
    },
    {
        textContent: 'Denmark to Start Taxing Bitcoin Profits, Rules the Supreme Court', 
        date: date, 
        source: sources[3]._id,
        subscription: 'free'
    },
    {
        textContent: '$100,000 Blockchain Gaming Esports Tournament: Crypto Startups Making Big Bets As Blockchain-Based Assets Make Rebound', 
        date:date, 
        source: sources[4]._id,
        subscription: 'free'
    },
    {
        textContent: 'How Cryptocurrencies and the Metaverse Revolution Together Drive Economic Growth', 
        date:date, 
        source: sources[5]._id,
        subscription: 'free'
    },
    {
        textContent: 'Core’s Revolutionary Satoshi Plus Consensus Marries Decentralization, Security, and Scalability', 
        date:date, 
        source: sources[6]._id,
        subscription: 'free'
    },    
    {
        textContent: 'Japanese Government to Create Panel to Explore Digital Yen', 
        date:date, 
        source: sources[7]._id,
        subscription: 'free'
    },    
    {
        textContent: 'Bitcoin reclaims $28,000, and FDIC gives deadline for Signature’s crypto clients: CNBC Crypto World', 
        date:date, 
        source: sources[8]._id,
        subscription: 'intermediate'
    },
    {
        textContent: "Coinbase Survey Reveals Americans Are Frustrated by the Financial System's Inequality", 
        date:date, 
        source: sources[9]._id,
        subscription: 'advanced'
    }
])

  console.log('news seeded');

  await User.deleteMany();

  await User.create({
    username: 'Pamela',
    email: 'pamela@testmail.com',
    password: 'password12345',
    personalNews: [news[0], news[1], news[2]]
  });

  await User.create({
    username: 'Elijah',
    email: 'eholt@testmail.com',
    password: 'password12345',
    subscribe_level: 'intermediate',
    personalNews: [news[3], news[4], news[5]]
  });

  await User.create({
    username: 'Yaro',
    email: 'yaro@testmail.com',
    password: 'password12345',
    subscribe_level: 'advanced',
    personalNews: [news[6], news[7], news[8], news[9]]
  });

  console.log('users seeded');

  process.exit();
});