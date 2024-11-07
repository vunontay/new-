import { useEffect, useState } from "react";
import CardList from "../../components/card-list";
import useUrl from "../../hook/useUrl";
import "./style.css";
import Pagination from "../../components/Pagination/Pagination";
import data from "../../data/tagList.json";
function Home() {
  const { setLimit, setPage, setTotalPage } = useUrl();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setLimit(data.data.limit);
    setPage(currentPage);
    setTotalPage(data.data.total);
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
    setCurrentPage(page);
    // You can fetch new data based on `page` if needed
  };
  return (
    <div className="home">
      <div className="block-vertical"></div>
      <CardList />
      <Pagination
        totalPages={data.data.total}
        currentPage={currentPage}
        setPage={handlePageChange}
      />
    </div>
  );
}

export default Home;
