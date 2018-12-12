'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res, next) {
  // Ler o arquivo de texto com os dados salvos
  fs.readFile(path.join(__dirname, '..', 'data', 'texto.txt'), "utf8", function(err, data) {
    if (err) {
      // Renderizar a página sem o conteúdo
      console.log('alguma coisa aconteceu');
      res.render('index', { title: 'Editor de texto' });
    } else {
      // Renderizar a página
      console.log(data.toString());
      res.render('index', { title: 'Editor de texto', content: data.toString()});
    }
  });
});

// Serve para salvar os dados em um arquivo de texto
router.post('/salvar', function(req, res, next) {
  console.log(req.body.texto);

  fs.writeFile(path.join(__dirname, '..', 'data', 'texto.txt'), req.body.texto, function(err) {
    if (err) {
      console.error(err);
    }
  });

  res.redirect('/');
});

module.exports = router;
