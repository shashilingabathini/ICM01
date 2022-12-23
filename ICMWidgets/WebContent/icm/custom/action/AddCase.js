define([
    "dojo/_base/declare",
    "icm/action/Action",
    "dojo/_base/lang",
    "dojo/_base/array",
    "icm/util/Coordination"
],
function(declare,Action,lang,array,Coordination) {

    return declare("icm.custom.action.AddCase" , [Action] , {
        solution : null,
        caseType : null,

        isEnabled: function(repository, listType, items, teamspace, resultSet) {
            console.log('AddCase isEnabled is invoked');
            return true;
        },

        execute : function() {
            console.log('execute function is invoked');
            window.addCaseAction  = this; // for more fine debug levels
            this.solution = this.propertiesValue.solution;
            this.caseType = this.propertiesValue.caseType;
            // get all the solutions and check
            ecm.model.desktop.retrieveSolutions(lang.hitch(this,_solutionsRetrieved(solutions)));
        },

        _solutionsRetrieved : function(solutions) {
            console.log('_solutionsRetrieved function is invoked');
            array.forEach(solutions, lang.hitch(this,function(solution) {
                console.dir(solution);
                if(this.solution == solution.id) {
                      this.solution = solution;
                      this.solution.retrieveCaseType(this.caseType,lang.hitch(this,_caseRetrieved(caseType)));
                }
            }))
        },

        _caseRetrieved : function(caseType) {
            console.log('_caseRetrieved function is invoked');
            if(caseType) {
              // create a new pending editable case
              this.solution.createNewCaseEditable(caseType,lang.hitch(this,function(pendingEditableCase) {
                this.broadcastEvent("icm.AddCase" , {
                    "caseType" : caseType,
                    "caseEditable" : pendingEditableCase,
                    "coordination" : new Coordination()
                })
              }));
            }
        }


    });

});