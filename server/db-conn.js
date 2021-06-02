const { Sequelize, DataTypes, Op } = require('sequelize')

// Development
const db = new Sequelize('mysql://root:4LUPPOLI@localhost:3306/dbtest', {})
// Production
// const pg = require('pg')
// pg.defaults.ssl = true
// const db = new Sequelize(process.env.DATABASE_URL, {
//   ssl: true,
//   dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
// })

/**
 * Function to define the structure of the database
 */
function defineDBStructure() {
  const Service = db.define(
    'service',
    {
      banner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: DataTypes.STRING,
      subTitle: DataTypes.TEXT,
      description: DataTypes.TEXT,
      serviceDescription: DataTypes.TEXT,
      altBanner: DataTypes.TEXT,
      partnerDescription: DataTypes.TEXT,
      s1Name: DataTypes.STRING,
      s1Description: DataTypes.STRING(1000),
      s1Logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      s2Name: DataTypes.STRING,
      s2Description: DataTypes.STRING(1000),
      s2Logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      s3Name: DataTypes.STRING,
      s3Description: DataTypes.STRING(1000),
      s3Logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      p1Name: DataTypes.STRING,
      p1Logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      p2Name: DataTypes.STRING,
      p2Logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      p3Name: DataTypes.STRING,
      p3Logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      altP1: DataTypes.TEXT,
      altP2: DataTypes.TEXT,
      altP3: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  )
  const CaseStudy = db.define(
    'casestudy',
    {
      title: DataTypes.STRING,
      subTitle: DataTypes.TEXT,
      banner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      altBanner: DataTypes.TEXT,
      descriptiveText: DataTypes.STRING(800),
      challengeTitle: DataTypes.STRING,
      challengeDescription: DataTypes.TEXT,
      solutionTitle: DataTypes.STRING,
      solutionDescription: DataTypes.TEXT,
      personName: DataTypes.STRING,
      createdData: DataTypes.STRING,
      partnerWebsite: DataTypes.STRING,
    },

    {
      timestamps: false,
    }
  )
  const TeamMember = db.define(
    'teammember',
    {
      occupation: DataTypes.STRING,
      teamsTitle: DataTypes.STRING,
      personName: DataTypes.STRING,
      personPhoto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  )
  const Area = db.define(
    'area',
    {
      banner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: DataTypes.STRING,
      subTitle: DataTypes.TEXT,
      evocativeImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: DataTypes.TEXT,
      servicesDescription: DataTypes.TEXT,
      caseStudyDescription: DataTypes.TEXT,
      teamDescription: DataTypes.TEXT,
      //nome e job dei team member li prendiamo dalla tabella dei teamMember
      altBanner: DataTypes.TEXT,
      altEvocativeImage: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  )
  const Partner = db.define(
    'partner',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      website: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  )

  const ServiceCaseStudy = db.define('servicecasestudy')

  const PersonCaseStudy = db.define('personcasestudy')

  Area.hasMany(Service, { foreignKey: 'areaID' })
  Area.hasMany(CaseStudy, { foreignKey: 'areaID' })
  Area.hasMany(TeamMember, { foreignKey: 'areaID' })

  Service.belongsToMany(CaseStudy, { through: ServiceCaseStudy })

  CaseStudy.belongsToMany(Service, { through: ServiceCaseStudy })
  CaseStudy.belongsToMany(TeamMember, { through: PersonCaseStudy })
  CaseStudy.belongsTo(Area, { foreignKey: 'areaID' })
  TeamMember.belongsToMany(CaseStudy, { through: PersonCaseStudy })

  db._tables = {
    Area,
    Service,
    CaseStudy,
    TeamMember,
    ServiceCaseStudy,
    PersonCaseStudy,
    Partner,
  }
}

async function insertRealData() {
  const { Service, CaseStudy, Area, TeamMember, Partner } = db._tables

  //** ------------------------------------------------------------ AREAS --------------------------------------------------------------- */

  //**INSERT AREAS */
  const Security = await Area.create({
    title: 'Security',
    subTitle:
      'Wherever your business goes, whoever it works with, you need cybersecurity that covers it all.',
    description:
      'Anytime. Anywhere. We create cybersecurity tailored to your specific business needs. We defend against cyberattacks with proactive, focused,  industry-relevant threat intelligence to give you the confidence that  comes from knowing your business is secure.',
    banner: 'https://i.ibb.co/X5FrLTP/Frame-6.png',
    evocativeImage: 'https://i.ibb.co/Ny7F40s/security.png',
    servicesDescription:
      'We are unique among IT security consulting firms. We combine security technology engineering, intelligence expertise and our data science DNA to help companies manage digital risk end-to-end.',
    caseStudyDescription:
      'Reimagining business through experience. The following case studies demonstrate how our company is an expert in the business of creating comprehensive experiences from start to finish.',
    teamDescription:
      'Ideate, innovate, change the world, repeat. Meet our team of talented people using design thinking to create experiences that win awards and make headlines.',
    altBanner: 'Image representing Security Area',
    altEvocativeImage: 'Image evocative of Security Area',
  })
  const IoT = await Area.create({
    title: 'Internet Of Things',
    subTitle:
      'Acting as the bridge between the physical and the digital world, IoT offers a huge opportunity for companies.',
    description:
      'We help clients effectively capitalize on IoT technology and solutions, linking technology, vendors and customers through a holistic business model. IoT describes the connection of devices to the internet using embedded software and sensors to communicate, collect and exchange data with one another. IoT combines connectivity with sensors, devices and people, enabling a form of free-flowing conversation between man and machine, software and hardware. With IoT, the world is wide open, offering a virtually endless array of opportunities and connections at home, at work or at play.',
    banner: 'https://i.ibb.co/Pwt4Z5J/Frame-5.png',
    evocativeImage: 'https://i.ibb.co/zRPbmf1/iot.png',
    servicesDescription:
      'The growth of IoT is paving the path for new business avenues. The pertinent question for enterprises is no longer if their business benefits from IoT adoption - but rather what IoT functionalities can be best used to their advantage.',
    caseStudyDescription:
      'Reimagining business through experience. The following case studies demonstrate how our company is an expert in the business of creating comprehensive experiences from start to finish.',
    teamDescription:
      'Ideate, innovate, change the world, repeat. Meet our team of talented people using design thinking to create experiences that win awards and make headlines.',
    altBanner: 'Image representing Interner of Things Area',
    altEvocativeImage: 'Image evocative of Interner of Things Area',
  })
  const CloudComputing = await Area.create({
    title: 'Cloud Computing',
    subTitle: 'Modernize your IT environment and improve business efficiency',
    description:
      'Having been a major driving force of the ongoing digital revolution, the Cloud has completely changed the way enterprises run their operations - from IT infrastructure management, through financial administration, to data exchange. At HexTech, we can move your existing IT environment to the Cloud, as well as provide a wide range of cloud-driven applications to help your company gain a competitive advantage. Scroll through this space to learn more.',
    banner: 'https://i.ibb.co/crjyD7n/Frame-7.png',
    evocativeImage: 'https://i.ibb.co/hf3LHBb/cloud.png',
    servicesDescription:
      "As a result of the on-going digital revolution, the Cloud and business environment have become inseparable. Providing a foundation strong enough to support millions of operations at the same time, cloud computing has played a major role in the development of today's information-driven enterprises. Join them to: - Accelerate your company's digital transformation - Reduce workload and operational costs - Improve the performance of your systems and applications",
    caseStudyDescription:
      'Reimagining business through experience. The following case studies demonstrate how our company is an expert in the business of creating comprehensive experiences from start to finish.',
    teamDescription:
      'Ideate, innovate, change the world, repeat. Meet our team of talented people using design thinking to create experiences that win awards and make headlines.',
    altBanner: 'Image representing Cloud Computing Area',
    altEvocativeImage: 'Image evocative of Cloud Computing Area',
  })
  // isi
  const CustomerExperience = await Area.create({
    title: 'Customer Experience',
    subTitle:
      'Understanding what customer experience is and why it’s no longer enough. We are reinventing business through this.',
    description:
      'The way we interact with brands and companies has changed. We typically associate the customer experience with a traditional and interaction directly found inside a store with a specific aesthetic. he world has changed, and so has the business model: digitalisation had an huge impact on our existence, leading companies to shape a whole new entrepreneurial perspective. But it’s not just because of this. Many customer behaviour patterns have evolved and the company must be able to understand their needs and needs, possibly anticipating and surprising them.',
    banner: 'https://i.ibb.co/XpSgKYj/ce-grande.png',
    evocativeImage: 'https://i.ibb.co/pxH7fJ1/customer-experience.png',
    servicesDescription:
      'Hear how businesses have transformed how they work: Great experiences are no longer only a business accessory, they are of vital importance.',
    caseStudyDescription:
      'Reimagining business through experience. The following case studies demonstrate how our company is an expert in the business of creating comprehensive experiences from start to finish.',
    teamDescription:
      'Ideate, innovate, change the world, repeat. Meet our team of talented people using design thinking to create experiences that win awards and make headlines.',
    altBanner: 'Image representing Customer Experience Area',
    altEvocativeImage: 'Image evocative of Customer Experience Area',
  })
  const BigDataAnalysis = await Area.create({
    title: 'Big Data Analytics',
    subTitle:
      'Analyze data from your database with a data driven approach to take important decisions inside your company.',
    description:
      'The science of analyzing raw data in order to make conclusions about that information, revealing reveal trends and metrics. Through our specialist your company will be more efficient in taking decisions. This process of analysis allows to operate a predictive analysis, that is, it allows to know in advance what will happen: this becomes possible because if we have a model and we have enough historical data we can determine what will happen in the near future with bases or statistical foundations.',
    banner: 'https://i.ibb.co/F3W2W73/Frame-8.png',
    evocativeImage: 'https://i.ibb.co/KDhJdh0/data.png',
    servicesDescription:
      'AI is only as smart as the insights that fuel it. We can help you unlock powerful analytics insights by tapping into data you did not even know you had.',
    caseStudyDescription:
      'Reimagining business through experience. The following case studies demonstrate how our company is an expert in the business of creating comprehensive experiences from start to finish.',
    teamDescription:
      'Ideate, innovate, change the world, repeat. Meet our team of talented people using design thinking to create experiences that win awards and make headlines.',
    altBanner: 'Image representing Big Data Analytics Area',
    altEvocativeImage: 'Image evocative of Big Data Analytics Area',
  })
  //**END OF AREAS */

  //** ------------------------------------------------------------ SERVICES --------------------------------------------------------------- */

  //**SECURITY SERVICES */
  const ModernFraudProtection = await Service.create({
    title: 'Modern Fraud Protection Software',
    subTitle: 'Detect and combat fraud more efficiently with AI',
    description:
      'Enterprises lose billions of dollars a year due to fraud. Bogus payments, money laundering, loyalty program fraud and cyber security incidents, just to name a few. Enterprises have explored a wide variety of ways to combat fraud, including hiring additional staff which has proven ineffective. It’s time-consuming, and nearly impossible to investigate every claim. The perpetrators of fraud are highly sophisticated, and their techniques evolve quickly, often making solutions obsolete just as soon as they’re implemented.',
    banner: 'https://www.researchdive.com/blogImages/FrALRKwcsi.jpeg',
    serviceDescription:
      'HexTech Fraud Protection software is a platform which significantly increases the efficiency of suspicious event detection compared to rule-based methods. The solution is based on machine learning, which is a state-of-the-art approach where Artificial Intelligence (AI) is used for creating models that, based on historical data, can determine the occurrence of suspicious events with high accuracy.',
    s1Name: 'Detect anomalies and classify events',
    s1Description:
      'Our fraud detection software recognizes relationships and similarities between data and can detect anomalies – events that do not conform to an expected pattern in a data set.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Act in real time',
    s2Description:
      'Once an anomaly is detected, immediate action can be taken to prevent fraudulent activities. Our software works in real-time.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Monitor and analyze',
    s3Description:
      'You can easily analyze fraudulent events, extract insights, and improve your security. Reporting modules allow for an effective investigation of abusive activities. Our AI is transparent and generates explanations for its decisions.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'Since security is an integral part of a great company, we offer 24h consulting and all of our know how to help you protect your business.',
    p1Name: 'AWS',
    p1Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p2Name: 'Xiaomi',
    p2Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p3Name: 'Coca-Cola',
    p3Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    altBanner: 'Evocative image of Modern Fraud Protection Software service',
    altP1: 'evocative image of AWS partner',
    altP2: 'evocative image of Xiaomi partner',
    altP3: 'evocative image of Coca-Cola partner',
  })
  await Security.addService(ModernFraudProtection.id)

  const ManagedSecurity = await Service.create({
    title: 'Managed Security',
    subTitle:
      "Explore the latest managed security services for today's hybrid cloud world",
    description:
      'Providing superior monitored and managed security services to your expanding network perimeter 24x7',
    banner:
      'https://dnewpydm90vfx.cloudfront.net/wp-content/uploads/2018/11/Cyber-security-e-managed-services.jpg',
    serviceDescription:
      'HexTech Managed Security Services (MSS) helps security leaders obtain prescriptive actions, contextual insights, and transparent reporting so they can make more informed decisions for their organization. Our MSS capabilities help reduce the time spent on low value alerts so you can focus on the right priorities.',
    s1Name: 'Fully managed security',
    s1Description:
      'As your trusted advisors, HexTech specialists help you address your security needs, from the simplest to the most complex, monitoring and managing security incidents 24x7x365. Our people, technology, facilities and processes are among the best in the world.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'An extended-team approach',
    s2Description:
      'Your organization may have working tools and processes but could benefit from trusted security advisors. HexTech Managed Security Services can augment your security program with tailored services, including threat, cloud, infrastructure, data, identity and response management.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Transformational initiatives',
    s3Description:
      'Some organizations require help with developing a continuous improvement process to protect their enterprise during multi-year projects. HexTech MSS specialists can help optimize, fine-tune, and improve security program efficiency for the long-term.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts working on many industries.',
    p1Name: '......',
    p1Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p2Name: '......',
    p2Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p3Name: '......',
    p3Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    altBanner: 'Evocative image of Managed Security service',
    altP1: 'Evocative image of ... partner',
    altP2: 'Evocative image of ... partner',
    altP3: 'Evocative image of ... partner',
  })

  const NetworkProtection = await Service.create({
    title: 'Network Protection',
    subTitle: 'Keep online fraudsters at bay.',
    description:
      'Cyber Network Protection is a powerful monitoring solution designed to guard firms and institutions against online frauds. The solution tracks both user and device activity to calculate a unique scoring for authentication, authorization, and more.',
    banner:
      'https://www.cellusys.com/wp-content/uploads/2019/12/roaming-steering-of-roaming-logo-blue.svg',
    serviceDescription:
      'HexTech Cyber Threat Protection (CTP) is a transparent anti-fraud system that can work on both user workstations and mobile devices. Based on the analysis of user work environment, the system returns a scoring that serves as a basis for further decisions, such as introducing 2FA, terminating operations, or making a telephone verification. HexTech Cyber Threat Protection has a modular structure, so you can order only those modules that suit you best.',
    s1Name: 'Comprehensiveness',
    s1Description: 'Compatibility with both workstations and mobiles.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'User-friendliness',
    s2Description: 'No need for any extra software.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Usability',
    s3Description: 'Frictionless identification/authorization steps.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts working on many industries.',
    p1Name: '......',
    p1Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p2Name: '......',
    p2Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p3Name: '......',
    p3Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    altBanner: 'Evocative image of Network Protection service',
    altP1: 'Evocative image of ... partner',
    altP2: 'Evocative image of ... partner',
    altP3: 'Evocative image of ... partner',
  })

  const DataSecurity = await Service.create({
    title: 'Data Security',
    subTitle:
      'Comprehensive data protection for the most critical enterprise data',
    description:
      'Workload migration to hybrid cloud environments increases the attack surface, which can result in a host of new data security and compliance challenges.',
    banner:
      'https://bestarion.com/wp-content/uploads/2020/08/what-is-data-security-pillar-top-illustration-featured.png',
    serviceDescription:
      'A robust data-centric cybersecurity program can provide you comprehensive data protection, centralized visibility and monitoring against unauthorized access, exposure, or data theft across your enterprise data landscape.',
    s1Name: 'Backup & Recovery',
    s1Description:
      'An essential part of any business continuity plan is a robust backup & recovery strategy. In case of uncertain events, companies need to protect their prime asset, which is data. We apply the latest backup & recovery techniques to ensure complete data protection.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Data protection & Security',
    s2Description:
      'We ensure the confidentiality, integrity, and availability of your data by protecting it against any unauthorized access.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Compliance Assessment',
    s3Description:
      'We assist in identifying gaps between the existing control environment and the required one. The compliance risk assessment is implemented to identify potential risks in the system. We also help with compliance testing and the remediation process to ensure the integrity of your data.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'Since user apps are an integral part of a smart city, we offer mobile consulting, UI/UX design, native (iOS, Android) and cross-platform (Cordova/PhoneGap, Xamarin, React Native) development, as well as mobile testing.',
    p1Name: 'Flutter',
    p1Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p2Name: 'Salesforce',
    p2Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p3Name: '......',
    p3Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    altBanner: 'Evocative image of Data Security service',
    altP1: 'Evocative image of Flutter partner',
    altP2: 'Evocative image of Salesforce partner',
    altP3: 'Evocative image of ... partner',
  })

  const IdentityAccessManagement = await Service.create({
    title: 'Identity Access Management',
    subTitle:
      'Get your workforce and consumer IAM program on the road to success.',
    description:
      'Identity and access management (IAM) is essential for security and regulatory compliance. It can also be a significant undertaking without the right skills, strategy and support from identity and security experts to help you architect and manage solutions across hybrid cloud environments and leading IAM products and platforms.',
    banner:
      'https://www.cisco.com/c/dam/assets/swa/img/anchor-info/what-is-iam-banner-628x353.png',
    serviceDescription:
      'It’s a tricky balance: facilitate near-ubiquitous access to the apps and tools your users need to help grow the business, but also protect sensitive information from security threats. You need a solid IAM design to enable more cost-efficient and effective access management, authentication, identity management and governance across your enterprise to help prevent security risks.',
    s1Name: 'Custom solution design',
    s1Description:
      'Align IAM with your business priorities to help manage regulatory compliance, strengthen security posture or enable better user access.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Integration',
    s2Description:
      'Use existing assets and automation within an integrated technology framework, to integrate IAM with business and human resources functions.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Scalable for future requirements',
    s3Description:
      'Look beyond your immediate IAM project to architect, design and implement a solution for your current and future business requirements.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'Plan and execute a cloud identity and access management (IAM) program transformation.',
    p1Name: 'Philips',
    p1Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p2Name: 'Cisco',
    p2Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p3Name: '......',
    p3Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    altBanner: 'Evocative image of Identity Access Management service',
    altP1: 'Evocative image of Philips partner',
    altP2: 'Evocative image of Cisco partner',
    altP3: 'Evocative image of ... partner',
  })

  const SecurityAssessmentAndPlanning = await Service.create({
    title: 'Security Assessment and Planning',
    subTitle:
      'Making your organization the best it can be starts with a plan; security is no different. ',
    description:
      'HexTech uses our proven assessment and planning tools to clearly identify your security risks and plan for the appropriate short and long term actions designed to keep your organization secure.',
    banner: 'http://jwhightech.com/asset/images/assesment.jpg',
    serviceDescription:
      'Risk is a compilation of threats and vulnerabilities as they relate to specific assets. Sentinel’s unique risk assessment methodology uses information collected in the field and through our data partners to identify threats, vulnerabilities and security concerns, so that appropriate and cost effective mitigation efforts can be designed and deployed.',
    s1Name: 'Threat Assessments',
    s1Description:
      'Understanding your security threats will help you define how to organize and prepare your security planning.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Gap Analisys',
    s2Description:
      'This analysis of security systems and operations is both qualitative and quantitative, reporting on the delta between the actual conditions vs. required level of performance.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Security Master Planning',
    s3Description:
      ' We understand the complexities of rolling out an enterprise approach to security while justifying costs and key economization factors.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerTitle: '',
    partnerDescription:
      'Use a root key to encrypt and decrypt the keys that protect your data.',
    p1Name: 'Flutter',
    p1Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p2Name: 'Salesforce',
    p2Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p3Name: '......',
    p3Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    altBanner: 'Evocative image of Security Assessment and Planning service',
    altP1: 'Evocative image of ... partner',
    altP2: 'Evocative image of ... partner',
    altP3: 'Evocative image of ... partner',
  })

  const KeyProtect = await Service.create({
    title: 'Key Protect',
    subTitle:
      'Get visibility and control of encryption keys throughout the key lifecycle, from a single location',
    description:
      'You’re using key protection for data security and compliance. But full encryption visibility and control are essential.',
    banner:
      'https://cdn3.iconfinder.com/data/icons/security-and-protection-31/53/46-512.png',
    serviceDescription:
      'The HexTech® Key Protect for HexTech Cloud® service helps you provision and store encrypted keys for apps across HexTech Cloud services, so you can see and manage data encryption and the entire key lifecycle from one central location.',
    s1Name: 'Robust security',
    s1Description:
      'Provision and store keys using FIPS 140-2 Level 3 certified HSMs.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Control and Visiblity',
    s2Description:
      'Use the Activity Tracker to monitor user and app activities.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Usage costs insights',
    s3Description:
      ' View usage by account or by resource type to see where your money is going.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerTitle: '',
    partnerDescription:
      'Since user apps are an integral part of a smart city, we offer mobile consulting, UI/UX design, native (iOS, Android) and cross-platform (Cordova/PhoneGap, Xamarin, React Native) development, as well as mobile testing.',
    p1Name: 'Flutter',
    p1Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p2Name: 'Salesforce',
    p2Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p3Name: '......',
    p3Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    altBanner: 'Evocative image of key protection service',
    altP1: 'Evocative image of ... partner',
    altP2: 'Evocative image of ... partner',
    altP3: 'Evocative image of ... partner',
  })

  await Security.addService(ModernFraudProtection.id)
  await Security.addService(NetworkProtection.id)
  await Security.addService(DataSecurity.id)
  await Security.addService(IdentityAccessManagement.id)
  await Security.addService(SecurityAssessmentAndPlanning.id)
  await Security.addService(KeyProtect.id)

  //**END OF SECURITY SERVICES */

  //**IOT SERVICES */
  const SmartCities = await Service.create({
    title: 'Smart Cities',
    subTitle:
      'A smart city system gathers and analyzes data from sensors and smart devices to enable efficient management of urban processes (e.g., transportation, lighting). With 9-year experience in IoT, HexTech designs and implements end-to-end IoT solutions to bring smart city vision to reality.',
    description:
      'Municipalities of all sizes around the world are adopting smart city concepts based on Internet of Things (IoT) systems to optimize the efficient management of community assets, resources, operations and services. Smart cities foster service-oriented, sustainable local governance equipped to improve transportation systems, build energy-efficient infrastructure, decrease environmental pressures, maintain effective disaster response, and provide state-of-the-art security in public spaces. We work to serve each community with the appropriate smart city services and solutions according to its individual needs and unique vision.',
    banner:
      'https://kritikalsolutions.com/wp-content/uploads/2019/10/smart-cities-banner.jpg',
    serviceDescription:
      'Our services have been developed to ensure that wireless technology used in smart city strategies complies with established interoperability, cyber security, data privacy, operational safety, and performance reliability standards. We provide you the expertise you need in supplying, planning, building, and sustaining a connected and effective smart city. We serve you with comprehensive smart city services from a single source to save you time and money.',
    s1Name: 'Road Traffic',
    s1Description:
      'Our smart traffic systems take intelligent actions based on the careful “study” of traffic flow, bringing human intervention down to a minimum.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Lighting',
    s2Description:
      'Connecting sensors, across the street lighting system, helps to consume less energy and bringing down energy costs.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Safety',
    s3Description:
      'For enhancing public safety, we connect cameras, microphones and movement sensors to a smart city platform and power it with robust analytics tools.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'Since user apps are an integral part of a smart city, we offer mobile consulting, UI/UX design, native (iOS, Android) and cross-platform (Cordova/PhoneGap, Xamarin, React Native) development, as well as mobile testing.',
    p1Name: 'Flutter',
    p1Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p2Name: 'Salesforce',
    p2Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p3Name: 'Google Cloud',
    p3Logo: 'https://i.ibb.co/JqkrKTp/cloud-200.png',
    altBanner: 'Evocative image of Smart Cities service',
    altP1: 'Evocative image of Flutter partner',
    altP2: 'Evocative image of Salesforce partner',
    altP3: 'Evocative image of Google Cloud partner',
  })
  await IoT.addService(SmartCities.id)

  const SmartLighting = await Service.create({
    title: 'Smart-lighting',
    subTitle:
      'Flexible and scalable smart IoT lighting solution for cities as well as municipal and enterprise buildings. It can be easily integrated with existing infrastructure or extended by 3rd party systems and it always remains a platform for further extensions.',
    description:
      'Illumination systems are an essential part of urban infrastructure. They contribute to the sense of security in public areas and highlight the architectural beauty of cities around the world. Today we can go one step further by embracing a combination of modern IoT solutions and illumination systems. This combination creates smart city technology and  is used as innovative smart street lighting system.',
    banner:
      'https://statetechmagazine.com/sites/statetechmagazine.com/files/styles/cdw_hero/public/articles/StateTech/201710/ST_Smart_Street_Lights_GettyImages-173553089.jpg?itok=rktclHwy',
    serviceDescription:
      'Organizations and government agencies across the world are facing increased pressure to find ways to become more energy efficient while reducing costs. Outdoor lighting is a great place to start as public and commercial lighting infrastructure is expensive and one of the greatest contributors to energy waste. The Internet of Things (IoT) makes it easy for public and private organizations to conserve more energy with smart lighting systems.',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts working on many industries.',
    s1Name: 'Reduce energy costs',
    s1Description:
      'With connected lighting, your organization can monitor usage and provide lighting as needed in different areas based on their unique needs.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Make your city a safer place',
    s2Description:
      'Smart lighting provides a greater sense of security and overall better experience for citizens as it helps cities enhance public safety',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Remote maintenance of smart lights',
    s3Description:
      'HexTech Smart Lighting Solution allows secure and reliable short distance communication, distributed control and remote smartlights management',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    p1Name: 'Google Cloud',
    p1Logo: 'https://i.ibb.co/JqkrKTp/cloud-200.png',
    p2Name: 'Arduino',
    p2Logo: 'https://i.ibb.co/KDcLxdy/arduino.png',
    p3Name: 'Amazon Web Services',
    p3Logo: 'https://i.ibb.co/gzDM3yG/amazon-200.png',
    altBanner: 'Evocative image of Smart-lighting service',
    altP1: 'Evocative image of Google Cloud partner',
    altP2: 'Evocative image of Arduino partner',
    altP3: 'Evocative image of Amazon Web Services partner',
  })
  await IoT.addService(SmartLighting.id)

  const Automotive = await Service.create({
    title: 'Automotive',
    subTitle:
      'HexTech IoT Connected Vehicle Insights is connected car software that integrates real-time data about drivers, vehicles and the environment to optimize the in-car experience. The dedicated cloud service streams data from vehicle sensors and uses analytics and AI to understand driver behavior. It links with other information systems in the cloud, such as weather and traffic, to add context and situational awareness.',
    description:
      'Cars have become one of the fastest-growing mobile device category, with every vehicle turning into a node in a much larger network and ecosystems. The ongoing (re)evolution in terms of connectivity, electric, autonomous and mobility trends is full of great opportunities to achieve new revenue streams and improve quality of life in the near future. Yet, as with all new opportunities, challenges, disruptions and risks arise.',
    banner:
      'https://www.consorziosicurezza.com/wp-content/uploads/2018/10/smart-car-resized.jpg',
    serviceDescription:
      'The potential for connected vehicles during the interim, however, is an exciting, multi-faceted and high-growth area in the IoT’s development – enabling enhanced road safety, smart traffic management, advanced navigation assistance, passenger entertainment and much more.',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts working on many industries.',
    s1Name: 'Automotive-grade M2M technology',
    s1Description:
      'A new lifestyles offering a suite of advanced features including mobile Wi-Fi hotspot, Internet radio, Web services and an improved navigation system.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Thales Automotive Connectivity',
    s2Description:
      'Automotive-grade eSIMs leadership position, to identify vehicles, encrypt and secure communications. eSIMs also ensure remote connectivity provisioning as well as seamless connectivity.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Customer Engagement',
    s3Description:
      'Modern customers must have smarter, ‘connected’ cars, and appreciate innovative marketing as much as they like innovations with their vehicles.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    p1Name: 'Google Cloud',
    p1Logo: 'https://i.ibb.co/JqkrKTp/cloud-200.png',
    p2Name: 'Arduino',
    p2Logo: 'https://i.ibb.co/KDcLxdy/arduino.png',
    p3Name: 'Amazon Web Services',
    p3Logo: 'https://i.ibb.co/gzDM3yG/amazon-200.png',
    altBanner: 'Evocative image of Automotive service',
    altP1: 'Evocative image of Google Cloud partner',
    altP2: 'Evocative image of Arduino partner',
    altP3: 'Evocative image of Amazon Web Services partner',
  })
  await IoT.addService(Automotive.id)

  const SmartRetail = await Service.create({
    title: 'Smart Retail',
    subTitle:
      'Adaptive retail is the new imperative for retailers. With global disruption, external pressures and responsibilities, retailers need to be able to adapt. Adapting means evolving, and evolution is how to stay resilient.',
    description:
      'The increasing number of connected devices will lead to the emergence of a so-called connected ecosystem as a new paradigm of the interaction among manufacturers, sellers, and consumers, offering totally new opportunities and challenges to all the parties involved.',
    banner:
      'https://www.zerynth.com/wp-content/uploads/2020/02/smart-retail.jpg',
    serviceDescription:
      'Retail was among the first industries to adopt IoT. According to a research, in the coming years, retailers will further increase their spend on IoT, which is expected to reach $2.5 billion. Below, we list the trends that will drive a new, consumer-centric retail model enabled by IoT technology.',
    partnerDescription:
      'No challenge is out of reach. We extend our industry expertise and comprehensive IoT services through a vast global network of market leaders and innovators.',
    s1Name: 'Automation',
    s1Description:
      'Smart price tags will adjust prices in real time, based on the item’s popularity, expiry date, and other factors. ',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Agile workforce',
    s2Description:
      'With the advancement of technologies, courses and webinars are already accessible for anyone, anytime, and from any device.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Connectivity platforms',
    s3Description:
      'In the retail industry, connectivity platforms may take multiple forms: from large marketplaces, such as Amazon and Alibaba, to online payment systems and device communication hubs.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    p1Name: 'Amazon Web Services',
    p1Logo: 'https://i.ibb.co/gzDM3yG/amazon-200.png',
    p2Name: 'Arduino',
    p2Logo:
      'https://i.ibb.co/KDcLxdy/arduino.png',
    p3Name: 'Arm Intel',
    p3Logo:
      'https://internetofbusiness.com/wp-content/uploads/2018/10/Intel-ARM-Licensing-Deal-640x400.png',
    altBanner: 'Evocative image of Smart Retail service',
    altP1: 'Evocative image of Amazon Web Services partner',
    altP2: 'Evocative image of Arduino partner',
    altP3: 'Evocative image of Arm Intel partner',
  })
  await IoT.addService(SmartRetail.id)

  const Healthcare = await Service.create({
    title: 'IoT Solutions for Healthcare',
    subTitle:
      'Medical IoT facilitates monitoring patient health state and tracking medical staff and assets through the network of smart devices and sensors connected to the cloud. With 9 years in IoT, HexTech provides reliable IoMT solutions to improve patient care, asset use, and staff productivity.',
    description:
      'The health industry has been an early adopter of the internet of things (IoT). Nearly half (46%) of executives who participated in the survey said their organization is actively using IoT, and another 21% stated they have IoT projects in development. Their main ambition is efficiency: 54% already use IoT to improve operations, and another 21% plan to do so in the next two years. Overall, health industry execs are optimistic, with 90% believing that IoT’s benefits outweigh its risks. In addition, 79% believe that IoT will help them grow revenue or increase profits.',
    banner:
      'https://iotbusinessnews.com/WordPress/wp-content/uploads/digital-health.jpg',
    serviceDescription:
      'What we are approaching is a world where basic healthcare would become out of reach to most people, a large section of society would go unproductive owing to old age and people would be more prone to chronic disease. While technology can’t stop the population from ageing or eradicate chronic diseases at once, it can at least make healthcare easier on a pocket and in term of accessibility. Technology can move the routines of medical checks from a hospital (hospital-centric) to the patient’s home (home-centric).',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts working on many industries.',
    s1Name: 'Locating and managing assets',
    s1Description:
      'Knowing the exact location of life-saving devices and essential equipment like infusion pumps results in fewer delays for patients and helps optimize machine use.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Capturing data to drive better outcomes',
    s2Description:
      'Home monitoring of patients using connected blood pressure, glucose and other devices, which enables doctors and nurses to track patients more closely and identify individuals who are at risk.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Enhancing the employee and patient experience',
    s3Description:
      'Medical teams can track the location of patients wearing wristbands with sensors and deliver relevant information to families via their smartphones.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    p1Name: 'Google Cloud',
    p1Logo: 'https://i.ibb.co/JqkrKTp/cloud-200.png',
    p2Name: 'Arduino',
    p2Logo: 'https://i.ibb.co/KDcLxdy/arduino.png',
    p3Name: 'Amazon Web Services',
    p3Logo: 'https://i.ibb.co/gzDM3yG/amazon-200.png',
    altBanner: 'Evocative image of IoT Solutions for Healthcare service',
    altP1: 'Evocative image of Google Cloud partner',
    altP2: 'Evocative image of Arduino partner',
    altP3: 'Evocative image of Amazon Web Services partner',
  })
  await IoT.addService(Healthcare.id)

  const IndustrialManufacturing = await Service.create({
    title: 'Industrial Manufacturing',
    subTitle:
      'Industrial manufacturers are using IoT across the business: 60% on projects within their facilities, 57% with supply chain and other partners, 42% with end consumers and 58% with their business customers. Their top focus areas are logistics, supply chain and employee and customer operations.',
    description:
      'Industrial manufacturing firms are addressing these concerns by improving the tech infrastructure, deploying better data management methods and addressing workforce culture and change management. They also are taking steps to mitigate IoT’s challenges. For example, 60% are addressing AI bias, ethics and responsibility, 58% are working with partners to better manage ecosystems and 44% are developing more robust policies to address the impact of AI and IoT on data privacy.',
    banner:
      'https://www.sensrtrx.com/wp-content/uploads/2019/06/IoT-Manufacturing-Future.png',
    serviceDescription:
      'Most (81%) industrial manufacturers surveyed reported that they are making operations more efficient through the use of IoT. Forty-three percent have already benefited from using IoT-based asset management, and 41% expect to do so within two years. Many use sensors to monitor and access everything—from the operational state of machinery to getting alerts when storage tanks, trash dumpsters, exit signs and smoke alarms need to be serviced.',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts working on many industries.',
    s1Name: 'Making operations self-sufficient',
    s1Description:
      'Many use sensors to monitor and access everything—from the operational state of machinery to getting alerts when storage tanks, trash dumpsters, exit signs and smoke alarms need to be serviced.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Optimizing factory conditions',
    s2Description:
      'IoT-enabled predictive maintenance can help prevent equipment from malfunctioning. Dashboards can provide deep visibility within a partner ecosystem and supply chain.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Monitoring the supply chain',
    s3Description:
      'IoT solutions can monitor the condition of products from when they are made in a factory (or grown on a farm) to the arrival at their final destination.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    p1Name: 'Google Cloud',
    p1Logo: 'https://i.ibb.co/JqkrKTp/cloud-200.png',
    p2Name: 'Arduino',
    p2Logo: 'https://i.ibb.co/KDcLxdy/arduino.png',
    p3Name: 'Amazon Web Services',
    p3Logo: 'https://i.ibb.co/gzDM3yG/amazon-200.png',
    altBanner: 'Evocative image of Industrial Manufacturing service',
    altP1: 'Evocative image of Google Cloud partner',
    altP2: 'Evocative image of Arduino partner',
    altP3: 'Evocative image of Amazon Web Services partner',
  })
  await IoT.addService(IndustrialManufacturing.id)
  //**END OF IOT SERVICES */

  //**BIG DATA ANALYSIS SERVICES */
  const OptimizeDigitalMarketing = await Service.create({
    title: 'Optimize digital marketing',
    subTitle:
      'Give users what they are searching just when they land on your page in order to maximize sales.',
    description:
      'In order to grow your enterprise, you need to do more than keep your existing customers happy — you need to find new business. Big data can help you find new audiences and determine which groups are more likely to buy.    ',
    banner: 'https://i.imgur.com/1ZKpYyo.png',
    serviceDescription:
      'We put in practise all the experience we gained during all the life of this company in order to give our clients a very good customer experience. Moreover, all our experts are very professional on the service we provide to clients.',
    s1Name: 'Optimize SEO',
    s1Description:
      'Search engine optimization is the process of optimizing web pages and their content to be easily discoverable by users searching for terms relevant to your website. ',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Social Media Marketing',
    s2Description:
      'Social media marketing is a powerful way for businesses, professionals and organizations of all sizes to find and connect with repeat or potential customers / users.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'E-Commerce Marketing',
    s3Description:
      'For eCommerce marketing we mean a strategic planning that aims to build brand awareness, increasing the number of sales and loyal customers.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts wprking on many industries.',
    p1Name: 'Mckinsey',
    p1Logo:
      'https://s3-ap-southeast-1.amazonaws.com/p2swebsite/images/smeKhabar/news/IndiaCanCreateoverOne-TrillionDollarsWorthofDigitalEconomyby2025SaysMEITMcKinseyReport_1550744301446_48.jpg',
    p2Name: 'Optimize',
    p2Logo:
      'https://lh3.googleusercontent.com/proxy/OtxMsmSjRgs_qllMxOpqrUYDYYF8sMgPU1oJBJp-0MxK8DA8ZEdaoZeAfeMdyi7A9Fpog4l1P8vqL1FP2PdDeUjVkA',
    p3Name: 'Eclincher',
    p3Logo:
      'https://media-exp1.licdn.com/dms/image/C4E0BAQE_8uje7Spe1g/company-logo_200_200/0/1578120960890?e=2159024400&v=beta&t=0pLs4HfyleatwiUUZHOGsVSLhyOEVMuQ4qgEdUeEtWs',
    altBanner: 'Evocative image of Optimize digital marketing service',
    altP1: 'Evocative image of Mckinsey partner',
    altP2: 'Evocative image of Optimize partner',
    altP3: 'Evocative image of Eclincher partner',
  })
  await BigDataAnalysis.addService(OptimizeDigitalMarketing.id)

  const PredictiveAnalyticsInHealthcare = await Service.create({
    title: 'Predictive analytics in healthcare',
    subTitle:
      'As the health care industry begins to use new technologies such as predictive analytics, government health agencies, doctors, and primary health providers must be aware of risks and agree on standards.',
    description:
      'Health care has a long track record of evidence-based clinical practice and ethical standards in research. However, the extension of this into new technologies such as the use of predictive analytics, the algorithms behind them, and the point where a machine process should be replaced by a human mental process is not clearly regulated or controlled by industry standards. Government health agencies, doctors, and primary health givers need to be aware of the risks emerging and agree on levels of assurance as society continues to move into a new era of decision-making supplemented, and at times replaced, by evidence from digital technologies. More specifically, this paper will look at the various ethical issues and moral hazards that need to be navigated following the adoption and use of predictive analytics in the health care sector with an emphasis on accountable algorithms.',
    banner:
      'https://images.techhive.com/images/article/2015/07/health-analytics-ts-100599204-large.jpg',
    serviceDescription:
      'We put in practise all the experience we gained during all the life of this company in order to give our clients a very good customer experience. Moreover, all our experts are very professional on the service we provide to clients.',
    s1Name: 'Efficiencies for operational management',
    s1Description:
      'Predictive analytics allows for the improvement of operational efficiency. Big data and predictive analytics are currently playing an integral part in health care. ',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Personal medicine',
    s2Description:
      'In personal medicine, predictive analytics can play a key role at the individual level and enable the use of prognostic analytics.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Fast pace of technology and impact on care',
    s3Description:
      ' The term digital disruption has arisen to capture the essence of just how fast everything is changing based on new technologies. ',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts wprking on many industries.',
    p1Name: 'Rock Health',
    p1Logo:
      'https://rockhealth.com/wp-content/uploads/2017/09/Rock-Health-Image-smaller.jpg',
    p2Name: 'Philips',
    p2Logo:
      'https://www.luciamo.it/ImgGalery/Img1/Clanky/aktuality-home/Philips_a_jeho_mensi_firmy.jpg',
    p3Name: 'Intel',
    p3Logo:
      'https://www.tomshw.it/images/images/2020/06/intel-logo-97706.1200x675.jpg',
    altBanner: 'Evocative image of Predictive analytics in healthcare service',
    altP1: 'Evocative image of Rock Health partner',
    altP2: 'Evocative image of Philips partner',
    altP3: 'Evocative image of Intel partner',
  })
  await BigDataAnalysis.addService(PredictiveAnalyticsInHealthcare.id)

  const PredictionScenarioAnalysis = await Service.create({
    title: 'Prediction & Scenario Analysis',
    subTitle: 'From rear-view analysis to forward-looking projection.',
    description:
      'We analyze datasets through classification, clustering, and pattern recognition techniques to move from a historical static description of the past to a forward-looking actionable projection in the future. We implement this solution in predictive maintenance, incident analysis, early-warning, customer satisfaction, churn prediction, production planning, risk assessment, attribution modeling and more.',
    banner:
      'https://image.shutterstock.com/image-photo/predictive-analytics-big-data-analysis-260nw-1348992500.jpg',
    serviceDescription:
      'We put in practise all the experience we gained during all the life of this company in order to give our clients a very good customer experience. Moreover, all our experts are very professional on the service we provide to clients.',
    s1Name: 'Real time prediction',
    s1Description:
      'A real-time prediction is a synchronous call to Amazon Machine Learning. The prediction is made when Amazon ML gets the request. ',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Data Science',
    s2Description:
      'Machine learning applications in computer vision, NLP, recommender systems, forecasting. network science, BI, and visualization.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'New Era of Data Innovation',
    s3Description:
      'Businesses hoard data. And often, so much of it isn’t used due to infrastructure costs and technology bottlenecks. ',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts wprking on many industries.',
    p1Name: 'NetSuite',
    p1Logo:
      'https://www.01net.it/wp-content/uploads/sites/14/2016/07/netsuite-logo-600x180.png',
    p2Name: 'Amazon',
    p2Logo:
      'https://www.fastweb.it/var/storage_feeds/CMS/articoli/17a/17aff0ceb57a46aaa79df025e78f6e64/logo%20amazon.png',
    p3Name: 'River Logic',
    p3Logo:
      'https://awsmp-logos.s3.amazonaws.com/e981e56c-9504-4acd-a441-81c99483b239/9801997f62aa29e763040bf44e7b2485.png',
    altBanner: 'Evocative image of Prediction & Scenario Analysis service',
    altP1: 'Evocative image of NetSuite partner',
    altP2: 'Evocative image of Amazon partner',
    altP3: 'Evocative image of River Logic partner',
  })
  await BigDataAnalysis.addService(PredictionScenarioAnalysis.id)

  const BigDataAutomation = await Service.create({
    title: 'Big Data Automation',
    subTitle:
      'Automation enables you to manage big data and innovate at the pace of business.',
    description:
      'Big data automation is growing as a need for almost every organization, with the IoT driving the stream velocity of data. While users require fast availability of data for analysis, the true value of data can only be extracted and managed via intelligent and advanced data automation.',
    banner: 'https://www.sygmatechnology.com/hubfs/shutterstock_1133982038.jpg',
    serviceDescription:
      'We put in practise all the experience we gained during all the life of this company in order to give our clients a very good customer experience. Moreover, all our experts are very professional on the service we provide to clients.',
    s1Name: 'Automation Expertise',
    s1Description:
      'Incorrect decisions through disjointed applications of expertise across the company and inefficient services come at a huge cost to your organization.    ',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Role in Data Preparation',
    s2Description:
      'Data cleaning is a fundamental operation to improve the performance of predictive analysis. As we know Big Data can be both structured and unstructured and come from different sources. ',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Data Workflow',
    s3Description:
      'Big Data Automation uses advanced features to better manage the flow of activities, creating a single and integrated environment that allows you to maintain a unified view of data.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts wprking on many industries.',
    p1Name: 'Reply',
    p1Logo:
      'https://mms.businesswire.com/media/20210415005484/it/809563/23/Reply_-_LOGO_300dpi.jpg',
    p2Name: 'Siemens',
    p2Logo:
      'https://pbs.twimg.com/profile_images/1311596912706023429/aFWLoMhS.png',
    p3Name: 'LuTech',
    p3Logo:
      'https://abieventi-statics-external.s3-eu-west-1.amazonaws.com/url_59edc98ae011a96693a21dec.jpg',
    altBanner: 'Evocative image of Big Data Automation service',
    altP1: 'Evocative image of Reply partner',
    altP2: 'Evocative image of Siemens partner',
    altP3: 'Evocative image of LuTech partner',
  })
  await BigDataAnalysis.addService(BigDataAutomation.id)

  const BIDWHConsulting = await Service.create({
    title: 'BI and DWH consulting',
    subTitle:
      'We analyze your particular business needs and give recommendations on designing, developing, implementing or upgrading your analytics solution.',
    description:
      'We provide analytics consulting services for our customers to benefit from integrated solutions that rely on the optimal technology stack, allowing companies to save their costs, improve performance and grow their business.',
    banner:
      'https://www.smartdatacollective.com/wp-content/uploads/2020/11/business-intelligence-future-in-coming-years.jpg',
    serviceDescription:
      'We put in practise all the experience we gained during all the life of this company in order to give our clients a very good customer experience. Moreover, all our experts are very professional on the service we provide to clients.',
    s1Name: 'Business intelligence consulting',
    s1Description:
      'While improving your existing BI solution, we identify the evident and hidden problems that hinder your BI solution’s smooth performance.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Big data consulting',
    s2Description:
      'Our consultants conduct dedicated training sessions to help various target audiences, be it top managers or the technical team, to understand how to get value out of big data.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Data Visualization',
    s3Description:
      'Data visualization services help communicate company’s data to business users using visual elements. ',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts wprking on many industries.',
    p1Name: 'Microsoft',
    p1Logo:
      'https://lh3.googleusercontent.com/proxy/WYX7gll105oAtJPvW5B8LUnxR57mBUmNyzZQoINC7_VDOXBNx2MqJAISdf6Pwq6s1jxgWenxPGZnjPGvo6-Oc1KA7vly5i3o7TnGf00bqFak1Jf4Q1A',
    p2Name: 'Intelligence partner',
    p2Logo:
      'https://www.intelligencepartner.com/wp-content/themes/intelligencepartner/img/intelligencepartner_logo.svg',
    p3Name: 'SB Italia',
    p3Logo: 'https://www.sbitalia.com/wp-content/uploads/2015/11/logo.png',
    altBanner:
      'Evocative image of Business Intelligence and  consulting service',
    altP1: 'Evocative image of Microsoft partner',
    altP2: 'Evocative image of Intelligence partner',
    altP3: 'Evocative image of SB Italia partner',
  })
  await BigDataAnalysis.addService(BIDWHConsulting.id)

  const PricingOptimization = await Service.create({
    title: 'Pricing optimization',
    subTitle:
      'Pricing is the top profit lever, yet remains underdeveloped in most companies. We can help you build dynamic pricing capabilities that help you set and get the right price, every time, and capitalize on in-year revenue opportunities. ',
    description:
      "Pricing can boost profits far more than increasing sales or cutting costs. And the results of a smarter pricing strategy can fall to the bottom line very quickly.  Yet at least half of all companies leave money on the table because they don't charge the right price or make sure customers actually pay it.   ",
    banner:
      'https://associationsnow.com/wp-content/uploads/2018/12/GettyImages-940692576_hrvcc-600x360.jpg',
    serviceDescription:
      'We put in practise all the experience we gained during all the life of this company in order to give our clients a very good customer experience. Moreover, all our experts are very professional on the service we provide to clients.',
    s1Name: 'B2B pricing',
    s1Description:
      'Pricing represents the greatest opportunity for B2B companies to increase profits, especially in the short term. ',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Consumer Pricing',
    s2Description:
      'Customers can compare your price to your competitors’ without leaving the house. But internet-fueled transparency can also foster greater customer loyalty. ',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Dynamic pricing',
    s3Description:
      'The algorithm automatically generates a price based on data provided by the partner and learnings from similar past deals.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts wprking on many industries.',
    p1Name: 'Simon Kucker',
    p1Logo:
      'https://media-exp1.licdn.com/dms/image/C4E0BAQHNWjH2RvlaTA/company-logo_200_200/0/1596201887751?e=2159024400&v=beta&t=DgJhJ5fpwQgFhYZB0TMe1tU-mEwyGOxIav8W2gdixSk',
    p2Name: 'Accenture',
    p2Logo: 'https://www.wecanjob.it/moduli/output_immagine.php?id=5288',
    p3Name: 'Price Fx',
    p3Logo:
      'https://www.pricefx.com/wp-content/uploads/2020/04/Pricefx_logo_2019_White.png',
    altBanner: 'Evocative image of Pricing optimization service',
    altP1: 'Evocative image of Simon Kucker partner',
    altP2: 'Evocative image of Accenture partner',
    altP3: 'Evocative image of Price Fx partner',
  })
  await BigDataAnalysis.addService(PricingOptimization.id)
  //**END OF BIG DATA ANALYSIS SERVICES */

  //**CLOUD COMPUTING SERVICES */
  const EInvoice = await Service.create({
    title: 'e-Invoice',
    subTitle:
      'The easiest way to electronic invoicing is through the Cloud. Send e-invoices to your business partners & public administration entities in no time - wherever they are.',
    description:
      'In the light of the current national and EU legislation, HexTech e-Invoicing Cloud stands out as a simple and affordable tool that enables global, legally-compliant exchange of invoice documents with business partners and public administration entities. No matter your industry or product, our platform was designed to help you create, process, and store e-invoices, thus significantly improve your business efficiency. Plus, being a cloud-based solution, it does not require a long and cost-intensive implementation process. Instead, it gives you instant access to a virtual environment that is easy to navigate.',
    banner:
      'https://www.extrasys.it/hs-fs/hubfs/E-invoice%20benefits.png?width=800&name=E-invoice%20benefits.png',
    serviceDescription:
      'Companies active in many countries or worldwide need to support and process a large number of different E-Invoicing standards. With HexTech you are on the safe side. We support E-Invoicing compliance in more than 55 countries. In recent years, E-Invoicing initiatives have been started in many countries to simplify the exchange of invoicing data between companies („B2B“), and between companies and authorities („B2G“), and to increase tax revenues. The defined standards within the scope of these initiatives are already widespread. Some are already regulated by national governments.',
    s1Name: 'Service Variants',
    s1Description:
      'Using industry-specific modules which include the country-specific processes, standards and features, all companies can start right away.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'High Security B2B Cloud Operation',
    s2Description:
      'Our highly standardized operating processes meet strict requirements typically going far beyond what you can provide on your own system.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Secure Investment',
    s3Description:
      'Our software is independent from the operating model. We offer all SEEBURGER solutions as a Cloud Service or On-Premises solution with identical functionality. ',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts working on many industries.',
    p1Name: 'Google Cloud',
    p1Logo: 'https://i.ibb.co/JqkrKTp/cloud-200.png',
    p2Name: 'Adobe',
    p2Logo: 'https://i.ibb.co/VQSW0Zx/adobe-200.png',
    p3Name: 'Amazon Web Services',
    p3Logo: 'https://i.ibb.co/gzDM3yG/amazon-200.png',
    altBanner: 'Evocative image of e-Invoice service',
    altP1: 'Evocative image of Google Cloud partner',
    altP2: 'Evocative image of Adobe partner',
    altP3: 'Evocative image of Amazon Web Services partner',
  })
  await CloudComputing.addService(EInvoice.id)

  const CloudAppDevelopServices = await Service.create({
    title: 'Cloud App Development Services',
    subTitle:
      'With cloud application development services, businesses can build applications that are technically and architecturally adapted to being smoothly hosted and maintained by the cloud infrastructure and take advantage of the capabilities and services offered by PaaS (platform-as-a-service) and IaaS (infrastructure-as-a-service) providers.',
    description:
      '94% of companies already use cloud services reducing IT costs, granting their users reliability and availability and refocusing from routine maintenance to more strategic initiatives. Let us help you get cloud applications designed for high security, performance efficiency, and operational excellence while ensuring the optimal resource consumption.',
    banner: 'https://4.imimg.com/data4/WT/LG/GLADMIN-22150665/0-500x500.jpg',
    serviceDescription: '',
    s1Name: 'Cloud consulting',
    s1Description: 'Plan a cloud app to meet your business needs.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Cloud app development',
    s2Description:
      'We deliver a scalable, portable, reliable and secure containerized app based on the microservices.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Application migration to the cloud',
    s3Description:
      'Application and/or DWH migration to the cloud with all-around modifications',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts working on many industries.',
    p1Name: 'Node.js',
    p1Logo: 'https://i.ibb.co/VvpxKnR/nodejs-200.png',
    p2Name: 'Amazon Web Services',
    p2Logo: 'https://i.ibb.co/gzDM3yG/amazon-200.png',
    p3Name: 'Figma',
    p3Logo: 'https://i.ibb.co/3W81YKV/figma-200.png',
    altBanner: 'Evocative image of Cloud App Development Services ',
    altP1: 'Evocative image of Node.js partner',
    altP2: 'Evocative image of Amazon Web Services partner',
    altP3: 'Evocative image of Figma partner',
  })
  await CloudComputing.addService(CloudAppDevelopServices.id)

  const LiveVideoBroadcasting = await Service.create({
    title: 'Live Video Broadcasting',
    subTitle: 'Moving towards future always looking ahead of the technology',
    description:
      'Live streaming is one of the best ways to connect in a meaningful and authentic way with your community. Every day around the world, in offices, fitness studios, stadiums, houses of worship,and our own houses, moments are made. A livestream platform connects you instantly to your employees, customers, subscribers, or followers when a virtual event or series is your best option.',
    banner:
      'https://res.cloudinary.com/practicaldev/image/fetch/s--UpbEnajb--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/ah8zju0kmh6br3w69cgq.jpg',
    serviceDescription:
      'We put in practise all the experience we gained during all the life of this company in order to give our clients a very good customer experience. Moreover, all our experts are very professional on the service we provide to clients.',
    s1Name: 'Maximise quality video',
    s1Description:
      'We use very advanced techonology to guarantee an optimal quality. ',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Avoid rude content',
    s2Description:
      'Our developed AI recognise almost immediately contents that have to be banned.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Minimal delay',
    s3Description:
      'Our conversion rate tends to be very small in order to let user be really live.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts wprking on many industries.',
    p1Name: 'Tencent',
    p1Logo:
      'https://www.thegamesmachine.it/wp-content/uploads/2020/05/tencent-logo-min.jpg',
    p2Name: 'Twich',
    p2Logo: 'https://www.oiesports.it/wp-content/uploads/2020/05/twitch.png',
    p3Name: 'Netflix',
    p3Logo:
      'https://www.mediagol.it/wp-content/uploads/sites/27/2020/07/maxresdefault.jpg',
    altBanner: 'Evocative image of Live Video Broadcasting service',
    altP1: 'Evocative image of Tencent partner',
    altP2: 'Evocative image of Twich partner',
    altP3: 'Evocative image of Netflix partner',
  })
  await CloudComputing.addService(LiveVideoBroadcasting.id)

  const LiveECommerce = await Service.create({
    title: 'Live streaming E-Commerce',
    subTitle: 'Moving towards future always looking ahead of the technology',
    description:
      'With live streaming you can sell products during a live stream in which the characteristics of the item for sale are recognized. This allows you to share more information, offer product demonstrations, satisfy viewers questions and respond to their reactions. It is an interactive system for both brands and stores, and for viewers who can purchase in real time, during the live broadcast. What is now fast becoming a profitable online sales channel for many luxury brands, actually originated in China as a form of entertainment: singers, comedians and other performers broadcast live for their fans in exchange for virtual gifts. In 2016, Chinese authorities started dozens of these live streaming platforms, sanctioning thousands of artists: this attempt to appease the phenomenon actually turned into an opportunity for more forward-thinking apps, such as Taobao, which they were the first to recognize its potential by investing in this new mode of commercial communication.',
    banner:
      'https://www.robvanlinda.de/wp-content/uploads/2020/08/Live-stream-banner.jpg',
    serviceDescription:
      'We put in practise all the experience we gained during all the life of this company in order to give our clients a very good customer experience. Moreover, all our experts are very professional on the service we provide to clients.',
    s1Name: 'Fast shipping',
    s1Description: 'Our delivery service is very well organized.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'New buying experience',
    s2Description:
      'This new technology makes innovative the ways to purchase a product.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Live Feedback',
    s3Description:
      'Due to live streaming users can see the real product and makes an idea about it.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts wprking on many industries.',
    p1Name: 'Tencent',
    p1Logo:
      'https://www.thegamesmachine.it/wp-content/uploads/2020/05/tencent-logo-min.jpg',
    p2Name: 'TaoBao',
    p2Logo:
      'https://img.alicdn.com/tfs/TB1giluwEY1gK0jSZFMXXaWcVXa-1280-1280.png',
    p3Name: 'Alibaba',
    p3Logo: 'https://images-eu.ssl-images-amazon.com/images/I/71IxKvGqiWL.png',
    altBanner: 'Evocative image of Live streaming E-Commerce service',
    altP1: 'Evocative image of Tencent partner',
    altP2: 'Evocative image of TaoBao partner',
    altP3: 'Evocative image of Alibaba partner',
  })
  await CloudComputing.addService(LiveECommerce.id)

  const HybridCloud = await Service.create({
    title: 'Hybrid Cloud',
    subTitle: 'A smarter strategy to drive real business transformation',
    description:
      'The new generation of hybrid cloud provides a common platform across all of your cloud, on-premises and edge environments. That means you can skill once, build once and manage from a single pane of glass. HexTech provides you with the most comprehensive and consistent approach to development, security and operations across hybrid environments.      ',
    banner:
      'http://techbusiness.it/wp-content/uploads/2019/12/Hybrid-Cloud-Experience-main.jpg',
    serviceDescription:
      'ur hybrid cloud approach can offer up to 2.5x more value than a public cloud-only approach. With our hybrid cloud value calculator, you can determine the value that a hybrid cloud approach can bring to your business.',
    s1Name: 'Build and run anywhere',
    s1Description:
      'With Red Hat OpenShift, you can develop and consume cloud services anywhere.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Automate and modernize',
    s2Description:
      'HexTech automation capabilities can help you implement intelligent workflows.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Leverage innovations',
    s3Description:
      'With hybrid, you can access innovations to help achieve your goals.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts wprking on many industries.',
    p1Name: 'Tencent',
    p1Logo:
      'https://www.thegamesmachine.it/wp-content/uploads/2020/05/tencent-logo-min.jpg',
    p2Name: 'TaoBao',
    p2Logo:
      'https://img.alicdn.com/tfs/TB1giluwEY1gK0jSZFMXXaWcVXa-1280-1280.png',
    p3Name: 'Alibaba',
    p3Logo: 'https://images-eu.ssl-images-amazon.com/images/I/71IxKvGqiWL.png',
    altBanner: 'Evocative image of Hybrid Cloud service',
    altP1: 'Evocative image of ... partner',
    altP2: 'Evocative image of ... partner',
    altP3: 'Evocative image of ... partner',
  })
  await CloudComputing.addService(HybridCloud.id)

  const InfraspaceCloud = await Service.create({
    title: 'Infraspace Cloud',
    subTitle: 'Reduce operational costs by stepping into the cloud',
    description:
      'HexTech Infraspace Cloud is a powerful, constantly developed cloud computing service that helps you build, manage, upgrade, and maintain your business applications thanks to a dedicated set of advanced tools and frameworks.',
    banner:
      'https://www.comarch.it/files-it/file_84/Managed-Multi-Cloud-Cloud-Migration.jpg',
    serviceDescription:
      "Modernizing your company's IT environment, the family of HexTech Infraspace Cloud products enables you to accelerate digital transformation, optimize costs, and drive better business results with ease.",
    s1Name: 'Full product scalability',
    s1Description:
      "Giving you instant access to its advanced functionalities, HexTech Infraspace Cloud can be easily configured to meet your company's needs and requirements.",
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Reduced operational costs',
    s2Description:
      'We enable companies of all sizes and industries to reduce their operational costs by 50 to 80 percent, depending on their business profile.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Zero investment costs',
    s3Description:
      'No additional hardware and more payment flexibility. The result? No office downtime, zero investment costs, and prices chared only for the features in use.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'On all the case studies we worked on we had gained experience from our partners. Although some of them are very big companies, we had an equal exchange of expertise since we have really professional experts wprking on many industries.',
    p1Name: 'Tencent',
    p1Logo:
      'https://www.thegamesmachine.it/wp-content/uploads/2020/05/tencent-logo-min.jpg',
    p2Name: 'TaoBao',
    p2Logo:
      'https://img.alicdn.com/tfs/TB1giluwEY1gK0jSZFMXXaWcVXa-1280-1280.png',
    p3Name: 'Alibaba',
    p3Logo: 'https://images-eu.ssl-images-amazon.com/images/I/71IxKvGqiWL.png',
    altBanner: 'Evocative image of Infraspace Cloud service',
    altP1: 'Evocative image of ... partner',
    altP2: 'Evocative image of ... partner',
    altP3: 'Evocative image of ... partner',
  })
  await CloudComputing.addService(InfraspaceCloud.id)

  //**END OF CLOUD COMPUTING SERVICES */

  //**CUSTOMER EXPERIENCE SERVICES - isi*/

  //1
  const Immersive = await Service.create({
    title: 'Immersive Tech',
    subTitle:
      'Learn how immersive technology can increase revenue and streamline the event planning process.',
    description:
      'What’s the future of customer experience? It’s multi-dimensional. As the boundaries between the digital and the physical continue to blur, new kinds of immersive interactions become possible. Augmented reality, virtual reality, mixed reality—it all comes together in creative experiences that flow freely across real and virtual spaces. The Immersive and Innovative Experiences practice helps clients transform experiences for this world of unlimited possibility. We blend cutting-edge immersive technology with human creativity and strong ethical governance. We break down barriers between brands and their customers. We help visualize and understand products in new ways. And we bring people together in new virtual environments.',
    banner:
      'https://images.unsplash.com/photo-1502185372788-6ff455aa92ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    serviceDescription:
      'We help brands tell stories and craft experiences in innovative and immersive ways, opening up new kinds of interaction, new ways to work and learn, and new revenue streams. It’s an emerging space for all to play in. Let us help you take a lead in next-generation experience.',
    s1Name: 'Spatial storytelling',
    s1Description:
      'Designing 360o story worlds, including non linear narrative and character development.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Experiential marketing',
    s2Description:
      'Creating interactive brand engagement through immersive content.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Immersive Commerce',
    s3Description:
      'Bringing products to life in 3D through digital twin models, augmenting the experience.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'At HexTech, together with our Partners, we are re-imagining the business Deliver with unforgettable customer experiences',
    p1Name: 'Adobe',
    p1Logo: 'https://i.ibb.co/sw4Rx4M/adobe.png',
    p2Name: 'Figma',
    p2Logo: 'https://i.ibb.co/vjqPph0/figma.png',
    p3Name: 'Sketch',
    p3Logo: 'https://i.ibb.co/QdHXCx7/sketch-01.png',
    altBanner: 'Evocative image of Immersive Tech service',
    altP1: 'Evocative image of Adobe partner',
    altP2: 'Evocative image of Figma partner',
    altP3: 'Evocative image of Sketch partner',
  })
  await CustomerExperience.addService(Immersive.id)

  //2
  const UserInterfaces = await Service.create({
    title: 'User Interfaces',
    subTitle:
      'Leading creative, business analysis, and advanced technology in user research',
    description:
      'Design a new way to communicate. User interface (or UI) design has grown substantially over the past few years, and has blossomed into one of the most creative, innovative and exciting fields in tech. Our service it is here to help you to create a brand new costumer’s experiences with the latest trend of user interfaces. An interface is the link between the corporate and the user, it must respond to customers’ new, often unmet and frequently changing needs and enable them to achieve their desired outcomes.',
    banner:
      'https://images.unsplash.com/photo-1618788372246-79faff0c3742?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=882&q=80',
    serviceDescription:
      'User interface elements are the parts we use to build interactive websites or apps. They provide touchpoints for the user as they navigate their way around; from buttons to scrollbars, to menu items and checkboxes. Every single detail matter!',
    s1Name: 'Trustworthy apps',
    s1Description:
      'Avoiding unplanned interactions, giving the customers insight into what to expect.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Design accessibility',
    s2Description:
      'Keep in mind accessibility and inclusion. Every design choice matters for us.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Endlessly adaptivity',
    s3Description:
      'An optimized model to deliver insights and facilitate decision-making.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'We use the latest services in terms of technological design, we refer to the best partners and create with softwares that allows us to achieve extremely intuitive layouts for ours ideas.',
    p1Name: 'Adobe',
    p1Logo: 'https://i.ibb.co/sw4Rx4M/adobe.png',
    p2Name: 'Figma',
    p2Logo: 'https://i.ibb.co/vjqPph0/figma.png',
    p3Name: 'Sketch',
    p3Logo: 'https://i.ibb.co/QdHXCx7/sketch-01.png',
    altBanner: 'Evocative image of User Interfaces service',
    altP1: 'Evocative image of Adobe partner',
    altP2: 'Evocative image of Figma partner',
    altP3: 'Evocative image of Sketch partner',
  })
  await CustomerExperience.addService(UserInterfaces.id)

  //3
  const CEE = await Service.create({
    title: 'Customer Experience Engine',
    subTitle:
      'Your customers are always connected. Shouldn’t their experiences be too?',
    description:
      'Most customer experiences are created from a hodge-podge of systems. But customers don’t care about those systems. They expect a convenient, continuous and meaningful experience on the website, in the mobile app and in the store. The Customer Experience Engine powers an ongoing experience in which your brand stands out by disappearing into the fabric of customers’ lives. It’s the connective tissue across your systems that lets you focus on what you care about: delivering an unforgettable and impactful customer experience now and protecting that experience in the future.',
    banner:
      'https://images.unsplash.com/photo-1556745753-b2904692b3cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1866&q=80',
    serviceDescription:
      'Our experience-led approach helps ensure that organizations have the right experience architecture to allow customers to create their own journey on their own terms. We view technology as the enabler of the customer experience, not the driver.',
    s1Name: 'Single view',
    s1Description:
      'A business that is interacting with customers to drive connected experiences.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Seamless plug and play',
    s2Description:
      'CXE solves the technology impediment to allow organizations to focus on impact.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Omnichannel power',
    s3Description:
      'CXE unifies your applications across marketing, turning touchpoints into a story.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'The Customer Experience Engine turns touchpoints into a story: unify the moments. Own the experience. Together with the best Partners we are going to achieve this.',
    p1Name: 'Adobe',
    p1Logo: 'https://i.ibb.co/sw4Rx4M/adobe.png',
    p2Name: 'Figma',
    p2Logo: 'https://i.ibb.co/vjqPph0/figma.png',
    p3Name: 'Sketch',
    p3Logo: 'https://i.ibb.co/QdHXCx7/sketch-01.png',
    altBanner: 'Evocative image of Customer Experience Engine service',
    altP1: 'Evocative image of Adobe partner',
    altP2: 'Evocative image of Figma partner',
    altP3: 'Evocative image of Sketch partner',
  })
  await CustomerExperience.addService(CEE.id)

  //4
  const Campaign = await Service.create({
    title: 'Campaign Management',
    subTitle:
      'Communicate marketing messages at speed and scale to acquire and retain customers, driving sustainable growth.',
    description:
      'We all know communication is critical, but knowing what to say and when to say it—and whom to say it to—can make or break the message. That is why Accenture Interactive Marketing Engagement Services team specializes in solutions to help clients understand their customers, define the experience, and deliver relevant, compelling messages. We understand the new digital landscape and evolving customer expectations. Connections need to be made throughout the customer journey, constantly and across channels. "Always-on" campaigns are designed to capture attention and amplify demand, leads and revenue generation.',
    banner:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    serviceDescription:
      'We design and build creative campaigns that target customers with the right message to drive engagement. Our insights into new and evolving digital technologies mean we understand how to deliver personalized messages at the right time, helping acquire new customers, grow wallet share with existing customers, and retain the most profitable customers.',
    s1Name: 'Campaign planning',
    s1Description:
      'Create a consistent experience throughout the customer journey.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Management and optimization',
    s2Description:
      'Enable a campaign management solution with digital marketing ecosystem.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Lead generation',
    s3Description: 'Fuel your funnel by driving demand from qualified leads.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'How to deliver the right message at the right time? With the best Partners our company will grant you success.',
    p1Name: 'Adobe',
    p1Logo: 'https://i.ibb.co/sw4Rx4M/adobe.png',
    p2Name: 'Figma',
    p2Logo: 'https://i.ibb.co/vjqPph0/figma.png',
    p3Name: 'Sketch',
    p3Logo: 'https://i.ibb.co/QdHXCx7/sketch-01.png',
    altBanner: 'Evocative image of Campaign Management service',
    altP1: 'Evocative image of Adobe partner',
    altP2: 'Evocative image of Figma partner',
    altP3: 'Evocative image of Sketch partner',
  })
  await CustomerExperience.addService(Campaign.id)

  //5
  const AICustomer = await Service.create({
    title: 'Customer Service AI',
    subTitle:
      'Make every customer feel like the only customer: Change the customer experience with conversational AI.',
    description:
      'Solutions.AI for Customer Engagement is built for putting AI at the frontline of every interaction streamlines service, better equips agents, and enhances the overall experience with personalized, precise, and empathetic care. It helps brands quickly and responsibly use data to understand and predict customer needs and arm agents behind the screen with the right message and offers. And it improves the original product and service by analyzing and incorporating insights from customer interactions through a constant feedback loop.',
    banner:
      'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80',
    serviceDescription:
      'With our range of pre-built AI modules and ecosystem of technology partners, we are able to quickly scale hyper-personalized experiences to help clients anticipate and address their customers needs.',
    s1Name: 'Patented conversational AI',
    s1Description:
      'Rapidly design and execute automated conversations, compatible with technology.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Intent discovery and analytics',
    s2Description:
      'Apply a data-driven approach to identify customer intents for automation.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Customer and journey analytics',
    s3Description:
      'Responsibly establish a strong foundation to generate insights that unlock value.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'HexTech, with the best Partners, will make your customers to have higher expectations than ever before. They crave a consistent experience no matter the time or channel.',
    p1Name: 'Adobe',
    p1Logo: 'https://i.ibb.co/sw4Rx4M/adobe.png',
    p2Name: 'Figma',
    p2Logo: 'https://i.ibb.co/vjqPph0/figma.png',
    p3Name: 'Sketch',
    p3Logo: 'https://i.ibb.co/QdHXCx7/sketch-01.png',
    altBanner: 'Evocative image of Customer Service AI service',
    altP1: 'Evocative image of Adobe partner',
    altP2: 'Evocative image of Figma partner',
    altP3: 'Evocative image of Sketch partner',
  })
  await CustomerExperience.addService(AICustomer.id)

  //6
  const CreativeMarketingServices = await Service.create({
    title: 'Creative Marketing Services',
    subTitle:
      'Build your brand and drive demand through high-impact, creative customer experiences. Discover the transformative power of a story.',
    description:
      'We take a holistic approach that combines creative, content, data and technological expertise to translate brand vision and business goals into customer engagement strategies and business results. With our help, you wll delight your customers with relevant, elegant, and intuitive experiences. Our insights into audiences and markets help us create effective brand strategies that drive real engagement for every customer across every channel.',
    banner:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=993&q=80',
    serviceDescription:
      'What does it mean to build a brand? We take it from the ground up—from strategy and content to activation.',
    s1Name: 'Intent discovery and analytics',
    s1Description:
      'We deliver strategy for new client brands and develop creative assets and identities.',
    s1Logo: 'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Content activation',
    s2Description:
      'We develop creative content across channels to drive consumer experiences.',
    s2Logo: 'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Omnichannel strategy',
    s3Description:
      'We activate and optimize programs that deliver high engagement and investment.',
    s3Logo: 'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerDescription:
      'With HexTech and its best Partners, you will delight your customers with relevant, elegant, and intuitive experiences.',
    p1Name: 'Adobe',
    p1Logo: 'https://i.ibb.co/sw4Rx4M/adobe.png',
    p2Name: 'Figma',
    p2Logo: 'https://i.ibb.co/vjqPph0/figma.png',
    p3Name: 'Sketch',
    p3Logo: 'https://i.ibb.co/QdHXCx7/sketch-01.png',
    altBanner: 'Evocative image of Creative Marketing Services',
    altP1: 'Evocative image of Adobe partner',
    altP2: 'Evocative image of Figma partner',
    altP3: 'Evocative image of Sketch partner',
  })
  await CustomerExperience.addService(CreativeMarketingServices.id)

  //**END OF CUSTOMER EXPERIENCE  SERVICES */

  //** ------------------------------------------------------------ CASE STUDIES --------------------------------------------------------------- */

  //**SECURITY CASE STUDIES */
  const OnlineFraudDetection = await CaseStudy.create({
    title: 'Next generation online fraud detection for banks',
    subTitle: 'A new generation bank',
    banner:
      'https://img.etimg.com/thumb/msid-77849867,width-640,resizemode-4,imgsize-584328/know-from-the-experts.jpg',
    descriptiveText:
      'Customers Bank is one of the fast-growing “new-generation” European banks. The Bank’s mission was set to offer a wide range of financial products and services for individuals, families and businesses with a strong focus on delivering new levels of quality, service and efficiency, while also providing the best possible user experience “without losing the human connection,”as articulated in their mission statement.',
    challengeTitle: 'Effective and convenient fraud detection solution',
    challengeDescription:
      'The need for the Bank to deliver a new paradigm in user experience for online banking provided several challenges to their security team, as they were requested to minimize customer friction while supporting instant payment and open banking initiatives, andensure regulatory compliance (PSD2). In particular, the anti-fraud team had to select and implement the best fraud detection solution to ensure the Bank would quickly gain an excellent reputation in the market by delivering the best customer satisfaction in terms of protection against online frauds.',
    solutionTitle: 'application-transparent approach',
    solutionDescription:
      'Our application-transparent approach does not require instrumenting or even touching applications. HexTech passive and dynamic delivery of controls allows security to be decoupled from application development & deployment, and is a critical functionality that can be independently delivered and managed by the security team.',
    createdData: 'April 2, 2021',
    partnerWebsite: '',
    altBanner:
      'There is a table of the judge in the tribunal with a white paper with written Bank fraud',
  })
  await Security.addCasestudy(OnlineFraudDetection.id)
  await ManagedSecurity.addCasestudy(OnlineFraudDetection.id)
  await ModernFraudProtection.addCasestudy(OnlineFraudDetection.id)

  const cs1 = await CaseStudy.create({
    title: 'Network protection for worldwide companies',
    subTitle: 'A secure connection',
    banner:
      'https://previews.123rf.com/images/arthead/arthead1907/arthead190700026/128279197-data-security-system-information-or-network-protection-cyber-security-and-data-protection-shield-ico.jpg',
    descriptiveText:
      "The Customer asked HexTech to protect it's network against undesired connection or network attacks",
    challengeTitle: 'Smart and transparent network protection',
    challengeDescription: 'A zero time loss solution',
    solutionTitle: 'Implented system',
    solutionDescription:
      'To develop a syestem as transparent as possible our team implemented a network protection layer that features AI capabilities to detect undesired connections',
    createdData: 'March 22, 2021',
    partnerWebsite: '',
    altBanner:
      'There is a shield from with lines enter from an insecure spot and exit in a secure one',
  })
  await Security.addCasestudy(cs1.id)
  await ModernFraudProtection.addCasestudy(cs1.id)
  await NetworkProtection.addCasestudy(cs1.id)

  const cs2 = await CaseStudy.create({
    title: 'Company access with secure credentials',
    subTitle: 'Access guaranteed only to the ones you trust',
    banner:
      'https://www.ecmag.com/sites/default/files/Security-shutterstock_794406721.jpg',
    descriptiveText:
      'The Customer commissioned HexTech to develop a system to ensure that certain sections of the company could be accessed only to qualified people.',
    challengeTitle: 'important data have to be secured',
    challengeDescription:
      'The Customer commissioned HexTech implement a system that guarantees access only to the allowed personnel',
    solutionTitle: 'Implented system',
    solutionDescription:
      '"To ensure scalability and short query response time, HexTech’s BI implementation team built an analytical Microsoft SQL Server data warehouse which would use a Transact-SQL script to load data from the relational database. The latter was consolidated from 200 databases during the application development process and totaled 12GB."',
    createdData: 'January 24, 2021',
    partnerWebsite: '',
    altBanner:
      'Two hands handling a watch and a smartphone that are communuicating using NFC tag',
  })
  await Security.addCasestudy(cs2.id)
  await NetworkProtection.addCasestudy(cs2.id)
  await IdentityAccessManagement.addCasestudy(cs2.id)

  const cs3 = await CaseStudy.create({
    title: 'Factoring data migration from Raiffeisen to BNP',
    subTitle: 'A secure connection',
    banner:
      'https://www.octivdigital.com/wp-content/uploads/2019/08/migrate-wordpress-blog-new-host.png',
    descriptiveText:
      'In 2019, HexTech was selected as a provider of data migration services from a factoring platform used by Raiffeisen to another platform working at BNP Paribas. The amount of data to be migrated was so substantial that it nearly doubled the business volume of BNP in Poland.',
    challengeTitle:
      'We had to find a workaround tool which converted the available data into files and then processed them for migration purposes.',
    challengeDescription:
      'After few months of preparation, we have developed and deployed a multi-threaded migration tool, which was ready to run over a weekend. The new BNP-Raiffeisen entity became second largest in the country  in terms of factoring turnover after only 1 quarter.',
    solutionTitle: 'Implented system',
    solutionDescription:
      'We have identified various discrepancies and workarounds in the ex Raiffeisen’s platform, which had to be taken into account to avoid shaking up BNP’s operations and preventing customer churn. For this purpose, we came up with a mechanism which detected potentially erroneous data. ',
    createdData: 'January 2, 2021',
    partnerWebsite: '',
    altBanner:
      'There are two computers linked with a line whitch represents their exchange of data',
  })
  await Security.addCasestudy(cs3.id)
  await DataSecurity.addCasestudy(cs3.id)
  await NetworkProtection.addCasestudy(cs3.id)

  const cs4 = await CaseStudy.create({
    title: 'Implementation of HexTech Loyalty Management at Livelo',
    subTitle: 'A secure connection',
    banner:
      'https://www.mccourier.com/wp-content/uploads/2021/03/S731856250_g.jpg',
    descriptiveText:
      'One of the main challenges for customer-oriented enterprises is to create a strong bond between customers and the brand.',
    challengeTitle:
      'work integrated with Agile method and selected vendor of Livelo’s blueprint systems',
    challengeDescription:
      'Livelo was looking for an innovative IT platform that would help the company in becoming the most dynamic redemption option and leading coalition in Brazil. The goal was to manage all aspects of their members´transactions and profile information, as well as the complex billing with accrual and redemption partners.',
    solutionTitle: 'Implented system',
    solutionDescription:
      'The project was started in November 2014. Thanks to the strong cooperation and flexibility of HexTech project team, the implementation went as Livelo expected and finished according to schedule. Project was finished within nine months. HexTech ensured integration with existing client systems including: campaign management system (HexTech UNIQA), e-commerce (ORACLE ATG), third-party Mobile App, SAP Finance, Livelo Taxa Online, Fast Shop S.A. The HexTech team also migrated over 16 million customer accounts. HexTech provided on-site support and maintenance services, dedicated program manager and on-site trainings.',
    createdData: 'December 2, 2020',
    partnerWebsite: '',
    altBanner: '',
  })
  await Security.addCasestudy(cs4.id)
  await IdentityAccessManagement.addCasestudy(cs4.id)
  await ManagedSecurity.addCasestudy(cs4.id)

  const cs5 = await CaseStudy.create({
    title: 'Eurobits Technologies',
    subTitle:
      'Transforming the financial landscape with robust, security-rich services',
    banner:
      'https://openbanking.world/wp-content/uploads/ultimatemember/57/profile_photo.jpeg?1615620971',
    descriptiveText:
      'Under pressure from regulators, the banking industry is opening up to allow new competitors to handle payments and account aggregation. For Eurobits – which helps banks give trusted third-parties access to account information – this change represents a significant growth opportunity. To preserve its first-mover advantage, Eurobits migrated to HexTech® Cloud™, gaining the flexibility, scale and resilience it needed to serve a rapidly growing client base.',
    challengeTitle:
      'To capitalize on international growth opportunities, Eurobits wanted a more flexible and scalable platform for its open banking services, with the ability to keep client data in defined jurisdictions.',
    challengeDescription:
      'Eurobits migrated to VMware vSphere on HexTech Cloud in two data centers. The company uses HexTech API Connect® to industrialize API management, and HexTech Cloud Kubernetes Service to containerize applications.',
    solutionTitle: 'Implented system',
    solutionDescription:
      'Running on the HexTech Cloud gives Eurobits the performance, availability, scalability, flexibility and security it needs to stay ahead of competitors in the fast growing and increasingly international market for open banking services. VMware vSphere on HexTech Cloud bare metal servers gives Eurobits dedicated computing power to speed through transactions without the potential security risks inherent in a multi-tenant landscape. What’s more, the company can rapidly extend its core systems onto new bare metal servers, enabling it to meet emerging client demand “One of our major clients is about to run a big marketing campaign that will multiply their user numbers by a factor of 10 or 20 within the space of a month or two,” says Arturo Gonzalez. “VMware vSphere on HexTech Cloud gives us the extreme flexibility we need for this kind of scenario. Running on the HexTech Cloud also supports our ongoing international expansion, enabling us to scale seamlessly in size and geography.” Highly secure and compliant Where local regulations require personal and financial data to remain in-country, HexTech’s global network of cloud data centers will make it easier for Eurobits to comply by simply firing up local instances of the required services. Both VMware virtualization and Kubernetes containerization are ideally suited to support the rapid redeployment of existing functionality in new locations. Architecting applications as microservices and deploying them on HexTech Cloud Kubernetes Service also improves horizontal scalability and overall application uptime. Finally, there is a security benefit in the isolation of services. In summary, Eurobits clients are mostly banks and FinTechs that require compliant, security-rich, high-performance solutions with proven recovery capabilities to support business continuity. By meeting these requirements, HexTech Cloud enables Eurobits and its clients to comply with stringent regulations in multiple geographies. In particular, the use of bare metal servers keeps data and transactions physically isolated from other environments on the cloud, giving confidence to Eurobits’ risk-averse clients. Always open for business The use of VMware High Availability technology within the production cloud center helps keep vital account information and payment services available at all times. And with a full DR solution on the HexTech Cloud, Eurobits can rapidly and reliably restore services in the event of an unexpected outage, and at lower cost of ownership than in its previous hosted landscape. “If a service goes down, it is now much easier to automatically bring it back up,” says Arturo Gonzalez. “In practice, this means less downtime and faster recovery, and we expect these metrics to improve once we complete our migration to a reactive architecture with Kubernetes – the biggest benefits are yet to come.” He concludes: “The fact that Eurobits works with HexTech gives our clients in the financial services industry a high level of comfort and trust. We needed to accomplish this migration in order to succeed in a market that is growing extremely fast, and that places heavy regulatory challenges and restrictions on us. With the backing of the HexTech Cloud, we face these challenges with confidence.”',
    createdData: 'December 2, 2020',
    partnerWebsite: 'https://tink.com/',
    altBanner: '',
  })
  await Security.addCasestudy(cs5.id)
  await IdentityAccessManagement.addCasestudy(cs5.id)
  await ManagedSecurity.addCasestudy(cs5.id)

  //**END OF SECURITY CASE STUDIES */

  //**BIG DATA ANALYSIS CASE STUDIES */
  const bdaC1 = await CaseStudy.create({
    title: 'BI implementation for 200 healthcare centers',
    subTitle:
      'The Customer is an American company that offers software to help 200 healthcare centers and retirement homes to process data related to patients and medication as well as build various types of reports.',
    banner:
      'https://www.scnsoft.com/boss/images/02d65838-eb3a-4d54-b7aa-b6b7aa0c1d47bi_healthcare.png',
    descriptiveText:
      'The Customer commissioned HexTech to rewrite the software – a Java application used by the healthcare centers for management and reporting of data on medication inventory, clinical services, patient data, marketing activities and others. Within the project, the Customer also wanted the tool to allow its users to enable quality population health analytics with prompt reports.',
    challengeTitle: 'BI IMPLEMENTATION',
    challengeDescription:
      'The Customer commissioned HexTech to rewrite the software – a Java application used by the healthcare centers for management and reporting of data on medication inventory, clinical services, patient data, marketing activities and others. Within the project, the Customer also wanted the tool to allow its users to enable quality population health analytics with prompt reports.',
    solutionTitle: 'Implented system',
    solutionDescription:
      '"To ensure scalability and short query response time, HexTech’s BI implementation team built an analytical Microsoft SQL Server data warehouse which would use a Transact-SQL script to load data from the relational database. The latter was consolidated from 200 databases during the application development process and totaled 12GB."',
    createdData: 'March 12, 2021',
    partnerWebsite: 'https://www.intelligencepartner.com/',
    altBanner: 'There are some pages with medical referts and a medical device',
  })
  await BigDataAnalysis.addCasestudy(bdaC1.id)
  await BIDWHConsulting.addCasestudy(bdaC1.id)
  await PredictiveAnalyticsInHealthcare.addCasestudy(bdaC1.id)
  await PredictionScenarioAnalysis.addCasestudy(bdaC1.id)

  const bdaC2 = await CaseStudy.create({
    title: 'Price optimization for e-commerce',
    subTitle:
      'This will be a glimpse of what you can achieve by sharing your sales data with us. We could perform an opportunity summary report in line with this use case, and uncover your own opportunities regarding price optimization. So, fasten your seatbelt and get ready for the take-off.',
    banner:
      'https://tryolabs.com/blog/images/blog/social/2018-09-24-price-optimization-machine-learning.d59ca712.jpg',
    descriptiveText:
      'We have discussed how a data-driven price optimization is no longer an option for retailers, but a question of how and when to do it. With a world that’s moving towards changing prices more and more dynamically, static pricing strategies can’t keep up, and data-driven approaches have arrived to stay. In this post, we’ll be focusing on how to perform data-driven price optimization, using a case study to showcase what can be done using sales data to predict demand and optimize prices.',
    challengeTitle: 'Analyzing an E-Commerce Sales Data',
    challengeDescription:
      '"Having our data ready, we proceed to train the demand forecasting models. Our goal is to be able to build the demand curve for each item. The models will learn the relation between the demand and several factors such as the price, holidays/events, and macroeconomics. During this phase, the collaboration with the business team is particularly important. Business insights help to validate the selected features and ensures that we are not missing any important aspect that can be potentially used to forecast the demand."',
    solutionTitle: 'Price optimized',
    solutionDescription:
      '"Combining their available dataset and other publicly available information, such as holidays/events data and macroeconomic series, we have been able to estimate demand curves for a subset of the items which would allow them to take optimal pricing decisions. The remaining items should undergo an exploration phase where new prices would be tried in order to be able to estimate their demand curves accurately. The exploration strategy is generally decided jointly with the client. For this example, given the data available and our past experience, we would suggest performing weekly price changes during the exploration phase. Furthermore, we have shown that there is plenty of room for inventory management improvement since there seems to be an important amount of revenue lost due to understock."',
    createdData: 'February 15, 2021',
    partnerWebsite: 'https://www.accenture.com/',
    altBanner:
      'There are lines that represent an optimized price accross a price icon.',
  })
  await BigDataAnalysis.addCasestudy(bdaC2.id)
  await PricingOptimization.addCasestudy(bdaC2.id)
  await OptimizeDigitalMarketing.addCasestudy(bdaC2.id)
  await BigDataAutomation.addCasestudy(bdaC2.id)

  const bdaC3 = await CaseStudy.create({
    title: 'Integrated BDA Platform',
    subTitle: 'Big Data automation platform enables new sides of powerful data',
    banner:
      'https://www.xenonstack.com/images/blog/need-of-modern-big-data-integration-platform.png',
    descriptiveText:
      'The essential feature of big data automation (BDA) is the realization that doing a lot more with a lot less is the new reality for IT organizations, and that smart IT organizations, in response to that reality, will seek to spend their scarce human talent  building value that their internal customers within the organization perceive to be valuable: new, enabling, differentiating. Today, that ingenuity is trapped, because IT teams are spending most or all of their time performing routine internally focused tasks, many of them invisible to internal business constituents, and most of them either susceptible to automation or acceleration.',
    challengeTitle: 'Replacing Artistry with Automation',
    challengeDescription:
      'As big data technologies become an increasingly important part of our enterprise decision support environments — whether as staging areas, data engineering environments, sandboxes for data scientists and advanced analytics projects, or as a data management platform co-equal with our enterprise data warehouses — we should avoid making the same mistakes we made, with enterprise data warehousing, and instead build big data automation into our environment from the outset. That big data automation infrastructure cannot, we think, come from the open source community or the Hadoop distribution vendors. Those companies have no real experience with, or understanding of, the existing enterprise data warehousing environment, or commercial decision-making in general.',
    solutionTitle: 'Developed platformfor BDA',
    solutionDescription:
      'We embrace  the very behaviors that got commercial IT organizations into such difficulties in enterprise data warehousing, by encouraging the broad-based, large-scale use of hand-coding techniques, in proprietary languages, using complex, poorly integrated tool chains, with little or no support for operations and management of production big data infrastructure, and no understanding of the essential role that rich, well-managed metadata plays into the effective operation, and modification, of production-grade analytics environments.',
    createdData: 'January 17, 2021',
    partnerWebsite: 'https://www.reply.com/it/',
    altBanner:
      'Multiple icon representing technological processa and the need of Big data platforms',
  })
  await BigDataAnalysis.addCasestudy(bdaC3.id)
  await BigDataAutomation.addCasestudy(bdaC3.id)
  await BIDWHConsulting.addCasestudy(bdaC3.id)
  await PricingOptimization.addCasestudy(bdaC3.id)

  const bdaC4 = await CaseStudy.create({
    title: 'Predictive analytics in healthcare ',
    subTitle: 'Our prediction can help you in everyday life',
    banner:
      'https://www.clicdata.com/wp-content/uploads/2018/08/predictive-analytics-healthcare.jpg',
    descriptiveText:
      'Predictive analytics can provide alerts to everyone from clinician and financial experts to administrative staff to inform them when events they are concerned with are likely to happen. As a result, they can make more informed, more timely, and usually better choices at times when small nuance can have big consequences.',
    challengeTitle: 'Moving to the future in healthcare industry',
    challengeDescription:
      'Much of medicine is about anticipating and reducing risk based on current and historical patient data. How likely is this cancer patient to suffer complications if we perform surgery? What is the chance that this pneumonia patient will be readmitted to the intensive care unit (ICU) within 48 hours if she is discharged? Clinicians have always had to make decisions without absolute certainty – but with the advance of predictive analytics in healthcare, these decisions promise to be better informed than ever.  Predictive analytics aims to alert clinicians and caregivers of the likelihood of events and outcomes before they occur, helping them to prevent as much as cure health issues. Driven by the rise of Artificial Intelligence (AI) and the Internet of Things (IoT), we now have algorithms that can be fed with historical as well as real-time data to make meaningful predictions.',
    solutionTitle: 'Prediction has been useful to help people',
    solutionDescription:
      'Predictive analytics can combine data from multiple sources – including hospital-based electronic medical records, fall detection pendants, and historical use of medical alert services – to identify seniors who are at risk of emergency transport in the next 30 days. This allows healthcare providers to reach out to a senior person even before a fall or other medical complication occurs, preventing unnecessary hospital readmissions and reducing costs of transportation, acute care, and rehabilitation. In a similar vein, one medical home network in the US reported using machine learning to identify individuals with a heightened risk of developing severe complications from COVID-19. Rather than calling all 122,000 of their members to check in on their well-being, the home network took a more targeted, data-driven approach to focus their initial outreach on the 4.4 percent at-risk patients. By educating this group on when and where they should seek medical care, providers sought to proactively help at-risk patients while managing strain on healthcare organizations"',
    createdData: 'November 2, 2020',
    partnerWebsite: 'https://siemens.com/it/',
    altBanner:
      'There is a doctor holding a tablet through whitch exits icon of medical stuff ',
  })
  await BigDataAnalysis.addCasestudy(bdaC4.id)
  await PredictiveAnalyticsInHealthcare.addCasestudy(bdaC4.id)
  await PredictionScenarioAnalysis.addCasestudy(bdaC4.id)
  await BIDWHConsulting.addCasestudy(bdaC4.id)

  const bdaC5 = await CaseStudy.create({
    title: 'Optimise digital marketing',
    subTitle: 'Finding the right digital marketing agency isn’t easy.',
    banner:
      'https://deoriunde.com/wp-content/uploads/2019/11/Digital-marketing.jpg',
    descriptiveText:
      'The challenge for us was helping Intuit build visibility and become known for services outside of the main ones for which they are known. Plus there was some concern around their highly-specialized competitors like GoDaddy.',
    challengeTitle: 'A good understanding of your customer’s behavior.',
    challengeDescription:
      'At its core, marketing is all about communicating with your customers in their own language on the platforms where they hang out. Before you can do that, you need to understand your audience. Not just surface level stuff like “they need help with SEO,” but a deeper understanding.',
    solutionTitle: 'Improved understanding of customer behaviour',
    solutionDescription:
      'When you’re starting a business, it’s all about hustling. You’re just trying to generate revenue however you can. But as you grow, you must develop more documentation and processes around your workflows. For example, you might need to have documentation for how to run a PR, social media, or paid advertising campaign.',
    createdData: 'October 27, 2020',
    partnerWebsite: 'https://www.mckinsey.it/',
    altBanner:
      'There is a tablet from which exit icons regarding digital stuff',
  })
  await BigDataAnalysis.addCasestudy(bdaC5.id)
  await OptimizeDigitalMarketing.addCasestudy(bdaC5.id)
  await PricingOptimization.addCasestudy(bdaC5.id)
  await PredictiveAnalyticsInHealthcare.addCasestudy(bdaC5.id)

  const bdaC6 = await CaseStudy.create({
    title:
      'Real-time traffic prediction via highly automated fleet communication',
    subTitle:
      'Providing drivers and highly automated vehicles with a view of the road ahead that is as comprehensive as possible is the main idea of the project. ',
    banner:
      'https://www.carhs.de/newsletter-archive/images/news/ipgflottenkommunikationbig.jpg',
    descriptiveText:
      'Driving onto the highway and knowing in advance how slow the rush hour traffic will move or whether the two-hour buildup will clear up that moment, ensuring smooth driving – in the research project “Providentia – Pro-active video-based use of telecommunications technologies in innovative autobahn scenarios”, a real-time view of the highway traffic ahead is tested using corresponding sensors and big data. Via the highly precise localization of traffic objects within the system, driver and self-driving cars are provided with information, increasing the safety, efficiency, and comfort of driving. ',
    challengeTitle: 'Simulation software CarMaker by HEXTECH.',
    challengeDescription:
      'The main aim of the project is to provide drivers and highly automated vehicles with a comprehensive view of the road ahead. Successful implementation requires a cellular network for data transfer and Car2X receivers, which process and transfer the relevant data. The ‘digital twin’ of the infrastructure is therefore always up-to-date and enables derivations of all relevant information for each vehicle in real time and under adverse weather conditions.',
    solutionTitle: 'Development of the system',
    solutionDescription:
      'For the development of the system, the simulation software CarMaker by IPG Automotive offers important support. On-road field tests on the digital test bed on the German highway A9 are realistically transferred to the virtual world with CarMaker. Real traffic situations and objects are virtually modeled in real time which allow for realistic tests of the entire system in virtual test driving while taking uncertainties into account. If the interaction of sensors, Car2X components, and advanced driver assistance systems works in the scenarios, the real-time visualization in the vehicle is tackled in the next step. Data obtained in reality is then displayed on a laptop in the car while driving, and the information supply of the connected vehicles is tested in actual traffic scenarios on the test track.',
    createdData: 'September 23, 2020',
    partnerWebsite:
      'https://ipg-automotive.com/products-services/simulation-software/carmaker/',
    altBanner:
      'Car suited with many sensors used to predicte traffic',
  })
  await BigDataAnalysis.addCasestudy(bdaC6.id)
  await PredictionScenarioAnalysis.addCasestudy(bdaC6.id)
  await OptimizeDigitalMarketing.addCasestudy(bdaC6.id)
  await BigDataAutomation.addCasestudy(bdaC6.id)
  //**END OF BIG DATA ANALYSIS CASE STUDIES */

  //**CLOUD COMPUTING CASE STUDIES */
  const ccC1 = await CaseStudy.create({
    title: 'Massive invoice volumes as key driver for e-invoicing',
    subTitle:
      '“KPN generates an astonishing 100 million invoices per year. This is more than eight million per month. We are, with the exception of the Tax Administration, the biggest paper factory in the Netherlands.” explains Hans Hodes, Business Consultant at KPN. Customers receive invoices with cost summaries each month, or every other month. With these volumes, it was clear that e-Invoicing could bring big benefits.',
    banner: 'https://einvoice1-trial.nic.in/Images/Einvoice_banner2.jpg',
    descriptiveText:
      'The Netherlands’ leading telecommunications company, KPN, serves both consumers and business marketers – including 60% of the 1 million businesses in the Netherlands. Basware is helping them manage more than 100 million invoices per year.',
    challengeTitle: 'The increasing popularity if e-invoicing',
    challengeDescription:
      'Over the years, electronic invoices became more common and KPN experienced a higher demand for this service. KPN’s German e-Invoicing service provider handled these requests. Hodes explains: “When customers called us, they were serviced by our German service provider after various detours and connections in the chain. In my opinion, this could have been done better.”',
    solutionTitle: 'QUICK SWITCH OF E-INVOICING PROVIDER',
    solutionDescription:
      'Getting e-Invoicing to take off in amarket requires cooperation amongthe multiple e-Invoicing serviceproviders. The service providersneed to create a stable environmentfor customers, so that customerswill dare to make the switch to ‘true’e-Invoicing. If the e-Invoicing serviceproviders don’t work together,companies in the Netherlandswill stick to invoicing via directconnections or an e-mail with PDF.” In the Netherlands, the e-Invoicingmarket has been stagnant for afew years. For that reason, KPN isworking with Basware to encouragecooperation throughout the entireindustry. Once there is greatertransparency as to which companyis connected to which communityand information can be exchanged,e-Invoicing can be stimulated.',
    createdData: 'January 17, 2021',
    partnerWebsite: '',
    altBanner:
      'There is a computer with a Invoice write and some papers with a pencil holded from an hand',
  })
  await CloudComputing.addCasestudy(ccC1.id)
  await EInvoice.addCasestudy(ccC1.id)

  const ccC2 = await CaseStudy.create({
    title: 'JAVA BACKEND DEVELOPMENT FOR AN INNOVATIVE HOTEL SELF-SERVICE APP',
    subTitle:
      'To date, the demo version of the application has been successfully presented to future end users and received their endorsement. Satisfied with the results, the Customer continues cooperation with HexTech as new features and integrations are continuously added. In the nearest future, the app should be adopted by about 100 hotels around the globe.',
    banner:
      'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/5000741/original/fca44be5f9f214b2c4937d99e292951b0a19c2f8/write-any-c-plus-plus-java-or-python-program.png',
    descriptiveText:
      'The Customer is a European startup company developing an innovative hotel self-service app to sell to various hotel facilities around the world. The new application is aimed to cover multiple hotel services at once. For example, it allows guests to check in on the way to a hotel, open a locked room door with their mobile device without any keys and plastic cards, quickly and easily manage room, food, and spa services offered by a hotel from any location and more.',
    challengeTitle: 'Java backed for web-based solution',
    challengeDescription:
      'The Customer needed to create Java backend that would become the basis for their web-based solution as well as Android and iOS mobile apps. The backend had to support complex functionality (check-in, door opening, extra services management, check-out, etc.) as well as enable the application’s multitenancy, flexibility, sustainability and impeccable UX.',
    solutionTitle: 'Microservices-based architecture',
    solutionDescription:
      'Turning to the microservices-based architecture, HexTech’s team managed to ensure quick ongoing Agile development and simplified future scaling and integration processes. The first release of the system consisted of 9 independent services, each being responsible for a set of functions. The implementation of the app’s functionality and expected multitenancy required a number of future integrations with external applications (e.g., applications of door lock providers, internal hotel management systems, etc.). To reduce time of future integration and necessary efforts, HexTech’s team created reliable, secure, and reusable APIs for microservices. As a result, only minor tweaks were needed to introduce new components to the system.',
    teamsTitle: 'Cloud App Development Departement',
    createdData: 'October 1, 2020',
    partnerWebsite: '',
    altBanner: 'There is a computer with displayed code',
  })
  await CloudComputing.addCasestudy(ccC2.id)
  await CloudAppDevelopServices.addCasestudy(ccC2.id)

  const ccC3 = await CaseStudy.create({
    title: 'Live Event Broadcasting Video Platform',
    subTitle:
      'Present Communications provides audio-visuals, video conferencing equipments, webcasting, video productions, and other technical services to the live event industry.',
    banner:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTycYMziZzUxXQc-01VqqG5sT1ofurNRhvXDw&usqp=CAU',
    descriptiveText:
      'Present Communications provides audio-visuals, video conferencing equipments, webcasting, video productions, and other technical services to the live event industry. The platform was also expected to allow presenters to play a slideshow along with the webcast. They wanted the users to be able to share their queries about the event, and participate in online polls conducted during the live webcast.',
    challengeTitle:
      'Our client wanted to use a third-party video streaming platform to take care of the webcasting solution.',
    challengeDescription:
      'Our team could foresee some initial challenges with this request. One issue was to determine whether the third-party platform would be able to provide automated app creation, with the web services. Our team anticipated issues related to IPs and assessed the need to find out what kind of browser issues would possibly occur. Another challenge was to find a video player that could offer adaptive bit-rate streaming. Since there were no specific requirements given to us by the client, our team had to work on refining the scope for the application as well.',
    solutionTitle: 'Ideation',
    solutionDescription:
      "The product owner team took the baton of ideating the requirements with the client via regular documented brainstorming sessions. The requirements were then converted into a visual representation via wireframes which represented the probable user flow on the platform. We then assigned relative priorities to the features in order to identify the Minimum Viable Product ( MVP ) and kept the 'extra' features out of the first release. This helped us keep the costs down and ensure greater value.",
    createdData: 'June 27, 2020',
    partnerWebsite: 'https://intl.cloud.tencent.com/',
    altBanner: 'There is a person with a camera in a studio',
  })
  await CloudComputing.addCasestudy(ccC3.id)
  await LiveVideoBroadcasting.addCasestudy(ccC3.id)
  await LiveECommerce.addCasestudy(ccC3.id)

  const ccC4 = await CaseStudy.create({
    title: 'Maybelline Proves sintony between E-Commerce and Live-Streaming',
    subTitle:
      'Maybelline New York faces the same challenge as many other brands: building an authentic connection with young women that drives sales. ',
    banner:
      'https://www.livescale.tv/wp-content/uploads/2020/12/Live-Shopping-Livescale-Checkout-Flow-Fashion-1.jpg',
    descriptiveText:
      'Maybelline New York faces the same challenge as many other brands: building an authentic connection with young women that drives sales. In China, many brands try to show women of generation X that they understand by using gimmicks, trends, or celebrity partnerships. For the launch of its new lipstick, Lip Flush Oil, Maybelline New York went beyond its typical new product launch by creating an experience for customers that gave them what they wanted when they wanted it.',
    challengeTitle:
      'Searching for sinergy between E-Commerce and Live-Streaming',
    challengeDescription:
      'Many Chinese gen X women have no siblings and long to stay connected to their friends, culture, and current events. Similar to their counterparts in other regions, they have short attention spans. Maybelline wanted to provide a riveting, immediate experience that would spark interest in the new lipstick.',
    solutionTitle: 'Developed platform for live e-commerce',
    solutionDescription:
      'Live-streaming apps gained popularity in the spring of 2016. Among them were Meipai, Nice, and Panda TV, which each have more than 10 million daily active users. But many brands began using them with negative results. Maybelline’s marketing team decided to take live-streaming off of niche apps by using the leading mobile purchase platform, Taobao. Using this app allowed Maybelline to shorten the purchase journey during the launch from weeks to a single click. By live-streaming the launch event directly on Taobao, fans could become an integral, engaged element of the launch event.',
    teamsTitle: 'Live Broadcasting Department',
    createdData: 'March 17, 2020',
    partnerWebsite: 'https://www.maybelline.it/',
    altBanner:
      'There is a phone with a screen which displays a purchase during a live streaming',
  })
  await CloudComputing.addCasestudy(ccC4.id)
  await LiveVideoBroadcasting.addCasestudy(ccC4.id)
  await LiveECommerce.addCasestudy(ccC4.id)

  const ccC5 = await CaseStudy.create({
    title: 'ProDeploy Client Suite',
    subTitle: 'Minimizes end-user downtime',
    banner:
      'https://www.routech.ro/wp-content/uploads/Cum-sa-va-configurati-propriul-computer-Cloud.jpg',
    descriptiveText: 'Deploy PCs with greater speed and less effort.',
    challengeTitle: 'Deliver pc to your clients rapidly and effectively',
    challengeDescription:
      'Trust Dell EMC pc deployment experts and partners to lead deployments from project management through planning, configuration and integration. We deploy new technology every day so in addition to being fast and thorough, we avoid common mistakes that can cost time and money. And by using the TechDirect portal to define the scope of your project, configure systems and check status, execution will be faster, more consistent and efficient.',
    solutionTitle: 'Helps to avoid common, expensive mistakes',
    solutionDescription:
      'ProDeploy Plus is a comprehensive service providing seamless deployment of new technology. You get a single point of contact for project management including up-front planning, configuration, data migration and knowledge transfer. You will even  be able to use system management software3 such as Microsoft Endpoint Manager or MDT to control configuration of new systems. ',
    createdData: 'August 21, 2018',
    partnerWebsite: 'www.ibm.com',
    altBanner: 'There is a pc with some clouds on the screen',
  })
  await CloudComputing.addCasestudy(ccC5.id)
  await HybridCloud.addCasestudy(ccC5.id)

  const ccC6 = await CaseStudy.create({
    title: 'American Airlines',
    subTitle:
      'The route to customer experience transformation is through the cloud.',
    banner:
      'https://www.americanairlines.it/content/images/homepage/mobile-hero/en_US/Tail.png',
    descriptiveText:
      'To become more responsive to customer needs, American Airlines needed a new technology platform and a new approach to development that would help it deliver digital self-service tools and customer value more rapidly across its enterprise. HexTech is helping the airline migrate some of its critical applications to the HexTech Cloud while using new methodology to create innovative applications quickly while improving the customer experience.',
    challengeTitle: 'Taking to the digital skies',
    challengeDescription:
      'In the highly competitive airline industry, customer experience is a major point of differentiation – and digital channels are increasingly important. American Airlines wanted to provide convenient digital services for customers and understood there was an opportunity to remove the constraints of the existing legacy architecture, platform, organization, development and operations approaches. Customer-facing applications were based on monolithic code, duplicated and managed in silos. Every change required the same work in up to three places, each managed by different teams.',
    solutionTitle: 'Migrate, transform, operate',
    solutionDescription:
      'Migrate: HexTech’s comprehensive proposal addressed American’s immediate and long term operational concerns through a seamless migration of on-premise servers to HexTech Cloud’s Infrastructure as a Service with VMware Cloud Foundation solution. Transform: HexTech also proposed to accelerate the transformation of American’s application development, organization and skills, based on its HexTech Garage Method. As HexTech and American jointly developed the new cloud-native apps in Cloud Foundry on HexTech Public Cloud Platform as a Service, the old components would be retired. Operate: The solution brings operations into the development squads, and leverages HexTech’s Cloud Solutions Operations Center to provide 24-hour application support and management services, with the HexTech team located both onsite at American’s location and at an HexTech off-shore location.',
    createdData: 'May 23, 2020',
    partnerWebsite: 'https://www.americanairlines.it/',
    altBanner: 'There is an airplane with an american flag painted',
  })
  await CloudComputing.addCasestudy(ccC6.id)
  await InfraspaceCloud.addCasestudy(ccC6.id)
  //**END OF CLOUD COMPUTING CASE STUDIES */

  //**CUSTOMER EXPERIENCE CASE STUDIES - isi*/
  //1
  const ceC1 = await CaseStudy.create({
    title: 'Reimagining guest experiences on the high seas',
    subTitle:
      'Carnival Corporation connects high-touch technology and the human touch to create hyper-relevant experiences for thousands of guests at a time.',
    banner:
      'https://images.unsplash.com/photo-1558923240-2672e219374b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80',
    descriptiveText:
      'Carnival Corp.’s CEO Arnold Donald has dubbed today “the golden age of cruising.” With growth in guest numbers, fleet sizes, ticket prices and a sea of new competitors, the description certainly fits. However, as dynamic as the industry is, the cruise travel category remains under penetrated. The company’s leadership knew to expand the market for cruise vacations, the cruise model itself had to change. The focus needed to go beyond building and marketing new ships to leveraging the company’s scale to create a new and sustainable competitive advantage. With the world’s largest fleet spanning nine distinct brands, Carnival Corp. envisioned a new model that elevated guest experience enablement above the physical ship platform. ',
    challengeTitle:
      'Our challenge - Deliver personalized, cost-effective experiences to keep passengers coming back to sea on their ships.',
    challengeDescription:
      'It’s no wonder that Carnival Corporation’s CEO Arnold Donald calls today “the golden age of cruising.” Forbes predicts that 27 million people will take a cruise this year, with $65 billion in ships on order over the next decade.',
    solutionTitle:
      'The solution we provided - Connecting every guest to personalized experiences',
    solutionDescription:
      'Each guest receives a free Medallion. The light, quarter-sized disc enables frictionless payment, keyless stateroom access, accelerated embarkation and much more.',
    createdData: 'March 17, 2021',
    partnerWebsite: 'https://www.illy.com/',
    altBanner: 'There is a cruise boat on the high seas',
  })
  await CustomerExperience.addCasestudy(ceC1.id)
  await CreativeMarketingServices.addCasestudy(ceC1.id)
  await AICustomer.addCasestudy(ceC1.id)
  await UserInterfaces.addCasestudy(ceC1.id)

  //2
  const ceC2 = await CaseStudy.create({
    title: 'Finding the perfect blend for the digital customer experience',
    subTitle:
      'illycaffè, the premium Italian coffee brand, offers a unique taste and aroma that’s recognized by coffee lovers around the world, the company sells its products and services to consumers and trade customers in 140 different countries.',
    banner:
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    descriptiveText:
      'Our data-driven, comprehensive and consistent social media strategy is optimizing the creative effort, ensuring premium content with that unique “illycaffè” blend reaches the right audience at the right time on the right channel. Social media activities have increased engagement and reach by 15 percent.',
    challengeTitle: 'Our challenge - Business approach reimagination',
    challengeDescription:
      'Looking to capitalize on its success at home and expand its growth internationally, illycaffè decided to embark on a radical reimagination of its digital customer experience. Combining the power of digital with a customer-centric mindset, illycaffè wanted to offer truly memorable personalized experiences on both B2B and B2C channels. The ultimate goal? To delight and engage its customers, bringing them ever closer to the brand—and fueling new growth for the illycaffè business.',
    solutionTitle:
      'The solution we provided - A whole brand new client approach',
    solutionDescription:
      'Leveraging knowledge from across Interactive design and beyond—in strategy, technology, digital experiences and more—we’re helping illycaffè every step of the way as it drives its transformation forward. Beginning with a digital transformation roadmap, we’re setting the business on a path to transform customer experience in everything from the website to the contact center, putting a customer-centric mindset at the core',
    createdData: 'January 27, 2021',
    partnerWebsite: '',
    altBanner: 'There are some container for a drink in a bar',
  })
  await CustomerExperience.addCasestudy(ceC2.id)
  await Campaign.addCasestudy(ceC2.id)
  await CreativeMarketingServices.addCasestudy(ceC2.id)
  await CEE.addCasestudy(ceC2.id)

  //3
  const ceC3 = await CaseStudy.create({
    title: 'A data-driven recipe for delighting customers',
    subTitle:
      'Reinventing experiences: Subway CDO on personalization. Delivering meaningful insights that are helping them delight customers every day.',
    banner:
      'https://images.unsplash.com/photo-1604908554025-e477d54e85e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2389&q=80',
    descriptiveText:
      'For today’s fast-food consumers, mobile and online ordering are must-haves. But delivering them effectively can be a tall order even for hugely successful brands. As part of a broader digital transformation, we helped Subway® restaurants make sure all their customer touchpoints were hitting the mark by creating a new data-driven experience optimization operating model.',
    challengeTitle:
      'Our challenge - How to make sure every touchpoint hits the mark?',
    challengeDescription:
      'In the hyper-competitive quick service restaurant industry, getting customer experience right matters more than ever. So, as part of a complete transformation of their digital services, Subway wanted to make sure every digital touchpoint was as effective as it could possibly be. And that called for something new: a commitment to continuous consumer experimentation and a data-driven culture of daily user testing whether online, on their mobile app, or in store.',
    solutionTitle:
      'The solution we provided - Building up a new operating model, layer by layer',
    solutionDescription:
      'Using our deep experience of both organizational design and personalization, we helped Subway devise a completely new recipe for success – an operating model that would continuously optimize customer experiences through a dedication to scientific experimentation Leveraging the technologies of Adobe Analytics and Target, the new model enables Subway to run vast numbers of user experience tests across digital channels – everything from changing the color of a single button to revising homepage promotional messaging – and see the results instantly. That’s providing statistically meaningful insights into how design changes affect customer behavior – and company revenue.',
    createdData: 'December 25, 2020',
    partnerWebsite: 'https://www.subway.com/',
    altBanner: 'There is some food on a table in a restaurant',
  })
  await CustomerExperience.addCasestudy(ceC3.id)
  await Campaign.addCasestudy(ceC3.id)
  await CEE.addCasestudy(ceC3.id)
  await UserInterfaces.addCasestudy(ceC3.id)

  //4
  const ceC4 = await CaseStudy.create({
    title: 'Bouquet of innovation, personalization and service',
    subTitle:
      'A digital platform with exceptional, personalized customer experience so business continues to bloom.',
    banner:
      'https://images.unsplash.com/photo-1459662784036-fb86bbf1104f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80',
    descriptiveText:
      'Webshops, much like floral arrangements, can be delicate: one faulty order or misplaced orchid is all it takes to keep a customer from returning. So, when an opportunity sprouted up for Dutch Flowers to fortify their online channel’s technical capabilities, they acted quickly.',
    challengeTitle:
      'Our challenge - Renew the global leader in the floriculture industry',
    challengeDescription:
      'The challenge was clear: finding a solid e-commerce platform to handle this sheer volume of new products and prices on a daily basis. On top of this, Dutch Flowers wanted to continue providing an exceptional customer experience — one that was both personalized and allowed floral wholesale companies to maintain, customize and control their brand identity in the individual websites and assortments for their customers.',
    solutionTitle:
      'The solution we provided - User research and experience mapping',
    solutionDescription:
      'Working with us, Dutch Flowers kicked things off by leveraging design thinking and agile delivery methods, like user research and story mapping, to determine how the ideal customer journey would look as they peruse and purchase flowers online. Together, we developed a minimal viable product (MVP) based on the latest SAP Commerce Cloud Version 2.',
    createdData: 'November 7, 2020',
    partnerWebsite: 'https://dfg.nl/en/',
    altBanner: 'There are some flowers in some buckets',
  })
  await CustomerExperience.addCasestudy(ceC4.id)
  await Campaign.addCasestudy(ceC4.id)
  await CreativeMarketingServices.addCasestudy(ceC4.id)
  await Immersive.addCasestudy(ceC4.id)

  //5
  const ceC5 = await CaseStudy.create({
    title: 'Building the in-store experience that everyone desires',
    subTitle:
      'How to provide a custom and tailored experience each time a customer walks into their store.',
    banner:
      'https://images.unsplash.com/photo-1515165244752-2465b61f0441?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1889&q=80',
    descriptiveText:
      'If you have ever wondered what’s behind the happy customers and packed stores it’s several factors including a focus on personalization, innovation and a loyalty program that is so good that it has 25 million members. All of these factors and several more make Sephora one of the most successful beauty retailers in the world.',
    challengeTitle: 'Our challenge - Every customer has to be unique',
    challengeDescription:
      'The beauty industry as a whole faces a multitude of problems mainly around transparency, accuracy and trust of products. For these reasons, online shopping poses key challenges in purchasing beauty products while retail stores pose their own challenge in having the capabilities and manpower to assist every customer in finding the right products.',
    solutionTitle:
      'The solution we provided - Personalization at the next level',
    solutionDescription:
      'Customers are increasingly demanding customization as part of their shopping experience, especially if they’re shelling out for luxuries like makeup. Whether it’s primer for oily skin or moisturizer for dry, Sephora recognizes that their customers require a unique and personalized approach, and they offer this through in-store swatch samplings and makeup demonstrations that allow shoppers to test different brands to be sure they’re buying the right product at the right place. But Sephora doesn’t stop there: their personalized shopping experience extends to the web, which has been a major key to their success in keeping customers loyal to their brand.',
    createdData: 'August 28, 2020',
    partnerWebsite: 'https://www.sephora.com/',
    altBanner: 'There are people inside a make up shop',
  })
  await CustomerExperience.addCasestudy(ceC5.id)
  await AICustomer.addCasestudy(ceC5.id)
  await Campaign.addCasestudy(ceC5.id)
  await UserInterfaces.addCasestudy(ceC5.id)

  //6
  const ceC6 = await CaseStudy.create({
    title: 'A magical experience deserves a magical app',
    subTitle:
      'A personalized experience comes from valuing each customer and taking the time to make their visit amazing.',
    banner:
      'https://images.unsplash.com/photo-1534450539339-6d1c81ad18e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1019&q=80',
    descriptiveText:
      'Guests of all ages can appreciate Disney’s magical approach to customer experience. Disney provides lessons for brands in all industries on creating unique, detailed experiences that will stick with customers for a lifetime. We helped a brand excellence to improve their local customer service',
    challengeTitle: 'Our challenge - Provide an experience organizer',
    challengeDescription:
      'Mobile devices continually redefine how people communicate and organizations must have a mobile-first mindset to retain their share of market. More than half of online traffic now comes from smartphones and tablets and that number is continuing to rise. Organizations must have a mobile-first mindset and continually think about the human on the other side of the screen.',
    solutionTitle: 'The solution we provided - The ultimate planning app',
    solutionDescription:
      'The app we designed for Disney contains most of the information on the website but it’s not just the website shoved into app-form. It’s laid out well and even has GPS-enabled walking directions between attractions. I can easily find park hours, showtimes, wait times for rides, and order food so you don’t need to wait in line anymore. All of the tickets, dining reservations, and photos are in the app, along with a personalized schedule that I can create to make sure I don’t miss the biggest rides and attractions.',
    createdData: 'July 17, 2020',
    partnerWebsite: 'https://www.disneyworld.eu/',
    altBanner: 'There is the castle of disneyland ',
  })
  await CustomerExperience.addCasestudy(ceC6.id)
  await CreativeMarketingServices.addCasestudy(ceC6.id)
  await Immersive.addCasestudy(ceC6.id)
  await CEE.addCasestudy(ceC6.id)

  //7
  const ceC7 = await CaseStudy.create({
    title: 'Bringing clothing to life directly in-store',
    subTitle: 'How Zara is now leading the mid-market tech fashion pack.',
    banner: 'https://www.mind-mag.com/wp-content/uploads/2018/04/IMG2645.jpg',
    descriptiveText:
      'Zara is one of the world’s most successful fashion retail brands, if not the most successful. Not only is Zara a clear leader in the fashion industry, but is also a large tech firm. The key of Zara’s success is that its business model leans heavily on technological innovation and customer experience.',
    challengeTitle: 'Our challenge - Finding an engaging technology ',
    challengeDescription:
      'In essence, thanks to a pioneering technological strategy, Zara holds the title for market leader. By adopting new tools including big data, augmented reality and artificial intelligence, the Spanish clothing retailer has managed to outpace its direct competitors. Zara ask Hextech to design a unique high quality and innovative customer experience, involving AR. Zara is looking at for a means of enhancing the in-store experience, trialing this on a meaningful scale',
    solutionTitle: 'The solution we provided - Augmented reality ',
    solutionDescription:
      'By pointing cameras at sensors installed in windows, users of the app can see virtual fashion models strutting their stuff. Other AR imagery includes mannequins moving around and showcasing the brand’s new Studio Collection. Once users have lived the experience, there is also the option to buy the featured clothes directly through the app by simply clicking on “shop the look” button or in the store itself. This is a great solution to attract millennial shoppers to its brick and mortar store locations.',
    createdData: 'April 7, 2020',
    partnerWebsite: 'https://www.zara.com/',
    altBanner: 'There is a phone taking a picture to an ads on a wall',
  })
  await CustomerExperience.addCasestudy(ceC7.id)
  await Campaign.addCasestudy(ceC7.id)
  await Immersive.addCasestudy(ceC7.id)
  await CreativeMarketingServices.addCasestudy(ceC7.id)

  //8
  const ceC8 = await CaseStudy.create({
    title: 'A smooth checkout-free shop',
    subTitle:
      'Reimagine the In-store Customer Experience with Frictionless Shopping.',
    banner:
      'https://images.unsplash.com/photo-1590599145008-e4ec48682067?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    descriptiveText:
      'Innovative retailers realize they need to create smart stores to enhance their customer experiences.  Recent advances in point-of-sale technologies are making it possible for retailers to reimagine the shopper in-store journey. With new retail technologies, long retail checkout lines and other in-store bottlenecks could soon be a thing of the past.',
    challengeTitle:
      'Our challenge - Realizing a bridge between offline and online shopping',
    challengeDescription:
      'We want to create a whole new shopping style with some characteristics. When you shop at one of these stores, you never have to wait in line. The store works with an Amazon Go app for iOS or Android: You enter, take the products you want and, thanks to the app, just leave again. The app is linked to your Amazon account for billing. Our goal is making the customer feeling fascinated by picking things up and putting them back, just like from your own cupboard.',
    solutionTitle:
      'The solution we provided - The ultimate frictionless shopping experience',
    solutionDescription:
      'We developed a unique system that allows to enter the store with the Amazon Go app open on your phone, fill your shopping bags with whatever you want, and then leave the store. Amazon Go stores use cameras and sensors to know what’s been taken off the shelves, so items can be charged to your credit card, which is stored in the Amazon Go app. No cashiers, no long lines, no paper receipts. Amazon Go showcases the convergence of technology and traditional retail shopping in a convenience store format.',
    createdData: 'March 27, 2019',
    partnerWebsite: 'https://www.amazon.com/b?ie=UTF8&node=16008589011',
    altBanner: 'There is an hand handling a phone next to an Amazon Go shop',
  })
  await CustomerExperience.addCasestudy(ceC8.id)
  await AICustomer.addCasestudy(ceC8.id)
  await Campaign.addCasestudy(ceC8.id)
  await UserInterfaces.addCasestudy(ceC8.id)

  //9
  const ceC9 = await CaseStudy.create({
    title: 'Delivering value to customer Service',
    subTitle: 'Increase the brand-loyality of the number one coffee company.',
    banner:
      'https://images.unsplash.com/photo-1570526427067-b456f83a4de4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
    descriptiveText:
      'Starbucks is a major specialty-coffee brand in the North. Recent market research has indicated that the service level of the company is currently not meeting the expectations of customers. Thus, the company is discussing a plan to increase customer satisfaction by increasing the amount of labor in each coffee store and, as a consequence, increase the speed-of-service.',
    challengeTitle: 'Our challenge - Increase loyalty',
    challengeDescription:
      'One of the core issues the company is facing is that its services are not meeting customer expectations. It is mainly due to changes in target customers, decreasing age and income groups, and customer’s poor perception of the company.',
    solutionTitle:
      'The solution we provided - Leveraging technological and experiential methods',
    solutionDescription:
      'We wanted to start from store design, or brand localization. This is just one of the creative ways Starbucks can connects with its customers, integrating local aesthetics into each of its stores. The company’s design studios are strategically located so that designers can better understand their communities. Furthermore, we developed the "tech-side", creating an Amazon Alexa platform and the My Starbucks Barista chatbot debuted, letting users order their favorite coffees using simple voice commands.',
    createdData: 'January 17, 2019',
    partnerWebsite: 'https://www.starbucks.com/',
    altBanner: 'There is a phone taking a picture to a cup of coffee',
  })
  await CustomerExperience.addCasestudy(ceC9.id)
  await UserInterfaces.addCasestudy(ceC9.id)
  await Immersive.addCasestudy(ceC9.id)
  await Campaign.addCasestudy(ceC9.id)

  //**END OF CUSTOMER EXPERIENCE CASE STUDIES */

  //**IOT CASE STUDIES */
  const iotC1 = await CaseStudy.create({
    title: 'Retail Sensor Platform',
    subTitle:
      'Businesses can leverage the real-time data coming from IoT sensors to know when a product is about to go out-of-stock, or what their customers have bought that day.',
    banner:
      'https://www.intel.com/content/dam/www/public/us/en/images/iot/16x9/rss-rfid-power-of-data-16x9.jpg.rendition.intel.web.576.324.jpg',
    descriptiveText:
      'RFID tags are placed on all the items in the store. Data readings are forwarded to Intel gateways, and then pushed back to back office systems for cloud-based analytics. RFID antennas are always on, gathering and disseminating the Stock Keeping Unit (SKU)-level data on a constant basis. Since the system is continuously scanning for products, it is able to locate and account for every item on the sales floor at any one time. The system provides alerts to allow stock to be replenished when running low. Intel has designed its reader to be simple to set up and calibrate. Once the plug-and-play device is connected to an Intel gateway via one wire, it begins collecting and forwarding the inventory information.',
    challengeTitle: 'Reduce lossess for retailers world-wide',
    challengeDescription:
      'According to McKinsey & Co, inventory distortion - in the form of overstock, stock-out and shrinkage - represents just over $1 trillion worth of losses for retailers world-wide. Furthermore, McKinsey estimates that the potential impact of IoT on retail will range from $410 billion to over $1 trillion per year by 2025.',
    solutionTitle: 'Improved understanding of customer behaviour',
    solutionDescription:
      'The system records not only when the item has been sold, but also what items have been touched and tried on. In addition, as well as being fully informed about their stocks, store staff gain a better understanding of customer traffic and local demand. The retailer is able to identify premium traffic areas, learn how customers interact with specific items, and learn which products are abandoned and which are preferred. McKinsey estimates that optimising store layouts can increase productivity by 5 percent',
    createdData: 'January 17, 2021',
    partnerWebsite: 'https://www.levistrauss.com/',
    altBanner:
      'There are five columns that represents the various steps for the creation of the product',
  })
  await IoT.addCasestudy(iotC1.id)
  await SmartRetail.addCasestudy(iotC1.id)

  const iotC2 = await CaseStudy.create({
    title: '7-Eleven - Reliable and user-friendly IT system',
    subTitle:
      'A highly sophisticated IT/store solution that supports the global business model and store management activities of 7-Eleven.',
    banner:
      'https://www.viewsonic.com/library/wp-content/uploads/2019/08/LB0040-hero-compressed.png',
    descriptiveText:
      'Through its long years of relationship with HexTech, a trusted partner that had a true understanding of the store business process of the ground reality, 7-Eleven was able to build a reliable and user-friendly IT system. Specifically, HexTech realized a robust framework that supported the store management of each franchisee: providing merchandising support on ordering and product assortment, while improving the store operation efficiency.',
    challengeTitle: 'Promote global expansion',
    challengeDescription:
      "7-Eleven's challenge is to further promote its active global expansion and area licensee movement to the matured and emerging retail markets. In order to achieve such business goal, 7-Eleven required a solution partner that had a true understanding of its business strategy and process, thereby providing the most appropriate support that corresponded to each need of the specific country or region.",
    solutionTitle: 'Retailer Initiative',
    solutionDescription:
      '7-Eleven has come to gain a ‘No. 1 Convenience Store’ status in many countries and regions around the world. Such remarkable result was achieved by adapting the concept of Retailer Initiative supported by highly sophisticated IT and network technologies in order to adjust to the specific conditions and situations of each region. In the US, the average sales figures for franchise stores incorporating this advanced business model have soared by 43 percent.',
    createdData: 'December 17, 2020',
    partnerWebsite: 'https://www.7-eleven.com/',
    altBanner:
      'There is a person in a shop reading products details from its smartphone',
  })
  await IoT.addCasestudy(iotC2.id)
  await SmartRetail.addCasestudy(iotC2.id)

  const iotC3 = await CaseStudy.create({
    title: 'Transforming Retail Pain into Smart Gain',
    subTitle:
      'Capture data, improve customer service quality, and reduce costs by using space and resources more effectively.',
    banner:
      'https://www.finoit.com/wp-content/uploads/2016/12/restaurant-iot-featured-2.jpg',
    descriptiveText:
      'With an IoT smart retail package, building operators can map scenarios such as space or comfort monitoring in their entirety or in a modular way. Retail building operators can now seamlessly capture data, improve customer service quality, and reduce costs by using space and resources more effectively.',
    challengeTitle: 'Reduce energy consumption',
    challengeDescription:
      'The owner of a large fast-food chain, needed to significantly reduce energy consumption in all stores.',
    solutionTitle: 'IoT smart retail package',
    solutionDescription:
      'Energy sensors were installed on A/Cs, refrigerators and lighting. After one month, the branches displayed different energy consumption patterns. Researching this further, they discovered that the refrigeration equipment in one of the branches was faulty and the compressors were overworked. The customer installed door sensors in the refrigerators to send an alert if doors weren’t fully closed after a set time interval. Often times, employees push the door closed without the door actually sealing, and the refrigerator needs to work harder to keep food cool. Leaving the door open overnight often results in food wastage. The goal was to develop a guest ‘comfort score.’ Sensors were installed to monitor noise, smell, air quality, and restaurant temperature. Data from each sensor were given a score and all scores were tallied up to create a guest comfort score that could be proactively monitored across locations. Alerts were sent if guest comfort scores dropped below an acceptable level. This system integrator is currently working on an extension to improve guest satisfaction. They are researching technology to track the time it takes guests to get their meal from the moment they enter the restaurant.',
    createdData: 'March 17, 2020',
    partnerWebsite: 'https://www.mcdonalds.it/',
    altBanner: 'There is a restaurant and some suggestion to optimize it',
  })
  await IoT.addCasestudy(iotC3.id)
  await SmartRetail.addCasestudy(iotC3.id)

  const iotC4 = await CaseStudy.create({
    title: 'Building a connected car ecosystem',
    subTitle:
      'HexTech, with its Automotive division, constantly develops solutions for innovation trends such as e-mobility and ACES (for cars intended to be autonomous, connected, electric and shared)',
    banner:
      'https://images.acvmagazine.com/file/BIT-Magazine-Images/feature_cover_06.jpg',
    descriptiveText:
      'In a time of e-mobility, we recognize the necessity of expanding the ecosystem to include third-party providers such as Alexa Auto. That is why the deployment of ŠKODA Connect Alexa Skill is the perfect example of building a connected car ecosystem.  Our work in these fields includes software development and external testing services.',
    challengeTitle: 'Voice assistants for cars',
    challengeDescription:
      'Voice assistants are mostly associated with smart home solutions rather than with remote management for cars. But what if we were able to integrate cars and voice assistants? Indeed, that was the main goal to enable ŠKODA car owners to communicate with their vehicles remotely, using nothing more than the Alexa Echo home speaker or the Alexa smartphone app. In this case, reduced time to market was crucial to fulfil the challenge. ',
    solutionTitle: 'Alexa Skill - New implementation af Alexa for Skoda',
    solutionDescription:
      'The idea was to understand the client’s needs and obtain feedback to effectively move from proof of concept to the final product. For this purpose, we adopted an iterative agile approach. With many years of experience using this methodology, we have established a dedicated scrum team, consisting not only of developers, but also of user experience/ interface designers. Their involvement allowed the creation of an intuitive voice user interface. As a result, we delivered a Skill, which allows the end-user to manage their car remotely.',
    createdData: 'November 17, 2019',
    partnerWebsite: 'https://www.skoda-auto.com/',
    altBanner:
      'There is a car intern and some icons connected to develop a car ecosystem',
  })
  await IoT.addCasestudy(iotC4.id)
  await Automotive.addCasestudy(iotC4.id)

  const iotC5 = await CaseStudy.create({
    title: 'Abnox AG - 4.0 Industry',
    subTitle:
      'The concept of Industry 4.0 is based on several foundations, including technology, processes, organization, and operational and business models.',
    banner:
      'https://www.decision.com/wp-content/uploads/2020/12/Smart-Factory-1-1024x444.png',
    descriptiveText:
      'In discussion about Industry 4.0, it is difficult to draw a clear distinction between business and technological aspects. The development of supporting technologies has a direct influence on the business operations of manufacturing companies. This can be observed by looking at the cycle of activity in which cyber-physical systems play a major role, making it possible for those systems to communicate and process vast amounts of data. The end result of this cycle is a concrete step into the physical world (such as the creation of an end product)..',
    challengeTitle: 'Transition to Industry 4.0',
    challengeDescription:
      'Abnox AG is a Swiss company which manufactures specialized devices for dispensing lubricants used in several types of industry. These products are often made in small batches or in multiple versions. The specific nature of production focused on diversity causes numerous problems, such as frequent changes in the production documentation. As a result, mistakes are hard to avoid and there is a risk that employees will miss some components or steps in the process. Abnox’s specific style of production makes the processes more complicated. Issues arise at the stage of setting up workstations, designing tools and collecting and verifying the data needed at each manufacturing stage. Owing to the integration of IoT solutions with the ERP system',
    solutionTitle: 'Industrial connected displays',
    solutionDescription:
      'The solution was based on dedicated industrial displays which were connected to the LAN network already existing in the plant. The displays present assembly instructions for, employees, to ensure that no steps of the process are missed. The digitization of manufacturing made possible by IoT and ERP reduced the problem of delegating tasks at workstations, made the production processes more efficient, and brought better communication between the machines, systems and employees.',
    createdData: 'October 17, 2019',
    partnerWebsite: 'https://www.abnox.com/en/',
    altBanner:
      'There is a man holding a tablet and there are some technological icons',
  })
  await IoT.addCasestudy(iotC5.id)
  await IndustrialManufacturing.addCasestudy(iotC5.id)

  const iotC6 = await CaseStudy.create({
    title: 'Boston Children’s Hospital and smarter healthcare',
    subTitle:
      'Healthcare is one of the richest areas of opportunity for the Internet of Things. ',
    banner:
      'https://peerbits-wpengine.netdna-ssl.com/wp-content/uploads/2018/07/benefits-of-iot-health-applications-of-iot.jpg',
    descriptiveText:
      'Shwetak Patel, a MacArthur Fellow and a Professor of Computer Science and Engineering at the University Washington who specializes in developing Internet of Things technologies says, “the next wave of the Internet of Things is going to have a huge impact in healthcare. For example, health sensing in the home is critical for managing chronic diseases.” One of the diseases Patel is targeting with the Internet of Things is chronic obstructive pulmonary disease, or COPD.',
    challengeTitle: 'Give access to everybody',
    challengeDescription:
      'The disease is diagnosed and treated using devices called spirometers, which measure air flow in and out of the lungs. Spirometers cost thousands of dollars, are only available in hospitals and occasionally at doctor’s offices, and many COPD sufferers do not have easy access to them. To solve this problem, Patel created an Internet of Things-based alternative to spirometers, using the most abundant networked sensors in the world: the microphones in telephones.',
    solutionTitle: 'Lung health measured by an algorithm ',
    solutionDescription:
      'Today there are nearly nine billion phones, most of them cell phones. Patel’s team developed an algorithm that measures lung health by analyzing the sound of someone blowing on a phone’s microphone. This replicates a spirometer without the expense and hospital visit. All a COPD sufferer has to do is call a toll-free number and blow on their phone. Networked computers take care of the rest by performing complex calculations, then delivering the results a few seconds later via a voice or text message. The early versions of the algorithm only worked on expensive smart phones, but Patel and his team refined it over time until it could work on any phone. Diagnosing and treating COPD provides a glimpse of how the Internet of Things will improve healthcare in the future.',
    createdData: 'September 17, 2019',
    partnerWebsite: 'https://www.childrenshospital.org/',
    altBanner:
      'There are many smart devices connected to a cloud connected to a figure of a doctor',
  })
  await IoT.addCasestudy(iotC6.id)
  await Healthcare.addCasestudy(iotC6.id)

  const iotC7 = await CaseStudy.create({
    title: 'Internet of Medical Things',
    subTitle:
      'Ensure that the right people are assigned to the right places to efficiently deliver quality care while improving staff morale and patient satisfaction.',
    banner: 'https://img.lovepik.com/photo/50056/0961.jpg_wh860.jpg',
    descriptiveText:
      'IoT in health care can dramatically optimize workflow and staffing. Even a basic IoT solution can collect and bring together such data as staff location and expertise, patient acuity and location, and availability and location of critical diagnostic and therapeutic equipment. Once modeled, this data can help staffing managers improve workflows and make better staffing and scheduling decisions.',
    challengeTitle: 'Customized therapies and interaztions',
    challengeDescription:
      'Patients today expect more personalized interactions as well as customized therapies that are effective and cost-efficient. Health care systems can be overwhelmed by the flood of rich new data sources, including social media, wearables and medical devices (known as the Internet of Medical Things, or IoMT). The digitization of the health care industry – from patients to clinical infrastructure – provides unprecedented opportunities to transform delivery and meet the challenges of cost, quality and access.',
    solutionTitle: 'IoT Analytics',
    solutionDescription:
      "Manage and analyze your IoMT data where, when and how it works best for your patient. Deliver the best patient experience – in real-time. Understand which data is relevant and private, so you'll know what to store and what to protect. SAS delivers trusted, automated IoT analytics solutions that can help you: - Maximize value from IoMT data. Identify and leverage data sources that provide tangible insights into enhancing patient care, streamlining processes and delivering cost optimization strategies. - Drive innovation in patient care and operations. Develop new business models and opportunities for data sharing and monetization with a more dynamic, open and agile platform. - Embed IoMT analytics within decision support systems. Reduce alarm fatigue, improve patient safety, optimize staff and patient flow, and accelerate the adoption of value-based health care and personalized medicine.",
    createdData: 'July 17, 2019',
    partnerWebsite: '',
    altBanner:
      'There is a doctor holding a tablet through whitch exits icon of medical stuff',
  })
  await IoT.addCasestudy(iotC7.id)
  await Healthcare.addCasestudy(iotC7.id)

  const iotC8 = await CaseStudy.create({
    title: 'Innovation to the streets of Jamshedpur',
    subTitle:
      'Optimise infrastructure services in Jamshedpur. Specific areas that involved safety and additional manual effort due to scale, took priority',
    banner:
      'https://hub.beesmart.city/hubfs/04-insights/07-blog-posts-solutions/toplist-smart-lighting-solutions/top-smart-lighting-solutions-for-smart-cities.jpeg',
    descriptiveText:
      'With more than 16000 street lights installed across the city, the monitoring and maintenance of these street lights were both tedious and repetitive. Jamshedpur’s civil twilight starts at 6:30 PM and enters through the night at 8:00 PM to end at 5:30 AM.',
    challengeTitle: 'Energy conservation',
    challengeDescription:
      'This meant that JUSCO need not operate the street lights at 100 percent efficiency all throughout the scheduled operating time. It wanted to implement a smart lighting solution that could drive energy conservation, monitor, and automate fault detection to ensure uninterrupted civil services, all from the central JUSCO command centre. What JUSCO was looking for in a solution is deeper than it’s functional benefits; they were exploring the market for partners in disruptive transformation through innovation and technology, with an acute understanding of the needs of a smart city. ',
    solutionTitle: 'Smart lighting IoT solution',
    solutionDescription:
      'Enabled by the underlying Low Power Wide Area Network (LPWAN) based on Semtech’s LoRa® devices and wireless radio frequency technology (LoRa Technology) that is developed to support multiple smart city use cases at scale, Tata Communications and its device partners deployed smart sensors on the street lights of Jamshedpur. The solution tracked and optimised energy consumption with the automated switching of street lights, along with the capability to control light intensity based on the external lighting conditions. JUSCO realised the power of IoT byc transferring complete control of smart lights to its command centre. It also enjoys the assurance of enterprise-grade SLAs from Tata Communications. The command centre could centrally operate, monitor and optimise all of its smart lights through a web-based application. This integrated view allowed JUSCO to significantly improve their response time and minimise disruption in service and safety. The command centre could accurately identify the smart lights that must be promptly serviced, delivering a better quality of life to the residents of Jamshedpur. All of this is achieved at lower cost and effort.',
    createdData: 'January 19, 2019',
    partnerWebsite: 'https://it.wikipedia.org/wiki/Jamshedpur',
    altBanner:
      'There is a street light with some icons regarding its functioning',
  })

  await IoT.addCasestudy(iotC8.id)
  await SmartLighting.addCasestudy(iotC8.id)
  await SmartCities.addCasestudy(iotC8.id)

  const iotC9 = await CaseStudy.create({
    title: 'Building health monitoring',
    subTitle:
      'The Customer received an easy-to-use IoT solution to monitor the state of a construction in real time. The tool automatically notifies the operator about a sensor failure or a construction defect and can be integrated with external systems',
    banner:
      'https://www.oki.com/en/iot/point/infrastructure/img/sp/img_infra01.jpg',
    descriptiveText:
      'The Customer is a large company that provides construction sites with complex automation and security systems. The company offers design solutions and performs supply, installation and commissioning for various types of construction projects.',
    challengeTitle: 'Continuous and efficient technical control',
    challengeDescription:
      'In order to provide a continuous and efficient technical control and thus increased security of constructions and complex engineering objects, the Customer decided to develop a smart construction monitoring system for collecting and processing data through sensors installed on the key elements of a building. The solution was designed to automate regular data collection and processing.',
    solutionTitle: 'Procesing and calculations on sensor data',
    solutionDescription:
      'HexTech development team designed and developed a smart solution to collect sensor data and aggregate it on a central server for processing and further calculations of a building’s state. Data processing and averaging make it possible to boost system performance and reduce data volumes. The user-friendly interface presents the data from connected through intuitive color coding – the green, yellow and red lights indicate the state of a building. Additionally, the system allows a flexible configuration of threshold values to regulate the transition from one status to another. To aggregate the data – suppose, for calculating a construction deformation, ScienceSoft developed a system of virtual sensors collecting information from several physical sensors. It allows users to monitor specific parameters which can be used only in the aggregate.',
    createdData: 'November 5, 2018',
    partnerWebsite: 'https://www.hbm.com/en/5530/structural-health-monitoring/',
    altBanner:
      'Bridge with sensors both at the start and the end of it which check its status',
  })
  await IoT.addCasestudy(iotC9.id)
  await SmartCities.addCasestudy(iotC9.id)

  const iotC10 = await CaseStudy.create({
    title: 'Remote patient monitoring software',
    subTitle:
      'The development team optimized the measurement API server and decreased the load on the system by introducing the following features: aggregation of requests, grouping of data, NGINX server settings, optimization of queries and MySQL. The solution for remote software deployment to SNA devices enabled the distribution order of install, delete and update commands as per specifics of Android OS by building a queue of commands and sending them to the devices.',
    banner:
      'https://s15543.pcdn.co/wp-content/uploads/2020/01/galaxy_watch_active_healthcare_a.jpg',
    descriptiveText:
      'The Customer is a US-based provider of healthcare solutions with development centers in Israel and Belarus.',
    challengeTitle: 'Remote patient monitoring solution',
    challengeDescription:
      'The Customer wanted to deliver a sophisticated remote patient monitoring solution for clinics of North America. The solution should help to improve medical staff performance, avoid routine visits, and increase the quality of care. For that reason, the Customer needed a team of savvy professionals in R&D and healthcare IT.',
    solutionTitle: 'App and Web Dashboard',
    solutionDescription:
      'The developers reviewed and analyzed available approaches and frameworks and picked WebRTC technology as the best one for platform-independent voice and video communication. Several Android-powered hardware devices were selected to implement central communication module or Sensor Network Appliances (SNAs). The development process was split into 2 major parts: the development of apps for Android and iOS devices and Web dashboard implementation. \n 1) HexTech’s team delivered apps for both patients and medical staff. Gradle flavors were used to build the apps’ variations fully compatible with different screen sizes: wide screen (for doctors), tablet (for nurses) and smartphone (for healthcare services consumers). Patients could smoothly access numerous sensors in order to monitor data and synchronize it with the server. Medical staff members could diagnose and treat patient remotely and receive automated alerts and notifications, when, for example patient state suddenly changes. \n 2) A Web Dashboard assisted medical professionals in monitoring the overall status of patients drilling down on personal medical data. It sent alerts on poor health indicators and maintains the doctor-patient connection. The central communication module was built upon a TV-connected Android-powered device. ',
    createdData: 'June 17, 2018',
    partnerWebsite: 'https://europe.medtronic.com/xd-en/index.html',
    altBanner:
      'There is a doctor holding  a smart device through whitch monitors its patients',
  })
  await IoT.addCasestudy(iotC10.id)
  await Healthcare.addCasestudy(iotC10.id)

  const iotC11 = await CaseStudy.create({
    title: 'Image analysis software for automated optical inspections',
    subTitle:
      'HexTech’s team has successfully developed image analysis software for automated optical inspection of printed circuit assemblies. The application offers considerable opportunities for the SMT manufacturing industry, providing a fast and reliable solution for PCA quality control.',
    banner: 'https://geospacemfg.com/wp-content/uploads/GS_Blog_April-1.jpg',
    descriptiveText:
      'HexTech has developed an application for the electronics industry aimed at ensuring the quality of printed circuit assemblies (PCAs) by means of machine vision.',
    challengeTitle: 'Faster and more efficient inspection',
    challengeDescription:
      'The application was to perform fast and efficient quality inspection of printed circuit assemblies right on the conveyor belt and detect if any of the PCA components were missing.',
    solutionTitle: 'Industrial connected displays',
    solutionDescription:
      'A team of a project manager, a business analyst, 3 senior С++ developers, a senior UI designer, and a software testing engineer have delivered a desktop application based on image analysis algorithms, complemented with a simple and intuitive GUI. In particular, ORB algorithm has been used for feature detection, and a combination of algorithms (perceptual hash algorithm, PSNR and histograms comparing) have been employed to compare regions of interest in the reference template and in the image under inspection. The user provides a reference board template, putting on all the elements to be inspected with a tool that allows marking objects of three main shapes: \n-Elements with a round cross-section (mainly capacitors) \n-Rectangular elements (chips, diodes, transistors) \n-Dumbbell-shaped elements (resistors) \n After preparing the reference template with all the elements located, the user can proceed to the analysis of printed circuit assemblies of the same type as the reference PCA. Comparing these images with the reference assembly, the application defines defected ones and shows the locations of missing components in detail.',
    createdData: 'April 17, 2018',
    partnerWebsite:
      'https://geospacemfg.com/blog/3d-automated-optical-inspection/',
    altBanner:
      'There is an electronic component through which we can do optical analysis',
  })
  await IoT.addCasestudy(iotC11.id)
  await IndustrialManufacturing.addCasestudy(iotC11.id)

  const iotC12 = await CaseStudy.create({
    title: 'Control Unit for Automotive Tier-I Supplier',
    subTitle:
      'We were able to successfully deliver a robust telematics solution within the desired timeframe.he customer was able to deliver the proof of concept (PoC) within 6 months. This helped them initiate demos with the OEMs and Suppliers earlier than expected.',
    banner: 'Control Unit for Automotive Tier-I Supplier',
    descriptiveText:
      'Our customer is a leading Tier-I Supplier of Infotainment Systems, Head-up Display (HUD) Solutions, Digital Instrument Clusters and Battery Management Systems (BMS) for Electric Vehicles.',
    challengeTitle:
      'Integrate Hextech features in their Digital Instrument Cluster product.',
    challengeDescription:
      'Business Challenge:\n-The customer desired to integrate Telematics features in their Digital Instrument Cluster product.\n-This Instrument Cluster solution has been designed for passenger vehicles (four-wheelers, two-wheelers, auto rickshaws and electric vehicles).\n-In order to launch this product along with the integrated Telematics Features, the support of Subject Matter Experts (SME) was required in areas of Cloud, Firmware, Device Drivers, and end-to end IoT Technology Stack.\n-The customer decided that their in-house teams should focus on the core product development activities and the telematics feature integration activity should be outsourced.\n-This made the role of the Product Engineering Services partner very critical.',
    solutionTitle: ' IoT Sensor Network design and Cloud Interface development',
    solutionDescription:
      'Our more than a decade long expertise in the Automotive domain along with proven production grade Cloud-Telematics reference designs encouraged the customer to partner with us for this project. We leveraged our expertise in IoT Sensor Network design and Cloud Interface development, in order to enable the collection of data like speed, GPS location and more. This was facilitated with the help of MQTT protocol based communication interface. Our expertise in the automotive domain ensured that we achieve compliance with all the necessary standards while selecting components for hardware design. Additionally, we have leveraged our expertise in firmware, SPI, I2C and CAN protocols.',
    createdData: 'January 5, 2018',
    partnerWebsite:
      'https://www.bosch-mobility-solutions.com/en/mobility-topics/connected-mobility/',
    altBanner: '',
  })
  await IoT.addCasestudy(iotC12.id)
  await Automotive.addCasestudy(iotC12.id)

  //**END OF IOT CASE STUDIES */

  //** ------------------------------------------------------------ TEAM MEMBER --------------------------------------------------------------- */

  //**SECURITY TEAM MEMBER */
  const person1 = await TeamMember.create({
    occupation: 'Lead security',
    teamsTitle: 'Security Department',
    personName: 'Alex Yasol',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-smiling-young-man-wearing-eyeglasses-picture-id985138634?k=6&m=985138634&s=612x612&w=0&h=6i0LAXpNR_tcBc7VQ1ahbOoV1TKN-vbp1yPpW3s0cLw=',
  })

  const person2 = await TeamMember.create({
    occupation: 'Lead security',
    teamsTitle: 'Security Department',
    personName: 'Luke Cobezzo',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-smiling-bald-businessman-in-pink-shirt-picture-id1179627287?k=6&m=1179627287&s=612x612&w=0&h=v26UaTH8SCanGtFTz3sO2osCiDpyplI7zG_W-WVHmgc=',
  })

  const person3 = await TeamMember.create({
    occupation: 'Security Engineer',
    teamsTitle: 'Security Departement',
    personName: 'Rori Duboff',
    personPhoto:
      'https://media.gettyimages.com/photos/mature-businessman-smiling-over-white-background-picture-id685132245?k=6&m=685132245&s=612x612&w=0&h=KO9YNXHtaYV4NGqoGQcTd5Aq8zD0Dl06knQQGP0BrwM=',
  })

  const person4 = await TeamMember.create({
    occupation: 'Security Engineer',
    teamsTitle: 'Network Security Departement',
    personName: 'John Molton',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-mature-man-smiling-against-white-picture-id1092658940?k=6&m=1092658940&s=612x612&w=0&h=SBXVcqfIk1JzidfgMgS3dzVZwc9OX0H8jApYHnFVhNc=',
  })

  const person5 = await TeamMember.create({
    occupation: 'Lead security',
    teamsTitle: 'Communications Department',
    personName: 'Albert Gituff',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-senior-businessman-wearing-shirt-picture-id1250238643?k=6&m=1250238643&s=612x612&w=0&h=ja0b_WcisaXXqDfHmKCGw-YBU55ZKHRwkuLujwMEPLI=',
  })
  const person6 = await TeamMember.create({
    occupation: 'Network security Engineer',
    teamsTitle: 'Communications Expert',
    personName: 'Tina Niere',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-confident-young-woman-picture-id1171147266?k=6&m=1171147266&s=612x612&w=0&h=F-m_b7aUATKlM_x05zIHeRcH5zKQUiO3Npo4iNN5AEM=',
  })
  const person7 = await TeamMember.create({
    occupation: 'Network security Engineer',
    teamsTitle: 'Anti Fraud Department',
    personName: 'Samuel Corsly',
    personPhoto:
      'https://media.gettyimages.com/photos/senior-owner-wearing-eyeglasses-and-smart-casuals-picture-id1171689564?k=6&m=1171689564&s=612x612&w=0&h=atxfJ5c0k1VD8rm_9kyBznqJVvaP8L9QAnCUkCyDScY=',
  })
  const person8 = await TeamMember.create({
    occupation: 'Chief security departement',
    teamsTitle: 'Anti Fraud Department',
    personName: 'Daniel Ferton',
    personPhoto:
      'https://media.gettyimages.com/photos/handsome-young-adult-businessman-with-stubble-picture-id1250238624?k=6&m=1250238624&s=612x612&w=0&h=OFktjPw6iXim1Apu2Io_aYx9eWiIcKQSumLGSfeADLo=',
  })
  Security.addTeammember(person1)
  Security.addTeammember(person2)
  Security.addTeammember(person3)
  Security.addTeammember(person4)
  Security.addTeammember(person5)
  Security.addTeammember(person6)
  Security.addTeammember(person7)
  Security.addTeammember(person8)

  OnlineFraudDetection.addTeammember(person8)
  OnlineFraudDetection.addTeammember(person7)
  OnlineFraudDetection.addTeammember(person6)

  cs1.addTeammember(person6)
  cs1.addTeammember(person4)
  cs1.addTeammember(person1)

  cs2.addTeammember(person2)
  cs2.addTeammember(person3)
  cs2.addTeammember(person1)

  cs3.addTeammember(person5)
  cs3.addTeammember(person2)
  cs3.addTeammember(person8)

  cs4.addTeammember(person2)
  cs4.addTeammember(person4)
  cs4.addTeammember(person5)

  cs5.addTeammember(person3)
  cs5.addTeammember(person7)
  cs5.addTeammember(person6)
  /** END OF SECURITY TEAM MEMBER */

  //**IOT TEAM MEMBER */
  const iotP1 = await TeamMember.create({
    occupation: 'Chair of the IoT Board',
    teamsTitle: 'IoT Department',
    personName: 'Olivier Haren',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-welldressed-mature-businessman-picture-id1141508234?k=6&m=1141508234&s=612x612&w=0&h=8N7A46EwXJh6WmHwPRzNpqzhpN-LOHhp3CuRi_Y6M30=',
  })
  IoT.addTeammember(iotP1)
  iotC1.addTeammember(iotP1)
  iotC7.addTeammember(iotP1)

  const iotP2 = await TeamMember.create({
    occupation: 'Chief of Smart Cities department ',
    teamsTitle: 'IoT Department',
    personName: 'Jean Orsaten',
    personPhoto:
      'https://media.gettyimages.com/photos/closeup-smiling-male-leader-wearing-eyeglasses-picture-id1179627340?k=6&m=1179627340&s=612x612&w=0&h=GTRsydUj5lqB7q3EFvgKHJJS9K2vjjnW_F1jYq7SddU=',
  })
  IoT.addTeammember(iotP2)
  iotC2.addTeammember(iotP2)
  iotC3.addTeammember(iotP2)

  const iotP3 = await TeamMember.create({
    occupation: 'Expert in Smart Retail',
    teamsTitle: 'IoT Smart Retail Department',
    personName: 'Kristen DiCerba',
    personPhoto:
      'https://media.gettyimages.com/photos/mature-female-ceo-with-arms-crossed-picture-id1179627362?k=6&m=1179627362&s=612x612&w=0&h=9Z1lhb7r_tmmt7BafB-FLEQyRmt6iJF1vwy1IIYBp4I=',
  })
  IoT.addTeammember(iotP3)
  iotC3.addTeammember(iotP3)
  iotC4.addTeammember(iotP3)
  iotC5.addTeammember(iotP3)

  const iotP4 = await TeamMember.create({
    occupation: 'Automotion Expert',
    teamsTitle: 'IoT Automotive Departement',
    personName: 'Michael Johnson',
    personPhoto:
      'https://media.gettyimages.com/photos/bearded-businessman-against-gray-background-picture-id1179627332?k=6&m=1179627332&s=612x612&w=0&h=0cOAOyXCNaBay4Q6aCD7xRuWLE32B4aSl0lz2V1MHnw=',
  })
  IoT.addTeammember(iotP4)
  iotC6.addTeammember(iotP4)
  iotC7.addTeammember(iotP1)

  const iotP5 = await TeamMember.create({
    occupation: 'Industrial Manufacturing Partner',
    teamsTitle: 'Industrial Manufacturing Departement',
    personName: 'Peter Glynn',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-senior-businessman-smiling-picture-id985138660?k=6&m=985138660&s=612x612&w=0&h=xpSNW4A8wTwNE4yYLLX7BQnV_YYy_fV5kiE6cjpY43A=',
  })

  IoT.addTeammember(iotP5)
  iotC8.addTeammember(iotP5)
  iotC12.addTeammember(iotP5)

  const iotP6 = await TeamMember.create({
    occupation: 'Healtcare Analyst',
    teamsTitle: 'Healtcare Departement',
    personName: 'Donald Leen',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-young-businessman-wearing-blue-shirt-picture-id1065402062?k=6&m=1065402062&s=612x612&w=0&h=zgPNjcxl9l8m_XrH_otqPeD7uRi2BToO3ZiiWn9sCds=',
  })
  IoT.addTeammember(iotP6)
  iotC9.addTeammember(iotP6)
  iotC10.addTeammember(iotP6)

  const iotP7 = await TeamMember.create({
    occupation: 'Environmental Engineer',
    teamsTitle: 'Smart Cities Departement',
    personName: 'Adam Jentzsch',
    personPhoto:
      'https://media.gettyimages.com/photos/welcome-to-my-pub-picture-id488000179?k=6&m=488000179&s=612x612&w=0&h=SD7YLy2SypRZQsaAdGuRQdIp_0mFNoveM0SIOiybNPc=',
  })
  IoT.addTeammember(iotP7)
  iotC10.addTeammember(iotP7)

  const iotP8 = await TeamMember.create({
    occupation: 'Electrical engineer',
    teamsTitle: 'Smart Lighting Departement',
    personName: 'Michelle Tore',
    personPhoto:
      'https://media.gettyimages.com/photos/young-african-american-female-entrepreneur-with-arms-crossed-picture-id1277527368?k=6&m=1277527368&s=612x612&w=0&h=yPjmntSrk1YJuEYJPnAO26pdBgwg1DnqI6nReyHU7FQ=',
  })
  IoT.addTeammember(iotP8)
  iotC11.addTeammember(iotP8)

  /** END OF IOT TEAM MEMBER */

  /** CLOUD COMPUTING TEAM MEMBER */
  const ccP1 = await TeamMember.create({
    occupation: 'E-invoice expert',
    teamsTitle: 'E-Invoice Departement',
    personName: 'Sarah Anderson',
    personPhoto:
      'https://media.gettyimages.com/photos/smiling-businesswoman-in-discussion-with-colleagues-during-meeting-in-picture-id1129489589?k=6&m=1129489589&s=612x612&w=0&h=MQZSYL4iK5vYtXt7R_QVafb80p8YSxlt__ZRBO9s2KQ=',
  })
  CloudComputing.addTeammember(ccP1)
  ccC1.addTeammember(ccP1)

  const ccP2 = await TeamMember.create({
    occupation: 'Full Stack Developer',
    teamsTitle: 'Cloud App Development Departement',
    personName: 'Giancarlo Andes',
    personPhoto:
      'https://media.gettyimages.com/photos/charming-businessman-sitting-in-office-picture-id1137332142?k=6&m=1137332142&s=612x612&w=0&h=TKQXMjXsj3eqmeCNWYWi0rYo2iMdD2_qGXOp3pJLhzI=',
  })
  CloudComputing.addTeammember(ccP2)
  ccC2.addTeammember(ccP2)

  const ccP3 = await TeamMember.create({
    occupation: 'Front End Developer',
    teamsTitle: 'Live Streaming Departement',
    personName: 'Amhed Srinda',
    personPhoto:
      'https://media.gettyimages.com/photos/businessman-wearing-eyeglasses-on-white-background-picture-id1272629259?k=6&m=1272629259&s=612x612&w=0&h=BPTNFuadNYGcOcdL8d1UEn1_wRKtUAGa0-tffam9ZL4=',
  })
  CloudComputing.addTeammember(ccP3)
  ccC3.addTeammember(ccP3)
  ccC4.addTeammember(ccP3)

  const ccP4 = await TeamMember.create({
    occupation: 'Expert in LVB',
    teamsTitle: 'Live Streaming Departement',
    personName: 'Reda Asten',
    personPhoto:
      'https://media.gettyimages.com/photos/welldressed-businessman-against-white-background-picture-id1171689747?k=6&m=1171689747&s=612x612&w=0&h=AlYkP-q5zInKbjRVAiJwr94mS195pHCKbMmqkH6vdVk=',
  })
  CloudComputing.addTeammember(ccP4)
  ccC3.addTeammember(ccP4)
  ccC4.addTeammember(ccP4)

  const ccP5 = await TeamMember.create({
    occupation: 'Back End developer',
    teamsTitle: 'Live Streaming Departement',
    personName: 'Claudia Gielsen',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-smiling-mature-businesswoman-picture-id1092659092?k=6&m=1092659092&s=612x612&w=0&h=59RIcAZiQ5kgDkK1hCwT3R3TMN9UOrpfLK9nleAKd94=',
  })
  CloudComputing.addTeammember(ccP5)
  ccC5.addTeammember(ccP5)
  ccC6.addTeammember(ccP5)

  const ccP6 = await TeamMember.create({
    occupation: 'Expert in Web Services',
    teamsTitle: 'E-Invoice Departement',
    personName: 'Timothy Rittler',
    personPhoto:
      'https://media.gettyimages.com/photos/middleaged-man-with-glasses-on-pink-background-picture-id1129841459?k=6&m=1129841459&s=612x612&w=0&h=Ddqtt2_S0o-5ZX6hy70E5uARd581_Gfdg8mvNqKqRJ4=',
  })
  CloudComputing.addTeammember(ccP6)
  ccC5.addTeammember(ccP6)
  ccC6.addTeammember(ccP6)

  /** END OF CLOUD COMPUTING TEAM MEMBER */

  //**CUSTOMER EXPERIENCE TEAM MEMBER - isi */

  const caP1 = await TeamMember.create({
    occupation: 'Europe Tech Innovation',
    teamsTitle: 'Customer Experience Departement',
    personName: 'Joleen Green',
    personPhoto: 'https://i.ibb.co/zb03Whq/Risorsa-1.png',
  })
  CustomerExperience.addTeammember(caP1)
  ceC4.addTeammember(caP1)
  ceC8.addTeammember(caP1)
  ceC5.addTeammember(caP1)

  const caP2 = await TeamMember.create({
    occupation: 'Interactive Senior Designer',
    teamsTitle: 'Customer Experience Departement',
    personName: 'Koen Fidele',
    personPhoto:
      'https://images.unsplash.com/photo-1547037579-f0fc020ac3be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80',
  })
  CustomerExperience.addTeammember(caP2)
  ceC3.addTeammember(caP2)
  ceC1.addTeammember(caP2)
  ceC9.addTeammember(caP2)

  const caP3 = await TeamMember.create({
    occupation: 'Interactive Marketing Manager',
    teamsTitle: 'Customer Experience Departement',
    personName: 'Harry Bennett',
    personPhoto:
      'https://images.unsplash.com/photo-1567515004624-219c11d31f2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80',
  })
  CustomerExperience.addTeammember(caP3)
  ceC2.addTeammember(caP3)
  ceC6.addTeammember(caP3)
  ceC9.addTeammember(caP3)

  const caP4 = await TeamMember.create({
    occupation: 'Digital Project Senior Manager',
    teamsTitle: 'Customer Experience Departement',
    personName: 'Christine Todd',
    personPhoto: 'https://i.ibb.co/S68RrCn/Risorsa-2.png',
  })
  CustomerExperience.addTeammember(caP4)
  ceC3.addTeammember(caP4)
  ceC5.addTeammember(caP4)
  ceC6.addTeammember(caP4)

  const caP5 = await TeamMember.create({
    occupation: 'Product Experience Optimization Manager',
    teamsTitle: 'Customer Experience Departement',
    personName: 'Chalo Garcia',
    personPhoto: 'https://i.ibb.co/HXtPtDL/Risorsa-3.png',
  })
  CustomerExperience.addTeammember(caP5)
  ceC8.addTeammember(caP5)
  ceC9.addTeammember(caP5)
  ceC4.addTeammember(caP5)

  const caP6 = await TeamMember.create({
    occupation: 'Marketing Automation Consultant',
    teamsTitle: 'Customer Experience Departement',
    personName: 'Jorge Palos',
    personPhoto:
      'https://images.unsplash.com/photo-1569779213435-ba3167dde7cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
  })
  CustomerExperience.addTeammember(caP6)
  ceC1.addTeammember(caP6)
  ceC2.addTeammember(caP6)
  ceC7.addTeammember(caP6)

  const caP7 = await TeamMember.create({
    occupation: 'Media Programmatic Consultant',
    teamsTitle: 'Customer Experience Departement',
    personName: 'Martha Oasis',
    personPhoto:
      'https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1925&q=80',
  })
  CustomerExperience.addTeammember(caP7)
  ceC7.addTeammember(caP7)
  ceC2.addTeammember(caP7)
  ceC6.addTeammember(caP7)

  const caP8 = await TeamMember.create({
    occupation: 'Project Test Manager',
    teamsTitle: 'Customer Experience Departement',
    personName: 'Ivano Cajina',
    personPhoto:
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80',
  })
  CustomerExperience.addTeammember(caP8)
  ceC1.addTeammember(caP8)
  ceC3.addTeammember(caP8)
  ceC7.addTeammember(caP8)

  const caP9 = await TeamMember.create({
    occupation: 'Digital Identity Functional Delivery',
    teamsTitle: 'Customer Experience Departement',
    personName: 'Summer Bush',
    personPhoto:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  })
  CustomerExperience.addTeammember(caP9)
  ceC8.addTeammember(caP9)
  ceC5.addTeammember(caP9)
  ceC4.addTeammember(caP9)

  /** END OF USTOMER EXPERIENCE TEAM MEMBER */

  //**BiG DATA ANALYTICS TEAM MEMBER */

  const bdaP1 = await TeamMember.create({
    occupation: 'Chief Executive Officer of Analytics',
    teamsTitle: 'Analytics Departement',
    personName: 'Haru Nayaki',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-businessman-in-formalwear-smiling-picture-id985138772?k=6&m=985138772&s=612x612&w=0&h=NnXh0mIQvTCZcF6DH_C4EWqeQ6lUUGDC-2XEN1VM5TM=',
  })
  BigDataAnalysis.addTeammember(bdaP1)
  bdaC4.addTeammember(bdaP1)
  bdaC1.addTeammember(bdaP1)
  bdaC6.addTeammember(bdaP1)

  const bdaP2 = await TeamMember.create({
    occupation: 'Expert in Data Science',
    teamsTitle: 'Analytics Departement',
    personName: 'Juliè Harmon',
    personPhoto:
      'https://media.gettyimages.com/photos/mid-adult-woman-smiling-over-white-background-picture-id985137694?k=6&m=985137694&s=612x612&w=0&h=vmjkCbox_MN_wHO14X6lZ5XDrEUssgf1Ayh-5YSmSgM=',
  })
  BigDataAnalysis.addTeammember(bdaP2)
  bdaC2.addTeammember(bdaP2)
  bdaC3.addTeammember(bdaP2)

  const bdaP3 = await TeamMember.create({
    occupation: 'Expert in business intelligence',
    teamsTitle: 'Analytics Departement',
    personName: 'Raùl Sirte',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-smiling-young-man-wearing-tshirt-picture-id1092658882?k=6&m=1092658882&s=612x612&w=0&h=H5UC7rY59rm9qqu5VLVBaNZw79XgmJ_YQM3-i11Z6-U=',
  })
  BigDataAnalysis.addTeammember(bdaP3)
  bdaC1.addTeammember(bdaP3)
  bdaC4.addTeammember(bdaP3)

  const bdaP4 = await TeamMember.create({
    occupation: 'Manager of the department',
    teamsTitle: 'Analytics Departement',
    personName: 'Francesca Rizzo',
    personPhoto:
      'https://media.gettyimages.com/photos/confident-mature-businesswoman-on-white-background-picture-id1132314350?k=6&m=1132314350&s=612x612&w=0&h=WwPaInvvkxiIEHCBPTsSaWZRtc-ZT2lc-8conkFaQtk=',
  })
  BigDataAnalysis.addTeammember(bdaP4)
  bdaC6.addTeammember(bdaP4)
  bdaC3.addTeammember(bdaP4)

  const bdaP5 = await TeamMember.create({
    occupation: 'Chair of Big Data department',
    teamsTitle: 'Analytics Departement',
    personName: 'Jeff Peterson',
    personPhoto:
      'https://media.gettyimages.com/photos/confident-young-man-wearing-purple-tshirt-picture-id1092658864?k=6&m=1092658864&s=612x612&w=0&h=sU5p04nJS0EGbixMaX1kl7QCrDFSMX2r2MMJbd5gdDQ=',
  })
  BigDataAnalysis.addTeammember(bdaP5)
  bdaC3.addTeammember(bdaP5)

  const bdaP6 = await TeamMember.create({
    occupation: 'Expert in Marketing',
    teamsTitle: 'Analytics Departement',
    personName: 'Nina Morkov',
    personPhoto:
      'https://media.istockphoto.com/photos/young-longhaired-smiling-woman-in-white-shirt-picture-id965523228?k=6&m=965523228&s=612x612&w=0&h=qeVmQfjRq1QWxaLdxLdF_IaXahI-dqt9UYcunaHUqA4=',
  })
  BigDataAnalysis.addTeammember(bdaP6)
  bdaC2.addTeammember(bdaP6)
  bdaC5.addTeammember(bdaP6)

  const bdaP7 = await TeamMember.create({
    occupation: 'Designer of the group',
    teamsTitle: 'Analytics Departement',
    personName: 'Maria Yen',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-businesswoman-with-long-blond-hair-picture-id985138672?k=6&m=985138672&s=612x612&w=0&h=btXtkSbeeJnJGG3Z1ss8kab29t_E-88cgPJguvL7cNA=',
  })
  BigDataAnalysis.addTeammember(bdaP7)
  bdaC2.addTeammember(bdaP7)
  bdaC4.addTeammember(bdaP7)

  const bdaP8 = await TeamMember.create({
    occupation: 'Expert in Communication',
    teamsTitle: 'Analytics Departement',
    personName: 'Omar Zizou',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-smiling-tattooed-man-with-arms-crossed-picture-id1141508304?k=6&m=1141508304&s=612x612&w=0&h=5vR-TvBk_YWUhXaEeboxVw28-taKhE78ftqHcO91GhQ=',
  })
  BigDataAnalysis.addTeammember(bdaP8)
  bdaC5.addTeammember(bdaP8)
  bdaC6.addTeammember(bdaP8)

  //** ------------------------------------------------------------ PARTNERS --------------------------------------------------------------- */

  //**INSERT PARTNERS */
  const CocaCola = await Partner.create({
    name: 'CocaCola',
    description: 'Taste the feeling',
    image: 'https://i.ibb.co/pywcrhj/coca-cola-200.png',
    website: 'https://www.coca-cola.com/',
  })
  const Figma = await Partner.create({
    name: 'Figma',
    description: 'The collaborative interface design tool',
    image: 'https://i.ibb.co/3W81YKV/figma-200.png',
    website: 'https://www.figma.com/',
  })
  const Adobe = await Partner.create({
    name: 'Adobe',
    description: 'Creativity for everyone',
    image: 'https://i.ibb.co/VQSW0Zx/adobe-200.png',
    website: 'https://www.adobe.com/',
  })
  const Sketch = await Partner.create({
    name: 'Sketch',
    description: 'It all starts here',
    image: 'https://i.ibb.co/YR24qHc/sketch-200.png',
    website: 'https://www.sketch.com/',
  })
  const Arduino = await Partner.create({
    name: 'Arduino',
    description: 'So easy, my granny can use it',
    image: 'https://i.ibb.co/KDcLxdy/arduino.png',
    website: 'https://www.arduino.cc/',
  })
  const GoogleCloud = await Partner.create({
    name: 'Google Cloud',
    description: 'Cloud Computing Services',
    image: 'https://i.ibb.co/JqkrKTp/cloud-200.png',
    website: 'https://cloud.google.com/',
  })
  const Node = await Partner.create({
    name: 'Node.js',
    description: 'JavaScript everywhere',
    image: 'https://i.ibb.co/VvpxKnR/nodejs-200.png',
    website: 'https://nodejs.org/',
  })
  const Aws = await Partner.create({
    name: 'Amazon Web Services',
    description: 'Work Hard. Have Fun.',
    image: 'https://i.ibb.co/gzDM3yG/amazon-200.png',
    website: 'https://aws.amazon.com/',
  })
}

/**
 * Function to initialize the database. This is exported and called in the main api.js file
 */
async function initializeDatabase() {
  // Call the function for the database structure definition
  defineDBStructure()
  // Synchronize Sequelize with the actual database
  await db.sync({ force: true })
  // Call the function to insert some fake data
  await insertRealData()
  return db
}

export default initializeDatabase
