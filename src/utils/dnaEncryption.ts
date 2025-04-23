
export const charToDNA: { [key: string]: string } = {
  'A': 'ACT', 'B': 'ATG', 'C': 'CGA', 'D': 'GAA', 'E': 'TAC',
  'F': 'GTC', 'G': 'TGC', 'H': 'ATG', 'I': 'CCA', 'J': 'GTT',
  'K': 'GGA', 'L': 'TTT', 'M': 'GTA', 'N': 'AGG', 'O': 'GAC',
  'P': 'CGC', 'Q': 'TGA', 'R': 'AAG', 'S': 'TCA', 'T': 'GCG',
  'U': 'AAA', 'V': 'TGT', 'W': 'GAG', 'X': 'GAT', 'Y': 'CTC',
  'Z': 'ACC', ' ': 'TAG'
};

export const dnaToChar: { [key: string]: string } = Object.entries(charToDNA).reduce(
  (acc, [char, dna]) => ({ ...acc, [dna]: char }), 
  {}
);

export const complement: { [key: string]: string } = {
  'A': 'T',
  'T': 'A',
  'C': 'G',
  'G': 'C'
};

export const encryptText = (input: string): string => {
  const upperInput = input.toUpperCase();
  if (!/^[A-Z ]*$/.test(upperInput)) {
    throw new Error("Please enter only alphabetic characters and spaces.");
  }

  let dnaSeq = '';
  for (let char of upperInput) {
    dnaSeq += charToDNA[char];
  }

  return dnaSeq.split('').map(base => complement[base]).join('');
};

export const decryptDNA = (input: string): string => {
  const upperInput = input.toUpperCase();
  if (!/^[ATCG]*$/.test(upperInput)) {
    throw new Error("Please enter a valid DNA sequence using only A, T, C, G.");
  }

  const reversed = upperInput.split('').map(base => complement[base]).join('');
  const triplets = reversed.match(/.{1,3}/g) || [];

  return triplets.map(t => dnaToChar[t] || '?').join('');
};
