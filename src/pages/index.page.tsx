import { getSites } from "api";

import { GetStaticProps } from "next";

import About from "components/About";
import DownloadApps from "components/DownloadApps";
import Footer from "components/Footer";
import Hero from "components/Hero";
import HeroBackground from "components/Hero/HeroBackground";
import Map from "components/Map";
import Navbar from "components/Navbar";
import SEO from "components/SEO";

import { TSitesProps } from "types/ISitesProps";

interface IProps {
  sites: TSitesProps;
  language: "ar" | "en";
}
export const getStaticProps: GetStaticProps<IProps> = async (ctx) => {
  const { locale } = ctx;

  const selectedLanguage = locale === "ar" || locale === "en" ? locale : "en";
  const sites = await getSites();

  return {
    props: {
      language: selectedLanguage,
      sites: sites.map((site) => ({
        id: site.id,
        title: site.title[selectedLanguage],
        shortDescription: site.shortDescription[selectedLanguage],
        longDescription: site.longDescription[selectedLanguage],
        image: site.image,
        link: site.link,
        videoLink: site.videoLink,
        geolaction: site.geolaction,
        cardImage: site.cardImage,
        pinImage: site.pinImage,
      })),
    },
    revalidate: 60,
  };
};

const Home: React.FC<IProps> = ({ sites, language }) => {
  return (
    <>
      <SEO
        title="Heritage Eye | Explore Saudi Arabia's Heritage & Historical Sites"
        description="Explore the rich culture and history of Saudi Arabia through the official portal of the Ministry of Culture. Discover our heritage sites, learn about our traditions, and plan your visit to experience it all firsthand."
        siteName="Heritage Eye"
      />
      <main
        dir={language === "ar" ? "rtl" : "ltr"}
        className="relative cursor-auto"
      >
        <Navbar />
        <br />
        <HeroBackground>
          <Hero sites={sites} />
        </HeroBackground>
        <Map sites={sites} />
        <About />
        {/* <HeritageSites sites={sites} /> */}
        <DownloadApps />
        {/* <Pratners /> */}
        <Footer />
      </main>
    </>
  );
};

export default Home;
