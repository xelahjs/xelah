import { segmenter } from './segmenter';

const content = `\\h Titus
\\id TIT, Bhadrawahi_Bhadrawahi_ltr, EN_ULB, Sat Jul 15 2017 21:23:37 GMT-0400 (EDT)
\\c 1
\\p
\\v 1 पौलुसेरे|
\\v 2 तैस हमेंशरी|
\\s क्रेते
\\v 5 मीं तू|
\\c 2
\\p
\\v 1 पण तू एरी गल्लां ज़ो, ज़ैना रोड़ी तालीमारे काबलन|
\\p
\\v 2 मतलब बुडडे मड़द, प्रहेज़ केरने बाले, ते समझ़दार ते संयमी भोंन, ते तैन केरो विशवास ते प्रेम, ते सबर पक्की भोए|`;

const sections = [
  `\\h Titus
\\id TIT, Bhadrawahi_Bhadrawahi_ltr, EN_ULB, Sat Jul 15 2017 21:23:37 GMT-0400 (EDT)
`,
  `\\c 1
\\p
\\v 1 पौलुसेरे|
\\v 2 तैस हमेंशरी|
\\s क्रेते
\\v 5 मीं तू|
`,
  `\\c 2
\\p
\\v 1 पण तू एरी गल्लां ज़ो, ज़ैना रोड़ी तालीमारे काबलन|
\\p
\\v 2 मतलब बुडडे मड़द, प्रहेज़ केरने बाले, ते समझ़दार ते संयमी भोंन, ते तैन केरो विशवास ते प्रेम, ते सबर पक्की भोए|`
];

test('segments chapters', () => {
  const regex = /(^|\\c +\d+)(\n|.)+?(?=(\\c +\d+|$))/g;
  const result = segmenter({ content, regex });
  const expected = sections;
  expect(result).toEqual(expected);
});