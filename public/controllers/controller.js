var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

var refresh = function(){ //cria função refresh

    $http.get('/listalivro').success(function(response) {
        console.log("I got the data I request");
        $scope.listalivro = response;
        $scope.livro = "";
    });
}

refresh(); //atualiza a lista toda vez que for atualizado

    $scope.cadLivro = function() {
        console.log($scope.livro);
        $http.post('/listalivro', $scope.livro).success(function(response) {
            console.log(response);
            refresh(); //atualiza a lista toda vez que for atualizado
        });
    };

    $scope.retirar = function(id){
        console.log(id);
        $http.delete('/listalivro/' + id).success(function(response) {
            refresh();
        });
    };

    $scope.editar = function(id){
        console.log(id);
        $http.get('/listalivro/' + id).success(function(response){
            $scope.livro = response; // atribui valores aos inputs
        });
    };

    $scope.atualizarLivro = function (){
        console.log($scope.livro._id);
        $http.put('/listalivro/' + $scope.livro._id, $scope.livro).success(function(response){
            refresh();
        });
    };

    $scope.limparLivro = function (){
        $scope.livro = "";
    }

}]);