var app = angular.module("medMod");

app.controller("contentController", function($scope, medFactory, $timeout, $location, sharedFactory) {

    $scope.pageClass = "med-page";

    $scope.personsPage = sharedFactory.passObject();

    medFactory.getMedListInfo($scope.personsPage.personid).then(function() {
        $scope.medicine = medFactory.updateMedList();
    });



    $scope.addMed = function(med, personsid) {
        medFactory.findRx(med.name).then(function() {
            med.rxnumber = medFactory.getNewRx();
            medFactory.addMedicine(med, personsid).then(function() {
                $scope.medicine = medFactory.updateMedList();
                $scope.message = 'The drug you are about to add may have some potential interactions with other drugs on your list. Always check with your doctor before starting a new medication.';
                $scope.showMessage = true;
                $timeout(function() {
                    $scope.showMessage = false;
                }, 10000);
            });

          $scope.med.name = "";
          $scope.med.dosage = "";
          $scope.med.time = "";
        });
    }

    $scope.deleteMed = function(medId, personid) {
        medFactory.deleteMedicine(medId, personid).then(function() {
            $scope.medicine = medFactory.updateMedList();
        });
    }

    $scope.updateMed = function(newMed, medId, personid) {
        medFactory.findRx(newMed.name).then(function() {
            newMed.rxnumber = medFactory.getNewRx();
            medFactory.updateMedicine(newMed, medId, personid).then(function() {
                $scope.medicine = medFactory.updateMedList();
            });
        });
    }

  //Auto-Complete Functionality Below
  $scope.complete = function(string) {
    $scope.hidethis = false;
    var output = [];
    if (string.length >= 2) {
      angular.forEach($scope.masterList, function(medString) {
        if(medString.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
          output.push(medString);
        }
      });
    }

    $scope.filterMedicine = output;
  };

  $scope.fillTextBox = function(string) {
    $scope.med.name = string;
    $scope.hidethis = true;
  };


  $scope.flipped = false;

  $scope.flip = function() {
    $scope.flipped = !$scope.flipped;
  };

});
