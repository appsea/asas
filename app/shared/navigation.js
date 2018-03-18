"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frameModule = require("ui/frame");
function gotoResultPage(state) {
    frameModule.topmost().navigate({
        moduleName: 'shared/result/result-page',
        clearHistory: true,
        context: state,
        transition: {
            name: "fade"
        }
    });
}
exports.gotoResultPage = gotoResultPage;
function gotoEditPage(state) {
    frameModule.topmost().navigate({
        moduleName: 'question/edit-question',
        context: state,
        transition: {
            name: "fade"
        }
    });
}
exports.gotoEditPage = gotoEditPage;
function gotoQuestionMap(state) {
    frameModule.topmost().navigate({
        moduleName: 'question/map',
        context: state,
        transition: {
            name: "fade"
        }
    });
}
exports.gotoQuestionMap = gotoQuestionMap;
function toPage(path) {
    frameModule.topmost().navigate({
        moduleName: path,
        transition: {
            name: "fade"
        }
    });
}
exports.toPage = toPage;
function gotoDetailsPage(state) {
    frameModule.topmost().navigate({
        moduleName: 'shared/details/detailed-result',
        context: state,
        transition: {
            name: "fade"
        }
    });
}
exports.gotoDetailsPage = gotoDetailsPage;
function gotoLastPage() {
    frameModule.topmost().goBack();
}
exports.gotoLastPage = gotoLastPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5hdmlnYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0M7QUFHeEMsd0JBQStCLEtBQVk7SUFDdkMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUMzQixVQUFVLEVBQUUsMkJBQTJCO1FBQ3ZDLFlBQVksRUFBRSxJQUFJO1FBQ2xCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07U0FDZjtLQUNKLENBQUMsQ0FBQztBQUNQLENBQUM7QUFURCx3Q0FTQztBQUVELHNCQUE2QixLQUFZO0lBQ3JDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDM0IsVUFBVSxFQUFFLHdCQUF3QjtRQUNwQyxPQUFPLEVBQUUsS0FBSztRQUNkLFVBQVUsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNO1NBQ2Y7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBUkQsb0NBUUM7QUFFRCx5QkFBZ0MsS0FBWTtJQUN4QyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQzNCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07U0FDZjtLQUNKLENBQUMsQ0FBQztBQUNQLENBQUM7QUFSRCwwQ0FRQztBQUVELGdCQUF1QixJQUFZO0lBQy9CLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDM0IsVUFBVSxFQUFFLElBQUk7UUFDaEIsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07U0FDZjtLQUNKLENBQUMsQ0FBQztBQUNQLENBQUM7QUFQRCx3QkFPQztBQUVELHlCQUFnQyxLQUFZO0lBQ3hDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDM0IsVUFBVSxFQUFFLGdDQUFnQztRQUM1QyxPQUFPLEVBQUUsS0FBSztRQUNkLFVBQVUsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNO1NBQ2Y7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBUkQsMENBUUM7QUFFRDtJQUNJLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNuQyxDQUFDO0FBRkQsb0NBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcmFtZU1vZHVsZSBmcm9tICd1aS9mcmFtZSc7XHJcbmltcG9ydCB7U3RhdGV9IGZyb20gXCIuL3F1ZXN0aW9ucy5tb2RlbFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uXHRnb3RvUmVzdWx0UGFnZShzdGF0ZTogU3RhdGUpIHtcclxuICAgIGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5uYXZpZ2F0ZSh7XHJcbiAgICAgICAgbW9kdWxlTmFtZTogJ3NoYXJlZC9yZXN1bHQvcmVzdWx0LXBhZ2UnLFxyXG4gICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZSxcclxuICAgICAgICBjb250ZXh0OiBzdGF0ZSxcclxuICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvblx0Z290b0VkaXRQYWdlKHN0YXRlOiBTdGF0ZSkge1xyXG4gICAgZnJhbWVNb2R1bGUudG9wbW9zdCgpLm5hdmlnYXRlKHtcclxuICAgICAgICBtb2R1bGVOYW1lOiAncXVlc3Rpb24vZWRpdC1xdWVzdGlvbicsXHJcbiAgICAgICAgY29udGV4dDogc3RhdGUsXHJcbiAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb25cdGdvdG9RdWVzdGlvbk1hcChzdGF0ZTogU3RhdGUpIHtcclxuICAgIGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5uYXZpZ2F0ZSh7XHJcbiAgICAgICAgbW9kdWxlTmFtZTogJ3F1ZXN0aW9uL21hcCcsXHJcbiAgICAgICAgY29udGV4dDogc3RhdGUsXHJcbiAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb25cdHRvUGFnZShwYXRoOiBzdHJpbmcpIHtcclxuICAgIGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5uYXZpZ2F0ZSh7XHJcbiAgICAgICAgbW9kdWxlTmFtZTogcGF0aCxcclxuICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvblx0Z290b0RldGFpbHNQYWdlKHN0YXRlOiBTdGF0ZSkge1xyXG4gICAgZnJhbWVNb2R1bGUudG9wbW9zdCgpLm5hdmlnYXRlKHtcclxuICAgICAgICBtb2R1bGVOYW1lOiAnc2hhcmVkL2RldGFpbHMvZGV0YWlsZWQtcmVzdWx0JyxcclxuICAgICAgICBjb250ZXh0OiBzdGF0ZSxcclxuICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvblx0Z290b0xhc3RQYWdlKCkge1xyXG4gICAgZnJhbWVNb2R1bGUudG9wbW9zdCgpLmdvQmFjaygpO1xyXG59Il19