import NannyCard from './NannyCard';
// import { Link } from "react-router-dom";

function NannyList({ fullUserProfile, isLoadingAllData, nannies }) {
  
  const nanny = nannies.map((n, idx) => (
    <NannyCard
      nanny={n}
      key={idx}
    />
  ));

  return (
    <>
      {isLoadingAllData ? (<div>Loading...</div>) : (
        <div>{nanny}</div>
      )}
    </>
  );
}

export default NannyList;