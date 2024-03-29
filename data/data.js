const students = [
  {
    firstName: 'Anna',
    lastName: 'Andersson',
    id: 1,
    birthDate: '1985-04-05',
    email: 'anna.andersson@mail.com',
    phone: '070-3123456',
    courseId: [103],
  },
  {
    firstName: 'Peter',
    lastName: 'Frank',
    id: 2,
    birthDate: '1974-10-21',
    email: 'peter.frank@mail.com',
    phone: '076-4987654',
    courseId: [102, 104],
  },
  {
    firstName: 'Maria',
    lastName: 'Fryer',
    id: 3,
    birthDate: '1990-01-18',
    email: 'maria.fryer@mail.com',
    phone: '070-3123456',
    courseId: [102, 105],
  },
];

const teachers = [
  {
    firstName: 'Eric',
    lastName: 'Johnson',
    id: 1,
    email: 'eric.j@westcoast.com',
    phone: '076-2345678',
    courseId: [101, 103],
  },
  {
    firstName: 'Angela',
    lastName: 'Graham',
    id: 2,
    email: 'angela.g@westcoast.com',
    phone: '073-6545576',
    courseId: [102],
  },
  {
    firstName: 'Imad',
    lastName: 'Hassan',
    id: 3,
    email: 'imad.h@westcoast.com',
    phone: '070-2124699',
    courseId: [104, 105],
  },
  {
    firstName: 'Beatrice',
    lastName: 'Clint',
    id: 4,
    email: 'beatrice.c@westcoast.com',
    phone: '070-6884522',
    courseId: [106],
  },
];

const courses = [
  {
    id: 101,
    title: 'Blockchain Foundations',
    description:
      "Explore the core concepts of blockchain technology in this comprehensive course designed for beginners and intermediate learners. Understand blockchain's history, key technologies, and real-world applications. Delve into cryptocurrencies, smart contracts, and the latest trends shaping this transformative technology. Ideal for students, professionals, and enthusiasts, this course requires no prior blockchain or programming experience.",
    imageUrl: '../assets/images/blockchain-course.jpeg',
    teacherId: 't1',
    startDate: '2024-02-12',
    endDate: '2024-05-24',
    prerequisites:
      'No prior experience in blockchain or programming is required. A basic understanding of computer science and a curiosity about emerging technologies will enhance your learning experience.',
    cost: 2000,
    rating: 4,
    status: 'Open for Enrollment',
  },
  {
    id: 102,
    title: 'Cloud Computing Essentials',
    description:
      'Embark on a journey through the fundamentals of cloud computing in this engaging course. Gain insights into the architecture, services, and deployment models of cloud computing. Explore key platforms like AWS, Azure, and Google Cloud. Understand cloud security, scalability, and best practices. This course is perfect for beginners and intermediate learners, with no prior cloud computing experience required.',
    imageUrl: '../assets/images/cloud-computing-course.jpeg',
    teacherId: 't2',
    startDate: '2023-08-14',
    endDate: '2024-03-01',
    prerequisites:
      'Basic understanding of IT concepts and familiarity with internet usage. Prior knowledge of computer networks and operating systems is helpful but not required.',
    cost: 1500,
    rating: 3.5,
    status: 'Closed for Enrollment',
  },
  {
    id: 103,
    title: 'Data Science Fundamentals',
    description:
      'Dive into the dynamic world of data science with this comprehensive course. Learn about data manipulation, statistical analysis, predictive modeling, and machine learning. Explore tools and languages such as Python, R, SQL, and Tableau. Gain practical skills through hands-on projects and real-world case studies. Suitable for beginners and those looking to strengthen their data science foundations.',
    imageUrl: '../assets/images/data-science-course.jpg',
    teacherId: 't1',
    startDate: '2023-02-13',
    endDate: '2024-02-02',
    prerequisites:
      'Basic proficiency in programming (any language) and a good understanding of high school level mathematics, especially algebra and statistics.',
    cost: 2000,
    rating: 4.5,
    status: 'Closed for Enrollment',
  },
  {
    id: 104,
    title: 'UX Design',
    description:
      'Immerse yourself in the world of UX Design with this engaging and comprehensive course. Learn the fundamentals of user-centered design, including research, prototyping, usability testing, and interface design. Understand the principles of creating effective and delightful user experiences. Explore real-world case studies and apply your skills in hands-on projects. Suitable for beginners and aspiring designers looking to build a strong foundation in UX principles.',
    imageUrl: '../assets/images/ux-design-course.jpg',
    teacherId: 't3',
    startDate: '2024-02-12',
    endDate: '2024-05-24',
    prerequisites:
      'No prior experience in design is required. A keen interest in understanding user behavior and good communication skills are advantageous.',
    cost: 1500,
    rating: 5,
    status: 'Open for Enrollment',
  },
  {
    id: 105,
    title: 'Cybersecurity Fundamentals',
    description:
      'Explore the critical field of cybersecurity with this in-depth course. Learn about the latest security threats, defense mechanisms, and industry best practices. Topics include network security, ethical hacking, cryptography, risk management, and incident response. Gain practical skills through hands-on exercises and simulations. Ideal for IT professionals, system administrators, and anyone interested in building a strong foundation in cybersecurity.',
    imageUrl: '../assets/images/cybersecurity-course.jpg',
    teacherId: 't3',
    startDate: '2024-02-12',
    endDate: '2024-08-23',
    prerequisites:
      'Basic knowledge of computer networks and operating systems is recommended. Familiarity with programming concepts can be helpful but is not mandatory.',
    cost: 1500,
    rating: 3,
    status: 'Open for Enrollment',
  },
  {
    id: 106,
    title: 'Social Media Marketing Mastery',
    description:
      'Embark on a comprehensive journey into the world of social media marketing. This course covers strategies for engaging with audiences, creating effective content, and leveraging various social media platforms like Facebook, Instagram, Twitter, and LinkedIn. Learn about analytics, SEO, and digital advertising to boost online presence. Ideal for marketers, business owners, and anyone interested in mastering social media marketing techniques.',
    imageUrl: '../assets/images/social-media-marketing-course.jpg',
    teacherId: 't4',
    startDate: '2024-02-12',
    endDate: '2024-08-23',
    prerequisites:
      'Basic computer literacy and familiarity with social media platforms are required. Prior marketing experience is helpful but not essential.',
    cost: 1000,
    rating: 3.5,
    status: 'Open for Enrollment',
  },
];

