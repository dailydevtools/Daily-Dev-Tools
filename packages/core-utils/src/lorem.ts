// Lorem Ipsum Generator

const WORDS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'vivamus', 'vestibulum',
    'sagittis', 'sapien', 'cum', 'sociis', 'natoque', 'penatibus', 'magnis',
    'dis', 'parturient', 'montes', 'nascetur', 'ridiculus', 'mus', 'donec',
    'quam', 'felis', 'ultricies', 'nec', 'pellentesque', 'eu', 'pretium'
];

function getRandomWord(): string {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function generateSentence(wordCount?: number): string {
    const count = wordCount || Math.floor(Math.random() * 10) + 5;
    const words = Array.from({ length: count }, getRandomWord);
    words[0] = capitalize(words[0]);
    return words.join(' ') + '.';
}

export function generateParagraph(sentenceCount?: number): string {
    const count = sentenceCount || Math.floor(Math.random() * 4) + 3;
    return Array.from({ length: count }, () => generateSentence()).join(' ');
}

export function generateLoremIpsum(options: {
    paragraphs?: number;
    sentences?: number;
    words?: number;
    startWithLorem?: boolean;
}): string {
    const { paragraphs = 1, sentences, words, startWithLorem = true } = options;

    if (words) {
        const wordList = Array.from({ length: words }, getRandomWord);
        if (startWithLorem) {
            wordList[0] = 'Lorem';
            if (words > 1) wordList[1] = 'ipsum';
        } else {
            wordList[0] = capitalize(wordList[0]);
        }
        return wordList.join(' ') + '.';
    }

    if (sentences) {
        const sentenceList = Array.from({ length: sentences }, () => generateSentence());
        if (startWithLorem) {
            sentenceList[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        }
        return sentenceList.join(' ');
    }

    const paragraphList = Array.from({ length: paragraphs }, () => generateParagraph());
    if (startWithLorem) {
        paragraphList[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + paragraphList[0];
    }
    return paragraphList.join('\n\n');
}
