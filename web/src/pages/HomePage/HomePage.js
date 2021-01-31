import BasicLayout from 'src/layouts/BasicLayout'
import LeadersCell from 'src/components/LeadersCell'
import { Link, routes } from '@redwoodjs/router'

const HomePage = () => {
  return (
    <BasicLayout>
      <Link to={routes.hallOfFame()}>
        <span className="text-white font-bold hover:underline">
          Hall of Fame
        </span>
      </Link>
      <LeadersCell />
    </BasicLayout>
  )
}

export default HomePage
