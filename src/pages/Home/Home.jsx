import Banner from "../../components/Home/Banner/Banner"
import FeatureLesson from "../../components/Home/FeatureLesson/FeatureLesson"
import InnerCircleCTA from "../../components/Home/InnerCircleCTA/InnerCircleCTA"
import MilestoneStats from "../../components/Home/MilestoneStats/MilestoneStats"
import MostSaveLessons from "../../components/Home/MostSaveLessons/MostSaveLessons"
import Newsletter from "../../components/Home/Newsletter/Newsletter"
import ImpactStories from "../../components/Home/SuccessStories/ImpactStories"
import Testimonials from "../../components/Home/Testimonials/Testimonials"
import TopContributorWeak from "../../components/Home/TopContributorWeak/TopContributorWeak"
import WhyLearningFromLife from "../../components/Home/WhyLearningFromLife/WhyLearningFromLife"
import PillarsOfWisdom from "./PillarsOfWisdom/PillarsOfWisdom"

const Home = () => {
  return (
    <div>
      <title>LessonVerse Home</title>
      {/* banner */}
      <Banner></Banner>

      {/* Why Learning From Life Matters section  */}
      <WhyLearningFromLife></WhyLearningFromLife>

      {/* MilestoneStats section */}
      <MilestoneStats />

      {/* Pillars of Wisdom section */}
      <PillarsOfWisdom />
      
      {/* featured lesson */}
      <FeatureLesson></FeatureLesson>

      {/* most save lessons */}
      <MostSaveLessons></MostSaveLessons>

      {/* top contributor in the weak */}
      <TopContributorWeak></TopContributorWeak>

      {/* Success Stories section */}
      <ImpactStories />

      {/* Testimonials section */}
      <Testimonials />

      {/* call to action section */}
      <InnerCircleCTA />

      {/* Newsletter section */}
      <Newsletter />

    </div>
  )
}

export default Home
