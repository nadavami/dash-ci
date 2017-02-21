﻿
namespace DashCI.Widgets.GitlabIssues {

    export class GitlabIssuesConfigController implements ng.IController {
        public static $inject = ["$mdDialog", "gitlabResources", "colors", "config"];
        constructor(
            private $mdDialog: ng.material.IDialogService,
            public gitlabResources: () => Resources.Gitlab.IGitlabResource,
            public colors: Models.ICodeDescription[],
            public vm: IGitlabIssuesData
        ) { 
            this.init();
        }

        private init() {
            var res = this.gitlabResources();
            if (!res)
                return;

            res.project_list().$promise
                .then((result: Resources.Gitlab.IProject[]) => {
                    this.projects = result;
                })
                .catch((reason) => {
                    console.error(reason);
                    this.projects = [];
                });
        }

        public projects: Resources.Gitlab.IProject[];



        //public cancel() {
        //    this.$mdDialog.cancel();
        //}

        public ok() {
            this.$mdDialog.hide(true);
        }
    }
}