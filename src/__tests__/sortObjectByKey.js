const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const { main, sortedObjectByKey } = require('./../utils/sortObjectByKey');

// 排序前
const termsBeforeSorted = {
  phrases: {
    'cloud computing': '雲端運算',
    'connection-oriented': '連結導向',
    'assembly language': '組合語言',
    'constructor function': '建構式函式',
  },
  words: {
    array: '陣列',
    firmware: '韌體',
    adapter: '配接器',
    animation: '動畫',
    reuse: '複用',
    activated: '啟用的',
  },
};

// 排序後應該要長這樣
const termsAfterSortedShouldBe = {
  phrases: {
    'assembly language': '組合語言',
    'cloud computing': '雲端運算',
    'connection-oriented': '連結導向',
    'constructor function': '建構式函式',
  },
  words: {
    activated: '啟用的',
    adapter: '配接器',
    animation: '動畫',
    array: '陣列',
    firmware: '韌體',
    reuse: '複用',
  },
};

describe('test utils of sortObjectByKey', () => {
  const termsAfterSorted = sortedObjectByKey(termsBeforeSorted);
  const keysAfterSorted = Object.keys({
    ...termsAfterSorted.phrases,
    ...termsAfterSorted.words,
  });

  const keysAfterSortedShouldBe = Object.keys({
    ...termsAfterSortedShouldBe.phrases,
    ...termsAfterSortedShouldBe.words,
  });

  it('has same keys and order after sortedObjectByKey', () => {
    expect(keysAfterSorted).toEqual(keysAfterSortedShouldBe);
  });

  it('expect file be generated', async () => {
    await main();
    const zhCNFilePath = path.resolve(__dirname, './../terms/zh_CN.json');
    const zhTWFilePath = path.resolve(__dirname, './../terms/zh_TW.json');

    const zhCNFile = await fsPromises.stat(zhCNFilePath);
    expect(zhCNFile).toEqual(expect.anything());

    const zhTWFile = await fsPromises.stat(zhTWFilePath);
    expect(zhTWFile).toEqual(expect.anything());
  });
});
