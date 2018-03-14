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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5hdmlnYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0M7QUFHeEMsd0JBQStCLEtBQVk7SUFDdkMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUMzQixVQUFVLEVBQUUsMkJBQTJCO1FBQ3ZDLFlBQVksRUFBRSxJQUFJO1FBQ2xCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07U0FDZjtLQUNKLENBQUMsQ0FBQztBQUNQLENBQUM7QUFURCx3Q0FTQztBQUVELHlCQUFnQyxLQUFZO0lBQ3hDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDM0IsVUFBVSxFQUFFLGNBQWM7UUFDMUIsT0FBTyxFQUFFLEtBQUs7UUFDZCxVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTTtTQUNmO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVJELDBDQVFDO0FBRUQsZ0JBQXVCLElBQVk7SUFDL0IsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUMzQixVQUFVLEVBQUUsSUFBSTtRQUNoQixVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTTtTQUNmO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVBELHdCQU9DO0FBRUQseUJBQWdDLEtBQVk7SUFDeEMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUMzQixVQUFVLEVBQUUsZ0NBQWdDO1FBQzVDLE9BQU8sRUFBRSxLQUFLO1FBQ2QsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07U0FDZjtLQUNKLENBQUMsQ0FBQztBQUNQLENBQUM7QUFSRCwwQ0FRQztBQUVEO0lBQ0ksV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ25DLENBQUM7QUFGRCxvQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZyYW1lTW9kdWxlIGZyb20gJ3VpL2ZyYW1lJztcclxuaW1wb3J0IHtTdGF0ZX0gZnJvbSBcIi4vcXVlc3Rpb25zLm1vZGVsXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb25cdGdvdG9SZXN1bHRQYWdlKHN0YXRlOiBTdGF0ZSkge1xyXG4gICAgZnJhbWVNb2R1bGUudG9wbW9zdCgpLm5hdmlnYXRlKHtcclxuICAgICAgICBtb2R1bGVOYW1lOiAnc2hhcmVkL3Jlc3VsdC9yZXN1bHQtcGFnZScsXHJcbiAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlLFxyXG4gICAgICAgIGNvbnRleHQ6IHN0YXRlLFxyXG4gICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgbmFtZTogXCJmYWRlXCJcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uXHRnb3RvUXVlc3Rpb25NYXAoc3RhdGU6IFN0YXRlKSB7XHJcbiAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUoe1xyXG4gICAgICAgIG1vZHVsZU5hbWU6ICdxdWVzdGlvbi9tYXAnLFxyXG4gICAgICAgIGNvbnRleHQ6IHN0YXRlLFxyXG4gICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgbmFtZTogXCJmYWRlXCJcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uXHR0b1BhZ2UocGF0aDogc3RyaW5nKSB7XHJcbiAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUoe1xyXG4gICAgICAgIG1vZHVsZU5hbWU6IHBhdGgsXHJcbiAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb25cdGdvdG9EZXRhaWxzUGFnZShzdGF0ZTogU3RhdGUpIHtcclxuICAgIGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5uYXZpZ2F0ZSh7XHJcbiAgICAgICAgbW9kdWxlTmFtZTogJ3NoYXJlZC9kZXRhaWxzL2RldGFpbGVkLXJlc3VsdCcsXHJcbiAgICAgICAgY29udGV4dDogc3RhdGUsXHJcbiAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb25cdGdvdG9MYXN0UGFnZSgpIHtcclxuICAgIGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5nb0JhY2soKTtcclxufSJdfQ==