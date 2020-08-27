import { writable, derived } from "svelte/store";
import { advancedStore } from "./custom-stores";

export const ALPHABET = [
  "ab",
  "cd",
  "ef",
  "gh",
  "ij",
  "kl",
  "mn",
  "op",
  "qr",
  "st",
  "uv",
  "wx",
  "yz",
];
export const BIG_ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
export const LENGTH = [1, 2, 3, 4, 5, 6, 7, 8];
export const BIG_LENGTH = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
];
export const SMALL_SIZE = 208;
export const BIG_SIZE = 416;

const useLocalStorageInitialize = (key, defaultValue, method) => {
  if (typeof localStorage !== "undefined") {
    const value = localStorage.getItem(key) || defaultValue;
    return value === "false" ? false : value;
  }
  return defaultValue;
};
const useLocalStorage = (key, value) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(key, value);
  }
};
export const text = advancedStore(useLocalStorageInitialize("text", ""));
export const password = writable("");
export const small = writable(useLocalStorageInitialize("small", true));

export const filledText = derived(text, ($text) => {
  let number = 0;
  return $text
    .replace(/\n/g, " ")
    .split("")
    .map((letter) => {
      if (letter === " ") {
        letter = number;
        number++;
        return letter;
      }
      return letter;
    })
    .join("");
});
export const generator = derived(
  [filledText, small],
  ([$filledText, $small]) => {
    let indexLetterIndicator = 0;
    let indexNumberIndicator = 0;
    let pair = false;
    let generatorObject = {};
    const length = $small ? LENGTH : BIG_LENGTH;
    const alphabet = $small ? ALPHABET : BIG_ALPHABET;
    $filledText
      .substr(0, alphabet.length * length.length * 2)
      .split("")
      .forEach((symbol, index) => {
        if (!generatorObject[alphabet[indexLetterIndicator]]) {
          generatorObject[alphabet[indexLetterIndicator]] = {};
        }
        generatorObject[alphabet[indexLetterIndicator]][indexNumberIndicator] =
          (generatorObject[alphabet[indexLetterIndicator]][
            indexNumberIndicator
          ] || "") + symbol;
        if (pair) {
          if (indexLetterIndicator === alphabet.length - 1) {
            indexNumberIndicator++;
            indexLetterIndicator = 0;
          } else {
            indexLetterIndicator++;
          }
        }
        pair = !pair;
      });
    return generatorObject;
  }
);

export const encrypted = derived(
  [password, generator],
  ([$password, $generator]) => {
    let crypted = [];
    if (!!$password) {
      $password.split("").forEach((letter, index) => {
        let currentKey = "";
        Object.keys($generator).forEach((letters) => {
          const isThisKey = !!letters.split("").find((l) => l === letter);
          if (isThisKey) {
            currentKey = letters;
          }
        });
        crypted.push($generator[currentKey][index]);
      });
    }

    return crypted.join("").substr(0, LENGTH.length * 2);
  }
);

small.subscribe((value) => {
  useLocalStorage("small", value);
});

text.subscribe((value) => {
  useLocalStorage("text", value);
});
