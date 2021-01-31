const MainText = ({ currentLeader }) => {
  return (
    <div className="text-center text-xl sm:text-4xl text-white">
      <div className="text-5xl sm:text-7xl font-bold pb-1">{`${currentLeader.firstName} ${currentLeader.lastName}`}</div>
      <div className="pb-6">
        paid{' '}
        <span className="text-2xl sm:text-5xl font-bold">{`$${currentLeader.amount}`}</span>{' '}
        to put their name here
      </div>
      <div>
        {`${currentLeader.firstName} ${currentLeader.lastName}`} is rich and can
        prove it!
      </div>
      <div className="text-lg sm:text-2xl mt-10">
        Are you richer than{' '}
        {`${currentLeader.firstName} ${currentLeader.lastName}`}?
      </div>
      <div className="text-lg sm:text-2xl">
        Pay{' '}
        <span className="font-bold">{` $${currentLeader.amount + 1} `}</span>and
        prove it!
      </div>
    </div>
  )
}

export default MainText
