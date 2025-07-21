import requests
import base64

#url da aplicação appscript
url = "https://script.google.com/macros/s/AKfycbzZdzwbKLwtWKJ4_oszP-5-m-q15FY-ceVGg-xHgjm2AiGC7FrKodXG1Y0KuOsuXjHG/exec"


#funçao que pega o link do appscript e da o post
def adicionar_dados(nome_pet, especie, raca, nome_dono, contato, email, foto=None):
    dados = {
        "nome_pet": nome_pet,
        "especie": especie,
        "raca": raca,
        "nome_dono": nome_dono,
        "telefone": contato,
        "email": email
    }
    if foto:  # Se 'foto' não for None
        with open(foto, "rb") as f:
            img_base64 = base64.b64encode(f.read()).decode('utf-8')
        dados["image_b64"] = img_base64
        dados["image_name"] = "foto_" + nome_pet + ".jpg"
    else:
        dados["image_b64"] = None
        dados["image_name"] = None

    resp = requests.post(url, json=dados)
    print("Status:", resp.status_code)
    print("Resposta:", resp.text)
