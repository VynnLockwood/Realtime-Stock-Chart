import { useState, useEffect, useRef } from 'react'

import { createChart } from 'lightweight-charts';
import { Box, Autocomplete, TextField } from '@mui/material';




//const symbolsToSelect = ['segs','rgwesge','rsgsegs','esgaewsg','esfgsg']




function App() {
  
  const autocompleteRef = useRef(null); // Create a ref for Autocomplete
  
  const  [symbols, setSymbols] = useState(null);
  const [symbolsToSelect, setSymbolsToSelect] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [selectedSymbol2, setSelectedSymbol2] = useState(null);
  const [selectedSymbol3, setSelectedSymbol3] = useState(null);
  const [selectedSymbol4, setSelectedSymbol4] = useState(null);


  const [layout , SetLayout] = useState(null);
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [data4, setData4] = useState(null);
  

  const [flow_acc, setFlow_acc] = useState(null);
  const [flow_acc2, setFlow_acc2] = useState(null);
  const [flow_acc3, setFlow_acc3] = useState(null);
  const [flow_acc4, setFlow_acc4] = useState(null);
  

  const chartContainerRef = useRef(null);
  const chartContainerRef2 = useRef(null);
  const chartContainerRef3 = useRef(null);
  const chartContainerRef4 = useRef(null);
  

  const updateInterval = useRef(null);
  const chartRef = useRef(null);




  useEffect(() => {
    const fetchSymbol = async () => {
      try {
        const response = await fetch('http://172.18.1.65:5000/all_sym');
        const jsonData = await response.json();
        const symbolsData = jsonData.symbols
  
        setSymbolsToSelect(symbolsData)
        //console.log(symbolsToSelect)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSymbol();
  }, []);

  //fetch data 1
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://172.18.1.65:5000/realtime?symbol=${selectedSymbol}`);
            const jsonData = await response.json();

            if (!Array.isArray(jsonData)) {
                throw new Error('Response data is not an array');
            }

            const extractedData = jsonData.map(item => {
                const date = new Date(item.date); // Convert date string to Date object
                // Adjust the time to Thailand timezone
                date.setHours(date.getHours() + 7); // Assuming Thailand is GMT+7
                return {
                    time: date.getTime() / 1000,
                    value: item.close,
                };
            });
            setData(extractedData);

            const extractedAcc = jsonData.map(item => {
                const date = new Date(item.date); // Convert date string to Date object
                // Adjust the time to Thailand timezone
                date.setHours(date.getHours() + 7); // Assuming Thailand is GMT+7
                return {
                    time: date.getTime() / 1000,
                    value: item.flow_accum,
                };
            });
            setFlow_acc(extractedAcc);
        } catch (error) {
            console.error('Error fetching or processing data:', error);
        }
    };

    // Fetch data initially
    fetchData();

    // Start a timer to fetch data every second
    const intervalId = setInterval(fetchData, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
}, [selectedSymbol]);



  //fetch data 2
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await fetch(`http://172.18.1.65:5000/realtime?symbol=${selectedSymbol2}`);
        const jsonData = await response.json();
        
        if (!Array.isArray(jsonData)) {
          throw new Error('Response data is not an array');
        }
    
        const extractedData = jsonData.map(item => {
          const date = new Date(item.date); // Convert date string to Date object
          // Adjust the time to Thailand timezone
          date.setHours(date.getHours() + 7); // Assuming Thailand is GMT+7
          return {
              time: date.getTime() / 1000,
              value: item.close,
          };
      });
      setData2(extractedData);

      const extractedAcc = jsonData.map(item => {
          const date = new Date(item.date); // Convert date string to Date object
          // Adjust the time to Thailand timezone
          date.setHours(date.getHours() + 7); // Assuming Thailand is GMT+7
          return {
              time: date.getTime() / 1000,
              value: item.flow_accum,
          };
      });
      setFlow_acc2(extractedAcc);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    // Fetch data initially
    fetchData2();

    // Start a timer to fetch data every second
    const intervalId = setInterval(fetchData2, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [selectedSymbol2]);

  //fetch data 3
  useEffect(() => {
    const fetchData3 = async () => {
      try {
        const response = await fetch(`http://172.18.1.65:5000/realtime?symbol=${selectedSymbol3}`);
        const jsonData = await response.json();
        
        if (!Array.isArray(jsonData)) {
          throw new Error('Response data is not an array');
        }
    
        const extractedData = jsonData.map(item => {
          const date = new Date(item.date); // Convert date string to Date object
          // Adjust the time to Thailand timezone
          date.setHours(date.getHours() + 7); // Assuming Thailand is GMT+7
          return {
              time: date.getTime() / 1000,
              value: item.close,
          };
      });
      setData3(extractedData);

      const extractedAcc = jsonData.map(item => {
          const date = new Date(item.date); // Convert date string to Date object
          // Adjust the time to Thailand timezone
          date.setHours(date.getHours() + 7); // Assuming Thailand is GMT+7
          return {
              time: date.getTime() / 1000,
              value: item.flow_accum,
          };
      });
      setFlow_acc3(extractedAcc);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    // Fetch data initially
    fetchData3();

    // Start a timer to fetch data every second
    const intervalId = setInterval(fetchData3, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [selectedSymbol3]);

  //fetch data 4
  useEffect(() => {
    const fetchData4 = async () => {
      try {
        const response = await fetch(`http://172.18.1.65:5000/realtime?symbol=${selectedSymbol4}`);
        const jsonData = await response.json();
        
        if (!Array.isArray(jsonData)) {
          throw new Error('Response data is not an array');
        }
    
        const extractedData = jsonData.map(item => {
          const date = new Date(item.date); // Convert date string to Date object
          // Adjust the time to Thailand timezone
          date.setHours(date.getHours() + 7); // Assuming Thailand is GMT+7
          return {
              time: date.getTime() / 1000,
              value: item.close,
          };
          });
          setData4(extractedData);

          const extractedAcc = jsonData.map(item => {
              const date = new Date(item.date); // Convert date string to Date object
              // Adjust the time to Thailand timezone
              date.setHours(date.getHours() + 7); // Assuming Thailand is GMT+7
              return {
                  time: date.getTime() / 1000,
                  value: item.flow_accum,
              };
          });
          setFlow_acc4(extractedAcc);
          } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    // Fetch data initially
    fetchData4();

    // Start a timer to fetch data every second
    const intervalId = setInterval(fetchData4, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [selectedSymbol4]);





  //chart1
 //chart1
 useEffect(() => {
  if (data && chartContainerRef.current && selectedSymbol) {
      let chart = chartContainerRef.current.chart;

      // Remove the old chart
      if (chart) {
          chart.remove();
      }

      // Create a new chart
      chart = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
          timeScale: {
              timeVisible: true,
              secondsVisible: true
          },
          rightPriceScale: {
            visible: true,
          },
          leftPriceScale: {
            visible: true,
          },
      });
      
      // Apply layout options
      chart.applyOptions({
          priceScale: {
            position: 'left'
          },
          priceScale2: {
              position: 'right'
          },
          priceFormat: {
            type: 'custom',
            minMove: 0.02,
            formatter: price => '$' + price.toFixed(2),
          },
          localization: {
            locale: 'th-TH',
          },
      });

      chartContainerRef.current.chart = chart;

      let lineSeries = chart.addLineSeries({
          color: 'black',
          priceScaleId: 'left'
      });
      chartContainerRef.current.lineSeries = lineSeries;

      lineSeries.setData(data);

      // Add a second line series
      let lineSeries2 = chart.addLineSeries({
          color: 'blue',
          priceScaleId: 'right',
          priceFormat: {
            type: 'custom',
            minMove: 0.00000001,
            formatter: price => {
              const absPrice = Math.abs(price); // Get the absolute value
          
              if (absPrice >= 1000000000) {
                return (price / 1000000000).toFixed(3) + 'B'; // Convert to millions with sign
              } else if (absPrice >= 1000000) {
                return (price / 1000000).toFixed(1) + 'M'; // Convert to thousands with sign
              } else if (absPrice >= 100000) {
                return (price / 100000).toFixed(1) + 'K'; // Convert to thousands with sign
              } else if (absPrice >= 10000) {
                return (price / 10000).toFixed(2) + 'K'; // Convert to thousands with sign
              } else if (absPrice >= 1000) {
                return (price / 1000).toFixed(3) + 'K'; // Convert to thousands with sign
              } else {
                return price.toFixed(0); // No conversion needed, add sign
              }
            },
          },
      });
      chartContainerRef.current.lineSeries2 = lineSeries2;

      // Assuming you have another dataset called flow_acc
      lineSeries2.setData(flow_acc);
  }
}, [data, flow_acc, selectedSymbol]);


  //chart2
  useEffect(() => {
    if (data2 && chartContainerRef2.current) {
        let chart = chartContainerRef2.current.chart;

        if (!chart) {
            chart = createChart(chartContainerRef2.current, {
                width: chartContainerRef2.current.clientWidth,
                height: chartContainerRef2.current.clientHeight,
                timeScale: {
                    timeVisible: true,
                    secondsVisible: true
                },
                rightPriceScale: {
                  visible: true,
                  
                },
                leftPriceScale: {
                  visible: true,
                },
                
          
            });
         
            // Apply layout options
            chart.applyOptions({
                priceScale: {
                  position: 'left'
                },
                priceScale2: {
                    position: 'right'
                },
                priceFormat: {
                  type: 'custom',
                  minMove: 0.02,
                  formatter: price => '$' + price.toFixed(2),
                },
                localization: {
                  locale: 'th-TH',
                },

            });
            chartContainerRef2.current.chart = chart;
        }

        let lineSeries = chartContainerRef2.current.lineSeries;

        if (!lineSeries) {
            lineSeries = chart.addLineSeries({
                color: 'black',
                priceScaleId: 'left'
            });
            chartContainerRef2.current.lineSeries = lineSeries;
        }

        lineSeries.setData(data2);

        // Add a second line series
        let lineSeries2 = chartContainerRef2.current.lineSeries2;

        if (!lineSeries2) {
            lineSeries2 = chart.addLineSeries({
                color: 'blue',
                priceScaleId: 'right',
                priceFormat: {
                  type: 'custom',
                  minMove: 0.00000001,
                  formatter: price => {
                    const absPrice = Math.abs(price); // Get the absolute value
                
                    if (absPrice >= 1000000000) {
                      return (price / 1000000000).toFixed(3) + 'B'; // Convert to millions with sign
                    } else if (absPrice >= 1000000) {
                      return (price / 1000000).toFixed(1) + 'M'; // Convert to thousands with sign
                    } else if (absPrice >= 100000) {
                      return (price / 100000).toFixed(1) + 'K'; // Convert to thousands with sign
                    } else if (absPrice >= 10000) {
                      return (price / 10000).toFixed(2) + 'K'; // Convert to thousands with sign
                    } else if (absPrice >= 1000) {
                      return (price / 1000).toFixed(3) + 'K'; // Convert to thousands with sign
                    } else {
                      return price.toFixed(0); // No conversion needed, add sign
                    }
                  },
                },
                
            });
            chartContainerRef2.current.lineSeries2 = lineSeries2;
        }

        // Assuming you have another dataset called flow_acc
        lineSeries2.setData(flow_acc2);
    }
}, [data2, flow_acc2]);


  //chart3
  useEffect(() => {
    if (data3 && chartContainerRef3.current) {
        let chart = chartContainerRef3.current.chart;

        if (!chart) {
            chart = createChart(chartContainerRef3.current, {
                width: chartContainerRef3.current.clientWidth,
                height: chartContainerRef3.current.clientHeight,
                timeScale: {
                    timeVisible: true,
                    secondsVisible: true
                },
                rightPriceScale: {
                  visible: true,
                  
                },
                leftPriceScale: {
                  visible: true,
                },
                
          
            });
         
            // Apply layout options
            chart.applyOptions({
                priceScale: {
                  position: 'left'
                },
                priceScale2: {
                    position: 'right'
                },
                priceFormat: {
                  type: 'custom',
                  minMove: 0.02,
                  formatter: price => '$' + price.toFixed(2),
                },
                localization: {
                  locale: 'th-TH',
                },

            });
            chartContainerRef3.current.chart = chart;
        }

        let lineSeries = chartContainerRef3.current.lineSeries;

        if (!lineSeries) {
            lineSeries = chart.addLineSeries({
                color: 'black',
                priceScaleId: 'left'
            });
            chartContainerRef3.current.lineSeries = lineSeries;
        }

        lineSeries.setData(data3);

        // Add a second line series
        let lineSeries2 = chartContainerRef3.current.lineSeries2;

        if (!lineSeries2) {
            lineSeries2 = chart.addLineSeries({
                color: 'blue',
                priceScaleId: 'right',
                priceFormat: {
                  type: 'custom',
                  minMove: 0.00000001,
                  formatter: price => {
                    const absPrice = Math.abs(price); // Get the absolute value
                
                    if (absPrice >= 1000000000) {
                      return (price / 1000000000).toFixed(3) + 'B'; // Convert to millions with sign
                    } else if (absPrice >= 1000000) {
                      return (price / 1000000).toFixed(1) + 'M'; // Convert to thousands with sign
                    } else if (absPrice >= 100000) {
                      return (price / 100000).toFixed(1) + 'K'; // Convert to thousands with sign
                    } else if (absPrice >= 10000) {
                      return (price / 10000).toFixed(2) + 'K'; // Convert to thousands with sign
                    } else if (absPrice >= 1000) {
                      return (price / 1000).toFixed(3) + 'K'; // Convert to thousands with sign
                    } else {
                      return price.toFixed(0); // No conversion needed, add sign
                    }
                  },
                },
                
            });
            chartContainerRef3.current.lineSeries2 = lineSeries2;
        }

        // Assuming you have another dataset called flow_acc
        lineSeries2.setData(flow_acc3);
    }
}, [data3, flow_acc3]);


  //chart4
  useEffect(() => {
    if (data4 && chartContainerRef4.current) {
        let chart = chartContainerRef4.current.chart;

        if (!chart) {
            chart = createChart(chartContainerRef4.current, {
                width: chartContainerRef4.current.clientWidth,
                height: chartContainerRef4.current.clientHeight,
                timeScale: {
                    timeVisible: true,
                    secondsVisible: true
                },
                rightPriceScale: {
                  visible: true,
                  
                },
                leftPriceScale: {
                  visible: true,
                },
                
          
            });
         
            // Apply layout options
            chart.applyOptions({
                priceScale: {
                  position: 'left'
                },
                priceScale2: {
                    position: 'right'
                },
                
                localization: {
                  locale: 'th-TH',
                },


            });
            chartContainerRef4.current.chart = chart;
        }

        let lineSeries = chartContainerRef4.current.lineSeries;

        if (!lineSeries) {
            lineSeries = chart.addLineSeries({
                color: 'black',
                priceScaleId: 'left',
                
            });
            chartContainerRef4.current.lineSeries = lineSeries;
        }
        lineSeries.priceFormatter().format(1000) === '1K', 'Wrong format'
        lineSeries.setData(data4);

        // Add a second line series
        let lineSeries2 = chartContainerRef4.current.lineSeries2;

        if (!lineSeries2) {
            lineSeries2 = chart.addLineSeries({
                color: 'blue',
                priceScaleId: 'right',
                priceFormat: {
                  type: 'custom',
                  minMove: 0.00000001,
                  formatter: price => {
                    const absPrice = Math.abs(price); // Get the absolute value
                
                    if (absPrice >= 1000000000) {
                      return (price / 1000000000).toFixed(3) + 'B'; // Convert to millions with sign
                    } else if (absPrice >= 1000000) {
                      return (price / 1000000).toFixed(1) + 'M'; // Convert to thousands with sign
                    } else if (absPrice >= 100000) {
                      return (price / 100000).toFixed(1) + 'K'; // Convert to thousands with sign
                    } else if (absPrice >= 10000) {
                      return (price / 10000).toFixed(2) + 'K'; // Convert to thousands with sign
                    } else if (absPrice >= 1000) {
                      return (price / 1000).toFixed(3) + 'K'; // Convert to thousands with sign
                    } else {
                      return price.toFixed(0); // No conversion needed, add sign
                    }
                  },
                },
                
              
            });
            chartContainerRef4.current.lineSeries2 = lineSeries2;
        }

        // Assuming you have another dataset called flow_acc
        lineSeries2.setData(flow_acc4);
    }
}, [data4, flow_acc4]);


const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    // Get the value typed by the user
    const typedValue = event.target.value.trim();
    // Call setSelectedSymbol with the typed value
    setSelectedSymbol(typedValue);
    // Close the dropdown by selecting the first option programmatically
    if (autocompleteRef.current) {
      autocompleteRef.current.dispatchEvent(new Event('input', { bubbles: true }));
      autocompleteRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
};
  


  console.log("This is data : ", data)

  return (
    <>

<style>
    {`
      .container {
        position: relative;
        width: 100vw !important; /* Full width */
        height: 90vh !important; /* Full height */
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: flex-start; /* Adjust line spacing */
      
        background-color: black;
      }
      
      .chartBox {
        position: relative;
        /*
        width: calc(25vw - 5px);  For 4 columns on desktop 
        height: calc(33.3vh - 5px);  Adjust height as needed */
      
        width: calc(49.6vw - 5px);  
        height: calc(45vh - 5px) !important;
        
        margin: 2px;
        
        background-color: white; /* Or any color you want */
      }
          
      
    `}
   </style>
      <div id='main' className='container'>
     
        <div className='chartBox'>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={symbolsToSelect}
          size='small'
          className='sl-symbol'
          onChange={(event, newValue) => {
            setSelectedSymbol(newValue);
          }}
          onKeyDown={handleKeyDown}
          ref={autocompleteRef} 
          sx={{
            margin: '1%',
            width: '25%' ,
            height: '20px',
            zIndex: 10,
            position: 'absolute',
            left: '7%'
          }}
          renderInput={(params) => <TextField {...params} label="" />}
        />

          <div ref={chartContainerRef} style={{ width: '100%', height: '100%', position: 'relative', top: '0', left: '0', zIndex: 0 }} />

        </div>

        <div className='chartBox'>
            <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={symbolsToSelect}
          size='small'
          className='sl-symbol'
          onChange={(event, newValue) => {
            setSelectedSymbol2(newValue);
          }}
          sx={{
            margin: '1%',
            width: '25%' ,
            height: '20px',
            zIndex: 10,
            position: 'absolute',
            left: '7%'
          }}
          renderInput={(params) => <TextField {...params} label="" />}
        />

          <div ref={chartContainerRef2} style={{ width: '100%', height: '100%', position: 'relative', top: '0', left: '50', zIndex: 0 }} />

        </div>

        <div className='chartBox'>
            <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={symbolsToSelect}
          size='small'
          className='sl-symbol'
          onChange={(event, newValue) => {
            setSelectedSymbol3(newValue);
          }}
          sx={{
            margin: '1%',
            width: '25%' ,
            height: '20px',
            zIndex: 10,
            position: 'absolute',
            left: '7%'
          }}
          renderInput={(params) => <TextField {...params} label="" />}
        />

          <div ref={chartContainerRef3} style={{ width: '100%', height: '100%', position: 'relative', top: '0', left: '50', zIndex: 0 }} />

        </div>


       <div className='chartBox'>
       <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={symbolsToSelect}
          size='small'
          className='sl-symbol'
          onChange={(event, newValue) => {
            setSelectedSymbol(newValue);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              // Get the value typed by the user
              const typedValue = event.target.value.trim();
              // Call setSelectedSymbol with the typed value
              setSelectedSymbol(typedValue);
              // Blur the Autocomplete to close the dropdown
              if (autocompleteRef.current) {
                autocompleteRef.current.blur();
              }
            }
          }}
          ref={autocompleteRef} 
          sx={{
            margin: '1%',
            width: '25%' ,
            height: '20px',
            zIndex: 10,
            position: 'absolute',
            left: '7%'
          }}
          renderInput={(params) => <TextField {...params} label="" />}
        />

          <div ref={chartContainerRef4} style={{ width: '100%', height: '100%', position: 'relative', top: '0', left: '50', zIndex: 0 }} />

        </div>

      </div>

    </>
  );
}

export default App
