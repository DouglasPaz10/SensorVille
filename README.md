# Exame Técnico - Sensorville

Sejam bem-vindos, avaliadores!

No texto a seguir, explico um pouco mais sobre o que desenvolvi neste código durante estes oito dias e apresento tecnicamente como foram implementadas as funcionalidades do projeto.

---

## **Preparando o Ambiente**

A tecnologia principal utilizada para o desenvolvimento do projeto foi **Python**, com o auxílio da biblioteca **Flask**, rodando aplicações front-end com **HTML, CSS e JavaScript puro**.  

Todas as dependências estão listadas no arquivo **`requirements.txt`**, sendo possível instalar todas executando:

```bash
pip install -r requirements.txt
```

**Recomendo fortemente o uso de um ambiente virtual** (venv) para rodar a aplicação, evitando conflitos com bibliotecas pré-instaladas na máquina.

As demais tecnologias utilizadas, como o **Google Apps Script**, não necessitam de instalação prévia.

---

## **Back-End**

O back-end é composto principalmente por uma aplicação **Flask**, com dois arquivos principais:  
- **`model.py`**: Responsável por enviar os dados ao Google Apps Script para inserção na planilha.  
- **`index.py`**: Responsável pela navegação e redirecionamento de rotas, semelhante ao funcionamento de aplicações em PHP.

Como o projeto não exigia uma camada de segurança robusta, **optei por realizar as validações de dados no front-end**, mantendo o back-end mais simples e escalável.

---

### **Google Apps Script**

O **Google Apps Script** foi escolhido como estratégia para desenvolver um código mais escalável, sem necessidade de autenticações complexas, além de oferecer **integração nativa com o Google Drive**, ferramenta utilizada para armazenar as imagens dos pets cadastrados.

O Apps Script foi responsável por:  
- Manter a planilha atualizada com os dados enviados pelo formulário.  
- Gerar links para as imagens hospedadas no Google Drive.  
- Fornecer uma **API pública (GET e POST)** para que o front-end pudesse exibir os dados na tela **"Animais Cadastrados"**.

O código atualizado presente no Apps Script está no arquivo **`api.gs`**, que contém a lógica para manipulação da planilha e gerenciamento dos arquivos do Google Drive.

---

### **Principais funções do back-end:**
- Capturar os dados enviados pelo formulário (incluindo imagens).  
- Converter a imagem em **Base64** para facilitar a manipulação e envio.  
- Enviar os dados para o **Google Apps Script**, que:  
  - Adiciona os dados diretamente na planilha.  
  - Disponibiliza uma **API** para exibir os cadastros na página de apresentação.  

---

## **Front-End**

O front-end deste projeto foi desenvolvido **100% com HTML, CSS e JavaScript puro**, sem uso de frameworks.  

### **Funções do front-end:**
- Realizar **validações de dados** diretamente no navegador.  
- Consumir os dados fornecidos pela **API do Google Apps Script**.  
- Renderizar dinamicamente os **cards** com as informações dos animais cadastrados.  

---