const enrollments = [
  {
    studentId: 1,
    courseId: 103,
    enrollmentDate: '2023-05-25',
    progress: 85,
    status: 'Active',
    assignments: [
      {
        assignmentId: '10301',
        grade: 'A',
        status: 'Completed',
      },
      {
        assignmentId: '10302',
        grade: 'B',
        status: 'Completed',
      },
      {
        assignmentId: '10303',
        grade: 'A',
        status: 'Completed',
      },
      {
        assignmentId: '10304',
        grade: null,
        status: 'In Progress',
      },
    ],
  },
  {
    studentId: 2,
    courseId: 102,
    enrollmentDate: '2023-06-28',
    progress: 75,
    status: 'Active',
    assignments: [
      {
        assignmentId: '10201',
        grade: 'C',
        status: 'Completed',
      },
      {
        assignmentId: '10202',
        grade: 'B',
        status: 'Completed',
      },
      {
        assignmentId: '10203',
        grade: 'A',
        status: 'Completed',
      },
      {
        assignmentId: '10204',
        grade: 'B',
        status: 'Completed',
      },
    ],
  },
  {
    studentId: 2,
    courseId: 104,
    enrollmentDate: '2023-12-14',
    progress: 0,
    status: 'Not Started',
    assignments: [
      {
        assignmentId: '10401',
        grade: null,
        status: 'Not Started',
      },
      {
        assignmentId: '10402',
        grade: null,
        status: 'Not Started',
      },
      {
        assignmentId: '10403',
        grade: null,
        status: 'Not Started',
      },
    ],
  },
  {
    studentId: 3,
    courseId: 102,
    enrollmentDate: '2023-07-03',
    progress: 75,
    status: 'Active',
    assignments: [
      {
        assignmentId: '10201',
        grade: 'B',
        status: 'Completed',
      },
      {
        assignmentId: '10202',
        grade: 'B',
        status: 'Completed',
      },
      {
        assignmentId: '10203',
        grade: 'A',
        status: 'Completed',
      },
      {
        assignmentId: '10204',
        grade: 'A',
        status: 'Completed',
      },
    ],
  },
  {
    studentId: 3,
    courseId: 105,
    enrollmentDate: '2024-01-08',
    progress: 0,
    status: 'Not Started',
    assignments: [
      {
        assignmentId: '10501',
        grade: null,
        status: 'Not Started',
      },
      {
        assignmentId: '10502',
        grade: null,
        status: 'Not Started',
      },
      {
        assignmentId: '10503',
        grade: null,
        status: 'Not Started',
      },
      {
        assignmentId: '10504',
        grade: null,
        status: 'Not Started',
      },
    ],
  },
];

const users = [];
