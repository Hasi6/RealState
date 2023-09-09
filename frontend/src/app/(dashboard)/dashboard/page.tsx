'use client';
import { ACCESS_TOKEN } from '@/utils/constants';

function Dashboard() {
  const generatePdf = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/pdf`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Use the generated PDF URL to display or download the PDF
      // For example, you can open it in a new tab:
      window.open(url);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  return (
    <>
      <h1 onClick={generatePdf}>Hasi</h1>
    </>
  );
}

export default Dashboard;
