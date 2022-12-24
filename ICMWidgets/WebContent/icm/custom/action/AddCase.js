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
        canClosePage : false,
        isEnabled: function(repository, listType, items, teamspace, resultSet) {
            console.log('AddCase isEnabled is invoked');
            return true;
        },

        execute : function() {
            console.log('execute function is invoked');
            window.addCaseAction  = this; // for more fine debug levels
            this.solution = this.propertiesValue.solution;
            this.caseType = this.propertiesValue.caseType;
            this.canClosePage = this.propertiesValue.canClosePage;
			console.log(" Properties Solution Name "+this.solution);
			console.log(" Properties Case Type Name "+this.caseType);
			console.log(" Properties CanClosePage  "+this.canClosePage);
            // get all the solutions and check
            ecm.model.desktop.retrieveSolutions(lang.hitch(this,this._solutionsRetrieved));
        },

        _solutionsRetrieved : function(solutions) {
            console.log('_solutionsRetrieved function is invoked');
            console.dir(solutions)
            array.forEach(solutions, lang.hitch(this,function(solution) {
                //console.dir(solution);
                if(this.solution == solution.id) {
                      this.solution = solution;
                      this.solution.retrieveCaseType(this.caseType,lang.hitch(this,this._caseRetrieved));
                }
            }))
        },

        _caseRetrieved : function(caseType) {
            console.log('_caseRetrieved function is invoked');
            if(caseType) {
              // create a new pending editable case
              this.solution.createNewCaseEditable(caseType,lang.hitch(this,function(pendingEditableCase) {
              var casePage = this.getActionContext("CasePage");
              var coordination = this.getActionContext("Coordination");
              if(casePage && coordination) {
                    // check any unsaved data so that do not create a new case
                  coordination[0].step(this.icmBaseConst.BEFORECANCEL, lang.hitch(this,function(results, next, skip) {
                            console.log('checking all before cancellation');
                            next(); // let's move to next step
							pendingEditableCase.propertiesCollection =  casePage[0].propertiesCollection;
                            this.broadcastEvent("icm.AddCase" , {
                                "caseType" : caseType,
                                "caseEditable" : pendingEditableCase,
                                "coordination" : new Coordination()
                            });
                            setTimeout(lang.hitch(this,function() {
                                this.broadcastEvent("icm.ClosePage")
                            }) , 1000)
					 }),lang.hitch(this,function(errors, next, skip) {
                            console.dir(errors);
                            if(errors) {
                               this.showConfirmationDialog('InstructMessageUnSavedDialog','ConfirmationMessageUnSaveDialog',errors,next,skip);
                            }
                    })).start();
                 }
              }));
            }
        }
    });

});