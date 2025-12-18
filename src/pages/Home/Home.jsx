import Banner from "../../components/Home/Banner/Banner"
import FeatureLesson from "../../components/Home/FeatureLesson/FeatureLesson"
import MostSaveLessons from "../../components/Home/MostSaveLessons/MostSaveLessons"
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

      {/* most save lessons */}
      <MostSaveLessons></MostSaveLessons>
    </div>
  )
}

export default Home
