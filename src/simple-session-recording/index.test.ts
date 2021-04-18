import { startSessionRecording } from './index'

describe('SimpleSessionRecording', () => {
  it('should uppercase text', () => {
    const uppperCased = startSessionRecording({ text: 'a' })
    expect(uppperCased).toBe('A')
  })
})
