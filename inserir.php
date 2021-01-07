<?php

  header('Content-type: application/json');

  try{
  $pdo = new PDO('mysql:host=localhost; dbname=projetoMapa;', 'root', '');
  } catch (PDOException $erro) {
    echo "Erro: ".$erro->getMessage();
  }

  try{
  $stmt = $pdo->prepare('INSERT INTO mapa (nome, latitude, longitude) VALUES(:no, :lat, :lng)');
  $nameReceived = $_POST['name'];
  $latitudeReceived = $_POST['latitude'];
  $longitudeReceived = $_POST['longitude'];
  $stmt->bindValue(':no', $nameReceived);
  $stmt->bindValue(':lat', $latitudeReceived);
  $stmt->bindValue(':lng', $longitudeReceived);
  $stmt->execute();

  if($stmt->rowCount() >= 1){
    echo json_encode('Inserção inserida com sucesso!');
  }else{
    echo json_encode('Falha ao enviar dados!');
  }
}catch (PDOException $erro) {
  echo "Erro: ".$erro->getMessage();
}
?>