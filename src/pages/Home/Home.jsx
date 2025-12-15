import Banner from "../../components/Home/Banner/Banner"
import FeatureLesson from "../../components/Home/FeatureLesson/FeatureLesson"
import TopContributorWeak from "../../components/Home/TopContributorWeak/TopContributorWeak"
import WhyLearningFromLife from "../../components/Home/WhyLearningFromLife/WhyLearningFromLife"


const Home = () => {
  return (
    <div>
      {/* banner */}
      <Banner></Banner>

      {/* featured lesson */}
      <FeatureLesson></FeatureLesson>

      {/* Why Learning From Life Matters section  */}
      <WhyLearningFromLife></WhyLearningFromLife>

      {/* top contributor in the weak */}
      <TopContributorWeak></TopContributorWeak>
    </div>
  )
}

export default Home
