//this function will be called when user submits response.
//this function will take reponse from  function argument, post it on facebook and put value of post id in response sheet
function onFormSubmit(e)
{
  
  var logDoc, db, url, access_token, params, HTTPResponse, response, lastrow, HTTPResponseRaw, row, range;
  
  logDoc = DocumentApp.openById('1mGL1sE8zhVAzN14U02dH37CKufjsUD7BaOkN8_08lvM');
  db = SpreadsheetApp.openById('1NtyLflmUXZ6G5hxz-tg2AsuGXplBIrVp56H9Kley2pk').getSheets()[0];
  
  lastrow = db.getLastRow();
  response = e.response.getItemResponses()[0].getResponse();
  response = modifyResponse(response);
  
  access_token = 'EAAMMu4sFswEBAI5q7bxT8WZB7BTGk9dXMsy6OnRN925Fz4Ww2mgwUdnzTfJ4zcNoLZBZB9wIrj9G9STfFTYTOXjd6XDf8eByAfdOi65R1KaIziTpnNjZApp7L1dse6HFtQoJbov2ghZCIGVQa30wSCKTIqONbptauZB4AzvjypywZDZD';
  url = 'https://graph.facebook.com/v2.7/me/feed?message='+encodeURIComponent('#'+(lastrow-1)+'\n'+response)+'&access_token='+access_token;
  params = {"method" : "post"};
  
//  make a post request to "url" and convert that to JSON object
  HTTPResponseRaw = UrlFetchApp.fetch(url, params);
  HTTPResponse = JSON.parse(HTTPResponseRaw.getContentText());

  logDoc.getBody().appendParagraph(lastrow);
//  Enter facebook ID of that post in spreadsheet
  range = db.getRange(lastrow,3,1,2);
  row = range.getValues();
  row[0][0]=HTTPResponse.id;
  row[0][1]=0;
  range.setValues(row);

}

function modifyResponse(res)
{
  var db,n,words,i,regex,l,w,logDoc;
  
  db = SpreadsheetApp.openById("1foURlTmwKh9M5A_6xdQemYRHq1RJuQn11ecWG5NYRGg").getSheets()[0];
  logDoc = DocumentApp.openById('1mGL1sE8zhVAzN14U02dH37CKufjsUD7BaOkN8_08lvM');
  n = db.getLastRow();
  words = db.getRange(1, 1, n,1).getValues();
  for(i=0;i<n;i++)
  {
    w=words[i][0];
    regex=new RegExp(w,"ig");
    l=w.length;
    res = res.replace(regex,w[0]+(l-2)+".*"+w[l-1]);
  }
//  logDoc.getBody().appendParagraph(res);
  return res;
}


//a trigger that will get access token automatically or atleast make a notification that your access token is going to expire
//report a confession and delete that confession
