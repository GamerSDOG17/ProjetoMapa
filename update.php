<?php

  header('Content-type: application/json');

  try{
  $pdo = new PDO('mysql:host=localhost; dbname=projetoMapa;', 'root', '');
  } catch (PDOException $erro) {
    echo "Erro: ".$erro->getMessage();
  }

  try{
    $stmt = $pdo->prepare('UPDATE mapa SET nome = :noup');
    $nameUpdateReceived = $_POST['nameUp'];
    $stmt->bindValue(':noup', $nameUpdateReceived);
    $stmt->execute();

  if($stmt->rowCount() >= 1){
    echo json_encode('Marcador teve seu nome alterado com sucesso!');
  }else{
    echo json_encode('Falha ao enviar dados!!!');
  }
}catch (PDOException $erro) {
  echo "Erro: ".$erro->getMessage();
}
?>