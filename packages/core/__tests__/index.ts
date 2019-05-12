import Ruling from '../ruling'

test('aaa', async () => {
  expect.assertions(1)
  const { passed, message } = await new Ruling()
    .data(1)
    .then(resp => resp.equals(2, 'not equals'))
    .then(resp => resp.range([2, 4], 'not range'))
    .catch(resp => resp)

  console.log(passed, message)

  expect(passed).toEqual(true)
})
