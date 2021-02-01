/* eslint-disable react/jsx-no-target-blank */
import BasicLayout from 'src/layouts/BasicLayout'
import LeadersCell from 'src/components/LeadersCell'
import { Link, routes } from '@redwoodjs/router'
import TwitterIcon from '@material-ui/icons/Twitter'

const HomePage = () => {
  return (
    <BasicLayout>
      <div>
        <a
          href="http://twitter.com/share?text=Im rich, and I can prove it&url=https://imrichandicanproveit.com/&hashtags=imrich"
          className="twitter-share-button mr-3"
          target="_blank"
        >
          <TwitterIcon style={{ fill: 'white' }} />
        </a>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></script>
        <Link to={routes.hallOfFame()}>
          <span className="text-white font-bold hover:underline">
            Hall of Fame
          </span>
        </Link>
      </div>
      <LeadersCell />
    </BasicLayout>
  )
}

export default HomePage
