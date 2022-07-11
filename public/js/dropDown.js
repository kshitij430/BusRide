"use strict";
export const substringMatcher = function (strs) {
  return function findMatches(q, cb) {
    let matches, substrRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, "i");

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function (i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

export const cities = [
  "Yavatmal",
  "Wardha",
  "Vasai-Virar City MC",
  "Ulhasnagar",
  "Udgir",
  "Thane",
  "Solapur",
  "Satara",
  "Sangli-Miraj-Kupwad",
  "Pune",
  "PCMC, Pune",
  "Parbhani",
  "Panvel",
  "Osmanabad",
  "Navi Mumbai",
  "Nashik",
  "Nandurbar",
  "Nanded",
  "Nagpur",
  "Mumbai",
  "Mira-Bhayandar",
  "Malegaon",
  "Latur",
  "Kolhapur",
  "Kalyan-Dombivli",
  "Jalna",
  "Jalgaon",
  "Ichalkaranji",
  "Hinganghat",
  "Gondia",
  "Dhule",
  "Chandrapur",
  "Bhusawal",
  "Bhiwandi-Nizampur MC",
  "Beed",
  "Barshi",
  "Badlapur",
  "Aurangabad",
  "Amravati",
  "Ambarnath",
  "Akola",
  "Ahmednagar",
  "Achalpur",
];
