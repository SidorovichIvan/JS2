let str = "Lorem ipsum dolor sit amet, 'consectetur' adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio'n ullamco laboris nis'i ut aliqui  'pexea'  commodo  'consequ'  at. Duis aute irure 'dolor' in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu'r. Excepteu'r 'sint' occaecat cupidat'at non proident, 'sun' t in culpa qui 'officia' deserunt moll'it anim id est laborum."

let regexp = /\s'|'\s/g;

console.log(str.replace(regexp, '"'))
