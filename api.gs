//link do drive
const FOLDER_ID = "1H6PbE5gw-9c96_v8FuHy9omMZq0m7xfq";


const SHEET_NAME = 'Animais Cadastrados'; 


function doPost(e) {
  //tenta executar o codigo, se nao apresenta uma mensagem de erro.
  try {
    //recebe o post
    var data = JSON.parse(e.postData.contents);
    Logger.log("Recebido: " + JSON.stringify(data));

    //gera o link da imagem e add na minha pasta do drive.
    var imageUrl = "";
    if (data.image_b64) {
      var clean_b64 = data.image_b64.replace(/^data:[^,]+,/, "");
      var blob = Utilities.newBlob(Utilities.base64Decode(clean_b64), "image/jpeg", data.image_name);
      var folder = DriveApp.getFolderById(FOLDER_ID);
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
      imageUrl = "https://drive.google.com/thumbnail?id=" + file.getId() + "&sz=w800";

    }

  //add linha na tabela
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME); 
    sheet.appendRow([
      data.nome_pet ,
      data.especie , 
      data.raca ,
      imageUrl,
      data.nome_dono ,
      data.telefone ,
      data.email ,
      Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm")
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "ok", imageUrl: imageUrl }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("Erro: " + err.message);
    return ContentService.createTextOutput(JSON.stringify({ status: "erro", msg: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}



 //funçao de get
function doGet(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ error: `A aba com o nome '${SHEET_NAME}' não foi encontrada.` }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const range = sheet.getDataRange();
    const values = range.getValues();

    if (values.length === 0) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const headers = values[0];
    const data = [];

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = row[j];
      }
      data.push(obj);
    }

    // Para CORS, precisamos usar HtmlService e setar os cabeçalhos manualmente
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Erro no Apps Script:", error);
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}