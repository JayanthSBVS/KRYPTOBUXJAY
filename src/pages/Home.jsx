import Banner from "../components/home/hero";
import Companies from "../components/home/companies";
import Work from "../components/home/work";
import Table from "../components/home/table";
import Features from "../components/home/features";
import Simple from "../components/home/simple";
import Trade from "../components/home/trade";
import Faq from "../components/home/faq";
import ContactForm from "../components/ContactForm";

export default function Home() {
  return (
    <>
      <Banner/>
      <Companies />
      <Work />
      <Table />
      <Features />
      <Simple />
      <Trade />
      <Faq />
      <ContactForm />
    </>
  );
}