// ============================================================
// ARTICLES
// ------------------------------------------------------------
// To add a new article: copy any object below, give it a unique
// `slug`, update the fields, and add it to the array. It will
// automatically appear in the Latest Articles, Articles page,
// search and category filters.
//
// Content blocks: { type: "p" } paragraphs, { type: "h2"|"h3" }
// headings, { type: "quote", text, cite }, { type: "img",
// src, caption }, { type: "list", items }.
// ============================================================

export const articles = [
  {
    slug: "the-price-of-progress",
    title: "The Price of Progress: What the AI Boom Leaves Behind",
    subtitle:
      "In the race to build the machines of tomorrow, the people who power them — and the cities they displace — are being written out of the story.",
    excerpt:
      "A two-month investigation into the human cost of the artificial intelligence boom: from gig workers labelling training data to towns hollowed out by data-centre construction.",
    category: "Technology",
    date: "2026-07-28",
    readTime: 9,
    image: "/images/technology-ai.jpg",
    imageCaption:
      "The infrastructure of the AI boom stretches far beyond the server farm — and its footprint is felt in towns most people have never heard of.",
    featured: true,
    tags: ["Artificial Intelligence", "Labour", "Data Centres"],
    content: [
      {
        type: "p",
        text: "The first thing you notice about the town of Ashford Vale is the hum. It is not the hum of traffic or industry in the old sense — it is the low, constant drone of cooling fans, running day and night, behind the wire fences of a data centre the size of six football pitches.",
      },
      {
        type: "p",
        text: "Ashford Vale is one of dozens of communities across the country that has quietly become part of the machinery of the artificial intelligence boom. None of its residents were asked. Few of them were even told before the planning notice appeared in the local paper.",
      },
      {
        type: "h2",
        text: "The invisible workforce",
      },
      {
        type: "p",
        text: "The AI industry's most famous names are built on a less glamorous foundation: millions of hours of human labour, much of it performed by contractors earning per-task payments that amount to less than the minimum wage in their home countries.",
      },
      {
        type: "quote",
        text: "People think of AI as something that happens in a lab. In reality, it is assembled, line by line, by people who will never see the product they helped build.",
        cite: "A data-labour contractor, speaking on condition of anonymity",
      },
      {
        type: "p",
        text: "Our reporting tracked the supply chain of one large language model from a data-labelling hub in Nairobi to the server farms of rural England. What we found is a system that is profitable at every stage except the one where human beings do the work.",
      },
      {
        type: "h2",
        text: "A town that never chose the future",
      },
      {
        type: "p",
        text: "Back in Ashford Vale, the data centre has brought three hundred construction jobs, a handful of permanent roles — and a 40 per cent rise in local electricity prices. The local school's head teacher told us the town is now officially classified as an 'energy pinch point'.",
      },
      {
        type: "img",
        src: "/images/technology-ai.jpg",
        caption:
          "Data centres have become the defining infrastructure of the decade — and their neighbours are beginning to ask who pays.",
      },
      {
        type: "p",
        text: "Regulators are only beginning to catch up. The energy regulator this year opened its first formal inquiry into the grid pressure caused by large computing facilities. The technology industry, for its part, points to the jobs and investment it brings.",
      },
      {
        type: "h2",
        text: "What progress is for",
      },
      {
        type: "p",
        text: "There is no honest version of this story that ends with 'stop building'. The question is narrower and more uncomfortable: who decides what progress costs, and who is asked to pay?",
      },
      {
        type: "p",
        text: "In Ashford Vale, residents have started a community forum. Their demands are modest — transparency about grid capacity, a share of the rates, and a seat at the table when the next application arrives. The town council has backed them. The industry has yet to respond.",
      },
      {
        type: "p",
        text: "If the past year has taught us anything, it is that the boom will not wait for the answers. Whether the answers catch up to the boom is a question that belongs to all of us.",
      },
    ],
  },
  {
    slug: "the-power-brokers",
    title: "The Power Brokers: Inside the Quiet Negotiations Reshaping Parliament",
    subtitle:
      "Before any bill reaches the chamber, it has already been shaped — by a small circle of unelected negotiators who answer to no one.",
    excerpt:
      "An investigation into the network of special advisers, lobbyists and fixers who write the first drafts of the laws we live by.",
    category: "Politics",
    date: "2026-07-15",
    readTime: 11,
    image: "/images/politics.jpg",
    imageCaption:
      "The public face of politics is the chamber — but the real decisions are settled long before the debate begins.",
    featured: false,
    tags: ["Parliament", "Lobbying", "Policy"],
    content: [
      {
        type: "p",
        text: "By the time a bill reaches the floor of the chamber, the arguments have already been had, the compromises already struck, and the losers already compensated. The public debate is, in large part, theatre — the real negotiation happened in rooms without clocks.",
      },
      {
        type: "p",
        text: "Over six months, we mapped the network of people who shape legislation before it is ever introduced. The names are not famous. They are the special advisers, the industry liaison officers, the former journalists turned communications directors, and the lobbyists who describe themselves as 'government relations consultants'.",
      },
      {
        type: "h2",
        text: "The revolving door",
      },
      {
        type: "p",
        text: "The relationship between government and the private sector has never been more porous. Of the 200 people we identified as routinely influencing legislative drafting, more than half had moved between public office and industry roles at least once.",
      },
      {
        type: "list",
        items: [
          "68 per cent of policy advisers had previous industry employment",
          "The average time between leaving office and first industry contract: 14 months",
          "One in five senior negotiators had worked for the same sector they now regulate",
        ],
      },
      {
        type: "quote",
        text: "The system is not corrupt in the way people imagine. It is simply that everyone in the room shares the same vocabulary, the same career concerns, and the same unspoken assumption about what is reasonable.",
        cite: "Former cabinet adviser, interviewed for this investigation",
      },
      {
        type: "h2",
        text: "Who watches the watchers",
      },
      {
        type: "p",
        text: "The regulation of lobbying, introduced with much fanfare a decade ago, covers only a fraction of this activity. Advisory work, informal meetings, and the 'chatham house' dinners where much of the real alignment happens, fall entirely outside its scope.",
      },
      {
        type: "p",
        text: "None of this is illegal. That is precisely the point. The machinery of modern government has developed a parallel economy of influence that is perfectly lawful, entirely opaque, and profoundly unequal.",
      },
      {
        type: "p",
        text: "The public, meanwhile, is invited to participate in a debate that has already been decided. The question for the next parliament is whether that is a design flaw — or the design itself.",
      },
    ],
  },
  {
    slug: "broken-chains",
    title: "Broken Chains: How Global Supply Shortages Redrew the Map of Commerce",
    subtitle:
      "Four years on from the great disruption, the companies that once shipped everything everywhere are building a slower, stranger world.",
    excerpt:
      "From microchip factories in Arizona to container ports in Rotterdam, how the era of 'just in time' gave way to 'just in case'.",
    category: "Business",
    date: "2026-07-02",
    readTime: 8,
    image: "/images/business.jpg",
    imageCaption:
      "The handshake that built global trade is being renegotiated — literally, in port cities and factory floors around the world.",
    featured: false,
    tags: ["Trade", "Manufacturing", "Globalisation"],
    content: [
      {
        type: "p",
        text: "For forty years, the logic of global trade was beautifully simple: make it where it is cheapest, sell it where the price is highest, and never hold more inventory than the accountants allow. Then the world hiccuped — and that logic collapsed within weeks.",
      },
      {
        type: "h2",
        text: "From just-in-time to just-in-case",
      },
      {
        type: "p",
        text: "The era of 'just in time' manufacturing — in which components arrived hours before they were needed — has been replaced by something industry insiders call 'just in case'. Companies are now holding, on average, three times the inventory they did a decade ago. Warehousing capacity has doubled. The cost of all this safety is quietly being passed on to the customer.",
      },
      {
        type: "quote",
        text: "We used to optimise for cost. Now we optimise for survival. They are different games, and the first one made everyone rich and fragile.",
        cite: "Chief operations officer, European electronics manufacturer",
      },
      {
        type: "p",
        text: "The map of manufacturing is being redrawn along lines of trust and proximity. 'Friend-shoring' — the practice of sourcing from politically aligned countries — has become the dominant strategy in sectors from semiconductors to pharmaceuticals.",
      },
      {
        type: "h2",
        text: "The new geography of money",
      },
      {
        type: "img",
        src: "/images/business.jpg",
        caption:
          "Near-shoring and friend-shoring are redrawing the routes of global trade — and the fortunes of the cities along them.",
      },
      {
        type: "p",
        text: "There is a human cost to this reorganisation that the spreadsheets rarely capture. Port cities that thrived on transcontinental volume are adapting or shrinking. Industrial towns that lost their factories a generation ago are being courted again — this time with tax breaks and energy guarantees rather than promises.",
      },
      {
        type: "p",
        text: "The era of frictionless global commerce is not over. It has simply become slower, more expensive, and far more political. The companies that survive will be the ones that treat the supply chain not as a cost centre, but as the most important geopolitical asset they own.",
      },
    ],
  },
  {
    slug: "the-last-librarian",
    title: "The Last Librarian: Saving the Stories the Internet Forgot",
    subtitle:
      "As digital platforms dissolve and vanish, a small group of archivists is fighting to keep the record of our age from disappearing entirely.",
    excerpt:
      "The internet was supposed to remember everything. A quiet movement of librarians and engineers is discovering how much it has already forgotten.",
    category: "Culture",
    date: "2026-06-18",
    readTime: 7,
    image: "/images/culture.jpg",
    imageCaption:
      "Old and new archives side by side: the librarians of the digital age argue the oldest methods may be the safest.",
    featured: false,
    tags: ["Archives", "Digital Culture", "Memory"],
    content: [
      {
        type: "p",
        text: "The reading room of the National Archive is a cathedral of quiet. On any given afternoon, a handful of researchers sit under the high windows, wearing white gloves, turning pages that have survived revolutions, fires and empires. The question that animates Dr. Amara Osei, the archive's digital curator, is whether anything being produced today will survive the next decade.",
      },
      {
        type: "h2",
        text: "The vanishing record",
      },
      {
        type: "p",
        text: "The scale of the problem is difficult to grasp. Studies estimate that a third of all web pages that existed a decade ago no longer resolve. Social media posts vanish with the platforms that hosted them. Government websites are redesigned, their archives quietly deleted. The digital age, it turns out, is less a record than a set of ripples on water.",
      },
      {
        type: "quote",
        text: "We have spent twenty years convincing the world that digital is permanent because it is effortless to copy. The truth is the opposite: nothing digital is permanent unless someone deliberately chooses to keep it.",
        cite: "Dr. Amara Osei, Digital Curator, National Archive",
      },
      {
        type: "h2",
        text: "Paper as a strategy",
      },
      {
        type: "img",
        src: "/images/culture.jpg",
        caption:
          "In a surprising reversal, many archivists now recommend printing critical records — the oldest storage medium still outlasts every new one.",
      },
      {
        type: "p",
        text: "The response has been a quiet revolution in archiving practice. Some institutions are now printing essential records — a strategy that would have seemed absurd ten years ago. Others are building 'dark archives': copies of critical data stored offline, in environments with no network connection, precisely so they cannot be lost, altered, or taken down.",
      },
      {
        type: "p",
        text: "The work is unglamorous and almost entirely uncelebrated. There is no prize for the archivist who preserved something that did not, in the end, disappear. But the librarians of the digital age argue that memory is not a luxury — it is the infrastructure of accountability.",
      },
      {
        type: "p",
        text: "Every law that is deleted from a website, every speech that is removed from a platform, every photograph that vanishes with a bankrupt company: each is a small erasure of the public record. The archivists are fighting a rearguard action, and they know they are outnumbered. They keep going anyway — because someone has to remember.",
      },
    ],
  },
  {
    slug: "the-housing-divide",
    title: "The Housing Divide: A Generation Priced Out of Home",
    subtitle:
      "In three cities, in three countries, the same story: wages that barely move, rents that only rise, and a dream quietly retired.",
    excerpt:
      "A year of reporting on the housing crisis — told through the people who can no longer afford the places they grew up in.",
    category: "Society",
    date: "2026-06-05",
    readTime: 10,
    image: "/images/society.jpg",
    imageCaption:
      "The housing debate is often framed in statistics. The reality, in every city, is people — and the choices they never expected to make.",
    featured: false,
    tags: ["Housing", "Rent", "Generational Divide"],
    content: [
      {
        type: "p",
        text: "At twenty-nine, Samira moved back into her childhood bedroom. She had a good job, a graduate degree, and savings that her parents considered the height of financial prudence. The bedroom was simply the only place in the city she could afford to live.",
      },
      {
        type: "p",
        text: "Samira's story is the story of her generation, told in every city we visited over twelve months of reporting. The details change — the neighbourhood, the currency, the colour of the walls — but the arithmetic is always the same.",
      },
      {
        type: "h2",
        text: "The arithmetic of rent",
      },
      {
        type: "p",
        text: "In the three cities at the centre of this investigation, the median rent has risen by 68 per cent in a decade. Median full-time earnings, in the same period, rose by 19 per cent. Every other line of this story follows from those two numbers.",
      },
      {
        type: "list",
        items: [
          "The average renter now spends 43 per cent of income on housing — the highest share on record",
          "First-time buyers need, on average, 11 years to save a deposit, up from 4 in 2010",
          "One in five young adults now lives with parents — double the rate of a generation ago",
        ],
      },
      {
        type: "quote",
        text: "Nobody in my family ever thought we would be priced out of the city my grandfather helped build. We built it. We just can't live in it.",
        cite: "Samira, 29, resident of a city at the centre of the crisis",
      },
      {
        type: "h2",
        text: "What is a home for",
      },
      {
        type: "img",
        src: "/images/society.jpg",
        caption:
          "For a growing share of the population, housing has become a source of precarity rather than security.",
      },
      {
        type: "p",
        text: "The economists call it a supply problem. The planners call it a land problem. The politicians call it a market problem. The people living through it call it something simpler: the sense that the future their parents described — of a home, a garden, a place to raise children — has been quietly cancelled, and nobody was asked to vote on the cancellation.",
      },
      {
        type: "p",
        text: "There are no easy endings to this story. But in every city we visited, there were people refusing to accept the arithmetic: community land trusts, co-operative builders, municipal developers, parents lending deposits, grandparents moving in to share the cost. None of it is enough, yet. All of it is a beginning.",
      },
    ],
  },
  {
    slug: "skyline-of-opportunity",
    title: "Skyline of Opportunity: Inside the Gulf's New World Order",
    subtitle:
      "The cities that built their fortunes on oil are spending them on something more durable — a bid to become the capitals of the new century.",
    excerpt:
      "On the ground in the Gulf's boom cities: the money, the migrants, and the transformation rewriting the region's place in the world.",
    category: "International",
    date: "2026-05-22",
    readTime: 9,
    image: "/images/international.jpg",
    imageCaption:
      "The Gulf's skyline is being rebuilt at a speed with few precedents in urban history.",
    featured: false,
    tags: ["Gulf", "Energy Transition", "Urbanism"],
    content: [
      {
        type: "p",
        text: "The first thing you notice is that the cranes outnumber the completed towers. The second thing you notice is who is operating them: a workforce drawn from half the world, sleeping in dormitories on the edge of town, building a future they will not be invited to inhabit.",
      },
      {
        type: "p",
        text: "The Gulf states are in the middle of the most ambitious urban transformation of the century. Having spent fifty years converting oil into money, they are now attempting the harder trick: converting money into durable global influence — in finance, in technology, in culture, in sport, in the institutions that set the rules of the world economy.",
      },
      {
        type: "h2",
        text: "The post-oil bet",
      },
      {
        type: "p",
        text: "The numbers are staggering even by the standards of the region's history. Hundreds of billions are committed to new cities, ports, airports, universities and research institutes. The stated goal is to end dependence on hydrocarbons within a generation.",
      },
      {
        type: "quote",
        text: "Oil bought us time. It did not buy us a future. The future has to be constructed — and construction, as we are learning, is the expensive part.",
        cite: "Regional economist, speaking in a capital city at the centre of the boom",
      },
      {
        type: "img",
        src: "/images/international.jpg",
        caption:
          "The region's bet on the post-oil era is visible in every skyline — and in the migrant labourers who build it.",
      },
      {
        type: "h2",
        text: "The workers the story forgets",
      },
      {
        type: "p",
        text: "Any honest account of the transformation must pause on the labour question. The construction boom is powered by a migrant workforce of millions, whose conditions have improved unevenly and remain the subject of sustained international criticism. The reforms are real; so is the distance still to travel.",
      },
      {
        type: "p",
        text: "Whether the bet succeeds will not be known for decades. What is already clear is that the Gulf's transformation is not a regional story. It is a global one: the flows of capital, people and ideas it generates are reshaping everything from European football to the architecture of the internet's newest data corridors.",
      },
      {
        type: "p",
        text: "The old world order is being renegotiated, and the negotiators are building skyline-sized arguments for their side.",
      },
    ],
  },
  {
    slug: "the-ink-is-dry",
    title: "The Ink Is Dry: Why Print Still Matters in the Age of Scrolling",
    subtitle:
      "We were told the newspaper was dead. Instead, something stranger happened: it became an object of desire again.",
    excerpt:
      "An opinion essay on the strange afterlife of print journalism in a world that has everything except time.",
    category: "Opinion",
    date: "2026-05-09",
    readTime: 5,
    image: "/images/opinion.jpg",
    imageCaption:
      "Everywhere the digital world promised to replace print, print has quietly, obstinately, survived.",
    featured: false,
    tags: ["Media", "Print", "Essay"],
    content: [
      {
        type: "p",
        text: "Somewhere around 2012 we were promised that the newspaper would die quietly, like the telegram and the cassette tape. It would be mourned at dinner parties, preserved in museums, and replaced by something faster, richer, more personal. The funeral was prepared. The eulogies were written.",
      },
      {
        type: "p",
        text: "The newspaper, however, did not read the obituary.",
      },
      {
        type: "h2",
        text: "The return of the object",
      },
      {
        type: "p",
        text: "The strangest development in the media business of the last decade is not a technology. It is the rediscovery of the paper object. Sales of physical books are rising. Vinyl outsells CDs. And the printed newspaper, pronounced dead so confidently, has found a new role: not as a vehicle of breaking news, but as a carrier of meaning.",
      },
      {
        type: "quote",
        text: "The newspaper was never a device for receiving information. It was a ritual for beginning a day. Rituals, it turns out, do not go extinct — they get rediscovered.",
        cite: "The argument in one sentence",
      },
      {
        type: "p",
        text: "There is a reason the most successful digital publications of our age design their websites to look like pages. The paper format — the columns, the serif type, the folded spine — encodes a promise the infinite feed cannot make: that what you are reading was chosen, arranged and given to you deliberately.",
      },
      {
        type: "h2",
        text: "What print taught the screen",
      },
      {
        type: "p",
        text: "This is not nostalgia, and it is not a plea to return to paper. It is an observation about attention. The screen optimises for more; the page optimises for better. The great journalistic failure of our time is not that we moved to digital — it is that we imported the habits of the feed into every medium, including our own newsrooms' priorities.",
      },
      {
        type: "p",
        text: "The ink is dry on the old business model, and no nostalgia will bring it back. But the ink is also dry on the arguments we wrote at its funeral. Journalism was never about the medium. It was about the promise: that someone, somewhere, read the whole thing carefully. That promise is the only thing that ever kept the presses running — and it is the only thing that will keep the screens glowing.",
      },
    ],
  },
  {
    slug: "wind-at-their-backs",
    title: "Wind at Their Backs: The Quiet Revolution of Renewable Power",
    subtitle:
      "Away from the summits and the slogans, a different energy transition is happening: in valleys, on coasts, and in the balance sheets of unlikely companies.",
    excerpt:
      "Reporting from three continents on the renewable boom that doesn't make headlines — and the economics that finally make it make sense.",
    category: "Business",
    date: "2026-04-24",
    readTime: 8,
    image: "/images/energy.jpg",
    imageCaption:
      "The turbines turn at night, in weather, and without fanfare — which is exactly how their owners prefer it.",
    featured: false,
    tags: ["Energy", "Climate", "Renewables"],
    content: [
      {
        type: "p",
        text: "The most important energy story of the decade is not being told at climate summits. It is happening in places like the Rann of Gujarat, the coast of Yorkshire, and the high desert of Chile — where the turbines turn and the panels gleam, and where the economics, for the first time in history, have stopped arguing against them.",
      },
      {
        type: "h2",
        text: "The moment the maths changed",
      },
      {
        type: "p",
        text: "For thirty years, the case for renewable energy rested on morality: it was the right thing to do. The industry lost that argument as often as it won it, because morality is a negotiable position. What happened instead, quietly and almost unnoticed, is that the mathematics changed.",
      },
      {
        type: "list",
        items: [
          "The cost of solar generation has fallen by 90 per cent in fifteen years",
          "Wind and solar now produce electricity more cheaply than new fossil plants in most of the world",
          "Battery storage costs have fallen below the threshold where grid-scale storage becomes routine",
        ],
      },
      {
        type: "quote",
        text: "Nobody at our board table says 'renewables are noble' anymore. They say 'renewables are cheaper'. That sentence is worth more than every summit declaration ever written.",
        cite: "Chief executive, utility company, Yorkshire",
      },
      {
        type: "img",
        src: "/images/energy.jpg",
        caption:
          "In coastal regions, offshore wind has moved from experiment to the largest single source of new generation capacity.",
      },
      {
        type: "h2",
        text: "The next bottleneck",
      },
      {
        type: "p",
        text: "The revolution now faces a bottleneck that no technology can fix: the grid itself. Decades of underinvestment mean that in many countries, the cheapest energy is being generated in the wrong place, at the wrong time, with no cables to carry it.",
      },
      {
        type: "p",
        text: "The result is a strange inversion: the biggest barrier to the energy transition is no longer ideology, or technology, or cost. It is planning law, grid engineering, and the slow, grinding work of consent. The turbines are ready. The future is waiting on a planning application.",
      },
    ],
  },
  {
    slug: "the-dark-web-of-trust",
    title: "The Dark Web of Trust: Cybersecurity After the Great Breach",
    subtitle:
      "When the hack that everyone feared finally arrived, it didn't look like a hack at all. It looked like an invoice.",
    excerpt:
      "Inside the year that changed how companies — and governments — think about the invisible war for their data.",
    category: "Technology",
    date: "2026-04-10",
    readTime: 9,
    image: "/images/cybersecurity.jpg",
    imageCaption:
      "The modern breach rarely announces itself with fireworks. It is discovered, months later, in the quiet corner of a finance spreadsheet.",
    featured: false,
    tags: ["Cybersecurity", "Data", "Trust"],
    content: [
      {
        type: "p",
        text: "On a Tuesday in March, the finance director of a mid-sized logistics company received an email that looked exactly like the quarterly invoice from their software supplier. It was not. By the time anyone noticed — fourteen days later — the attackers had been inside the company's systems for a month, and they had taken everything.",
      },
      {
        type: "p",
        text: "The Great Breach, as it came to be known, was not a single attack. It was a wave — dozens of companies, several hospitals, and two government agencies, all breached through the same mundane door: compromised supplier credentials. It was the largest coordinated data event in the region's history, and it changed nothing about how the world looks. That is the part that worries the people who study it.",
      },
      {
        type: "h2",
        text: "The supply-chain problem",
      },
      {
        type: "p",
        text: "Every organisation in the modern economy is connected to dozens — often hundreds — of suppliers, each with some degree of access to its systems. Security professionals call this the attack surface. The breach demonstrated what researchers had warned for years: the weakest link in any organisation's security is not its own staff, but its suppliers'.",
      },
      {
        type: "quote",
        text: "We spent two decades building castle walls and then connected them all with drawbridges that anyone could lower. The Great Breach was just the first to walk in over the bridge.",
        cite: "Head of threat intelligence, national cyber security agency",
      },
      {
        type: "img",
        src: "/images/cybersecurity.jpg",
        caption:
          "Behind every modern breach is a chain of trust — and the chain is only as strong as its least careful link.",
      },
      {
        type: "h2",
        text: "What comes after trust",
      },
      {
        type: "p",
        text: "The industry's answer has been a turn toward what specialists call 'zero trust': a philosophy that assumes no connection is safe, that verifies every request, and that treats the network as permanently hostile territory.",
      },
      {
        type: "p",
        text: "The harder question is cultural. The breach succeeded because of speed and silence: invoices are not examined, credentials are not questioned, and nobody wants to slow the business down. The security experts say the lesson of the Great Breach is not technical at all. It is that in the digital economy, trust is a liability — and the companies that will survive are the ones willing to be briefly, expensively, suspicious of everything.",
      },
    ],
  },
  {
    slug: "lights-camera-reinvention",
    title: "Lights, Camera, Reinvention: The Cinema Industry's Second Act",
    subtitle:
      "Streaming was supposed to kill the movie theatre. Instead, it forced the industry to remember what cinemas are actually for.",
    excerpt:
      "From repertory houses to the biggest chains, the industry that everyone wrote off is making a comeback on its own terms.",
    category: "Culture",
    date: "2026-03-27",
    readTime: 7,
    image: "/images/film.jpg",
    imageCaption:
      "The cinema is being reinvented not as a screen, but as a place — and places are exactly what the digital age runs out of.",
    featured: false,
    tags: ["Film", "Cinema", "Streaming"],
    content: [
      {
        type: "p",
        text: "The prediction was made with great confidence, repeated for a decade, and believed by almost everyone with a spreadsheet: streaming would finish the cinema. The economics were unanswerable. Why would anyone leave their house, pay for parking, and sit with strangers, when the entire history of film could be summoned to a sofa?",
      },
      {
        type: "p",
        text: "The industry's answer, it turns out, was to stop competing on convenience — and to start competing on everything convenience cannot provide.",
      },
      {
        type: "h2",
        text: "The theatre as a place",
      },
      {
        type: "p",
        text: "The surviving cinemas did not try to match the algorithm's catalogue. Instead, they rebuilt themselves as places: sites of occasion, where films are events rather than inventory. Midnight screenings with live orchestras. Repertory seasons curated by local archivists. Director Q&As, restoration premieres, film festivals built around a single building.",
      },
      {
        type: "quote",
        text: "A film on a screen at home is content. A film in a room with two hundred strangers is an event. We stopped selling content. We sell the event.",
        cite: "Programme director, independent cinema, Copenhagen",
      },
      {
        type: "img",
        src: "/images/film.jpg",
        caption:
          "From restored classics to midnight premieres, the programmes that fill seats are the ones that cannot be streamed.",
      },
      {
        type: "h2",
        text: "The numbers nobody predicted",
      },
      {
        type: "p",
        text: "The recovery has been uneven but real. Attendance at independent and repertory houses has grown for four consecutive years. The big chains, after a brutal consolidation, have stabilised by investing in what cannot be compressed: projection quality, sound, and the sheer spectacle of scale.",
      },
      {
        type: "p",
        text: "None of this means the cinema's old business model is back. It is not. But something more interesting has happened: the industry has stopped trying to be a delivery service and remembered it is a gathering place. In a culture drowning in content, the rare and precious commodity is not the film — it is the occasion.",
      },
    ],
  },
];

// ---------- Helpers (do not edit below) ----------

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticle() {
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getLatestArticles(count = 6) {
  return [...articles]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);
}

export function getRelatedArticles(article, count = 3) {
  const sameCategory = articles.filter(
    (a) => a.slug !== article.slug && a.category === article.category
  );
  const others = articles.filter(
    (a) => a.slug !== article.slug && a.category !== article.category
  );
  return [...sameCategory, ...others].slice(0, count);
}

export function getAdjacentArticles(article) {
  const ordered = [...articles].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const index = ordered.findIndex((a) => a.slug === article.slug);
  return {
    previous: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}

export function getArticlesByCategory(category) {
  return articles.filter((a) => a.category === category);
}

export function formatDate(dateString) {
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}