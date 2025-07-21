# Exame Técnico - Sensorville

Sejam bem-vindos, avaliadores!

No texto a seguir, explico um pouco mais sobre o que desenvolvi neste código durante estes oito dias e apresento tecnicamente como foram implementadas as funcionalidades do projeto.

---

## **Preparando o Ambiente**

A tecnologia principal utilizada para o desenvolvimento do projeto foi **Python**, com o auxílio da biblioteca **Flask** e **Requests**, rodando aplicações front-end com **HTML, CSS e JavaScript puro**.  

Todas as dependências estão listadas no arquivo **`requirements.txt`**, sendo possível instalar todas executando:

```bash
pip install -r requirements.txt
```

**Recomendo fortemente o uso de um ambiente virtual** (venv) para rodar a aplicação, evitando conflitos com bibliotecas pré-instaladas na máquina.

As demais tecnologias utilizadas, como o **Google Apps Script**, não necessitam de instalação prévia.

Para executar a aplicação, basta rodar o arquivo:

```bash
python main.py
```

> **Observação:** Durante o desenvolvimento utilizei a versão **Python 3.12**.

---

## **Back-End**

O back-end é composto principalmente por uma aplicação **Flask**, organizada em dois arquivos principais:  
- **`model.py`**: Responsável por enviar requisições do tipo **POST** para o Google Apps Script, que recebe e processa os dados.  
- **`index.py`**: Responsável pela navegação entre as rotas e pela captura dos dados do formulário, de forma semelhante a aplicações PHP.

Como o projeto não exigia uma camada de segurança robusta, **optei por realizar as validações de dados no front-end**, mantendo o back-end mais limpo e escalável.

---

### **Google Apps Script**

O **Google Apps Script** foi escolhido como solução para garantir maior escalabilidade, sem necessidade de autenticações complexas, além de possibilitar **integração nativa com o Google Drive e Google Sheets**, ferramentas utilizadas para armazenar e gerenciar as imagens dos pets cadastrados.

Principais funções do Apps Script:
- Atualizar automaticamente a planilha com os dados enviados pelo formulário.  
- Gerar links públicos para as imagens hospedadas no Google Drive.  
- Fornecer uma **API pública (GET e POST)** para que o front-end pudesse exibir os dados na página **"Animais Cadastrados"**.

O código atualizado do Apps Script está disponível no arquivo **`api.gs`**, contendo a lógica para manipulação da planilha e gerenciamento dos arquivos do Google Drive.

---

### **Principais funções do back-end:**
- Capturar os dados enviados pelo formulário (incluindo imagens).  
- Converter a imagem em **Base64** para facilitar a manipulação e envio.  
- Enviar os dados para o **Google Apps Script**, que:  
  - Insere os dados diretamente na planilha.  
  - Disponibiliza uma **API** para exibir os cadastros na interface de apresentação.  

---

## **Front-End**

O front-end deste projeto foi desenvolvido **100% com HTML, CSS e JavaScript puro**, sem uso de frameworks.  

### **Funções do front-end:**
- Realizar **validações de dados** diretamente no navegador.  
- Consumir os dados fornecidos pela **API do Google Apps Script**.  
- Renderizar dinamicamente os **cards** com as informações dos animais cadastrados.  

---

## **Links Úteis**
- **Planilha:**  
  [https://docs.google.com/spreadsheets/d/1PumUJUsa2waMPQ0sPsc3iP1ITgR5Fv4dnXbxcbF87u4/edit?gid=0#gid=0](https://docs.google.com/spreadsheets/d/1PumUJUsa2waMPQ0sPsc3iP1ITgR5Fv4dnXbxcbF87u4/edit?gid=0#gid=0)

- **Pasta do Google Drive:**  
  [https://drive.google.com/drive/folders/1H6PbE5gw-9c96_v8FuHy9omMZq0m7xfq?hl=pt-br](https://drive.google.com/drive/folders/1H6PbE5gw-9c96_v8FuHy9omMZq0m7xfq?hl=pt-br)

---

Qualquer dúvida, fico à disposição. 😉





