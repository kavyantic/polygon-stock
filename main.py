import time
from flask import render_template , redirect , url_for ,request
from flask import Flask,jsonify,Response
from flask_cors import CORS
from polygon import WebSocketClient, STOCKS_CLUSTER
from flask_socketio import SocketIO
from flask_socketio import send, emit


stock_list = ["AAPL", "FB", "SPCE", "GOOGL" ,"AMZN","MSFT", "LPL"]

stock_list_formatted = ["Q."+stock for stock in stock_list]


def my_custom_process_message(message):
    print("=>>>", message) 
    socketio.emit("stockdata",message,broadcast=True)



key = 'KC1G4pbxUTo8Udm2KFrQlh6xz3NPixAr'
my_client = WebSocketClient(STOCKS_CLUSTER, key, my_custom_process_message)
app = Flask(__name__)
socketio = SocketIO(app)
my_client.run_async()





@app.route('/home')
def home():
    return render_template('home.html',stock_list=stock_list)


@socketio.on('connect')
def handle_message():
    print("connceted to client")


@socketio.on('subscribe')
def handle_subscribe():
    my_client.run_async()
    my_client.subscribe(*stock_list_formatted)


@socketio.on('disconnectSock')
def handle_message(data):
    my_client.unsubscribe(*stock_list_formatted)
    my_client.close_connection()
    print("Conncetion to API closed.")
    emit('sentdata', "disconneted")
 

if __name__ == "__main__":
    CORS(app)
    app.config['TEMPLATES_AUTO_RELOAD'] = True    
    socketio.run(app, port=80)


 