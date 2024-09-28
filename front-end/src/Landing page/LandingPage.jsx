import Explore from "./Explore";
import Service from "./Service";
import Footer from "./Footer";
import { AiFillFacebook, AiFillInstagram, AiFillTikTok } from "react-icons/ai";
import OurStory from "./OurStory";
export default function LandingPage() {
  return (
    <div>
      <Explore />
      <Service />
      <OurStory />
      <Footer />
      <div className="bg-orange-200 justify-center items-center flex pb-30 flex-row space-x-5 pb-2 text-3xl">
        <AiFillFacebook className="bg-browen-300 box-content px-2 py-1 rounded-3xl shadow-lg shadow-black/600 cursor-pointer hover:shadow-inner hover:shadow-black/300 duration-300 " />
        <AiFillInstagram className="bg-browen box-content px-2 py-1 rounded-3xl shadow-lg shadow-black/300 cursor-pointer hover:shadow-inner hover:shadow-black/300 duration-300 " />
        <AiFillTikTok className="bg-browen-300 box-content px-2 py-1 rounded-3xl shadow-lg shadow-black/300 cursor-pointer hover:shadow-inner hover:shadow-black/400 duration-300 " />
      </div>
    </div>
  );
}
