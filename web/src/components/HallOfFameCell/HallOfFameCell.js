import React from 'react'

export const QUERY = gql`
  query LEADERS {
    leaders: leaders {
      id
      firstName
      lastName
      amount
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">{'No leaders yet. '}</div>
}

export const Success = ({ leaders }) => {
  return (
    <div className="pt-10 text-white w-100 sm:w-2/6 m-auto">
      <div className="text-2xl font-bold underline text-center">
        Hall of Fame
      </div>
      <div
        className="text-xl mt-7"
        style={{ height: '70vh', overflowY: 'scroll' }}
      >
        {leaders.map((l, it) => {
          return (
            <div className="flex justify-between pb-4" key={l.id}>
              <div>{it + 1}.</div>
              <div>{`${l.firstName} ${l.lastName}`}</div>
              <div>${l.amount}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
