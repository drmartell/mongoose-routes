const Car = require('./Car');

// make: {
//   type: String,
//   required: true,
// },
// model: {
//   type: String,
//   required: true,
// },
// manufacturer: {
//   type: String,
//   required: true,
// },
// year: {
//   type: Number,
//   required: true,
//   min: 2000,
// },

describe('Car Model', () => {
  describe('make', () => {
    it('requires a make', () => {
      const car = new Car({
        model: 'Fiesta',
        year: 2000,
      });
      const { errors } = car.validateSync();
      expect(errors.make.message).toEqual('Path `make` is required.');
    });
  });

  describe('model', () => {
    it('requires a model', () => {
      const car = new Car({
        make: 'Ford',
        year: 2000,
      });
      const { errors } = car.validateSync();
      expect(errors.model.message).toEqual('Path `model` is required.');
    });
  });

  describe('year', () => {
    it('requires a year', () => {
      const car = new Car({
        make: 'Ford',
        model: 'Fiesta',
      });
      const { errors } = car.validateSync();
      expect(errors.year.message).toEqual('Path `year` is required.');
    });

    it('is over 2000', () => {
      const car = new Car({
        make: 'Ford',
        model: 'Fiesta',
        year: 1999,
      });
      const { errors } = car.validateSync();
      expect(errors.year.message).toEqual('Path `year` (1999) is less than minimum allowed value (2000).');
    });
  });
});
