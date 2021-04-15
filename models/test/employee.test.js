const Employee = require('../employee.model.js');

const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Employee', () => {
  it('should throw error if at least one field is empty', () => {
    const [ firstName, lastName, department ] = ['Jonathan', 'Wilson', 'IT'];
    const dataEmp1 = new Employee({});
    const dataEmp2 = new Employee({ department: department });    
    const dataEmp3 = new Employee({ firstName: firstName, lastName: lastName });

    const cases = [dataEmp1, dataEmp2, dataEmp3];
    for (let dataEmp of cases) {
      dataEmp.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });
});

after(() => {
  mongoose.models = {};
});