import { PrismaClient } from '~prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cloudImages = await prisma.cloudImage.createManyAndReturn({
    data: [
      { publicId: 'poster.sshr_cpwd9g', alt: 'The Shawshank Redemption movie poster', AR: 0.75 },
      { publicId: 'hero.sshr_hoev0x', alt: 'The Shawshank Redemption movie hero', AR: 2.31 },
      { publicId: 'poster.swfa_beppq7', alt: 'Star Wars - The Force Awakens movie poster', AR: 0.53 },
      { publicId: 'hero.swfa_cbpltv', alt: 'Star Wars - The Force Awakens movie hero', AR: 1.91 },
    ],
  });

  const figures = await prisma.figure.createManyAndReturn({
    data: [
      { publicId: 'b0Do4wLg', name: 'Frank Darabont', slug: 'frank-darabont', birthday: '1959-01-28', country: 'France' },
      { publicId: 'aD4okL06', name: 'Roger Deakins', slug: 'roger-deakins', birthday: '1949-05-24', country: 'Great Britain' },
      { publicId: 'nTd74fK4', name: 'Tim Robbins', slug: 'tim-robbins', birthday: '1958-10-16', country: 'USA' },
      { publicId: 'm7G6f9jJ', name: 'Morgan Freeman', slug: 'morgan-freeman', birthday: '1937-06-01', country: 'USA' },
      { publicId: 'LyfRxXfQ', name: 'Bob Gunton', slug: 'bob-gunton', birthday: '1945-11-15', country: 'USA' },

      { publicId: 'Gto71N49', name: 'Lana Wachowski', slug: 'lana-wachowski', birthday: '1965-06-21', country: 'USA' },
      { publicId: 'oPqBJ1ia', name: 'Lilly Wachowski', slug: 'lilly-wachowski', birthday: '1967-12-29', country: 'USA' },
      { publicId: 'sIfr40gQJ', name: 'Bill Pope', slug: 'bill-pope', birthday: '1952-06-19', country: 'USA' },
      { publicId: 'Ii7IsEI68', name: 'Don Davis', slug: 'don-davis', birthday: '1957-02-04', country: 'USA' },
      { publicId: 'Y1SzGly1T', name: 'Keanu Reeves', slug: 'keanu-reeves', birthday: '1964-09-02', country: 'Lebanon' },
      { publicId: '7oQJAjr3d', name: 'Laurence Fishburne', slug: 'laurence-fishburne', birthday: '1961-07-30', country: 'USA' },
      { publicId: 'QAlObd8hT', name: 'Carrie-Anne Moss', slug: 'carrie-anne-moss', birthday: '1967-08-21', country: 'Canada' },
      { publicId: 'YTZhbTIBt', name: 'Hugo Weaving', slug: 'hugo-weaving', birthday: '1960-04-04', country: 'Niger' },

      { publicId: 'TcVGxm3y8', name: 'Bradley Cooper', slug: 'bradley-cooper', birthday: '1975-01-05', country: 'USA' },
      { publicId: '8SKQ9cF69', name: 'Clint Eastwood', slug: 'clint-eastwood', birthday: '1930-05-31', country: 'USA' },
      { publicId: 'QeaE6j39v', name: 'Lady Gaga', slug: 'lady-gaga', birthday: '1986-03-28', country: 'USA' },
    ],
  });

  const movies = await prisma.movie.createManyAndReturn({
    data: [
      {
        publicId: 'Fm5Wzak4',
        name: 'The Shawshank Redemption',
        slug: 'the-shawshank-redemption',
        releasedIn: '1994-09-23',
        story:
          "Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
        avgScore: '9.3',
      },
      {
        publicId: 'xRgP9aeT',
        name: 'The Matrix',
        slug: 'the-matrix',
        releasedIn: '1999-03-31',
        story:
          'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        avgScore: '8.7',
      },
      {
        publicId: 'mawknLWF',
        name: 'Pelíšky',
        slug: 'pelisky',
        releasedIn: '1999-04-08',
        story:
          'Two families, Sebkovi and Krausovi, are celebrating christmas, but not everyone is in a good mood. Teenage kids think their fathers are totaly stupid, fathers are sure their children are nothing more than rebels, hating anything they say.',
        avgScore: '7.9',
      },
      {
        publicId: 'J3NzhVqI',
        name: `Star Wars: Episode VII
The Force Awakens`,
        slug: 'star-wars-episode-vii-the-force-awakens',
        releasedIn: '2015-12-16',
        story:
          'As a new threat to the galaxy rises, Rey, a desert scavenger, and Finn, an ex-stormtrooper, must join Han Solo and Chewbacca to search for the one hope of restoring peace.',
        avgScore: '7.8',
      },
      {
        publicId: '5DqkWYtQ6s',
        name: 'Silver Linings Playbook',
        slug: 'silver-linings-playbook',
        releasedIn: '2012-11-16',
        story:
          'After a stint in a mental institution, former teacher Pat Solitano moves back in with his parents and tries to reconcile with his ex-wife. Things get more challenging when Pat meets Tiffany',
        avgScore: '7.7',
      },
      {
        publicId: 'UOVc5DqkWY',
        name: 'American Sniper',
        slug: 'american-sniper',
        releasedIn: '2014-12-25',
        story:
          "A biographical war drama film directed and co-produced by Clint Eastwood and written and executive-produced by Jason Hall, based on the memoir of the same name by Chris Kyle with Scott McEwen and Jim DeFelice. The film follows the life of Kyle, who became the deadliest marksman in U.S. military history with 255 kills from four tours in the Iraq War, 160 of which were officially confirmed by the Department of Defense.[5] While Kyle was celebrated for his military successes, his tours of duty took a heavy toll on his personal and family life. It stars Bradley Cooper as Kyle and Sienna Miller as his wife Taya, with Luke Grimes, Jake McDorman, Cory Hardrict, Kevin Lacz, Navid Negahban, and Keir O'Donnell in supporting roles.",
        avgScore: '7.3',
      },
      {
        publicId: '5Mu7oPmMbo',
        name: 'Million Dollar Baby',
        slug: 'million-dollar-baby',
        releasedIn: '2004-12-15',
        story:
          'American sports drama film starring Hilary Swank. It is directed, co-produced, scored by and starring Clint Eastwood from a screenplay written by Paul Haggis, based on stories from the 2000 collection Rope Burns: Stories from the Corner by F.X. Toole, the pen name of fight manager and cutman Jerry Boyd. It also stars Morgan Freeman. The film follows Margaret "Maggie" Fitzgerald (Swank), an underdog amateur boxer who is helped by an underappreciated boxing trainer (Eastwood) to achieve her dream of becoming a professional.',
        avgScore: '8.1',
      },
      {
        publicId: 'wLDejMW2CyFD',
        name: 'A Star Is Born',
        slug: 'a-star-is-born',
        releasedIn: '2018-10-05',
        story:
          'Musical romantic drama produced and directed by Bradley Cooper (in his directorial debut) with a screenplay by Cooper, Eric Roth and Will Fetters. It stars Cooper and Lady Gaga in lead roles, with Dave Chappelle, Andrew Dice Clay and Sam Elliott in supporting roles. It follows an alcoholic musician (Cooper) who discovers and falls in love with a young singer (Gaga). It is the fourth American movie made of the story, after the original 1937 romantic drama and its 1954 and 1976 remakes. Principal photography began at the Coachella Valley Music and Arts Festival in April 2017.',
        avgScore: '7.7',
      },
    ],
  });

  const movieImages = await prisma.movie_image.createManyAndReturn({
    data: [
      { movieId: 1, cloudImageId: 1, role: 'poster' },
      { movieId: 1, cloudImageId: 2, role: 'hero' },
      { movieId: 4, cloudImageId: 3, role: 'poster' },
      { movieId: 4, cloudImageId: 4, role: 'hero' },
    ],
  });

  const movieFigures = await prisma.movie_figure.createManyAndReturn({
    data: [
      { movieId: 1, figureId: 1, role: 'director' }, // The Shawshank Redemption / Frank Darabont
      { movieId: 1, figureId: 2, role: 'director of photography' }, // The Shawshank Redemption / Roger Deakins
      { movieId: 1, figureId: 3, role: 'main character' }, // The Shawshank Redemption / Tim Robbins
      { movieId: 1, figureId: 4, role: 'main character' }, // The Shawshank Redemption / Morgan Freeman
      { movieId: 1, figureId: 5, role: 'supporting character' }, // The Shawshank Redemption / Bob Gunton

      { movieId: 2, figureId: 6, role: 'director' }, // The Matrix / Lana Wachowski
      { movieId: 2, figureId: 7, role: 'director' }, // The Matrix / Lilly Wachowski
      { movieId: 2, figureId: 8, role: 'director of photography' }, // The Matrix / Bill Pope
      { movieId: 2, figureId: 9, role: 'music director' }, // The Matrix / Don Davis
      { movieId: 2, figureId: 10, role: 'main character' }, // The Matrix / Keanu Reeves
      { movieId: 2, figureId: 11, role: 'supporting character' }, // The Matrix / Laurence Fishburne
      { movieId: 2, figureId: 12, role: 'supporting character' }, // The Matrix / Carrie-Anne Moss
      { movieId: 2, figureId: 13, role: 'supporting character' }, // The Matrix / Hugo Weaving

      { movieId: 5, figureId: 14, role: 'main character' }, // Silver Linings Playbook / Bradley Cooper

      { movieId: 6, figureId: 14, role: 'main character' }, // American Sniper / Bradley Cooper
      { movieId: 6, figureId: 15, role: 'director' }, // American Sniper / Clint Eastwood

      { movieId: 7, figureId: 15, role: 'director' }, // Million Dollar Baby / Clint Eastwood
      { movieId: 7, figureId: 15, role: 'main character' }, // Million Dollar Baby / Clint Eastwood

      { movieId: 8, figureId: 14, role: 'director' }, // A Star Is Born / Bradley Cooper
      { movieId: 8, figureId: 14, role: 'main character' }, // A Star Is Born / Bradley Cooper
      { movieId: 8, figureId: 16, role: 'main character' }, // A Star Is Born / Lady Gaga
    ],
  });

  const users = await prisma.user.createManyAndReturn({
    data: [
      { publicId: 'xRgP9aeT', username: 'alice' },
      { publicId: 'GRqK@T5U', username: 'betty' },
      { publicId: 'IP2badC3', username: 'bob' },
      { publicId: 'zEZ3JKaD', username: 'cesar' },
      { publicId: 'xV0v14kv', username: 'danielle' },
      { publicId: 'Bant0smK', username: 'dominick' },
      { publicId: 'wKM0x6Uj', username: 'nick' },
      { publicId: 'VfHItIN4', username: 'sandra' },
      { publicId: 'CfB6EQuM', username: 'trevor' },
    ],
  });

  const userReviews = await prisma.userReview.createManyAndReturn({
    data: [
      {
        publicId: 'P7zatNfo',
        movieId: 1,
        userId: 2,
        score: '8.5',
        text: "An extraordinary and unforgettable film about a bank veep who is convicted of murders and sentenced to the toughest prison. Superbly played film set in 1946 , a bright young New England banker is convicted of the slayings of his spouse and her lover and sentenced to life at a strict State Prison . Introspective and quite Andy (Tim Robbins) gradually befriends inmates and over the next 2 decades wins the trust of prisoners and wardens but in his heart he still yearns for freedom . There he forms a peculiar friendship with Red (Morgan Freeman), the prison fixer , he experiences the brutality of prison life with a sadistic head guard (Clancy Brown), and is also mistreated and raped ; however , he adapts himself and offers financial advice to the guards and the selfish governor (Bob Gunton) , all in a shot 19 years. As two imprisoned men bond over a number of years, finding peace and redemption through acts of common help , friendship and decency . But when the proof of Andy's innocence is ripped away by those who need his services ,we learn that all is not quite what it seems at this State Penitentary , provoking a few susprises in the last two reels .",
        createdAt: new Date('2003-04-23'),
      },
      {
        publicId: 'n458YgIu',
        movieId: 1,
        userId: 3,
        score: '9.5',
        text: "Simply amazing, the best film of the 90's.",
        createdAt: new Date('2004-07-05'),
      },
      {
        publicId: '5zKeSEpa',
        movieId: 1,
        userId: 5,
        score: '10.0',
        text: "An incredible movie, one that lives with you. It is no wonder that the film has such a high rating, it is quite literally breathtaking. What can I say that hasn't said before? Not much, it's the story, the acting, the premise, but most of all, this movie is about how it makes you feel. Sometimes you watch a film, and can't remember it days later, this film loves with you, once you've seen it, you don't forget.",
        createdAt: new Date('2004-11-01'),
      },
      {
        publicId: 'ks9mi4gK',
        movieId: 1,
        userId: 1,
        score: '10.0',
        text: "Stephen King's best adapted movie. Misery and Stand By Me were the best adaptations up until this one, now you can add Shawshank to that list. This is simply one of the best films ever made and I know I am not the first to say that and I certainly won't be the last. The standing on the IMDb is a true barometer of that. #3 as of this date and I'm sure it could be number 1. So I'll just skip all the normal praise of the film because we all know how great it is. But let me perhaps add that what I find so fascinating about Shawshank is that Stephen King wrote it.",
        createdAt: new Date('2006-08-30'),
      },

      {
        publicId: 'zIqwdmbX',
        movieId: 2,
        userId: 1,
        score: '9',
        text: 'Just wow. When this came out, I was living with a roommate. He went out and saw it, came home and said, "Dude, you have to go see The Matrix." So we left and he sat through it a second time. This movie is splendidly done. The mystery about what the Matrix is, unravels and you see a dystopian future unlike any we as a race would want. I have watched this over and over and never tire of it. Everyone does a great job acting in this, the special effects are above par and the story is engaging.',
        createdAt: new Date('2002-03-28'),
      },
      {
        publicId: 'IrcFpSS7',
        movieId: 2,
        userId: 6,
        score: '9',
        text: 'The benchmark for all sci-fi films. The story of a reluctant Christ-like protagonist set against a baroque, MTV backdrop, The Matrix is the definitive hybrid of technical wizardry and contextual excellence that should be the benchmark for all sci-fi films to come.',
        createdAt: new Date('2002-03-29'),
      },
      {
        publicId: 'TljwaJBy',
        movieId: 2,
        userId: 2,
        score: '9',
        text: "Ever felt like you're living a simulation? What if I told you the Matrix is not a Sci-Fi but a Documentary movie?",
        createdAt: new Date('2003-05-12'),
      },
      {
        publicId: 'zy3GXBO1',
        movieId: 2,
        userId: 4,
        score: '9.5',
        text: "Immensely entertaining, intriguingly philosophical and just about one of the best films ever made! Writing a review of The Matrix is a very hard thing for me to do because this film means a lot to me and therefore I want to do the film justice by writing a good review. To tell the truth the first time I saw the film I was enamored by the effects. I remember thinking to myself that this was one of the most visually stunning films I had ever seen in my life. Also having always been a comic book fan and a fan of films that were larger than life, the transitional element of the story was very appealing to me and this probably heightened my enjoyment of the film very much. It wasn't until some time later (and after having seen the film a few times more) that I started to think about the film. I recognized the Christian elements quite quickly but it wasn't until I wrote an actual 15-page essay on the film that I tapped into some of the philosophical and religious elements and that made me appreciate the film even more. I won't say that I have recognized all elements because the film is quite literally packed with them.",
        createdAt: new Date('2003-10-15'),
      },
      {
        publicId: 'CSE9IS3y',
        movieId: 2,
        userId: 9,
        score: '8.5',
        text: 'Good but not "The Greatest Film Ever Made". Ok, I\'m getting sick of comments saying stuff like "The Matrix is the greatest film EVER MADE!" That\'s complete and utter bullturd. Yes, it had great cinematography and effects, yes it had a great soundtrack but NO WAY was the acting superb and NO WAY was the storyline great. Take that storyline and stick it in any other action movie and you would leave feeling disappointed at the end. It\'s major selling point was "What is the Matrix? You have to see it for yourself." Come on, the only plot twist was that thing to do with Cypher, and that wasn\'t greatly unforeseeable, there\'s things like that in every frigging action movie.',
        createdAt: new Date('2003-10-20'),
      },
      {
        publicId: 'I4qSeyKX',
        movieId: 2,
        userId: 7,
        score: '9.5',
        text: 'a masterpiece. and this is all. because each explanation sounds wrong. sure, the acting,, the plot, the fight/action scenes are great. maybe unique. but the essence, for me, remains the basic idea . a fake reality against the pure truth. and the magic as clothes of each character. because it is more than a film. it is a revolution in the way to see a film and to discover reality. you are Neo. and the mythological mix of symbols and cultural references and the simple story who seems have more and more levels are more than fascinating - it is real. sure, Matrix has a lot of reviews and around it is very easy to say hypothesis, verdicts, opinions or, maybe, critics. it is enough to say it is a masterpiece. or the perfect fascinating fairy tale.',
        createdAt: new Date('2005-04-21'),
      },
      {
        publicId: 'GYFWvTyC',
        movieId: 2,
        userId: 5,
        score: '9',
        text: "20 years on from release, some random thoughts on revisiting The Matrix. Spoiler: It's still brilliant. 20 years after its release, and several years since I last saw it, some reflections on the experience of rewatching The Matrix. In no particular order ...",
        createdAt: new Date('2012-11-19'),
      },
      {
        publicId: 'uuyOPowp',
        movieId: 2,
        userId: 3,
        score: '7.5',
        text: "Good, but highly overrated. First of all, the movie isn't that bad to watch. It would be a genuine delight to sci-fi lovers. But I don't think it deserves a 8.7 rating and a place in the IMDb top 20. One thing that doesn't delight me is that the main strength of the movie which is about the computer simulation isn't an original idea. There have been lots of theories regarding it. And the plot is very simple with many plot holes. Neo as the chosen one isn't portrayed correctly. I see no special abilities in him.",
        createdAt: new Date('2014-02-12'),
      },
      {
        publicId: 'lz2QfstH',
        movieId: 2,
        userId: 8,
        score: '7.5',
        text: 'Am I the only one who thinks this movie is overrated?',
        createdAt: new Date('2014-12-03'),
      },

      {
        publicId: 'HC4Mh5rw',
        movieId: 4,
        userId: 8,
        score: '5',
        text: 'Watchable for nostalgia factor alone. LK, JJ, et al. should be ashamed of this script.',
        createdAt: new Date('2016-01-03'),
      },
      {
        publicId: 'OXKslhrc',
        movieId: 4,
        userId: 4,
        score: '7',
        text: "Ghost of a Movie. Nothing more than a sociopathic superficial cash grab This film really is nothing more than an Advertisement. I'll admit the first time I saw it at the movies I thought it was pretty good, and i watched it another two times with friends and family over the course of a month before it finally left theatres. But after seeing it again, I realised something is off, something is not right about this movie.",
        createdAt: new Date('2016-04-15'),
      },
      {
        publicId: 'YWa3yPdD',
        movieId: 4,
        userId: 2,
        score: '8.5',
        text: 'Recommended for viewing. In general, I was satisfied with the viewing. The main thing that I liked was how the film was shot. First, the creators as much as possible embodied in it a visual image from old movies. Secondly, there were many actors and favorite characters from the old "Star Wars". Thirdly, the film has comical moments that fans of this space saga will certainly appreciate. Well, of course, a lot of shooting both on land and in space.',
        createdAt: new Date('2017-09-18'),
      },
      {
        publicId: 'j390uj3o',
        movieId: 4,
        userId: 7,
        score: '8',
        text: 'A Monument to Mediocrity. From the virtue signaling of social justice, to the cheap-jack plot-line which was easily discerned in advance, to the awful acting which evoked little but hooting from me, I was, as you can see, disappointed, and in some cases outraged. If you dare to join me, I will explain.',
        createdAt: new Date('2021-06-21'),
      },
      {
        publicId: 'MMArFQKz',
        movieId: 4,
        userId: 9,
        score: '7.5',
        text: 'Not too long, long ago in a galaxy not too far, far away... Two guys, Larry and JJ, were sitting in an office trying to write a script...',
        createdAt: new Date('2022-01-28'),
      },
      {
        publicId: 'c1UHFwrV',
        movieId: 4,
        userId: 1,
        score: '8.5',
        text: "Best film of the Star Wars saga, By......a.........MILE. I know biased fanboys of the painfully average, outdated original trilogy will cluelessly cry about this, but yes, The Force Awakens is the most well made film of the Star Wars saga. This film has all the goodness of the original movies, characters who are easily likable, incredible effects, John Williams' rousing musical score and a great time at the cinema, enjoyable with our families and friends. But there are things which are even better than the original movies. Interaction between the lead characters is so natural, you got to commend the writers and the director J J Abrams for their amazing work.",
        createdAt: new Date('2024-12-03'),
      },

      {
        publicId: 'kLm9nOp1',
        movieId: 5,
        userId: 3,
        score: '7.5',
        text: 'A refreshing take on mental health issues with stellar performances from Cooper and Lawrence. While the plot sometimes feels a bit contrived, the chemistry between the leads makes up for it.',
        createdAt: new Date('2013-01-15'),
      },
      {
        publicId: 'qRs2tUv3',
        movieId: 5,
        userId: 1,
        score: '8.0',
        text: 'Bradley Cooper and Jennifer Lawrence deliver powerful performances in this unconventional romantic comedy. The film tackles mental health with both sensitivity and humor. A great balance of drama and light moments.',
        createdAt: new Date('2013-02-28'),
      },
      {
        publicId: 'wXy4zAb5',
        movieId: 5,
        userId: 7,
        score: '7.0',
        text: 'Good performances but somewhat predictable story arc. Worth watching for the acting alone.',
        createdAt: new Date('2013-03-12'),
      },
      {
        publicId: 'cDe5fGh6',
        movieId: 5,
        userId: 9,
        score: '8.5',
        text: "One of the best romantic comedies of the decade. It's honest, raw, and surprisingly deep in its portrayal of mental illness. Cooper and Lawrence are simply magnetic together.",
        createdAt: new Date('2013-05-20'),
      },
      {
        publicId: 'iJk7mNo8',
        movieId: 5,
        userId: 4,
        score: '7.5',
        text: 'A quirky, heartfelt film that manages to be both entertaining and thought-provoking. The dance competition subplot feels a bit forced, but the character development is excellent.',
        createdAt: new Date('2013-06-04'),
      },
    ],
  });

  return {
    cloudImages: cloudImages.length,
    figures: figures.length,
    movieFigures: movieFigures.length,
    movies: movies.length,
    users: users.length,
    userReviews: userReviews.length,
  };
}

main()
  .then((records) => console.log(records))
  .catch((e) => {
    throw e;
  });
