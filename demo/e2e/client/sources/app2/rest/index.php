<?php

header('Cache-Control: no-cache');

require 'Slim/Slim.php';

function getRow($id) {
    return array(
        "id"=>$id,
        "column1"=> substr(strtolower(base64_encode(rand())), 2, 4)." Cell 1".$id,
        "column2"=> rand(1111,9999)." Cell 2".$id,
        "column3"=> substr(md5(rand()), 0, 4)." Cell 3".$id
    );
}

function getColumn($id, $title, $width) {
    return array(
        "id" => $id,
        "title" => $title,
        "width" => $width
    );
}

function getColumns1() {
    return array(
        getColumn("column1", "Column 1", "20%"),
        getColumn("column2", "Column 2", "20%"),
        getColumn("column3", "Column 3", "")
    );
}
function getColumns2() {
    return array(
        getColumn("column3", "Column 3", "20%"),
        getColumn("column2", "Column 2", "")
    );
}

$app = new Slim();
$app->get('/messages', function () {
    $rows = array();
    for ($i = 0; $i < 8; $i++) {
        array_push($rows,getRow($i));
    }
    echo json_encode($rows);
});
$app->post('/messages', function () {
    $json = json_decode(file_get_contents('php://input'), true);
    $json['id'] = rand(1000, 100000);
    echo json_encode($json);
});
$app->delete('/messages/:id', function ($id) {
    echo json_encode(array());
});
$app->put('/messages/:id', function ($id) {
    echo json_encode(array());
});
$app->get('/ui/settings/apps/app1/widgets/table1', function () {
    $columns = array(
        "columns" => getColumns1()
    );
    echo json_encode($columns);
});
$app->get('/ui/settings/apps/app1/widgets/table1/columns', function () {
    $columns = getColumns1();
    echo json_encode($columns);
});
$app->put('/ui/settings/apps/app1/widgets/table1', function () {
    echo json_encode(array());
});
$app->put('/ui/settings/apps/app2/widgets/table1', function () {
    echo json_encode(array());
});
$app->get('/ui/settings/apps/app2/widgets/table1', function () {
    $columns = array(
        "columns" => getColumns2()
    );
    echo json_encode($columns);
});
$app->get('/ui/settings/apps/app2/widgets/table1/columns', function () {
    $columns = getColumns2();
    echo json_encode($columns);
});

$app->post('/login', function () {
    $data = array();
    $data['id'] = 'userId0';
    $data['name'] = 'UserName';
    echo json_encode($data);
});
$app->post('/logout', function () {
    echo json_encode(array());
});
$app->run();

?>
