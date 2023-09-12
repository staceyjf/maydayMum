import NannyCard from './NannyCard';
import { Link } from "react-router-dom";

function NannyList({fullUserProfile, isLoadingAllData, nannies}) {

  const nanny = nannies.map((n ,idx)) => (
  <NannyCard
    nanny={n}
    idx={idx}
  />);


  return (
    <>
    {isLoadingAllData 
    ? ( <div>Loading...</div> ) //need to add something in to indicate that this is happening 
    : ( // Render the account components when isLoading is false
      {nanny}
      )}
  </>
)};

export default NannyList