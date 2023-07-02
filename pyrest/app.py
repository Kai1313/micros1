from flask import Flask, jsonify, request, render_template
import mysql.connector

app = Flask(__name__)

@app.route('/')
def dashboard():
    return render_template('dashboard.html')

@app.route('/data', methods=['GET'])
def get_data():
    # Connect to the MySQL database
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='otsuka_pcode'
    )

    # Get the prepare parameter value from the request query string
    prepare_value = int(request.args.get('prepare', 0))

    # Create a cursor to interact with the database
    cursor = connection.cursor()

    # Execute a SELECT query to fetch data from the table
    query = "SELECT * FROM t_prn where WorkOrder = 'G22091999' and type = 1 and isUpload = 0 LIMIT %s"
    # cursor.execute(query)
    cursor.execute(query, (prepare_value,))

    # Fetch all the rows from the result set
    rows = cursor.fetchall()

    # Update the isUpload column to 1 for the fetched rows
    update_query = "UPDATE t_prn SET isUpload = 1 WHERE InternalID IN ({})".format(", ".join("%s" for _ in rows))
    ids = [row[0] for row in rows]
    cursor.execute(update_query, ids)

    # Commit the changes to the database
    connection.commit()

    # Close the cursor and connection
    cursor.close()
    connection.close()

    # Convert the data to a list of dictionaries
    data = [{'internalId': row[0], 'file': row[4], 'batch': row[3], 'sequence': row[5], 'workorder': row[13]} for row in rows]

    # Return the data as JSON response
    return jsonify(data)

@app.route('/show', methods=['GET'])
def show_data():
    # Connect to the MySQL database
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='otsuka_pcode'
    )

    # Create a cursor to interact with the database
    cursor = connection.cursor()

    # Execute a SELECT query to fetch data from the table
    query = "SELECT * FROM t_prn where WorkOrder = 'G22091999' and type = 1 and isUpload = 0"
    cursor.execute(query)

    # Fetch all the rows from the result set
    rows = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    connection.close()

    # Get the count of rows
    count = len(rows)

    # Return the count as JSON response
    return jsonify({'message': 'Data Available', 'count': count})

if __name__ == '__main__':
    app.run()