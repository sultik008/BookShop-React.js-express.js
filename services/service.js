import { en, Faker, ru, fr } from "@faker-js/faker";

const locales = [en, ru, fr];

export async function generateBooks({
  seed,
  language,
  likes,
  reviews,
  booksCount = 20,
}) {
  const books = [];
  try {
    language = Number(language);
    const selectedLanguage = locales[language];
    const faker = new Faker({locale: [selectedLanguage]});
    const faker2 = new Faker({locale: [selectedLanguage]});
    const nSeed = Number(seed)
    faker2.seed(nSeed)
    booksCount = Number(booksCount);
    for (let i = 0; i < booksCount; i++) {
      faker.seed(nSeed + i)
      const book = {
        id: i + 1,
        ISBN: generateFakeISBN(faker),
        title: faker.commerce.productName(),
        authors: faker.person.fullName(),
        publisher: faker.person.fullName(),
        likes: generateByAverage(likes , faker),
        description: faker.lorem.paragraph(),
        reviews: generateReviews(reviews , faker),
        year: faker2.date.past({ years: 50 }).getFullYear(),
        photo: faker2.image.urlPicsumPhotos({
          width: 400,
          height: 600,
          grayscale: true,
        }),
      };
      books.push(book);
    }
    return books;
  } catch (error) {
    return error;
  }
}
function generateByAverage(average, faker) {
  average = Number(average);
  if (average < 1) {
    return faker.number.float({ min: 0, max: 1 }) < average ? 1 : 0;
  } else {
    return Math.floor(average);
  }
}
function generateFakeISBN(faker) {
  const group = 5;
  const publisher = faker.number.int({ min: 1000, max: 9999 });
  const item = faker.number.int({ min: 1000, max: 9999 });
  const checkDigit = faker.number.int({ min: 0, max: 9 });

  return `978-${group}-${publisher}-${item}-${checkDigit}`;
}
function generateReviews(average, faker) {
  average = Number(average);
  const reviews = [];
  const fullCount = Math.floor(average);
  const fractionalPart = average - fullCount;

  for (let i = 0; i < fullCount; i++) {
    reviews.push({
      review: faker.lorem.sentence(),
      author: faker.person.fullName(),
    });
  }
  if (faker.number.float({ min: 0, max: 1 }) < fractionalPart) {
    reviews.push({
      review: faker.lorem.sentence(),
      author: faker.person.fullName(),
    });
  }
  return reviews;
}
