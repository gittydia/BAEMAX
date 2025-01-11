const emergencyFund = (salary, months) => {
  if(!salary || !months){
    throw Error('All fields are required.')
  }

  if(salary < 0 || months < 0){
    throw Error("The value must be 0 or greater.")
  }

  const data = {salary, months};
  return data;
}

const taxCalculator = (salary, isSssMember, isGsisMember, isPhMember) => {
  if(!salary || !isSssMember || !isGsisMember || !isPhMember) {
    throw Error("All fields are required.");
  }

  if(salary < 0){
    throw Error("Salary must be greater than 0");
  }


}

export {emergencyFund, taxCalculator};