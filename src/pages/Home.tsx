import { useAuth } from "@/context/AuthContext";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import MachineParksList from "@/components/MachineParksList";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Hero isAuthenticated={isAuthenticated} />
      {isAuthenticated ? (
        <>
          <SearchSection />
          <MachineParksList />
        </>
      ) : (
        <SearchSection />
      )}
    </>
  );
};

export default Home;
