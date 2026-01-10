import Banner from "../../components/Home/Banner/Banner"
import FeatureLesson from "../../components/Home/FeatureLesson/FeatureLesson"
import InnerCircleCTA from "../../components/Home/InnerCircleCTA/InnerCircleCTA"
import MostSaveLessons from "../../components/Home/MostSaveLessons/MostSaveLessons"
import ImpactStories from "../../components/Home/SuccessStories/ImpactStories"
import TopContributorWeak from "../../components/Home/TopContributorWeak/TopContributorWeak"
import WhyLearningFromLife from "../../components/Home/WhyLearningFromLife/WhyLearningFromLife"

const Home = () => {
  return (
    <div>
       <title>LessonVerse Home</title>
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

      {/* Success Stories section */}
      <ImpactStories />
      
      {/* call to action section */}
      <InnerCircleCTA />
    </div>
  )
}

export default Home
