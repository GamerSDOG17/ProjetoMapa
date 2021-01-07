<?php

  header('Content-type: application/json');

  try{
  $pdo = new PDO('mysql:host=localhost; dbname=projetoMapa;', 'root', '');
  } catch (PDOException $erro) {
    echo "Erro: ".$erro->getMessage();
  }

  try{
  $stmt = $pdo->prepare('SELECT * FROM mapa');
  $stmt->execute();
    
  if($stmt->rowCount() >=1 ){
      echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
  }else{
      echo json_encode("Erro!");
  }
}catch (PDOException $erro) {
  echo "Erro: ".$erro->getMessage();
  }

?>