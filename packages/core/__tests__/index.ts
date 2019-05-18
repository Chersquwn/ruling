import Ruling from '../index'

test('Ruling', () => {
  const { passed, message } = new Ruling()
    .data(1)
    .equals(2, 'not equals')
    .range([2, 4], 'not range')

  expect(passed).toEqual(false)
  expect(message).toEqual('not equals')
})
