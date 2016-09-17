function onFSubmit(e) 
{
  var response, logDoc, responseSheet, n, row, access_token, url, params, range;
  
  response = parseInt(e.response.getItemResponses()[0].getResponse());
  
  logDoc = DocumentApp.openById('1mGL1sE8zhVAzN14U02dH37CKufjsUD7BaOkN8_08lvM');

  responseSheet = SpreadsheetApp.openById('1NtyLflmUXZ6G5hxz-tg2AsuGXplBIrVp56H9Kley2pk').getSheets()[0];
  ++response;
  
  if(response<=responseSheet.getLastRow())
  {
    range = responseSheet.getRange(response,3,1,2);
    row = range.getValues();

    if(++row[0][1])
    {
      access_token='AAMMu4sFswEBAI5q7bxT8WZB7BTGk9dXMsy6OnRN925Fz4Ww2mgwUdnzTfJ4zcNoLZBZB9wIrj9G9STfFTYTOXjd6XDf8eByAfdOi65R1KaIziTpnNjZApp7L1dse6HFtQoJbov2ghZCIGVQa30wSCKTIqONbptauZB4AzvjypywZDZD';
      url = 'https://graph.facebook.com/v2.7/'+ row[0][0] +'?access_token='+access_token;
      params = {'method':'delete'};
      logDoc.getBody().appendParagraph(url);
      logDoc.getBody().appendParagraph(response);
      UrlFetchApp.fetch(url, params);
    }
    range.setValues(row);
  }
  
}
