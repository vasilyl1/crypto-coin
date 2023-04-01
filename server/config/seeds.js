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

  console.log('Sources seeded');

  await News.deleteMany();

 
  const news = await News.insertMany([
    {
        title: "Ethereum Core Developers Announce Date for Long-Awaited Shapella Upgrade – Here's What You Need to Know", 
        body: "It's happening, said an Ethereum (ETH) core developer, announcing the launch of the network's much-anticipated Shapella update in two weeks.  The Shanghai and Capella upgrades, aka Shapella, are scheduled for April 12, said developer Tim Beiko in a Tuesday tweet. If you're a validator, you should check out our Withdrawals FAQ to make sure you are ready for the upgrade, he added.....",
        date: date, 
        source: sources[0]._id,
    },
    {
        title: 'Coinbase Aims to Stay in Canada; Binance Could Be Poised to Exit Amid Regulatory Shakeup', 
        body: "Coinbase is in talks with regulators about remaining in Canada, according to a person familiar with the matter, as the country tightens rules for cryptocurrency exchanges. Larger rival Binance, however, looks likely to exit. Coinbase, which is based in the U.S., is discussing getting the appropriate license to keep doing business in Canada, according to the person, who requested anonymity.In a statement to CoinDesk, Elliott Suthers, Coinbase’s communications director, said, “We remain as committed as ever to the Canadian market as a core component of our international road map....",
        date: date, 
        source: sources[1]._id,
    },
    {
        title: 'Indonesian government looks to NFTs to preserve cultural heritage', 
        body: "One of the primary benefits of blockchain technology is the ability to record and capture information in a permanent, tamper-proof record. Once data is on a blockchain network, it cannot be altered, making it an ideal solution for record-keeping. Tokenized assets, such as nonfungible tokens (NFTs), can also be placed on a blockchain. This can verify ownership while demonstrating that certain events occurred at particular times. For example, the Meta History Museum tokenized data from the war in Ukraine in May 2022, placing the information on a blockchain network to preserve records of the war.Ensuring that specific events take place is also becoming more important than ever due to the rise of artificial intelligence (AI) and its ability to generate deep fakes, along with historical images that may appear realistic.....",
        date: date, 
        source: sources[2]._id,
    },
    {
        title: 'Denmark to Start Taxing Bitcoin Profits, Rules the Supreme Court', 
        body: "Lars Rohde – the Governor of Danmarks Nationalbank (the central bank of Denmark) – is not keen on the primary cryptocurrency. He outlined its infamous volatility and lack of centralization in May 2021, adding that he is “tempered to ignore” BTC and the entire digital asset market.....",
        date: date, 
        source: sources[3]._id,
    },
    {
        title: '$100,000 Blockchain Gaming Esports Tournament: Crypto Startups Making Big Bets As Blockchain-Based Assets Make Rebound', 
        body: "Moxy.io (MOXY) has been making waves in the gaming industry as the first company to offer on-demand eSports to all gamers, regardless of their skill level. What makes Moxy stand out is its use of blockchain technology to power its platform, providing a transparent and secure environment for players.Thanks to the unfortunate collapse of several regional banks, people are flocking to crypto and blockchain-based assets as a means to secure liquidity for their businesses and as investments. For example, Gamestop Corp. has seen a recent surge in volume on the platform, with some assets volume growing over 20,000%. In the startups market, retail investors have invested over $900,000 in Gameflip for their digital asset and NFT marketplace.....",
        date:date, 
        source: sources[4]._id,
    },
    {
        title: 'How Cryptocurrencies and the Metaverse Revolution Together Drive Economic Growth',
        body: "Picture a world where digital realms and cryptocurrencies coalesce, giving birth to a groundbreaking digital economy. This is the metaverse, a vast and intricate network of interconnected virtual spaces. It’s rapidly evolving, and cryptocurrencies are playing a critical role in shaping its future. As blockchain technology paves the way, the metaverse is set to revolutionize not only our online experiences but also our real-world economies.", 
        date:date, 
        source: sources[5]._id,
    },
    {
        title: 'Core’s Revolutionary Satoshi Plus Consensus Marries Decentralization, Security, and Scalability', 
        body: "Core is a novel layer one blockchain that is pushing the boundaries within the crypto space. Inspired by Bitcoin and Ethereum, Core progresses beyond those blockchain behemoths by synthesizing each of their superpowers. A student of blockchain history, philosophy, and innovation, Core optimally balances decentralization, security, and scalability.Without Core’s advancements, crypto has been plagued by the “Blockchain Trilemma,” which states that decentralization, security, and scalability can never be achieved simultaneously. Tackling the Trilemma head-on, Core DAO contributors have designed a unique consensus mechanism known as Satoshi Plus, which marries the decentralization and security of Bitcoin’s Proof of Work (PoW) with the scalability of Delegated Proof of Stake (DPoS).....",
        date:date, 
        source: sources[6]._id    
        },    
    {
        title: 'Japanese Government to Create Panel to Explore Digital Yen', 
        body: "As the race for digital currencies intensifies, the Japanese government is considering launching a panel to examine the practicality of the digital yen. The Finance Ministry is reportedly considering creating an expert panel in April to examine the feasibility of issuing the digital yen. Since the Bank of Japan began research on CBDC in 2020, there have been numerous experiments to test the issuance of digital currency. Upon the success of a trial experiment, the government expects to roll out the central bank digital currency immediately.....",
        date:date, 
        source: sources[7]._id,
    },    
    {
        title: 'Bitcoin reclaims $28,000, and FDIC gives deadline for Signature’s crypto clients: CNBC Crypto World', 
        body: ".CNBC Crypto World features the latest news and daily trading updates from the digital currency markets and provides viewers with a look at what’s ahead with high-profile interviews, explainers, and unique stories from the ever-changing crypto industry. On today’s show, Sergey Nazarov, the co-founder of Chainlink, weighs in on sentiment among blockchain developers amid the current crypto environment.",
        date:date, 
        source: sources[8]._id,
        subscription: 'intermediate'
    },
    {
        title: "Coinbase Survey Reveals Americans Are Frustrated by the Financial System's Inequality", 
        body: "CNBC Crypto World features the latest news and daily trading updates from the digital currency markets and provides viewers with a look at what’s ahead with high-profile interviews, explainers, and unique stories from the ever-changing crypto industry. On today’s show, Sergey Nazarov, the co-founder of Chainlink, weighs in on sentiment among blockchain developers amid the current crypto environment.",
        date:date, 
        source: sources[9]._id,
        subscription: 'advanced'
    }
])

  console.log('News seeded');

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

  console.log('Users seeded');

  process.exit();
});