export function downloadClustersAsCSV(clusters: Array<{ name: string; keywords: string[] }>) {
  // Create CSV content
  const csvRows = [];
  
  // Add header
  csvRows.push(['Cluster Name', 'Keywords']);
  
  // Add data rows
  clusters.forEach(cluster => {
    csvRows.push([
      cluster.name,
      cluster.keywords.join('; ')
    ]);
  });
  
  // Convert to CSV string
  const csvContent = csvRows
    .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\n');
  
  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', 'keyword-clusters.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}