import { toUpperCase } from '../toUpperCase'

describe('toUpperCase func', () => {
  it('lowkey 🔥 -> LOWKEY 🔥', () => {
    expect(toUpperCase('lowkey 🔥')).toEqual('LOWKEY 🔥')
  })
  it('hello world -> HELLO WORLD', () => {
    expect(toUpperCase('hello world')).toEqual('HELLO WORLD')
  })
  it('Hei maailma -> HEI MAAILMA', () => {
    expect(toUpperCase('Hei maailma')).toEqual('HEI MAAILMA')
  })
})
