import { useState, useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts';
import { Box, Autocomplete, TextField, Typography } from '@mui/material';
import R4c3 from './layouts/43';
import R3c3 from './layouts/33'
import R2c2 from './layouts/22'
import './App.css'

//const symbolsToSelect = ['segs','rgwesge','rsgsegs','esgaewsg','esfgsg']




function App() {

  const [selectedLayout, setSelectedLayout] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  const layoutOptions = [
    { label: '4x3', value: 'R4c3' },
    { label: '3x3', value: 'R3c3' },
    { label: '2x2', value: 'R2c2' },
  ];
  

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        if (selectedValue === 'R4c3') {
          setSelectedLayout(<R4c3 />);
        } else if (selectedValue === 'R3c3') {
          setSelectedLayout(<R3c3 />);
        } else if (selectedValue === 'R2c2') {
          setSelectedLayout(<R2c2 />);
        } else {
          setSelectedLayout(null); // Reset layout if selectedValue is null or invalid
        }
      } catch (error) {
        console.error('Error fetching layout:', error);
      }
    };

    fetchLayout();
  }, [selectedValue]);

  return (
    <>
    <Box sx={{
      position: 'relative',
      width: '100vw',
      height: '10vh',
      top: '0vh',
      left: '0vw',
      background: 'linear-gradient(to right, #140F3D, #000,#040444)'

    }}>

      <Box sx={{
        position: 'absolute',
        width: '20%',
        height: '100%',
        left: '5%',
        overflow: 'hidden'
      }}>
      <img src="https://i.postimg.cc/TP1gJwyz/logo-white-02.png" alt="" width='40%' height='auto' />
      </Box>
      
      <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={layoutOptions}
          size='small'
          className='sl-symbol'
          getOptionLabel={(option) => option.label}
          onChange={(event, newValue) => setSelectedValue(newValue?.value)}
          sx={{
            margin: '1%',
            width: '25%' ,
            right: '5%',
            zIndex: 10,
            position: 'absolute',
            backgroundColor: 'white'
          }}
          renderInput={(params) => <TextField {...params} label="Select Layout" />}
        />

    </Box>

    <Box sx={{
      position: 'relative',
      width: '100vw',
      height: '90vh',
      top: '0vh',
      left: '0vw',
      background: 'black',
      margin: 0,
      padding: 0
    }}>
       {/*<R2c2 />*/}
      
        {selectedLayout}
  
    </Box>
     
    </>
    
  );
}

export default App
