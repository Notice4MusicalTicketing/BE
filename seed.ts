import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const musical1 = await prisma.musical.create({
    data: {
      musicalId: 'MUS001',
      name: 'Phantom of the Opera',
      startDate: new Date('2023-09-01'),
      endDate: new Date('2024-01-31'),
      status: '공연중',
      details: {
        create: {
          facilityName: 'Her Majesty\'s Theatre',
          cast: 'John Doe, Jane Smith',
          runtime: 160,
          ageRating: '15+',
          productionCompany: 'Really Useful Group',
          ticketPrice: '50-150 USD',
          posterImagePath: '/images/phantom-poster.jpg',
          synopsis: 'A disfigured musical genius haunts the Paris Opera House...',
          genre: 'Musical',
          introImages: ['/images/intro1.jpg', '/images/intro2.jpg', '/images/intro3.jpg'],
          showtimes: 'Weekdays 7:30 PM, Weekends 2:00 PM & 7:30 PM',
          facilityDetails: 'Her Majesty\'s Theatre, London',
          ticketAgencies: {
            create: [
              {
                name: 'TicketMaster',
                code: 'TM001',
                url: 'https://ticketmaster.com/phantom'
              },
              {
                name: 'Broadway.com',
                code: 'BW001',
                url: 'https://broadway.com/phantom'
              }
            ]
          }
        }
      }
    }
  });

  console.log(`Created musical with ID: ${musical1.musicalId}`);

  // 다른 뮤지컬 추가 예시
  const musical2 = await prisma.musical.create({
    data: {
      musicalId: 'MUS002',
      name: 'Hamilton',
      startDate: new Date('2023-10-01'),
      endDate: new Date('2024-02-28'),
      status: '공연중',
      details: {
        create: {
          facilityName: 'Richard Rodgers Theatre',
          cast: 'Lin-Manuel Miranda, Phillipa Soo',
          runtime: 165,
          ageRating: '12+',
          productionCompany: 'Hamilton Broadway',
          ticketPrice: '100-200 USD',
          posterImagePath: '/images/hamilton-poster.jpg',
          synopsis: 'The story of America then, told by America now...',
          genre: 'Hip-Hop Musical',
          introImages: ['/images/hamilton-intro1.jpg', '/images/hamilton-intro2.jpg', '/images/hamilton-intro3.jpg'],
          showtimes: 'Weekdays 8:00 PM, Weekends 3:00 PM & 8:00 PM',
          facilityDetails: 'Richard Rodgers Theatre, New York',
          ticketAgencies: {
            create: [
              {
                name: 'TicketMaster',
                code: 'TM002',
                url: 'https://ticketmaster.com/hamilton'
              },
              {
                name: 'Broadway.com',
                code: 'BW002',
                url: 'https://broadway.com/hamilton'
              }
            ]
          }
        }
      }
    }
  });

  console.log(`Created musical with ID: ${musical2.musicalId}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
