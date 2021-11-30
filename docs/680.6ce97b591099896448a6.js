"use strict";(self.webpackChunkpgc_paww_frontend=self.webpackChunkpgc_paww_frontend||[]).push([[680],{5680:(L,h,i)=>{i.r(h),i.d(h,{HomeModule:()=>I});var x=i(8239),m=i(1338),C=i(3757),d=i(1954),o=i(7716),c=i(5987),O=i(8791),v=i(2238),f=i(8583),M=i(8030),Z=i(5009),u=i(5618),b=i(1095),y=i(4732),T=i(5758),A=i(5162),S=i(2340),U=i(7298),w=i(1228),B=i(1436),N=i(5047);function z(n,l){if(1&n){const e=o.EpF();o.TgZ(0,"button",1),o.NdJ("click",function(){return o.CHM(e),o.oxw().clicked()}),o._uU(1," Upload\n"),o.qZA()}if(2&n){const e=o.oxw();o.Q6J("matTooltip",e.tooltipText)("matBadge",e.offlineObsCount)}}let J=(()=>{class n{constructor(e,t,a,s){this.api=e,this.dialog=t,this.connectionService=a,this.localStorageService=s,this.tooltipText=m.A.UploadTooltip,this.count=0,this.confNums=[],this.initialCount=0,this.offlineObs=[],this.offlineObsCount=0,this.uploadProcessed=new o.vpe,this.alluploadsProcessed=new o.vpe,this.isOffline=this.connectionService.isOffline,this.isOffline$=this.connectionService.isOffline$().subscribe(p=>{this.isOffline=p})}ngOnDestroy(){this.isOffline$.unsubscribe()}clicked(){this.dialog.open(C.W,{width:"35rem",data:{title:"Upload Observations",text:m.A.UploadTooltip,confirm:"Confirm Upload",cancel:"Cancel"},disableClose:!1}).afterClosed().subscribe(t=>{t&&this.offlineObs.forEach(a=>{this.processUpload(Object.assign({},a))})})}processUpload(e){const t=this.dialog.open(A.b,{width:"25rem",data:"Saving Observation.",disableClose:!0}),a=e.data,s=e.media;this.initialCount=this.offlineObsCount,this.api.createObservation(a).subscribe(p=>{const P=[],g=S.N.useTestApi?p.name:p.confirmationnumber;s.length>0?(s.forEach(r=>{P.push(this.api.createObservationMedia(Object.assign(Object.assign({},r),{ConfirmationNumber:g})))}),(0,T.D)(P).subscribe(r=>{console.log(r),t.close(),this.localStorageService.removeObservation(e.dbId),this.checkConfNums(g)},r=>{console.error(r),t.close()})):(t.close(),this.localStorageService.removeObservation(e.dbId),this.checkConfNums(g))},p=>{console.error(p),t.close()})}checkConfNums(e){!e||(this.confNums.push(e),this.uploadProcessed.emit(e),this.initialCount===this.confNums.length&&this.alluploadsProcessed.emit(this.confNums))}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(U.s),o.Y36(v.uw),o.Y36(w.M),o.Y36(O.n))},n.\u0275cmp=o.Xpm({type:n,selectors:[["app-upload-offline"]],inputs:{offlineObs:"offlineObs",offlineObsCount:"offlineObsCount"},outputs:{uploadProcessed:"uploadProcessed",alluploadsProcessed:"alluploadsProcessed"},decls:1,vars:1,consts:[["mat-raised-button","","color","warn","matBadgePosition","before","matBadgeColor","accent",3,"matTooltip","matBadge","click",4,"ngIf"],["mat-raised-button","","color","warn","matBadgePosition","before","matBadgeColor","accent",3,"matTooltip","matBadge","click"]],template:function(e,t){1&e&&o.YNc(0,z,2,2,"button",0),2&e&&o.Q6J("ngIf",t.offlineObsCount>0&&!t.isOffline)},directives:[f.O5,b.lW,B.gM,N.k],styles:[""]}),n})();const H=function(n){return{appSuperZoom:n}},F=[{path:"",component:(()=>{class n{constructor(e,t,a){this.router=e,this.localStorageService=t,this.dialog=a,this.appName=d.y.AppName,this.appAbbrev=d.y.AppAbbrev,this.isSuperZoom=!1,this.offlineObs=[],this.offlineObsCount=0}ngOnInit(){this.loadOfflineObservations(),this.onResize(null)}onResize(e){console.log("Resize",e),this.isSuperZoom=(window.outerWidth-10)/window.innerWidth*100>=300}createObservation(){this.router.navigate(["/app/observation"])}loadOfflineObservations(){var e=this;return(0,x.Z)(function*(){e.offlineObs=yield e.localStorageService.getObservations(),e.offlineObsCount=e.offlineObs.length})()}uploadProcessed(e){this.loadOfflineObservations()}alluploadsProcessed(e){let t="";e.forEach(s=>{t+=`<p><strong>${s}</strong></p>`}),this.dialog.open(C.W,{width:"35rem",data:{title:d.y.ConfirmationHeader,text:`<p>${m.A.BulkUploadConfirmation}<p><div>${t}</div>`,confirm:"Close"},disableClose:!1})}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(c.F0),o.Y36(O.n),o.Y36(v.uw))},n.\u0275cmp=o.Xpm({type:n,selectors:[["app-home"]],hostBindings:function(e,t){1&e&&o.NdJ("resize",function(s){return t.onResize(s)},!1,o.Jf7)},decls:16,vars:11,consts:[["id","appHomeContainer",3,"ngClass"],["id","appHomeImage"],["id","appHomepageContent"],[1,"appFillContainer"],["fxLayout","row","fxLayout.xs","column","fxLayout.sm","column","fxLayoutAlign","end center","fxLayoutAlign.xs","start center","fxLayoutAlign.sm","start center","fxFlex",""],["fxFlex","50","fxFlex.xs","100","fxFlex.sm","100","id","appHeroContainer"],["id","appHeroHeader",1,"appHomepageText"],["id","appHeroContent",1,"appHomepageText"],["mat-flat-button","","color","basic","id","appObservationButton","type","button",3,"click"],[1,"appOnHomepage",3,"ngClass"],["id","appUploadButtonContainer"],[3,"offlineObs","offlineObsCount","uploadProcessed","alluploadsProcessed"]],template:function(e,t){1&e&&(o.TgZ(0,"div",0),o._UZ(1,"app-header"),o._UZ(2,"div",1),o.TgZ(3,"div",2),o.TgZ(4,"div",3),o.TgZ(5,"div",4),o.TgZ(6,"div",5),o.TgZ(7,"h1",6),o._uU(8),o.qZA(),o.TgZ(9,"div",7),o._uU(10),o.qZA(),o.TgZ(11,"button",8),o.NdJ("click",function(){return t.createObservation()}),o._uU(12," Submit an Observation "),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o._UZ(13,"app-footer",9),o.qZA(),o.TgZ(14,"div",10),o.TgZ(15,"app-upload-offline",11),o.NdJ("uploadProcessed",function(s){return t.uploadProcessed(s)})("alluploadsProcessed",function(s){return t.alluploadsProcessed(s)}),o.qZA(),o.qZA()),2&e&&(o.Q6J("ngClass",o.VKq(7,H,t.isSuperZoom)),o.xp6(8),o.Oqu(t.appName),o.xp6(2),o.AsE(" ",t.appName," (",t.appAbbrev,") is lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis mattis aliquam faucibus purus in massa tempor. Quam quisque id diam vel quam. Cursus eget nunc scelerisque viverra mauris. Aliquam purus sit amet luctus venenatis. "),o.xp6(3),o.Q6J("ngClass",o.VKq(9,H,t.isSuperZoom)),o.xp6(2),o.Q6J("offlineObs",t.offlineObs)("offlineObsCount",t.offlineObsCount))},directives:[f.mk,M.oO,Z.G,u.xw,u.Wh,u.yH,b.lW,y.c,J],styles:["#appHomeContainer[_ngcontent-%COMP%]{background-color:#000;height:100vh;width:100vw;position:absolute;top:0;left:0}#appHomeImage[_ngcontent-%COMP%]{height:100vh;background-image:url(/pgc-paww-deploy/homepage.854289dfb81ca194e267.jpg);background-size:cover;background-position:center}#appHomepageContent[_ngcontent-%COMP%]{position:absolute;top:0;left:0;height:100vh;width:100vw}.appFillContainer[_ngcontent-%COMP%]{background:linear-gradient(270deg,#2a381e 0%,rgba(42,56,30,.25) 100%)}#appHeroContainer[_ngcontent-%COMP%]{margin-right:3rem}.appHomepageText[_ngcontent-%COMP%]{text-align:end;color:#fff}#appHeroHeader[_ngcontent-%COMP%]{font-size:2.75rem;font-weight:800;letter-spacing:0;line-height:3.75rem}#appHeroContent[_ngcontent-%COMP%]{font-size:1.125rem;font-weight:600;letter-spacing:0;line-height:1.875rem}#appObservationButton[_ngcontent-%COMP%]{float:right;color:#0b0603;font-size:1.438rem;font-weight:800;letter-spacing:0;line-height:2rem;margin-top:2rem;min-height:3.75rem;min-width:21.875rem}#appDisclaimer[_ngcontent-%COMP%]{position:absolute;bottom:2rem;left:2rem;color:#fff;margin-right:2rem}[_nghost-%COMP%]     app-header{position:fixed;width:100%;z-index:99}[_nghost-%COMP%]     app-footer.appOnHomepage{position:absolute;width:100%;z-index:99;bottom:0}#appUploadButtonContainer[_ngcontent-%COMP%]{position:absolute;left:2rem;bottom:5rem}@media only screen and (max-width: 480px){#appHeroContainer[_ngcontent-%COMP%]{margin-right:.5rem;margin-left:.5rem}.appHomepageText[_ngcontent-%COMP%]{text-align:center}#appObservationButton[_ngcontent-%COMP%]{float:none;margin:2rem auto auto;display:block}#appHomepageContent[_ngcontent-%COMP%]{padding-top:4.5rem}[_nghost-%COMP%]     app-footer.appOnHomepage{bottom:auto}#appHomeContainer.appSuperZoom[_ngcontent-%COMP%]{height:300vh}}@media only screen and (min-width: 321px){#appHomepageContent[_ngcontent-%COMP%]{padding-top:4.5rem}[_nghost-%COMP%]     app-footer.appOnHomepage{bottom:auto}[_nghost-%COMP%]     app-footer.appOnHomepage.appSuperZoom{bottom:0}}@media only screen and (min-width: 1224px){#appHomepageContent[_ngcontent-%COMP%]{padding-top:0}[_nghost-%COMP%]     app-footer.appOnHomepage{bottom:0}}@media only screen and (min-width: 1824px){#appHomepageContent[_ngcontent-%COMP%]{padding-top:0}[_nghost-%COMP%]     app-footer.appOnHomepage{bottom:0}}"]}),n})()}];let R=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[[c.Bz.forChild(F)],c.Bz]}),n})();var Y=i(4e3);let I=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[[f.ez,Y.m,R]]}),n})()}}]);