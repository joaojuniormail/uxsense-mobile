UXSense.factory('requestService', function ($rootScope, $state, $translate, $ionicPopup) {
  var error = function (data, callback) {
    console.log("requestService-error:", data.config.url, data);
    $rootScope.$broadcast('scroll.refreshComplete');
    var response = {
      message: "",
      response: data.data
    };
    if (data.status === -1) {
      response.message = $translate.instant('server-timeout');
    } else {
      response.message = $translate.instant('server-error' + data.status);
    }
    if (data.status === 401) {
      $rootScope.logoutApp(true, data.status);
      return;
    }
    if (callback.error) {
      callback.error(response);
    } else if (data.config.loading) {
      $ionicPopup.alert({
        title: $translate.instant('popupError'),
        template: response.message
      }).then(function (res) { });
    }
  };
  var success = function (data, callback) {
    console.log("requestService-success:", data.config.url, data);
    $rootScope.$broadcast('scroll.refreshComplete');
    if (data.status === 200) {
      var response = (data.data) ? data.data : {};
      callback.success(response);
    } else {
      error(data, callback);
    }
  };
  var service = {
    /*------------------------------------

    SESSION

    --------------------------------------*/
    login: function (_params, _option) {
      $rootScope.request("POST", "login", _params, true).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    signup: function (_params, _option) {
      $rootScope.request("POST", "signup", _params, true).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    lostPassword: function (_params, _option) {
      $rootScope.request("POST", "lost-password", _params, true).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    change: function (_params, _option) {
      $rootScope.request("POST", "client", _params, true).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    updateRegistration: function (_params, _option) {
      $rootScope.request("POST", "update-registration", _params, true).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    logout: function (_option) {
      $rootScope.request("GET", "logout", {}, true).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    /*------------------------------------

    GROUP

    --------------------------------------*/
    getGroups: function (_option) {
      $rootScope.request("GET", "group", {}, true).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    /*------------------------------------

    SUBGROUP

    --------------------------------------*/
    getSubgroupByGroup: function (_params, _option) {
      $rootScope.request("GET", "subgroup/" + _params.idGroup, {}, true).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    getSubgroup: function (_params, _option) {
      $rootScope.request("GET", "subgroup/" + _params.id, {
        subgroup: true
      }, true).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    /*------------------------------------

    TEAM

    --------------------------------------*/
    getTeamBySubgroup: function (_params, _option) {
      $rootScope.request("GET", "team/" + _params.idSubgroup, {
        subgroup: true
      }, true).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    getTeamByClient: function (_params, _option, loading) {
      $rootScope.request("GET", "team/" + _params.idClient, {
        client: true
      }, loading).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    getTeam: function (_params, _option) {
      $rootScope.request("GET", "team/" + _params.id, {
        team: true
      }, true).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    setTeamForClient: function (_params, _option, loading) {
      $rootScope.request("POST", "team-client", _params, loading).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    deleteTeamForClient: function (_params, _option) {
      $rootScope.request("DELETE", "team-client", _params, true).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    deleteTeam: function (_params, _option) {
      $rootScope.request("DELETE", "team/" + _params.id, {}, true).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    /*------------------------------------

    ANSWERS

    --------------------------------------*/
    getAnswers: function (_option, loading) {
      $rootScope.request("GET", "answer", {}, loading).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    setAnswer: function (_params, _option) {
      $rootScope.request("POST", "answer", _params, true).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },
    /*------------------------------------

    QUESTION

    --------------------------------------*/
    getQuestion: function (_option) {
      $rootScope.request("GET", "scheduler", {}, false).then(function (data) {
        success(data, _option);
      }, function (data) {
        error(data, _option);
      });
    },

  };
  return service;
});
