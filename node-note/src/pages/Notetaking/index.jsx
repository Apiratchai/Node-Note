import HeadNavBar from "../../../components/HeadNavBar";
import Footer from "../../../components/Footer";
import NoteTakingLayout from "../../../components/NoteTakingLayout"
import SideNavBar from "../../../components/SideNavBar"



export default function Component() {
  return (
    <NoteTakingLayout>
      <div className="flex flex-col min-h-screen">
        <HeadNavBar />
        <Footer />
      </div>
    </NoteTakingLayout>
  )
}