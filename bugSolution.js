```javascript
import { Camera, BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);
  const cameraRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
        setScanned(true);
        setBarcodeData(data);
    }, 500); // Debounce delay in milliseconds 
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} onBarCodeScanned={handleBarCodeScanned} ref={cameraRef}>
      </Camera>
      {scanned && <Text>Barcode Data: {barcodeData}</Text>}
    </View>
  );
}

export default App;
```