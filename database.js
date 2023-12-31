const itemTable =
  [
    [
      "101", //primary-key
      {
        id: "101",
        name: "Camera Bag",
        oldPrice: 200,
        currPrice: 99,
        img: "bag.png"
      }
    ],
    [
      "102",
      {
        id: "102",
        name: "Football",
        oldPrice: "",
        currPrice: 15,
        img: "ball.png"
      }
    ],
    [
      "103",
      {
        id: "103",
        name: "fan",
        oldPrice: 70,
        currPrice: 20,
        img: "fan.png"
      }
    ],
    [
      "104",
      {
        id: "104",
        name: "camera",
        oldPrice: "",
        currPrice: 299,
        img: "camera.png"
      }
    ],
    [
      "105",
      {
        id: "105",
        name: "jacket",
        oldPrice: "99",
        currPrice: 89,
        img: "jacket.png"
      }
    ],
    [
      "106",
      {
        id: "106",
        name: " shirt",
        oldPrice: "",
        currPrice: 50,
        img: "shirt.jpg"
      }
    ],
    [
      "107",
      {
        id: "107",
        name: "Football",
        oldPrice: "",
        currPrice: 30,
        img: "ball.png"
      }
    ]
  ]

const dataItemMap = new Map(itemTable);


function GetItemById(id) {
  return dataItemMap.get(id);
}