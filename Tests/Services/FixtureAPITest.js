import API from '../../App/Services/Api'
import FixtureAPI from '../../App/Services/FixtureApi'
import R from 'ramda'

test('All fixtures map to actual API', () => {
  const fixtureKeys = R.keys(FixtureAPI).sort()
  const apiKeys = R.keys(API.create())

  const intersection = R.intersection(fixtureKeys, apiKeys).sort()

  // There is no difference between the intersection and all fixtures
  expect(R.equals(fixtureKeys, intersection)).toBe(true)
})

test('FixtureAPI getPrices returns the right file', () => {
  const expectedFile = require('../../App/Fixtures/prices.json')

  expect(FixtureAPI.getPrices()).toEqual({
    ok: true,
    data: expectedFile
  })
})

test('FixtureAPI getCurrentPrice returns the right file', () => {
  const expectedFile = require('../../App/Fixtures/current.json')

  expect(FixtureAPI.getCurrentPrice()).toEqual({
    ok: true,
    data: expectedFile
  })
})