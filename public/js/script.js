var elff = angular.module("elff", []);

elff.controller('postController', function($scope,$http) {
    //$scope.master = {firstName: "John", lastName: "Doe"};
    $scope.post = function(url) {
        var long_url = document.getElementById('longURL').value;
        console.log(long_url);
        $http.post("/getShortUrl", {'longURL': long_url})
                .success(function(data) {
                    $scope.longURL = data["shortUrl"];
                    console.log($scope.longURL);
                    //$scope.long_url = $scope.short_url;
                    //$scope.form.$setPristine();
                })
                .error(function(data) {
                    alert("Something went wrong. Try again!");
                });

    };

});


function posts(path, params, method) {
    console.log('post method called successfully');
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}


function test(){
  console.log("Works");
  alert("Works");
}
