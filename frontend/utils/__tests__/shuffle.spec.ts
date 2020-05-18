import shuffle from "../shuffle"

describe("shuffle", () => {
    it("should contain shuffled data", () => {
      const data = [{
        id: "a1",
        value: 1,
        isOpen: false
      }, {
        id: "a2",
        value: 2,
        isOpen: false
      }, {
        id: "a3",
        value: 3,
        isOpen: false
      }]
      expect(shuffle(data)).toEqual(expect.arrayContaining(data));
    });

  
})
