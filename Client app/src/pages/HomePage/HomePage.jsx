import React from "react";
import "./HomePage.css";

const LazyList1 = React.lazy(() => import("../../components/List1/List1"));

const HomePage = () => {
  return (
    <>
      <React.Suspense
        fallback={<div className="VideoSkeletonWrapper">heloo</div>}
      >
        <LazyList1 />
      </React.Suspense>
    </>
  );
};

export default HomePage;
