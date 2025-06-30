import { useAuth } from "@/context/AuthContext";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import MachineParksList from "@/components/MachineParksList";
import CategoryGrid from "@/components/CategoryGrid";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Hero />
      {isAuthenticated ? (
        <>
          <SearchSection />
          <MachineParksList />
        </>
      ) : (
        <SearchSection />
      )}
      <CategoryGrid />
    </>
  );
};

export default Home;
