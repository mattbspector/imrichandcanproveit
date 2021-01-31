import { Link, routes } from '@redwoodjs/router'
import HallOfFameCell from 'src/components/HallOfFameCell'

import BasicLayout from 'src/layouts/BasicLayout'

const HallOfFamePage = () => {
  return (
    <BasicLayout>
      <Link to={routes.home()}>
        <span className="text-white font-bold hover:underline">
          Are you rich?
        </span>
      </Link>
      <HallOfFameCell />
    </BasicLayout>
  )
}

export default HallOfFamePage
