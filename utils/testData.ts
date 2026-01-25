export const testData = {
  urlCYO : "https://dev.smashburger.com/menu/smashburgers/create-your-own",
  url : "https://dev.smashburger.com/",
  zipCode: "80246",
  location : "Glendale, CO",
  size : "Black Bean",
  sizeBaconStack: "No Bun - Test Single Olo Sandbox", 
  bun : "Spicy Chipotle", 
  cheese : "American", 
  extracheese : "Aged Cheddar",
  topping : "Tomatoes", 
  sauce : "Ketchup", 
  price : 4.99,
  BagFee: 0.10, 
  Tax: 0.72
};

export const userData ={
  firstName: "Chaimae",
  lastName : "Ghanem",
  //email: "RandomEmail04@gmail.com", 
  phoneNumber : "(561) 438-3756", 
  password : "Secretp@$$w0rd", 
  wrongPassword : "WrongP@$$w0rd"

  };

export function generateEmail() {
  const timestamp = Date.now();
  return `randomeEmail+${timestamp}@example.com`;
}

export const paymentData ={
  method: "Credit Card",
  cardNumber: "4104 7588 1927 1586",
  cvv:"833",
  expirationDate: "0530"
  };