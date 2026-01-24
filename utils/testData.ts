export const testData = {
  zipCode: "80246",
  location : "Glendale, CO",
  size : "Black Bean",
  bun : "Spicy Chipotle", 
  cheese : "American", 
  extracheese : "Aged Cheddar",
  topping : "Tomatoes", 
  sauce : "Ketchup"
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