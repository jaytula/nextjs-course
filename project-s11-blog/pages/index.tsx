import { Fragment } from "react"

const HomePage: React.FC = () => {
  return <Fragment>
    <Hero />
    <FeaturedPosts />
  </Fragment>
}

export default HomePage

// 1) Hero => Present ourselves
// 2) Featured Posts