import sqlite3
from sqlite3 import Error

sql_create_stocks_table_symb_primary = """CREATE TABLE IF NOT EXISTS StocksTable (
                                    TickerSymb text PRIMARY KEY,
                                    OpenPrice real NOT NULL,
                                    Volume integer NOT NULL,
                                    PERatio real NOT NULL
                                );"""

sql_create_stocks_table = """CREATE TABLE IF NOT EXISTS StocksTable (
                                    TickerSymb text NOT NULL,
                                    OpenPrice real NOT NULL,
                                    Volume integer NOT NULL,
                                    PERatio real NOT NULL
                                );"""

insertion_in_stocks =  ''' INSERT INTO StocksTable(TickerSymb,OpenPrice,Volume,PERatio)
              VALUES(?,?,?,?) '''


def stock_db_writer(rec):
    
        open("./StocksDatabase.db","w")
        database = r"./StocksDatabase.db"
        conn = sqlite3.connect(database)
        c = conn.cursor()
        c.execute(sql_create_stocks_table)
        c.executemany(insertion_in_stocks,rec)
        conn.commit()
        conn.close()

    
    


 