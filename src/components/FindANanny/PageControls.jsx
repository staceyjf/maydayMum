import { Button } from '@mui/material';

const PageControls = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </Button>
      <div style={{ margin: '0 10px' }}>
        Page {currentPage} of {totalPages}
      </div>
      <Button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
};

export default PageControls;