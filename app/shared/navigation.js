"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frameModule = require("ui/frame");
var frame_1 = require("ui/frame");
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
function goBack() {
    frame_1.topmost().goBack();
}
exports.goBack = goBack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5hdmlnYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0M7QUFDeEMsa0NBQWlDO0FBR2pDLHdCQUErQixLQUFZO0lBQ3ZDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDM0IsVUFBVSxFQUFFLDJCQUEyQjtRQUN2QyxZQUFZLEVBQUUsSUFBSTtRQUNsQixPQUFPLEVBQUUsS0FBSztRQUNkLFVBQVUsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNO1NBQ2Y7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBVEQsd0NBU0M7QUFFRCxzQkFBNkIsS0FBWTtJQUNyQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQzNCLFVBQVUsRUFBRSx3QkFBd0I7UUFDcEMsT0FBTyxFQUFFLEtBQUs7UUFDZCxVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTTtTQUNmO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVJELG9DQVFDO0FBRUQseUJBQWdDLEtBQVk7SUFDeEMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUMzQixVQUFVLEVBQUUsY0FBYztRQUMxQixPQUFPLEVBQUUsS0FBSztRQUNkLFVBQVUsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNO1NBQ2Y7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBUkQsMENBUUM7QUFFRCxnQkFBdUIsSUFBWTtJQUMvQixXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQzNCLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFVBQVUsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNO1NBQ2Y7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBUEQsd0JBT0M7QUFFRCx5QkFBZ0MsS0FBWTtJQUN4QyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQzNCLFVBQVUsRUFBRSxnQ0FBZ0M7UUFDNUMsT0FBTyxFQUFFLEtBQUs7UUFDZCxVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTTtTQUNmO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVJELDBDQVFDO0FBRUQ7SUFDSSxlQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN2QixDQUFDO0FBRkQsd0JBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcmFtZU1vZHVsZSBmcm9tICd1aS9mcmFtZSc7XHJcbmltcG9ydCB7dG9wbW9zdH0gZnJvbSAndWkvZnJhbWUnO1xyXG5pbXBvcnQge1N0YXRlfSBmcm9tIFwiLi9xdWVzdGlvbnMubW9kZWxcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvblx0Z290b1Jlc3VsdFBhZ2Uoc3RhdGU6IFN0YXRlKSB7XHJcbiAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUoe1xyXG4gICAgICAgIG1vZHVsZU5hbWU6ICdzaGFyZWQvcmVzdWx0L3Jlc3VsdC1wYWdlJyxcclxuICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWUsXHJcbiAgICAgICAgY29udGV4dDogc3RhdGUsXHJcbiAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb25cdGdvdG9FZGl0UGFnZShzdGF0ZTogU3RhdGUpIHtcclxuICAgIGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5uYXZpZ2F0ZSh7XHJcbiAgICAgICAgbW9kdWxlTmFtZTogJ3F1ZXN0aW9uL2VkaXQtcXVlc3Rpb24nLFxyXG4gICAgICAgIGNvbnRleHQ6IHN0YXRlLFxyXG4gICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgbmFtZTogXCJmYWRlXCJcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uXHRnb3RvUXVlc3Rpb25NYXAoc3RhdGU6IFN0YXRlKSB7XHJcbiAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUoe1xyXG4gICAgICAgIG1vZHVsZU5hbWU6ICdxdWVzdGlvbi9tYXAnLFxyXG4gICAgICAgIGNvbnRleHQ6IHN0YXRlLFxyXG4gICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgbmFtZTogXCJmYWRlXCJcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uXHR0b1BhZ2UocGF0aDogc3RyaW5nKSB7XHJcbiAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUoe1xyXG4gICAgICAgIG1vZHVsZU5hbWU6IHBhdGgsXHJcbiAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb25cdGdvdG9EZXRhaWxzUGFnZShzdGF0ZTogU3RhdGUpIHtcclxuICAgIGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5uYXZpZ2F0ZSh7XHJcbiAgICAgICAgbW9kdWxlTmFtZTogJ3NoYXJlZC9kZXRhaWxzL2RldGFpbGVkLXJlc3VsdCcsXHJcbiAgICAgICAgY29udGV4dDogc3RhdGUsXHJcbiAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb25cdGdvQmFjaygpIHtcclxuICAgIHRvcG1vc3QoKS5nb0JhY2soKTtcclxufSJdfQ==