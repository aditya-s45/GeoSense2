import React from 'react'
import FeatureCard from './FeatureCard';

const SideBar = ({ features, setEditDetails, onSegmentationComplete, selectionHandlers }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [areas, setAreas] = React.useState({});
  const [calculating, setCalculating] = React.useState(false);

  const calculateAreas = async () => {
    if (!selectionHandlers || !selectionHandlers.getSelectedPolygons) return;
    
    setCalculating(true);
    try {
        const selectedPolygons = selectionHandlers.getSelectedPolygons();
        const selectedIds = Array.from(selectedPolygons);
        
        // Get areas from GeoJSON properties
        const areas = {};
        selectedIds.forEach(id => {
            const feature = selectionHandlers.getFeatureById(id);
            if (feature && feature.properties.area_m2) {
                areas[id] = parseFloat(feature.properties.area_m2);
            }
        });
        
        setAreas(areas);
    } catch (error) {
        console.error('Error calculating areas:', error);
    }
    setCalculating(false);
  };

  /************************************************************
   * Rendering
   ************************************************************/
  return (
    <div className="sidebar-open" style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      backgroundColor: 'white',
      padding: '20px',
      overflowY: 'auto',
      boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      <div>
        <h1 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold', fontSize: '20px' }}>TerraBound</h1>
        <h1 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold', fontSize: '25px' }}>Auto Measurement Of Land</h1>
      </div>
      {/* Instructions Section */}
      <div className="instructions-section" style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
      <h3 style={{ marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>How to Use</h3>
      <p style={{ color: '#333', marginBottom: '5px' }}>• Draw a bounding box around the area of interest.</p>
      <p style={{ color: '#333', marginBottom: '5px' }}>• Start the land boundary detection process.</p>
      <p style={{ color: '#333', marginBottom: '5px' }}>• Click on detected land plots to select or deselect them.</p>
      <p style={{ color: '#333', marginBottom: '5px' }}>• Click the "Calculate Areas" button to get the total area of the selected plots.</p>
      <p style={{ color: '#333', marginBottom: '5px' }}>• Hover over the plot to find the area ID</p>

        {selectionHandlers && (
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={selectionHandlers.selectAllPolygons}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Select All
              </button>
              <button
                onClick={selectionHandlers.deselectAllPolygons}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Deselect All
              </button>
            </div>
            <button
              onClick={calculateAreas}
              disabled={calculating}
              style={{
                padding: '5px 10px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: calculating ? 'wait' : 'pointer',
                opacity: calculating ? 0.7 : 1
              }}
            >
              {calculating ? 'Calculating...' : 'Calculate Areas'}
            </button>
          </div>
        )}
      </div>

      {/* Area Results */}
      {Object.keys(areas).length > 0 && (
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
          <h4 style={{ marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>Area Calculations</h4>
          {Object.entries(areas).map(([id, area]) => (
            <div key={id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', color: '#333' }}>
              <span>Area {id}:</span>
              <span>{area.toLocaleString()} m²</span>
            </div>
          ))}
          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #90caf9', color: '#333' }}>
            <strong>Total Area: </strong>
            {Object.values(areas).reduce((sum, area) => sum + area, 0).toLocaleString()} m²
          </div>
        </div>
      )}

      {/* Feature Cards */}
      {features.map(feature => (
        <FeatureCard 
          key={feature._leaflet_id}
          feature={feature}
          setEditDetails={setEditDetails}
          onSegmentationComplete={onSegmentationComplete}
        />
      ))}
    </div>
  )
}

export default SideBar
