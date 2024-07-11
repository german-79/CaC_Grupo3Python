from flask import Flask, request, jsonify, render_template, redirect, url_for, session, flash
import os
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Crear la app y especificar la carpeta de plantillas
app = Flask(__name__, template_folder='../Front/templates')
app.secret_key = os.urandom(15)  # Clave aleatoria segura
CORS(app)  # Permitir CORS

# Configurar la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:R1657P*.@localhost:3306/mediqi_2024'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Definir la tabla Profesional
class Profesional(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    apellido = db.Column(db.String(50))
    matricula = db.Column(db.Integer)
    terapia = db.Column(db.String(50))
    imagen = db.Column(db.String(400))

    def __init__(self, nombre, apellido, matricula, terapia, imagen):
        self.nombre = nombre
        self.apellido = apellido
        self.matricula = matricula
        self.terapia = terapia
        self.imagen = imagen

# Crear la tabla al ejecutarse la app
with app.app_context():
    db.create_all()

# Ruta de inicio
@app.route("/")
def index():
    return 'App Web para registrar nombres de profesionales'

# Crear un registro en la tabla Profesional
@app.route("/registro", methods=['POST'])
def registro():
    data = request.json
    nuevo_registro = Profesional(
        nombre=data["nombre"],
        apellido=data["apellido"],
        matricula=data["matricula"],
        terapia=data["terapia"],
        imagen=data["imagen"]
    )
    db.session.add(nuevo_registro)
    db.session.commit()
    return "Solicitud de post recibida"

# Retornar todos los registros en un JSON
@app.route("/profesionales", methods=['GET'])
def profesionales():
    all_registros = Profesional.query.all()
    data_serializada = [
        {
            "id": obj.id,
            "nombre": obj.nombre,
            "apellido": obj.apellido,
            "matricula": obj.matricula,
            "terapia": obj.terapia,
            "imagen": obj.imagen
        } for obj in all_registros
    ]
    return jsonify(data_serializada)

# Modificar un registro
@app.route('/update/<int:id>', methods=['PUT'])
def update(id):
    profesional = Profesional.query.get(id)
    data = request.json
    profesional.nombre = data["nombre"]
    profesional.apellido = data['apellido']
    profesional.matricula = data['matricula']
    profesional.terapia = data['terapia']
    profesional.imagen = data['imagen']
    db.session.commit()
    data_serializada = {
        "id": profesional.id,
        "nombre": profesional.nombre,
        "apellido": profesional.apellido,
        "matricula": profesional.matricula,
        "terapia": profesional.terapia,
        "imagen": profesional.imagen
    }
    return jsonify(data_serializada)

# Borrar un registro
@app.route('/borrar/<int:id>', methods=['DELETE'])
def borrar(id):
    profesional = Profesional.query.get(id)
    db.session.delete(profesional)
    db.session.commit()
    data_serializada = {
        "id": profesional.id,
        "nombre": profesional.nombre,
        "apellido": profesional.apellido,
        "matricula": profesional.matricula,
        "terapia": profesional.terapia,
        "imagen": profesional.imagen
    }
    return jsonify(data_serializada)

# Usuarios de prueba (nombre de usuario: contraseña)
users = {
    'prueba1': '1234',
    'prueba2': '4321'
}

@app.route('/home')
def home():
    if 'username' in session:
        return render_template('../Front/index_intranet.html', username=session['username'])
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users and users[username] == password:
            session['username'] = username
            return redirect(url_for('home'))
        else:
            flash('Credenciales inválidas')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)

