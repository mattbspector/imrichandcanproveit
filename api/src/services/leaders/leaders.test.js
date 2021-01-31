import {
  leaders,
  leader,
  createLeader,
  updateLeader,
  deleteLeader,
} from './leaders'

describe('leaders', () => {
  scenario('returns all leaders', async (scenario) => {
    const result = await leaders()

    expect(result.length).toEqual(Object.keys(scenario.leader).length)
  })

  scenario('returns a single leader', async (scenario) => {
    const result = await leader({ id: scenario.leader.one.id })

    expect(result).toEqual(scenario.leader.one)
  })

  scenario('creates a leader', async (scenario) => {
    const result = await createLeader({
      input: {
        name: 'String',
        body: 'String',
        postId: scenario.leader.one.post.id,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.body).toEqual('String')
  })

  scenario('updates a leader', async (scenario) => {
    const original = await leader({ id: scenario.leader.one.id })
    const result = await updateLeader({
      id: original.id,
      input: { name: 'String6453926' },
    })

    expect(result.name).toEqual('String6453926')
  })

  scenario('deletes a leader', async (scenario) => {
    const original = await deleteLeader({ id: scenario.leader.one.id })
    const result = await leader({ id: original.id })

    expect(result).toEqual(null)
  })
})
