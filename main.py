from flask import Flask, render_template, request
import model
import os


app = Flask(__name__)

@app.route("/")
def main_page():
    return render_template('main.html')

@app.route("/registro", methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        #recebe dados do formulario
        nome_pet = request.form['nomeAnimal']
        especie = request.form['especieAnimal']
        raca = request.form['racaAnimal']
        foto = request.files['fotoAnimal']
        nome_dono = request.form['nomeDono']
        contato = request.form['contatoDono']
        email = request.form['emailDono']

        #define a variavel photo path em none se o user nao adicionar foto
        foto_path = None
        try:
            if foto and foto.filename != '':
                foto_path = f"temp_{foto.filename}"   # Caminho temporário
                foto.save(foto_path)
            

            model.adicionar_dados(nome_pet, especie, raca, nome_dono, contato, email, foto_path)
            return "<h2>Dados cadastrados com sucesso!<h2>"
        #apaga a mensagem depois de enviar
        finally:    
            if foto_path and os.path.exists(foto_path):
                os.remove(foto_path)
        

    else:
        return render_template('cadastro.html')


@app.route('/animais_cadastrados')
def animais_cadastrados():
    return render_template('mostrar_animais.html')

@app.route('/HowToUse')
def howtouse():
    return render_template('howtouse.html')




if __name__ == '__main__':
    app.run(debug=True)