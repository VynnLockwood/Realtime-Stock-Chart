import pandas as pd
from flask import jsonify, Flask, render_template
from flask_cors import CORS
import mysql.connector
import yfinance as yf
import datetime

app = Flask(__name__)

CORS(app)

yahoo_symbols_list = [
    "AAPL", "MSFT", "AMZN", "GOOGL", "FB", "TSLA", "NFLX", "NVDA", "KO", "WMT",
    "PG", "JNJ", "V", "MA", "BRK.A", "BRK.B", "JPM", "BAC", "PFE", "XOM"
]

AAPL = yf.Ticker(yahoo_symbols_list[0])

AAPL = AAPL.history(period='1d', start='2010-12-11', end='2024-12-11')

AAPL = pd.DataFrame(AAPL)

AAPL.reset_index(inplace=True)

candleData = AAPL[['Date','Open','High','Low','Close']]

candleData['Date'] = candleData['Date'].dt.strftime('%Y-%m-%d')

print(AAPL)
print(candleData)

def phaseCSV(df):
    """
    Convert DataFrame to a list of dictionaries with "time" and "value" labels.
    
    Parameters:
        df (pandas.DataFrame): DataFrame containing "Date" and "Close" columns.
    
    Returns:
        list: List of dictionaries representing objects with "time" and "value" labels.
    """
    # Filter out rows with NaN values in the "Close" column
    df = df.dropna(subset=['Close'])
    
    objects = []
    for index, row in df.iterrows():
        #obj = {"time": row["Date"], "value": row["Close"]}
        obj = {"time": row["Date"], "open": row["Open"],"high": row["High"],"low": row["Low"],"close": row["Close"]}
        objects.append(obj)
    return objects

@app.route('/')
def hello():
    return 'chart.html'

@app.route('/api/data/candle')
def get_data():
    # Call the dataframe_to_objects function with df_subset (assuming df_subset is defined globally)
    data_list = phaseCSV(candleData)
    
    #data_list = candleData.to_json()
    return jsonify(data_list)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port='5001')
