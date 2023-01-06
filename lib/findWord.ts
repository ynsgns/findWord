import sozlukFile from "./sozluk";

const findWord = async (characters: string) => {
  console.log("start ...");
  const startDate = new Date();
  const charactersArray = permutations(
    characters.toLocaleLowerCase().split("")
  );
  const sozluk = sozlukFile.split("\n");

  const response: string[] = [];
  let loopSize = 0;
  console.log(
    `${charactersArray.length} koşul ${sozluk.length} kelime içinde kontrol ediliyor ...`
  );
  sozluk.forEach((element: string) => {
    const kelime_arr = element?.match(/./gu) || null;
    if (kelime_arr) {
      charactersArray.forEach((character: string) => {
        if (character[0] === kelime_arr.sort()[0]) {
          for (let i = 0; i < character.length; i++) {
            const search_kelime = character.slice(0, i + 1);
            loopSize++;
            if (
              search_kelime.length > 2 &&
              JSON.stringify(kelime_arr.sort()) ===
                JSON.stringify(search_kelime)
            ) {
              response.push(element);
            }
          }
        }
      });
    }
  });
  const endTime = new Date();
  // @ts-ignore
  const loopTime: number = endTime - startDate;
  const min = Math.floor((loopTime / 1000 / 60) << 0);
  const sec = Math.floor((loopTime / 1000) % 60);
  const findedWord = response
    .filter((x, i) => response.indexOf(x) === i)
    .sort();

  console.log("\n\n");
  console.log("loop size:", loopSize);
  console.log(`loop time: ${min}m ${sec}s`);
  console.log("\n\n");
  console.log(findedWord);
  console.log("\n\n");
  console.log("end :)");
  const returnObj = {
    loopSize,
    loopTime: `${min}m ${sec}s`,
    findedWord,
  };

  return returnObj;
};

const permutations = (array: string[]): string[] => {
  let permutationList: string[] = [];

  if (array.length == 1) {
    return array;
  }

  for (let i = 0; i < array.length; i++) {
    let arrayLength1 = [array[i]];
    let auxArray = Object.values(array);
    auxArray.splice(i, 1);

    let subPermutations = permutations(auxArray);

    for (let j = 0; j < subPermutations.length; j++) {
      let arrayMerge = arrayLength1.concat(subPermutations[j]);
      // @ts-ignore
      permutationList.push(arrayMerge);
    }
  }

  return permutationList;
};

export { findWord };
