const Employee = require('../employee.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer();
      const uri = await fakeDB.getUri();

      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.log(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = new Employee({ firstName: 'Meghan', lastName: 'Markle', department: 'Vogue' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'William', lastName: 'Cambridge', department: 'Louis Vuitton' });
      await testEmpTwo.save();

      const testEmpThree = new Employee({ firstName: 'Winston', lastName: 'Blake', department: 'Times' });
      await testEmpThree.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 3;

      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const emp1 = await Employee.findOne({ firstName: 'Meghan' });
      const emp2 = await Employee.findOne({ lastName: 'Cambridge' });
      const emp3 = await Employee.findOne({ department: 'Times' });

      const expectedFirstName = 'Meghan';
      const expectedLastName = 'Cambridge';
      const expectedDepartment = 'Times';

      expect(emp1.firstName).to.be.equal(expectedFirstName);
      expect(emp2.lastName).to.be.equal(expectedLastName);
      expect(emp3.department).to.be.equal(expectedDepartment);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'Winston', lastName: 'Blake', department: 'Times' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Meghan', lastName: 'Markle', department: 'Vogue' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'William', lastName: 'Cambridge', department: 'Louis Vuitton' });
      await testEmpTwo.save();

      const testEmpThree = new Employee({ firstName: 'Winston', lastName: 'Blake', department: 'Times' });
      await testEmpThree.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'William' }, { $set: { firstName: '=William=' }});
      const updatedEmployee = await Employee.findOne({ firstName: '=William=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'William' });
      employee.firstName = '=William='
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: '=William=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Oh yeaah, updated!' }});
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(3);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Meghan', lastName: 'Markle', department: 'Vogue' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'William', lastName: 'Cambridge', department: 'Louis Vuitton' });
      await testEmpTwo.save();

      const testEmpThree = new Employee({ firstName: 'Winston', lastName: 'Blake', department: 'Times' });
      await testEmpThree.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'Winston' });
      const removeEmployee = await Employee.findOne({ firstName: 'Winston' });
      expect(removeEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Meghan' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ firstName: 'Meghan' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });
});