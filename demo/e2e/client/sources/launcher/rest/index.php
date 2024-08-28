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

function getGroup($id) {
    if ($id == "all") {
        $arr = array();
        for ($i = 1; $i <= 30; $i++) {
            array_push($arr, array(
                "id" => "app" . $i,
                "label" => "Application " . $i
            ));
        }
        return array(
            "id" => "all",
            "label" => "All",
            "apps" => $arr
        );
    }
    else if ($id == "group1") {
        return array(
            "id" => "group1",
            "label" => "Group 1",
            "apps" => array(
                array(
                    "id" => "app1",
                    "label" => "Application 1",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => "true"
                ),
                array(
                    "id" => "app3",
                    "label" => "Application 3",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
                ),
                array(
                    "id" => "app6",
                    "label" => "Application 6",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
                ),
                array(
                    "id" => "app13",
                    "label" => "Application 13",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
                ),
                array(
                    "id" => "app18",
                    "label" => "Application 18",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
                ),
                array(
                    "id" => "app23",
                    "label" => "Application 23",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
                ),
                array(
                    "id" => "app26",
                    "label" => "Application 26",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
                ),
                array(
                    "id" => "app28",
                    "label" => "Application 28",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => "true"
                )
            )
        );
    } else if ($id == "group2") {
        return array(
            "id" => "group2",
            "label" => "Group 2",
            "apps" => array(
               array(
                   "id" => "app2",
                   "label" => "Application 2",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
               ),
               array(
                   "id" => "app4",
                   "label" => "Application 4",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => "true"
               ),
               array(
                   "id" => "app15",
                   "label" => "Application 5",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
               ),
               array(
                   "id" => "app18",
                   "label" => "Application 8",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
               ),
               array(
                   "id" => "app10",
                   "label" => "Application 10",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
               )
            )
        );
    } else if ($id == "group3") {
        return array(
           "id" => "group3",
           "label" => "Group 3",
           "apps" => array(
               array(
                   "id" => "app25",
                   "label" => "Application 25",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => "true"
               ),
               array(
                   "id" => "app31",
                   "label" => "Application 31",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
               )
           )
        );
    } else if ($id == "favorites") {
        return array(
            "id" => "favorites",
            "label" => "Favorites",
            "apps" => array(
                array(
                    "id" => "app1",
                    "label" => "Application 1",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => "true"
                ),
                array(
                    "id" => "app4",
                    "label" => "Application 4",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => "true"
                ),
                array(
                    "id" => "app25",
                    "label" => "Application 25",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => "true"
                ),
                array(
                    "id" => "app28",
                    "label" => "Application 28",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => true
                )
            )
        );
    }
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

$app->get('/ui/settings/apps/launcher/widgets/launcher', function () {
    echo json_encode(array(
        "id" => "launcher",
        "favorites_group" => getGroup("favorites"),
        "favorites_ids" => array("app1", "app4", "app25", "app28")
    ));
});

$app->get('/ui/settings/favorites', function () {
    echo json_encode(array(
        "id" => "favorites",
        "favorites" => array("app1", "app4", "app25", "app28")
    ));
});

$app->put('/ui/settings/favorites', function () {
    echo json_encode(array());
});

$app->get('/groups', function () {
    echo json_encode(array(
        getGroup("group1"),
        getGroup("group2"),
        getGroup("group3")
    ));
});

$app->get('/groups/:id', function($id) {
    echo json_encode(getGroup($id));
});

$app->get('/groups/:id/apps', function($id) {
    $group = getGroup($id);
    echo json_encode($group["apps"]);
});


$app->get('/apps', function () {
    $arr = array();
    for ($i = 1; $i < 35; $i++){
        $fav = "false";
        if ($i == 1 || $i == 4 || $i == 25 || $i == 28) {
            $fav = true;
        }
        array_push($arr, array("id" => "app".$i, "label" => "Application ".$i, "favorite" => $fav));
    }
    echo json_encode($arr);
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
