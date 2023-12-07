export default function getCategoryColor(category) {
    const categoryColors = {
      'Groceries': '#3498db',
      'Utilities': '#e74c3c',
      'Rent': '#2ecc71',
      'Clothing': '#f39c12',
      'Other': '#9b59b6',
    };
    return categoryColors[category] || '#000000'; // Default to black if the category color is not defined
  };